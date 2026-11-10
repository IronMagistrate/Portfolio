import Image from "next/image";
import { about, profile } from "@/content/site";
import { Claim } from "../claim";
import { Section } from "./section";

function Portrait() {
  if (profile.photo) {
    return (
      // Real dimensions of the source file, so next/image reserves the right space.
      // The frame is square, so the 2:3 portrait is cropped from just below the top
      // (object-[50%_15%]) to keep the face in view rather than centring on the tie.
      <Image
        src={profile.photo}
        alt={`Portrait of ${profile.name}`}
        width={1023}
        height={1537}
        sizes="(min-width: 1024px) 40vw, (min-width: 448px) 448px, 100vw"
        className="aspect-square w-full object-cover object-[50%_15%] grayscale contrast-125 hover:grayscale-0"
      />
    );
  }
  // Placeholder until a real headshot is added (the mockup's photo was AI-generated, not Enoch).
  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 bg-surface-2">
      <span className="font-display text-7xl font-extrabold text-muted">EE</span>
      <span className="border border-dashed border-line px-2 py-0.5 font-mono text-label-sm uppercase text-muted">
        Photo pending
      </span>
    </div>
  );
}

export function ProfileSection() {
  return (
    <Section id="about" index="02" title="Engineering profile" tag="Bio & credentials" tone="surface">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md border-2 border-line-strong bg-surface shadow-[6px_6px_0_var(--shadow-accent)] lg:max-w-none">
            <Portrait />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t-2 border-line-strong bg-canvas/90 px-4 py-1">
              <span className="font-mono text-sm font-bold text-accent-ink">STATUS: ACTIVE</span>
              <span className="font-mono text-label-sm uppercase text-muted">
                {profile.coordinates.lat} Lagos
              </span>
            </div>
          </div>
          <span className="px-1 font-mono text-label-sm uppercase text-muted">
            {profile.name} {"// "}
            {profile.location}
          </span>
        </div>

        <ol className="flex flex-col gap-6 lg:col-span-7 lg:border-l-2 lg:border-line lg:pl-10">
          {about.map((entry, i) => (
            <li key={entry.label} className="border-2 border-line bg-canvas p-6 light:bg-surface light:shadow-[4px_4px_0_var(--shadow)]">
              <span className="block pb-1 font-mono text-sm font-bold uppercase text-accent-ink">
                Entry_0{i + 1} {"// "}
                {entry.label}
              </span>
              <p className="text-lg leading-7">
                <Claim value={entry.body} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
