/** Full-width band with the "// 01 TITLE ......... [ TAG ]" terminal-style header. */
export function Section({
  id,
  index,
  title,
  tag,
  tone = "canvas",
  children,
}: {
  id: string;
  index: string;
  title: string;
  tag: string;
  tone?: "canvas" | "surface";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`border-b-2 border-line px-5 py-16 md:px-12 md:py-24 ${tone === "surface" ? "bg-surface light:bg-canvas" : "bg-canvas"}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex items-end justify-between gap-4 border-b-2 border-line pb-2">
          {/* Index stacks above the title on phones: Syne is wide, "ENGINEERING" alone is ~11.5em. */}
          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <span className="shrink-0 font-mono text-sm font-bold whitespace-nowrap text-accent-ink">
              {"// "}
              {index}
            </span>
            <h2
              id={`${id}-title`}
              className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl md:text-headline-md"
            >
              {title}
            </h2>
          </div>
          <span className="hidden font-mono text-label-sm uppercase text-muted sm:inline-block">[ {tag} ]</span>
        </div>
        {children}
      </div>
    </section>
  );
}
