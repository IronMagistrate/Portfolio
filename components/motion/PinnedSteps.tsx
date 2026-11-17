"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

export type PinnedStep = {
  /** Short name shown in the step rail and the schematic, e.g. "Client". */
  label: string;
  title: string;
  body: string;
  /** Concrete parts of this layer, shown as a list. */
  items: string[];
};

type PinnedStepsProps = {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  steps: PinnedStep[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Scroll storytelling: on large screens the section pins and scrolling steps through
 * the panels one at a time. On phones, tablets and with reduced motion it is an ordinary
 * stacked list, with every step visible and no pinning.
 *
 * Panels fade with opacity only (never visibility/display), so all steps stay readable
 * by assistive technology at every scroll position.
 */
export function PinnedSteps({ id, eyebrow, heading, intro, steps }: PinnedStepsProps) {
  const section = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  // contextSafe ties the deferred setup to this component's GSAP context for cleanup.
  const { contextSafe } = useGSAP({ scope: section });

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    let mm: gsap.MatchMedia | undefined;

    const setup = contextSafe(() => {
      mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-step-panel]", root);
        const last = panels.length - 1;
        if (last < 1) return;

        gsap.set(panels, { opacity: 0, y: 32 });
        gsap.set(panels[0], { opacity: 1, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            // One viewport-height of scrolling per step change.
            end: () => `+=${window.innerHeight * last}`,
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.round(self.progress * last)),
          },
        });

        // Timeline time runs 0 → last, one unit per step. Within each unit the panel rests,
        // then hands over in the middle (old one out at .25–.5, new one in at .45–.75),
        // so a panel is fully visible at every whole number and the screen is never blank.
        panels.forEach((panel, i) => {
          if (i === 0) return;
          const at = i - 1;
          tl.to(panels[i - 1], { opacity: 0, y: -32, duration: 0.25, ease: "power2.in" }, at + 0.25).to(
            panel,
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
            at + 0.45,
          );
        });
        // Pad the end so the timeline is exactly `last` long and the final panel rests too.
        tl.to({}, { duration: 0.25 }, last - 0.25);
        if (progress.current) {
          tl.fromTo(progress.current, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: last }, 0);
        }

        return () => setActive(0);
      });
    });

    // Pinning measures and rewrites layout. Doing it during hydration blocked the main
    // thread on slow phones, so it waits for an idle moment (or 1.5s at the latest).
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(setup, { timeout: 1500 })
      : window.setTimeout(setup, 200);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      mm?.revert();
    };
  }, [contextSafe]);

  return (
    <section
      ref={section}
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-b border-line bg-surface light:bg-surface-2"
    >
      <div className="container-x grid grid-cols-1 gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32 lg:motion-ok:h-svh lg:motion-ok:items-center lg:motion-ok:py-0">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <span className="label text-accent-ink">{eyebrow}</span>
          <h2 id={`${id}-title`} className="font-display text-h2">
            {heading}
          </h2>
          <p className="max-w-md text-lead text-muted">{intro}</p>

          {/* Step rail: only meaningful while pinned, so it is hidden in the stacked layout. */}
          <ol className="relative mt-6 hidden flex-col gap-4 pl-6 lg:motion-ok:flex" aria-label="Architecture layers">
            <span aria-hidden="true" className="absolute inset-y-1 left-0 w-px bg-line" />
            <span
              ref={progress}
              aria-hidden="true"
              className="absolute inset-y-1 left-0 w-px origin-top scale-y-0 bg-accent-ink"
            />
            {steps.map((step, i) => (
              <li
                key={step.label}
                aria-current={i === active ? "step" : undefined}
                className={`label flex items-baseline gap-3 transition-colors ${
                  i === active ? "text-ink" : "text-muted"
                }`}
              >
                <span className={i === active ? "text-accent-ink" : ""}>{pad(i + 1)}</span>
                {step.label}
              </li>
            ))}
          </ol>
        </div>

        {/* While pinned, every panel sits in the same grid cell, so the stack is as tall as the
            tallest panel and nothing is clipped on short screens. */}
        <div className="flex flex-col gap-6 lg:col-span-7 lg:motion-ok:grid">
          {steps.map((step, i) => (
            <article
              key={step.label}
              data-step-panel
              className={`flex flex-col justify-between gap-8 border border-line bg-canvas p-6 md:p-8 lg:motion-ok:col-start-1 lg:motion-ok:row-start-1 ${
                i > 0 ? "lg:motion-ok:opacity-0" : ""
              }`}
            >
              {/* Schematic: the four layers in a row, with this panel's layer lit. */}
              <ol aria-hidden="true" className="grid grid-cols-4 gap-px bg-line">
                {steps.map((s, j) => (
                  <li
                    key={s.label}
                    className={`label px-2 py-3 text-center ${
                      j === i ? "bg-accent text-on-accent" : "bg-surface text-muted"
                    }`}
                  >
                    {s.label}
                  </li>
                ))}
              </ol>

              <div className="flex flex-col gap-4">
                <span className="label text-accent-ink">
                  {pad(i + 1)} / {pad(steps.length)}
                </span>
                <h3 className="font-display text-h3">{step.title}</h3>
                <p className="max-w-xl text-muted">{step.body}</p>
              </div>

              <ul className="grid grid-cols-1 gap-x-8 border-t border-line sm:grid-cols-2">
                {step.items.map((item) => (
                  <li key={item} className="border-b border-line py-3 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
