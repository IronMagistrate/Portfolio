import { claimText, contact } from "@/content/site";
import { VerifyTag } from "../claim";
import { ExternalLink, Mail } from "../icons";
import { buttonPrimaryPlain } from "../ui";
import { Section } from "./section";

export function ContactSection() {
  const email = claimText(contact.email);

  return (
    <Section id="contact" index="04" title="Engage" tag="Dispatch communications" tone="surface">
      <div className="flex flex-col gap-10 border-2 border-line bg-canvas p-6 md:p-16 light:bg-surface light:shadow-[6px_6px_0_var(--shadow)]">
        <div className="fit-title-box flex max-w-3xl flex-col gap-3">
          <h3 className="fit-title font-display font-extrabold tracking-[-0.03em] uppercase [--fit-max:3.75rem]">
            Let&apos;s build something.
          </h3>
          <p className="text-lg text-muted">
            Open to remote full-stack roles and high-impact engineering work.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-6 border-t-2 border-line pt-6 xl:flex-row xl:items-center">
          <span className="flex flex-wrap items-center gap-y-2">
            <a href={`mailto:${email}`} className={`${buttonPrimaryPlain} [overflow-wrap:anywhere]`}>
              <Mail />
              {email}
            </a>
            {typeof contact.email === "string" ? null : <VerifyTag why={contact.email.verify} />}
          </span>

          <ul className="flex flex-wrap items-center gap-4">
            {contact.links.map((link) => (
              <li key={link.label} className="flex items-center">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-2 border-line bg-surface px-4 py-2 font-mono text-label-md font-bold uppercase hover:border-accent hover:text-accent-ink"
                >
                  {link.label}
                  {/* Full handle only where there is room; on phones it would overflow the panel. */}
                  <span className="hidden sm:inline">: {link.handle}</span>
                  <ExternalLink className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                {link.verify ? <VerifyTag why={link.verify} /> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
