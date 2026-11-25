import Image from "next/image";
import { aboutStory, approach, capabilities, education, experience, profile, skills } from "@/content/site";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { SplitHeading } from "../motion/SplitHeading";

const pad = (n: number) => String(n).padStart(2, "0");

/** The kinds of problems Enoch solves, each pointing at the project that proves it. */
export function CapabilitiesSection() {
  return (
    <section aria-labelledby="capabilities-title" className="border-t border-line py-20 md:py-28">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SplitHeading as="h2" id="capabilities-title" className="font-display text-h3">
            What I build
          </SplitHeading>
        </div>
        <ul className="border-t border-line lg:col-span-8">
          {capabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.05} className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-6">
              <span className="label pt-1 text-accent-ink sm:col-span-3">{c.where}</span>
              <div className="flex flex-col gap-2 sm:col-span-9">
                <h3 className="font-display text-2xl md:text-3xl">{c.title}</h3>
                <p className="max-w-2xl text-muted">{c.evidence}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Story and approach, then where the work happened, then an honest list of tools. */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-24 md:py-36">
      <div className="container-x flex flex-col gap-20 md:gap-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {profile.photo ? (
              <Parallax
                className="border border-line bg-surface"
                // The frame copies the photo's own proportions, so the photo fits it exactly.
                style={{ aspectRatio: `${profile.photo.width} / ${profile.photo.height}` }}
              >
                {/* width/height are the file's real size, so the space is reserved before it loads. */}
                <Image
                  src={profile.photo.src}
                  alt={`Portrait of ${profile.name}`}
                  width={profile.photo.width}
                  height={profile.photo.height}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="size-full object-cover object-top"
                />
              </Parallax>
            ) : null}
          </div>

          <div className="flex flex-col gap-10 lg:col-span-7">
            <SplitHeading id="about-title" className="font-display text-h2">
              About
            </SplitHeading>
            {/* First person, in Enoch's voice. */}
            <div className="flex max-w-2xl flex-col gap-6 border-t border-line pt-8">
              {aboutStory.map((paragraph, i) => (
                <Reveal as="p" key={i} delay={Math.min(i, 3) * 0.05} className={i === 0 ? "text-lead text-ink" : "text-muted"}>
                  {paragraph}
                </Reveal>
              ))}
            </div>

            {/* A habit, not a method: said as such on the page. */}
            <div className="flex flex-col gap-4">
              <h3 className="label text-muted">How I usually start</h3>
              <ol className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
                {approach.map((step, i) => (
                  <Reveal as="li" key={step.title} delay={(i % 2) * 0.05} className="flex flex-col gap-1 bg-canvas p-5">
                    <span className="label text-accent-ink">{pad(i + 1)}</span>
                    <span className="font-display text-2xl">{step.title}</span>
                    <span className="text-sm text-muted">{step.body}</span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h3 className="label text-muted lg:col-span-3">Experience</h3>
          <div className="flex flex-col gap-10 lg:col-span-9">
            <ol className="border-t border-line">
              {experience.map((job, i) => (
                <Reveal as="li" key={job.company} delay={Math.min(i, 3) * 0.05} className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-4 sm:gap-6">
                  <span className="label pt-1 text-muted">{job.period}</span>
                  <div className="flex flex-col gap-2 sm:col-span-3">
                    <span className="font-display text-2xl md:text-3xl">
                      {job.role} <span className="text-muted">· {job.company}</span>
                    </span>
                    <p className="max-w-2xl text-muted">{job.summary}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-6">
              <span className="label pt-1 text-muted">Education · {education.period}</span>
              <p className="sm:col-span-3">
                <span className="font-display text-2xl">{education.degree}</span>{" "}
                <span className="text-muted">
                  · {education.school}. {education.detail}.
                </span>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h3 className="label text-muted lg:col-span-3">Skills &amp; tools</h3>
          <dl className="border-t border-line lg:col-span-9">
            {skills.map((tier, i) => (
              <Reveal key={tier.tier} delay={i * 0.05} className="grid grid-cols-1 gap-3 border-b border-line py-6 sm:grid-cols-4 sm:gap-6">
                <dt className="flex flex-col gap-1">
                  <span className="font-display text-2xl">{tier.tier}</span>
                  <span className="text-sm text-muted">{tier.note}</span>
                </dt>
                <dd className="flex flex-col gap-3 sm:col-span-3">
                  {tier.groups.map((group) => (
                    <p key={group.area || tier.tier} className={i === 0 ? "text-lead" : "text-muted"}>
                      {group.area ? <span className="label mr-3 text-muted">{group.area}</span> : null}
                      {group.items.join(", ")}
                    </p>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
