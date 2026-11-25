import { profile } from "@/content/site";
import { Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui";

/** A short closing line. The full form, email and links live on /contact. */
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-16 md:py-24">
      <Reveal className="container-x flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="flex flex-col gap-4">
          <p className="label text-accent-ink">{profile.availability}</p>
          <h2 id="contact-title" className="max-w-[18ch] font-display text-h2">
            Have something to build? <em>Let&apos;s talk.</em>
          </h2>
        </div>
        <ButtonLink href="/contact" arrow="right">
          Get in touch
        </ButtonLink>
      </Reveal>
    </section>
  );
}
