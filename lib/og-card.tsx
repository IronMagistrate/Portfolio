/**
 * Shared 1200×630 social-preview card, rendered by next/og's ImageResponse.
 * ImageResponse supports a subset of CSS (flexbox, no grid) and inline styles only.
 * It uses the built-in font: Syne would need a TTF/WOFF file in the repo
 * (next/font only provides WOFF2, which ImageResponse cannot read).
 */
export const ogSize = { width: 1200, height: 630 };

const INK = "#0a0a0a";
const PAPER = "#f2f2f2";
const LIME = "#c8ff00";
const MUTED = "#8a8a8a";

export function OgCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: INK,
        color: PAPER,
        padding: 64,
        border: `12px solid ${LIME}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: LIME, letterSpacing: 2 }}>
        <div style={{ width: 20, height: 20, background: LIME }} />
        {eyebrow.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 18 ? 96 : 128,
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: -4,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `4px solid ${PAPER}`,
          paddingTop: 24,
          fontSize: 28,
          color: MUTED,
        }}
      >
        <span style={{ color: PAPER }}>ENOCH ENEBELI</span>
        <span>{footer.toUpperCase()}</span>
      </div>
    </div>
  );
}
