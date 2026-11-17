import Link from "next/link";
import { profile } from "@/content/site";
import { BrandMark } from "./brand-mark";
import { HeaderNav } from "./header-nav";

export function SiteHeader() {
  return (
    <header
      // Named so route transitions leave the header in place while the page content changes.
      style={{ viewTransitionName: "site-header" }}
      // Solid, not blurred: a backdrop blur is re-rendered on every animated frame beneath it,
      // which cost ~120ms per frame on a throttled phone while the nav animated in.
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas"
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={`${profile.name}, home`} className="group flex items-center gap-3">
          <BrandMark className="size-6 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="hidden font-display text-xl sm:block">{profile.name}</span>
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
