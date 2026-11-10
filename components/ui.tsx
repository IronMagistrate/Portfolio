import { profile } from "@/content/site";
import { Download } from "./icons";

/** Shared class strings, so every button and chip stays identical. */
// Case is kept separate from the base: Tailwind orders its CSS by its own rules, not by
// className order, so adding `normal-case` next to `uppercase` would not reliably win.
const buttonPrimaryBase =
  "press inline-flex items-center justify-center gap-2 border-2 border-line-strong bg-accent px-6 py-3 font-mono text-label-md font-bold text-on-accent";

export const buttonPrimary = `${buttonPrimaryBase} uppercase`;

/** Primary button for content that must keep its own case, e.g. an email address. */
export const buttonPrimaryPlain = buttonPrimaryBase;

export const buttonSecondary =
  "press press-accent inline-flex items-center justify-center gap-2 border-2 border-line-strong bg-surface px-6 py-3 font-mono text-label-md font-bold uppercase text-ink hover:bg-surface-2";

const buttonDisabled =
  "inline-flex cursor-not-allowed items-center justify-center gap-2 border-2 border-dashed border-line px-6 py-3 font-mono text-label-md font-bold uppercase text-muted";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-label-sm uppercase text-ink">
      {children}
    </span>
  );
}

/** 8×8 lime square: the design's "live" indicator (squares, never dots). */
export function StatusSquare({ pulse = false }: { pulse?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-2 shrink-0 bg-accent light:outline light:outline-1 light:outline-ink ${pulse ? "motion-safe:animate-pulse" : ""}`}
    />
  );
}

/**
 * Download CV button. Until a PDF is placed in public/ and set as profile.cv,
 * it renders as a visibly disabled control instead of a link to a 404.
 */
export function CvButton({
  variant = "secondary",
  label = "Download CV",
  className = "",
}: {
  variant?: "primary" | "secondary";
  label?: string;
  className?: string;
}) {
  if (!profile.cv) {
    return (
      <span aria-disabled="true" title="CV not uploaded yet" className={`${buttonDisabled} ${className}`}>
        {label} (soon)
      </span>
    );
  }
  return (
    <a
      href={profile.cv}
      download
      className={`${variant === "primary" ? buttonPrimary : buttonSecondary} ${className}`}
    >
      {label}
      <Download />
    </a>
  );
}
