import { contact, profile } from "@/content/site";
import { StatusSquare } from "./ui";

const label = "font-mono text-label-md font-bold uppercase text-muted";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-line bg-surface pb-16 lg:pb-0">
      <div className="px-5 py-10 md:px-12">
        <div className="grid grid-cols-1 gap-10 border-b-2 border-line pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <span className={label}>Engineering identity</span>
            <span className="font-display text-headline-sm font-extrabold uppercase">{profile.name}</span>
            <span className="font-mono text-sm text-accent-ink">{"// "}{profile.role}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={label}>Location</span>
            <span className="font-bold uppercase">{profile.location}</span>
            <span className="font-mono text-label-sm text-muted">
              {profile.coordinates.lat} {profile.coordinates.lon}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={label}>Availability</span>
            <span className="flex items-center gap-2 font-mono text-label-sm font-bold uppercase">
              <StatusSquare /> {profile.availability}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className={label}>Elsewhere</span>
            <div className="flex flex-wrap gap-4 pt-1">
              {contact.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-label-md font-bold uppercase underline decoration-line decoration-2 underline-offset-4 hover:text-accent-ink hover:decoration-accent"
                >
                  {link.label} -&gt;
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-4 font-mono text-label-sm uppercase text-muted sm:flex-row sm:items-center">
          <span>
            © {profile.copyrightYear} {profile.name}. All rights reserved.
          </span>
          <span>Status: operational_</span>
        </div>
      </div>
    </footer>
  );
}
