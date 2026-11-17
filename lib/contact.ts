import { z } from "zod";

/**
 * Shared by the contact form (browser) and the send action (server).
 * The limits live here once, so the two can never disagree.
 */
export const LIMITS = { nameMin: 2, nameMax: 80, subjectMax: 120, messageMin: 10, messageMax: 5000 } as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(LIMITS.nameMin, "Please enter your name.")
    .max(LIMITS.nameMax, `Keep your name under ${LIMITS.nameMax} characters.`),
  email: z.email("Please enter a valid email address, so I can reply.").max(254),
  subject: z.string().trim().max(LIMITS.subjectMax, `Keep the subject under ${LIMITS.subjectMax} characters.`),
  message: z
    .string()
    .trim()
    .min(LIMITS.messageMin, `Tell me a little more (at least ${LIMITS.messageMin} characters).`)
    .max(LIMITS.messageMax, `Keep your message under ${LIMITS.messageMax.toLocaleString("en-US")} characters.`),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactValues;

/** What the send action hands back to the form. */
export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      /** A problem that is not tied to one field (sending failed, too many attempts). */
      message?: string;
      fieldErrors: Partial<Record<ContactField, string>>;
      /** What the visitor typed, handed back so nothing is lost when sending fails. */
      values: ContactValues;
    };

export const initialContactState: ContactState = { status: "idle" };
