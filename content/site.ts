/**
 * Every fact on the site lives in this file and in case-studies.ts.
 * Edit facts here, not in components.
 *
 * HONESTY RULE: anything not confirmed is wrapped in `unverified(...)` and renders with a
 * visible "TODO" tag on the page, so a placeholder can never pass as a fact. Once the text
 * is confirmed or corrected, replace `unverified("...", "...")` with a plain string.
 *
 * PRIVACY RULE: Novo and SmartBioTrack are Elonatech's software. Describe them; never paste
 * their code, name teammates, or publish hostnames, database names or open security findings.
 * Novo's staff dashboard is private to the client: no screenshots of it and no link or
 * address for it anywhere on this site (Enoch, 16 Nov 2026). novo.ng and nshuttle.novo.ng
 * are public and may be linked.
 */

import type { PinnedStep } from "@/components/motion/PinnedSteps";

export type Claim = string | { text: string; verify: string };

/** Mark a claim as a placeholder. `why` says what is needed to finish it. */
export function unverified(text: string, why: string): Claim {
  return { text, verify: why };
}

export function claimText(claim: Claim): string {
  return typeof claim === "string" ? claim : claim.text;
}

export const profile = {
  name: "Enoch Enebeli",
  // Title given by Enoch, 16 Nov 2026.
  role: "Lead Full Stack Software Developer",
  shortRole: "Full Stack Developer",
  location: "Lagos, Nigeria",
  availability: "Open to remote full-stack roles",
  headline: {
    before: "Full stack developer building",
    highlight: "production-grade",
    after: "platforms.",
  },
  intro:
    "I design, build and ship web platforms end to end: Next.js, NestJS and TypeScript, from the backend API to the interface people actually use.",
  /** Headshot in public/ (1023×1537 portrait). null shows a placeholder frame. */
  photo: "/enoch-enebeli.png" as string | null,
  /**
   * Web edition of the CV, generated from "Enoch Enebeli CV.docx" (16 Nov 2026) with the phone
   * number left out, because this file is public. null hides the Download CV button.
   */
  cv: "/enoch-enebeli-cv.pdf" as string | null,
  copyrightYear: 2026,
};

export const contact = {
  // Confirmed active by Enoch, 16 Nov 2026 (forwards to his main inbox).
  email: "hello@enochenebeli.com",
  links: [
    {
      label: "LinkedIn",
      handle: "in/enoch-enebeli",
      href: "https://www.linkedin.com/in/enoch-enebeli-8165231ab/",
    },
    {
      label: "GitHub",
      handle: "github.com/IronMagistrate",
      href: "https://github.com/IronMagistrate",
    },
  ],
};

export type ProjectStatus = "live" | "production" | "in-development" | "in-progress";

export type Project = {
  slug: string;
  name: string;
  /** One line under the name on the card. */
  summary: string;
  /** Short mono line: what kind of thing it is. */
  kind: string;
  role: string;
  /** Omitted where dates must stay private (SmartBioTrack). */
  year?: string;
  stack: string[];
  status: ProjectStatus;
  /** Public source code, linked from the case study. */
  repo?: string;
  /**
   * Cover screenshot, shown on the home-page card and at the top of the case study.
   * width/height must be the file's real pixel size. Leave it out for projects that must
   * not be shown (SmartBioTrack, the Novo admin dashboard): they get a typographic panel.
   */
  cover?: { src: string; width: number; height: number };
};

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  production: "In production",
  "in-development": "In development",
  "in-progress": "In progress",
};

/**
 * Order here is the order on the home page and of previous/next links. Each has a case study.
 * Order set by Enoch, 16 Nov 2026: SmartBioTrack, Novo business website, NShuttle, Admin dashboard.
 *
 * SmartBioTrack is described as the finished product it is becoming: no dates, phases,
 * progress, test counts, review findings, team details or places (Enoch, 16 Nov 2026).
 * The Admin dashboard is private to Novo: no screenshots, no address, no link, ever.
 */
export const projects: Project[] = [
  {
    slug: "smartbiotrack",
    name: "SmartBioTrack",
    summary: "Multi-tenant attendance platform: every company sets its own rules, and the system works out lateness, overtime and absences.",
    kind: "Attendance platform",
    role: "Backend lead",
    stack: ["NestJS", "Next.js", "PostgreSQL", "Prisma"],
    status: "in-progress",
  },
  {
    slug: "novo",
    name: "Novo Business Website",
    summary: "The website at the centre of Novo's transport business, where every service is booked, on an API I built.",
    kind: "Business website",
    // Enoch, 16 Nov 2026: sole developer, not "lead". Started Oct 2025 (CV).
    role: "Sole developer",
    year: "2025 – now",
    stack: ["Next.js", "NestJS", "MongoDB", "Redis", "SendGrid"],
    status: "live",
    cover: { src: "/screens/novo-cover.png", width: 1326, height: 796 },
  },
  {
    slug: "nshuttle",
    name: "NShuttle",
    summary: "Novo's dedicated rider web app: search a route, book seats and pay online.",
    kind: "Booking web app",
    role: "Sole developer",
    year: "2026",
    stack: ["Next.js", "NestJS", "MongoDB", "Paystack"],
    status: "live",
    cover: { src: "/screens/nshuttle-home.png", width: 1585, height: 731 },
  },
  {
    slug: "novo-admin",
    name: "Novo Admin Dashboard",
    summary: "Novo's private staff dashboard: manage what the website shows and handle every request and booking.",
    kind: "Staff dashboard",
    role: "Sole developer",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "NestJS"],
    status: "production",
  },
  {
    slug: "auth-system",
    name: "Auth System",
    summary: "Standalone authentication API: sessions, token rotation, two-factor sign-in and email verification.",
    kind: "Personal project",
    role: "Personal project",
    year: "2026",
    stack: ["NestJS", "PostgreSQL", "Prisma", "Redis"],
    status: "in-progress",
    repo: "https://github.com/enochenebeli/auth-system",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Impact numbers for the animated counters. REAL figures only, each with its source.
 * No SmartBioTrack figures: its progress and internals stay private (16 Nov 2026).
 * - 6 services: car rentals, shuttles, fleet management, logistics, driving school, outsourcing (CV)
 * - 3 apps on 1 API: business website, NShuttle, admin dashboard (Enoch, 16 Nov 2026)
 * - 47 endpoints, 11 screens: Admin Novo technical documentation, 9 Nov 2026
 */
export const metrics: { value: number; suffix?: string; label: string; source: string }[] = [
  { value: 6, label: "Service lines on one transport platform", source: "Novo" },
  { value: 3, label: "Apps built on a single API, alone", source: "Novo" },
  { value: 47, label: "API endpoints behind one staff dashboard", source: "Novo Admin" },
  { value: 11, label: "Dashboard screens designed and built", source: "Novo Admin" },
];

/**
 * The pinned "how Novo Cars is built" walkthrough on the home page.
 * Source: the NShuttle and Admin Novo technical documentation (9 Nov 2026) and Novo project notes.
 */
export const novoArchitecture: PinnedStep[] = [
  {
    label: "Client",
    title: "Three front ends, no servers of their own",
    body: "The business website, the rider app and the staff dashboard are separate Next.js apps. The rider app and dashboard ship as static files, so there is nothing to patch or scale on the front end.",
    items: [
      "Business website, where services are booked",
      "NShuttle rider app on its own subdomain",
      "Private staff dashboard with 11 screens",
      "TypeScript and Tailwind CSS throughout",
    ],
  },
  {
    label: "API",
    title: "One NestJS API decides everything",
    body: "Every price, seat count, reservation and payment result is decided on the server. The browsers only ask and display, so a tampered client cannot change what a trip costs or mark itself paid.",
    items: [
      "NestJS 11 with validated request bodies",
      "Separate sign-in for riders and staff",
      "Paystack payments confirmed server-side",
      "Email notifications for bookings",
    ],
  },
  {
    label: "Data",
    title: "MongoDB, with a cache that is allowed to fail",
    body: "Redis sits in front of MongoDB and paid map lookups. Every cache call falls back to the database on error, and live seat availability is never cached, so a rider never sees a seat that is gone.",
    items: [
      "MongoDB through Mongoose schemas",
      "Redis cache with per-list lifetimes",
      "Live seat search always read fresh",
      "Schedules with bookings cannot be deleted",
    ],
  },
  {
    label: "Deploy",
    title: "Static hosting in front, one API behind",
    body: "The front ends are uploaded as static builds to ordinary web hosting on Novo's own domain. The API runs as a single hosted service, and the rider app wakes it early so a first request does not time out.",
    items: [
      "Static builds on Novo's domain and subdomains",
      "One hosted API service",
      "Health ping to wake an idle API",
      "Environment values fixed at build time",
    ],
  },
];

export const about: { label: string; body: string }[] = [
  {
    label: "Now",
    body: "Lead Full Stack Software Developer at Elonatech Nigeria Limited, shipping production platforms from the database up to the interface.",
  },
  {
    label: "Leading",
    body: "I lead a small engineering team and set its review, testing and security standards, and I mentor junior developers on the same workflow.",
  },
  {
    label: "Education",
    body: "B.Eng. in Computer Engineering, Covenant University, 2018–2023. Second Class Upper (2:1).",
  },
];

/** Work history, newest first. Taken from Enoch's CV (16 Nov 2026), shortened, nothing added. */
export const experience: { role: string; company: string; period: string; summary: string }[] = [
  {
    role: "Full Stack Developer",
    company: "Elonatech Nigeria Limited",
    period: "Oct 2025 – now",
    summary:
      "Sole developer on the Novo Cars platform: frontend architecture, the NestJS API, Paystack payments and transactional email.",
  },
  {
    role: "Front-End Developer (remote)",
    company: "Clover Tech",
    period: "Aug – Nov 2024",
    summary: "Built a two-sided medical appointment booking platform for patients and doctors with React and Tailwind CSS.",
  },
  {
    role: "Web Development Instructor",
    company: "New Horizons System Solutions",
    period: "Jan – Nov 2024",
    summary: "Taught HTML, CSS and JavaScript to 20+ students through project-based lessons and debugging sessions.",
  },
  {
    role: "Software Developer & QA Intern",
    company: "PayedIn International Limited",
    period: "Mar – Aug 2022",
    summary: "Built Vue.js interface features under senior review, then wrote and ran manual test scripts and regression tests.",
  },
];

// From the CV's Technical Skills (16 Nov 2026). PostgreSQL, Prisma and Redis are not on the CV
// but are confirmed by the SmartBioTrack and Auth System code.
export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Vue.js"] },
  { group: "Backend", items: ["NestJS", "Node.js", "Express", "REST APIs", "JWT auth"] },
  { group: "Data", items: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma", "Redis"] },
  { group: "Payments & email", items: ["Paystack", "Stripe", "Flutterwave", "SendGrid"] },
];

export const nav = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;
