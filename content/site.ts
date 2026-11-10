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
  /** Headshot in public/ (1023×1537 portrait). null shows a placeholder frame. */
  photo: "/enoch-enebeli.png" as string | null,
  /** Put the CV PDF in public/ and set this to "/<file>.pdf". null disables the Download CV buttons. */
  cv: null as string | null,
  copyrightYear: 2026,
};

export const contact = {
  // Confirmed: SmartBioTrack project memory records the git identity IronMagistrate / this address.
  email: "enochenebeli@gmail.com" as Claim,
  links: [
    {
      // Confirmed by Enoch, 10 Nov 2026.
      label: "LinkedIn",
      handle: "in/enoch-enebeli",
      href: "https://www.linkedin.com/in/enoch-enebeli-8165231ab/",
    },
    {
      // Confirmed 10 Nov 2026: the portfolio repo lives at github.com/IronMagistrate/Portfolio.
      // (The Stitch mockup's github.com/enochenebeli was wrong.)
      label: "GitHub",
      handle: "github.com/IronMagistrate",
      href: "https://github.com/IronMagistrate",
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
  /** Public source code, shown as a "Source" link when there is no case study. */
  repo?: string;
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
    summary: "Shuttle booking for Novo's scheduled routes: search, book seats and pay online at nshuttle.novo.ng.",
    // Confirmed by Enoch, 10 Nov 2026: sole developer, live, still maintained.
    // (The mockup's "8 steps down to 4-5" claim was never confirmed and is gone.)
    deliverable:
      "Sole developer from sign-up to Paystack payment, plus the API behind it. Live and maintained.",
    stack: ["Next.js", "NestJS", "MongoDB", "Redis", "Paystack"],
    role: "Sole developer",
    status: "live",
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
    // Confirmed by Admin Novo technical documentation (9 Nov 2026): 11 protected screens,
    // 47 backend endpoints defined, two roles (admin, super_admin), production build.
    deliverable: "11 dashboard screens, 47 API endpoints, admin and super-admin roles.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: unverified("Built end to end", "Confirm your role on Novo Admin: sole developer, or with the team?"),
    status: "production",
    hasCaseStudy: false,
  },
  {
    slug: "auth-system",
    name: "Auth System",
    category: "Security infra",
    summary: "Standalone authentication API: sign-up, email verification, sessions and two-factor sign-in.",
    // Checked against github.com/enochenebeli/auth-system (auth.controller.ts, sessions.service.ts,
    // package.json) on 10 Nov 2026: refresh rotation, TOTP 2FA (speakeasy + QR), list/revoke one or
    // all other sessions, email verification (Resend), password reset, Redis rate limit on login.
    deliverable:
      "Refresh-token rotation, TOTP two-factor auth, per-session revocation, email verification and rate-limited login.",
    stack: ["NestJS", "PostgreSQL", "Prisma", "Redis"],
    role: "Personal project",
    status: "in-progress",
    repo: "https://github.com/enochenebeli/auth-system",
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
    // Confirmed by Enoch, 10 Nov 2026.
    body: "B.Eng. in Computer Engineering, Covenant University, 2018–2023.",
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
