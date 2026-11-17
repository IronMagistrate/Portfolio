"use client";

import { useState, useSyncExternalStore } from "react";
import { contact, profile } from "@/content/site";

/** Lagos is UTC+1 all year (no daylight saving), so the time zone name is fixed. */
const lagosTime = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });

function subscribeToMinute(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

/**
 * Current time in Lagos. useSyncExternalStore gives the server a fixed placeholder and the
 * browser the real clock, so the two never disagree during hydration.
 */
function LocalTime() {
  const time = useSyncExternalStore(
    subscribeToMinute,
    () => lagosTime.format(new Date()),
    () => "--:--",
  );
  return <span className="tabular-nums">{time} WAT</span>;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (permissions, insecure page): the address is still visible to select.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="label shrink-0 rounded-full border border-line-strong px-3 py-2 transition-colors duration-200 hover:border-ink"
    >
      {/* aria-live announces the change to screen readers without moving focus. */}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      <span className="sr-only"> email address</span>
    </button>
  );
}

const row = "flex flex-col gap-4 border-t border-line py-8";
const heading = "label flex items-center justify-between text-muted";

/** Direct contact details beside the form. Facts come from content/site.ts. */
export function ContactAside() {
  return (
    <aside aria-label="Other ways to reach me" className="flex flex-col">
      <div className={row}>
        <h2 className={heading}>
          Email <span aria-hidden="true">01</span>
        </h2>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href={`mailto:${contact.email}`} className="link-sweep text-xl break-all md:text-2xl">
            {contact.email}
          </a>
          <CopyEmail />
        </div>
      </div>

      <div className={row}>
        <h2 className={heading}>
          Elsewhere <span aria-hidden="true">02</span>
        </h2>
        <ul>
          {contact.links.map((link) => (
            <li key={link.label} className="border-b border-line last:border-b-0">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-4"
              >
                <span className="link-sweep text-lg group-hover:bg-[length:100%_1px] group-hover:bg-[position:0%_100%]">
                  {link.label}
                </span>
                <span className="label text-muted">
                  <span aria-hidden="true">↗ </span>
                  {link.handle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={row}>
        <h2 className={heading}>
          Location <span aria-hidden="true">03</span>
        </h2>
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg">{profile.location}</span>
          <span className="label text-muted">WAT · GMT+1</span>
        </div>
        <div className="label flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-ink" />
            Local time
          </span>
          <span className="text-accent-ink">
            <LocalTime />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 border border-line bg-surface p-6">
        <span className="label text-accent-ink">Availability</span>
        <p className="text-muted">
          <span className="text-ink">{profile.availability}.</span> I reply to every message within 2 working days.
        </p>
      </div>
    </aside>
  );
}
