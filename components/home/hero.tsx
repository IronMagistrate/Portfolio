import { profile } from "@/content/site";
import { ArrowDown } from "../icons";
import { buttonPrimary, CvButton, StatusSquare } from "../ui";

export function Hero() {
  return (
    <section className="border-b-2 border-line px-5 py-16 md:px-12 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-line pb-4">
          <div className="flex items-center gap-2 border border-line bg-surface px-4 py-1">
            <StatusSquare pulse />
            <span className="font-mono text-label-md font-bold uppercase">
              {profile.role} {"// "}
              {profile.location}
            </span>
          </div>
          <div className="hidden font-mono text-sm text-muted md:block">
            <span className="text-accent-ink">SYS_LOC:</span> LAT {profile.coordinates.lat} {"// "}LON{" "}
            {profile.coordinates.lon}
          </div>
        </div>

        <div className="fit-title-box flex flex-col gap-6">
          <h1 className="fit-title max-w-5xl font-display font-extrabold tracking-[-0.03em] uppercase">
            {profile.headline.before}{" "}
            <span className="bg-accent px-1 text-on-accent [box-decoration-break:clone]">
              {profile.headline.highlight}
            </span>{" "}
            {profile.headline.after}
          </h1>
          <p className="max-w-3xl text-lg leading-7 text-muted">{profile.intro}</p>
        </div>

        <div className="flex flex-col gap-6 border-t-2 border-line pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#work" className={buttonPrimary}>
              View work <ArrowDown />
            </a>
            <CvButton />
          </div>
          <div className="flex items-center gap-2 self-start border-2 border-line bg-surface px-4 py-2 sm:ml-auto sm:self-auto">
            <StatusSquare />
            <span className="font-mono text-label-sm font-bold uppercase">{profile.availability}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
