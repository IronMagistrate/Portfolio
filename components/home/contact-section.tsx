import { contact, profile } from "@/content/site";
import { Reveal } from "../motion/Reveal";
import { SplitHeading } from "../motion/SplitHeading";
import { Arrow, ButtonLink } from "../ui";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 md:py-40">
      <div className="container-x flex flex-col gap-12">
        <Reveal as="p" className="label text-accent-ink">
          {profile.availability}
        </Reveal>
        <SplitHeading id="contact-title" className="max-w-[12ch] font-display text-display">
          Let&apos;s build <em>something.</em>
        </SplitHeading>
        <Reveal className="flex flex-col justify-between gap-8 border-t border-line pt-8 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" arrow="right">
              Send a message
            </ButtonLink>
            <ButtonLink href={`mailto:${contact.email}`} variant="ghost">
              {contact.email}
            </ButtonLink>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {contact.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep inline-flex items-center gap-2 py-1 text-lead"
                >
                  {link.label}
                  <Arrow dir="out" className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
