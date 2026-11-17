"use server";

import { headers } from "next/headers";
import { contact } from "@/content/site";
import { type ContactField, type ContactState, type ContactValues, contactSchema } from "@/lib/contact";

/*
 * Sends a contact-form message to Enoch's inbox through Resend's HTTP API.
 *
 * Environment variables (set on Vercel; never prefix these with NEXT_PUBLIC_):
 *   RESEND_API_KEY   required in production. Secret.
 *   CONTACT_FROM     optional. Sender ADDRESS only; its domain must be verified in Resend.
 *                    Default: contact@enochenebeli.com. The display name is the visitor's
 *                    ("Ada Lovelace via portfolio").
 *   CONTACT_TO       optional. Where messages are delivered. Default: the site's contact email.
 *   CONTACT_DRY_RUN  optional. "1" logs the message instead of sending (local testing only).
 *
 * The browser's own checks are a convenience. Everything is validated again here,
 * because a request can be sent to a Server Action without ever loading the form.
 */

const FROM_ADDRESS = process.env.CONTACT_FROM ?? "contact@enochenebeli.com";

/**
 * Sender line shown in the inbox, e.g. "Ada Lovelace via portfolio <contact@enochenebeli.com>".
 * The name is visitor input inside an email header, so anything that could break or forge
 * the header (quotes, angle brackets, line breaks, control characters) is stripped first.
 */
function fromLine(name: string): string {
  const safe = name.replace(/[\u0000-\u001f\u007f"<>\\]/g, "").trim().slice(0, 60);
  return safe ? `"${safe} via portfolio" <${FROM_ADDRESS}>` : `Portfolio contact form <${FROM_ADDRESS}>`;
}
const TO = process.env.CONTACT_TO ?? contact.email;

/*
 * Best-effort flood guard: at most MAX sends per address per WINDOW.
 * It lives in this server instance's memory, so on serverless hosting each instance counts
 * separately and the count resets when an instance is recycled. It slows a simple script;
 * it is not a hard guarantee. Resend's own account limits are the backstop.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const attempts = new Map<string, number[]>();

function tooManyAttempts(key: string, now: number): boolean {
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  // Keep the map from growing without bound.
  if (attempts.size > 500) {
    for (const [k, times] of attempts) if (times.every((t) => now - t >= WINDOW_MS)) attempts.delete(k);
  }
  return false;
}

const text = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
};

function fail(values: ContactValues, message: string, fieldErrors: Partial<Record<ContactField, string>> = {}): ContactState {
  return { status: "error", message, fieldErrors, values };
}

export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const raw: ContactValues = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    subject: text(formData, "subject"),
    message: text(formData, "message"),
  };

  // Honeypot: a field people never see. Only a bot fills it in. Report success so the
  // bot learns nothing, and send nothing.
  if (text(formData, "company") !== "") return { status: "success" };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", fieldErrors, values: raw };
  }
  const values = parsed.data;

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyAttempts(ip, Date.now())) {
    return fail(values, `That's a few messages in a short time. Please wait ten minutes, or email ${contact.email} directly.`);
  }

  const subject = values.subject || `New message from ${values.name}`;
  const body = `${values.message}\n\n--\n${values.name} <${values.email}>\nSent from the contact form on enochenebeli.com`;

  if (process.env.CONTACT_DRY_RUN === "1") {
    console.info("[contact] dry run, nothing sent:", { to: TO, replyTo: values.email, subject });
    return { status: "success" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // A setup problem on our side. Log the detail; tell the visitor only what helps them.
    console.error("[contact] RESEND_API_KEY is not set; message not sent.");
    return fail(values, `The form isn't able to send right now. Please email ${contact.email} directly.`);
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      // reply_to makes "Reply" in the inbox go straight to the visitor.
      body: JSON.stringify({ from: fromLine(values.name), to: [TO], reply_to: values.email, subject, text: body }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[contact] Resend refused the message:", response.status, await response.text());
      return fail(values, `Your message didn't go through. Please try again, or email ${contact.email} directly.`);
    }
  } catch (error) {
    console.error("[contact] Could not reach Resend:", error);
    return fail(values, `Your message didn't go through. Please try again, or email ${contact.email} directly.`);
  }

  return { status: "success" };
}
