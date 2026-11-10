/**
 * The EE "block" mark, same geometry as app/icon.svg (the favicon), drawn inline so it
 * follows the theme: the offset shadow uses --shadow (light grey on dark, black on paper),
 * where the favicon file has to hard-code #f2f2f2. Square edges only, per DESIGN.md.
 * viewBox is cropped to the artwork (x/y 36–228) so it sits flush in the header.
 */
export function BrandMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="36 36 192 192" aria-hidden="true" className={className}>
      <rect x="52" y="52" width="176" height="176" fill="var(--shadow)" />
      <rect x="36" y="36" width="176" height="176" fill="var(--accent)" />
      <g fill="var(--on-accent)">
        <rect x="68" y="76" width="16" height="104" />
        <rect x="84" y="76" width="36" height="16" />
        <rect x="84" y="120" width="28" height="16" />
        <rect x="84" y="164" width="36" height="16" />
        <rect x="132" y="76" width="16" height="104" />
        <rect x="148" y="76" width="36" height="16" />
        <rect x="148" y="120" width="28" height="16" />
        <rect x="148" y="164" width="36" height="16" />
      </g>
    </svg>
  );
}
