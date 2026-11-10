/**
 * Every fact on the site lives in this file. Edit facts here, not in components.
 *
 * HONESTY RULE: a claim we have not confirmed is wrapped in `unverified(...)`.
 * It renders with a visible "VERIFY" tag on the page, so it cannot slip into
 * production unnoticed. Once you confirm (or correct) the text, replace
 * `unverified("...", "...")` with a plain string and the tag disappears.
 *
 * Many claims in the Stitch mockups were invented by the design tool
 * (e.g. "-48% time to ticket", "99.4% payment success", "20+ engineers taught").
 * Those were left out, not carried over.
 */

export type Claim = string | { text: string; verify: string };

/** Mark a claim as not yet confirmed. `why` says what needs checking. */
export function unverified(text: string, why: string): Claim {
  return { text, verify: why };
}

export function claimText(claim: Claim): string {
  return typeof claim === "string" ? claim : claim.text;
}

export const profile = {
  name: "Enoch Enebeli",
  role: "Full Stack Engineer",
  location: "Lagos, Nigeria",
  coordinates: { lat: "06°27′N", lon: "03°23′E" },
  availability: "Open to remote full-stack roles",
  headline: {
    before: "Full Stack Developer building",
    highlight: "production-grade",
    after: "platforms.",
  },
  intro:
    "I design, build and ship web platforms end to end: Next.js, NestJS and TypeScript, from the backend API to the interface people actually use.",
  /** Put the real headshot at public/<file> and set this to "/<file>". null shows a placeholder frame. */
  photo: null as string | null,
  /** Put the CV PDF in public/ and set this to "/<file>.pdf". null disables the Download CV buttons. */
  cv: null as string | null,
  copyrightYear: 2026,
};

export const contact = {
  // Confirmed: SmartBioTrack project memory records the git identity IronMagistrate / this address.
  email: "enochenebeli@gmail.com" as Claim,
  links: [
    {
      label: "LinkedIn",
      handle: "in/enochenebeli",
      href: "https://linkedin.com/in/enochenebeli",
      verify: "LinkedIn URL came from the mockup. Confirm it.",
    },
    {
      // The mockup said github.com/enochenebeli; your git identity is IronMagistrate,
      // which is the likelier GitHub username. Still unconfirmed.
      label: "GitHub",
      handle: "github.com/IronMagistrate",
      href: "https://github.com/IronMagistrate",
      verify: "Your git identity is IronMagistrate. Confirm this is your GitHub profile URL.",
    },
  ] as { label: string; handle: string; href: string; verify?: string }[],
};

export type ProjectStatus = "live" | "production" | "in-development" | "in-progress";

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  deliverable: Claim;
  stack: string[];
  role: Claim;
  status: ProjectStatus;
  statusVerify?: string;
  /** true once /work/<slug> exists (Phase 2). */
  hasCaseStudy: boolean;
};

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live production",
  production: "Production",
  "in-development": "In development",
  "in-progress": "In progress",
};

export const projects: Project[] = [
  {
    slug: "nshuttle",
    name: "NShuttle",
    category: "Commerce",
    summary: "Shuttle booking web app with online seat booking and Paystack payments.",
    deliverable: unverified(
      "Cut the booking flow from 8 steps down to 4–5.",
      "Step counts came from the mockup. Confirm the real before/after.",
    ),
    stack: ["Next.js", "NestJS", "MongoDB", "Redis", "Paystack"],
    role: unverified("Built end to end", "Confirm your role on NShuttle."),
    status: "live",
    statusVerify: "Confirm NShuttle is live in production.",
    hasCaseStudy: true,
  },
  {
    slug: "smartbiotrack",
    name: "SmartBioTrack",
    category: "Enterprise",
    summary: "Multi-tenant biometric and geo-fenced attendance platform.",
    // Tests: 329 API unit + 196 e2e + 617 web = 1,142 (SmartBioTrack memory, 3 Nov 2026).
    deliverable:
      "Led a team of three. Closed 28 of 32 security-review findings, including every urgent one. 1,100+ automated tests.",
    stack: ["NestJS", "Next.js", "PostgreSQL", "Prisma"],
    role: "Team lead & backend lead",
    status: "in-development",
    hasCaseStudy: true,
  },
  {
    slug: "novo-admin",
    name: "Novo Admin",
    category: "Internal tooling",
    summary: "Admin dashboard for routes, schedules and bookings on the Novo shuttle platform.",
    // 11 screens confirmed: page.tsx files under Admin Novo/src/app/(app), 10 Nov 2026.
    deliverable: unverified(
      "11 dashboard screens, 47 API endpoints, role-based access.",
      "11 screens is confirmed from the repo. The 47 endpoints and role-based access came from the mockup.",
    ),
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: unverified("Built end to end", "Confirm your role on Novo Admin."),
    status: "production",
    statusVerify: "Confirm Novo Admin is in production.",
    hasCaseStudy: false,
  },
  {
    slug: "auth-system",
    name: "Auth System",
    category: "Security infra",
    summary: "Authentication service built as a personal project.",
    deliverable: unverified(
      "Refresh-token rotation, TOTP two-factor auth, per-session revocation.",
      "This project came entirely from the mockup. Confirm it exists and what it does.",
    ),
    stack: ["NestJS", "PostgreSQL", "Prisma", "Redis"],
    role: "Personal project",
    status: "in-progress",
    hasCaseStudy: false,
  },
];

export const about: { label: string; body: Claim }[] = [
  {
    label: "Current role",
    body: "Team Lead and Backend Lead at Elonatech Nigeria Limited, shipping production platforms from the database up to the interface.",
  },
  {
    label: "Leadership & mentorship",
    body: "Leads a small engineering team and sets its review, testing and security standards. Mentors junior developers on the same workflow.",
  },
  {
    label: "Academic foundation",
    body: unverified(
      "B.Eng. in Computer Engineering, Covenant University.",
      "Degree and university came from the mockup. Confirm both.",
    ),
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "REST APIs"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Prisma", "Redis"] },
  { group: "Practice & tools", items: ["Jest", "GitHub Actions", "Docker", "Paystack"] },
];

export const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
