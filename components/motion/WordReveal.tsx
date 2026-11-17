type Segment = { text: string; accent?: boolean };

type WordRevealProps = {
  /** The headline in pieces; `accent` pieces render in italic accent colour. */
  segments: Segment[];
  as?: "h1" | "h2";
  /** Milliseconds before the first word starts. */
  delay?: number;
  className?: string;
};

/**
 * Above-the-fold headline reveal: each word slides up from behind a mask, one after another.
 *
 * This is CSS only (a Server Component, no JavaScript), on purpose. A GSAP SplitText reveal
 * has to hide the headline until the script runs; on a slow phone that delayed the page's
 * largest paint to 3.8s and shifted the layout when the lines were measured (Lighthouse,
 * 16 Nov 2026). Here the words are split on the server and the animation starts at first
 * paint. Headings further down the page still use SplitHeading (GSAP), where it costs nothing.
 *
 * Screen readers get the sentence once, from aria-label; the word spans are hidden from them.
 * With reduced motion (no `motion-ok` class) the animation is never applied.
 */
export function WordReveal({ segments, as: Tag = "h1", delay = 0, className }: WordRevealProps) {
  const label = segments.map((s) => s.text).join(" ");
  // Split into words, and after hyphens too, so "production-grade" can still wrap on a phone.
  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .flatMap((word) => {
        const parts = word.split(/(?<=-)/);
        return parts.map((part, i) => ({ part, accent: segment.accent, spaceAfter: i === parts.length - 1 }));
      }),
  );

  return (
    <Tag aria-label={label} className={className}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          {/* Mask: clips vertically only, so italic letters can overhang sideways. */}
          <span className="-mb-[0.14em] inline-block overflow-y-clip pb-[0.14em] align-bottom">
            <span
              // will-change puts each word on its own compositor layer, so the slide runs off the
              // main thread instead of repainting the headline every frame.
              className="inline-block will-change-transform motion-ok:animate-[word-rise_900ms_var(--ease-out-expo)_both]"
              style={{ animationDelay: `${delay + i * 55}ms` }}
            >
              {word.accent ? <em className="text-accent-ink">{word.part}</em> : word.part}
            </span>
          </span>
          {word.spaceAfter ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
