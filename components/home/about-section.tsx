import Image from "next/image";
import { about, experience, metrics, profile, skills } from "@/content/site";
import { Counter } from "../motion/Counter";
import { Parallax } from "../motion/Parallax";
import { Reveal } from "../motion/Reveal";
import { SplitHeading } from "../motion/SplitHeading";

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
            <dl className="border-t border-line">
              {about.map((entry, i) => (
                <Reveal key={entry.label} delay={i * 0.06} className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-4 sm:gap-6">
                  <dt className="label pt-1 text-accent-ink">{entry.label}</dt>
                  <dd className="text-lead sm:col-span-3">{entry.body}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        {/* Impact numbers: real figures only, each labelled with the project it comes from. */}
        <ul className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal as="li" key={metric.label} delay={i * 0.06} className="flex flex-col gap-3 bg-canvas p-5 md:p-8">
              <Counter value={metric.value} suffix={metric.suffix} className="font-display text-h2" />
              <span className="text-sm text-muted">{metric.label}</span>
              <span className="label mt-auto text-accent-ink">{metric.source}</span>
            </Reveal>
          ))}
        </ul>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h3 className="label text-muted lg:col-span-3">Experience</h3>
          <ol className="border-t border-line lg:col-span-9">
            {experience.map((job, i) => (
              <Reveal as="li" key={job.company} delay={i * 0.05} className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-4 sm:gap-6">
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
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h3 className="label text-muted lg:col-span-3">Toolkit</h3>
          <dl className="border-t border-line lg:col-span-9">
            {skills.map((group, i) => (
              <Reveal key={group.group} delay={i * 0.05} className="grid grid-cols-1 gap-2 border-b border-line py-5 sm:grid-cols-4 sm:gap-6">
                <dt className="label pt-1 text-muted">{group.group}</dt>
                <dd className="font-display text-2xl sm:col-span-3 md:text-3xl">{group.items.join(", ")}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
