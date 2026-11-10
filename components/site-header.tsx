import Link from "next/link";
import { profile } from "@/content/site";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { Download } from "./icons";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-line bg-canvas">
      <div className="flex h-20 items-center justify-between gap-2 px-5 md:px-12">
        <div className="flex items-center gap-4">
          <Link href="/" className="group flex items-center gap-2">
            <span aria-hidden="true" className="hidden size-3 bg-accent group-hover:bg-ink sm:block" />
            <span className="font-display text-base font-extrabold uppercase tracking-tight sm:text-headline-sm">
              {profile.name}
            </span>
          </Link>
          <span className="hidden border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-label-sm uppercase text-muted xl:inline-block">
            {profile.role}
          </span>
        </div>

        <NavLinks />

        <div className="flex items-center gap-3">
          {profile.cv ? (
            <a
              href={profile.cv}
              download
              className="press inline-flex items-center gap-1 border-2 border-line-strong bg-accent px-3 py-2 font-mono text-label-md font-bold uppercase text-on-accent"
            >
              CV <Download className="size-3.5" />
            </a>
          ) : null}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
