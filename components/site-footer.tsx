import { contact, profile } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-x label flex flex-col justify-between gap-4 py-8 text-muted sm:flex-row sm:items-center">
        <span>
          © {profile.copyrightYear} {profile.name}
        </span>
        <span>{profile.location}</span>
        <ul className="flex gap-6">
          {contact.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-sweep py-1 hover:text-ink">
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
