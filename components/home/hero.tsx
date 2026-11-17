import { contact, profile } from "@/content/site";
import { WordReveal } from "../motion/WordReveal";
import { ButtonLink, StatusDot } from "../ui";

/*
 * Supporting hero text fades up with a CSS animation (see `hero-rise` below), not JavaScript:
 * it starts at first paint and does not wait for hydration, which keeps the hero's
 * largest-paint time low. The headline does the same, word by word (WordReveal).
 */
const rise = "motion-ok:animate-[hero-rise_800ms_var(--ease-out-expo)_both]";

export function Hero() {
  return (
    <section className="container-x flex min-h-svh flex-col justify-between gap-16 pt-28 pb-10 md:pt-36">
      <div className={`label flex flex-wrap items-center justify-between gap-3 text-muted ${rise}`}>
        <span>
          {profile.role} · {profile.location}
        </span>
        <span className="flex items-center gap-2 text-ink">
          <StatusDot live />
          {profile.availability}
        </span>
      </div>

      <div className="flex flex-col gap-10">
        <WordReveal
          as="h1"
          delay={100}
          className="max-w-[13ch] font-display text-display"
          segments={[
            { text: profile.headline.before },
            { text: profile.headline.highlight, accent: true },
            { text: profile.headline.after },
          ]}
        />

        <div className="flex flex-col justify-between gap-8 border-t border-line pt-8 md:flex-row md:items-end">
          <p className={`max-w-xl text-lead text-muted ${rise} [animation-delay:350ms]`}>{profile.intro}</p>
          <div className={`flex flex-wrap items-center gap-3 ${rise} [animation-delay:450ms]`}>
            <ButtonLink href="/#work" arrow="down">
              View work
            </ButtonLink>
            {profile.cv ? (
              <ButtonLink href={profile.cv} variant="ghost">
                Download CV
              </ButtonLink>
            ) : null}
            <ButtonLink href={`mailto:${contact.email}`} variant="ghost">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
