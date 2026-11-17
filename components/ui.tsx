import Link from "next/link";
import { type Claim as ClaimValue } from "@/content/site";
import { Magnetic } from "./motion/Magnetic";

/** Arrow glyph. `dir` rotates it: right (default), down, or up-right for external links. */
export function Arrow({ dir = "right", className = "size-4" }: { dir?: "right" | "down" | "out"; className?: string }) {
  const rotate = dir === "down" ? "rotate-90" : dir === "out" ? "-rotate-45" : "";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} ${rotate}`}
    >
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

const buttonBase =
  "group/btn inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300";
const buttonStyles = {
  // The one place the accent is used as a fill.
  primary: `${buttonBase} bg-accent text-on-accent hover:bg-ink hover:text-canvas`,
  ghost: `${buttonBase} border border-line-strong text-ink hover:border-ink`,
} as const;

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof buttonStyles;
  /** Arrow shown after the label; it nudges forward on hover. */
  arrow?: "right" | "down" | "out";
  /** Opens in a new tab and tells assistive technology so. */
  external?: boolean;
};

/** Pill button that leans toward the pointer (Magnetic). Internal links use next/link. */
export function ButtonLink({ href, children, variant = "primary", arrow, external = false }: ButtonLinkProps) {
  const content = (
    <>
      {children}
      {arrow ? (
        <Arrow
          dir={arrow}
          className={`size-4 transition-transform duration-300 ${
            arrow === "down" ? "group-hover/btn:translate-y-0.5" : "group-hover/btn:translate-x-0.5"
          }`}
        />
      ) : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </>
  );
  const isPage = href.startsWith("/") && !external;

  return (
    <Magnetic>
      {isPage ? (
        <Link href={href} className={buttonStyles[variant]}>
          {content}
        </Link>
      ) : (
        <a
          href={href}
          className={buttonStyles[variant]}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      )}
    </Magnetic>
  );
}

/** Visible marker on placeholder content. Loud on purpose: it is meant to be replaced, not styled away. */
export function TodoTag({ why }: { why: string }) {
  return (
    <span
      title={why}
      className="label ml-2 inline-block rounded-sm border border-dashed border-accent-ink px-1.5 align-middle text-accent-ink"
    >
      TODO
    </span>
  );
}

/** Renders a claim; placeholder claims get a TODO tag. */
export function Claim({ value }: { value: ClaimValue }) {
  if (typeof value === "string") return <>{value}</>;
  return (
    <>
      {value.text}
      <TodoTag why={value.verify} />
    </>
  );
}

export function StatusDot({ live }: { live: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-1.5 rounded-full ${live ? "bg-accent-ink motion-ok:animate-pulse" : "bg-muted"}`}
    />
  );
}
