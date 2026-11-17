import type { Metadata } from "next";
import { ViewTransition } from "react";
import { ContactAside } from "@/components/contact/contact-aside";
import { ContactForm } from "@/components/contact/contact-form";
import { WordReveal } from "@/components/motion/WordReveal";
import { profile } from "@/content/site";

const description =
  "Get in touch with Enoch Enebeli about remote full-stack roles, contracts and projects. Send a message or email directly.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  // A page's openGraph object REPLACES the layout's (no deep merge), so repeat siteName/locale.
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: "en_NG",
    title: `Contact | ${profile.name}`,
    description,
    url: "/contact",
  },
  twitter: { card: "summary_large_image", title: `Contact | ${profile.name}`, description },
};

const rise = "motion-ok:animate-[hero-rise_800ms_var(--ease-out-expo)_both]";

export default function ContactPage() {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" default="none">
      <div className="container-x pt-28 pb-24 md:pt-36">
        <header className="flex flex-col gap-8 border-b border-line pb-12 md:pb-16">
          <span className={`label text-accent-ink ${rise}`}>Contact</span>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <WordReveal
              as="h1"
              className="max-w-[9ch] font-display text-display"
              segments={[{ text: "Let's build" }, { text: "something.", accent: true }]}
            />
            <p className={`max-w-md text-lead text-muted ${rise} [animation-delay:300ms]`}>
              {profile.availability}. Tell me what you&apos;re working on.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-16 pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
          <section aria-label="Send a message" className="lg:col-span-7">
            <ContactForm />
          </section>
          <div className="lg:col-span-5">
            <ContactAside />
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
