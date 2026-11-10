import { type Claim as ClaimValue } from "@/content/site";

/**
 * Visible marker for an unconfirmed fact. Deliberately loud: it is meant to be
 * removed (by confirming the fact in content/site.ts), not styled away.
 */
export function VerifyTag({ why, tone = "default" }: { why: string; tone?: "default" | "on-accent" }) {
  // On a lime background the default lime tag would be invisible, hence the on-accent tone.
  const colour = tone === "on-accent" ? "border-on-accent text-on-accent" : "border-accent-ink text-accent-ink";
  return (
    <span
      title={why}
      className={`ml-2 inline-block border border-dashed px-1 align-middle font-mono text-label-sm font-bold uppercase ${colour}`}
    >
      Verify
    </span>
  );
}

export function Claim({ value }: { value: ClaimValue }) {
  if (typeof value === "string") return <>{value}</>;
  return (
    <>
      {value.text}
      <VerifyTag why={value.verify} />
    </>
  );
}
