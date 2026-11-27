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
  // Headline chosen by Enoch (content brief, 25 Nov 2026).
  headline: {
    before: "Turning complex problems into",
    highlight: "practical software",
    after: "solutions.",
  },
  intro:
    "I'm a full stack developer in Lagos. I work through the whole job: understanding the problem, designing how the parts fit together, building the interface and the API behind it, and keeping it running once it's live.",
  /**
   * Headshot in public/. width/height are the file's real pixel size; the About frame takes
   * its shape from them, so a square photo gets a square frame and nothing is cropped away.
   */
  photo: { src: "/enoch-enebeli-portrait-square.jpg", width: 810, height: 810 } as {
    src: string;
    width: number;
    height: number;
  } | null,
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

export type ProjectStatus = "live" | "production" | "in-development" | "in-progress" | "private";

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
  private: "Private codebase",
};

/**
 * Order of the case studies and of their "next project" links.
 *
 * Novo is ONE platform with three apps (business website, NShuttle, staff dashboard), told in
 * one case study. The staff dashboard is private to the client: no screenshots, no address,
 * no link, ever. SmartBioTrack is described as a product only: no dates, phases, progress,
 * test counts, review findings, team details or places (Enoch, 16 Nov 2026).
 */
export const projects: Project[] = [
  {
    slug: "novo",
    name: "Novo",
    summary:
      "A live transport and logistics platform: a business website, a shuttle-booking app and a private staff dashboard, all on one NestJS API. I joined with half the frontend built, finished it, and built the backend that ties it together.",
    kind: "Transport platform · three apps, one API",
    // Enoch, 16 Nov 2026: sole developer, not "lead". Started Oct 2025 (CV).
    role: "Sole developer",
    year: "2025 – now",
    stack: ["Next.js", "NestJS", "MongoDB", "Redis", "Paystack", "SendGrid"],
    status: "live",
    cover: { src: "/screens/novo-cover.png", width: 1326, height: 796 },
  },
  {
    slug: "smartbiotrack",
    name: "SmartBioTrack",
    summary:
      "A multi-tenant attendance platform where every company's data is kept apart, sessions are hard to steal, and two taps can never record two clock-ins.",
    kind: "Attendance platform",
    role: "Backend lead",
    stack: ["NestJS", "Next.js", "PostgreSQL", "Prisma"],
    status: "private",
  },
  {
    slug: "auth-system",
    name: "Auth System",
    summary:
      "A personal project: an authentication API built to understand what really happens behind sign-in, with token rotation, two-factor codes and sessions you can revoke.",
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
 * How the home page groups the work: Novo as the one flagship (its three apps named inside
 * the card, all covered by the one case study), then the other two featured projects.
 */
export const homeWork = {
  flagship: "novo",
  surfaces: [
    { label: "Business website", text: "Where every Novo service is presented and booked." },
    { label: "NShuttle", text: "The rider app: search a route, hold seats, pay with Paystack." },
    { label: "Staff dashboard", text: "Private. Where staff handle every request and booking." },
  ],
  featured: ["smartbiotrack", "auth-system"],
} as const;

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
      "Private staff dashboard for Novo's team",
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

/**
 * About, first person. Built from Enoch's own draft (content brief, 25 Nov 2026), lightly
 * edited for flow. The three lessons and the four-step approach are his.
 */
export const aboutStory: string[] = [
  "I'm Enoch Enebeli, a software developer who enjoys exploring ideas, understanding problems and building solutions that work.",
  "My work has taken me across most layers of a product: interfaces and user experience, backend systems and APIs, and the architecture that ties them together. I enjoy understanding how the parts of a product fit, and finding practical ways to make them work as one.",
  "I believe good engineering isn't just writing code that works. It's understanding why something needs to exist, making technical decisions on purpose, and building something that stays reliable long after the first release.",
  "Being the only developer on a live transport platform taught me three things. Ownership: the job doesn't end at deployment; it includes everything that happens after. Architecture: every technical choice has consequences, and the product has to be able to grow on top of it. And uncertainty: requirements change, information is incomplete, and live systems break in ways nobody predicted, but a sound decision still has to be made.",
  "Today I keep exploring different areas of software engineering, taking on meaningful challenges, and building products that solve real problems.",
];

/** How Enoch usually starts a project. A habit, not a method. */
export const approach: { title: string; body: string }[] = [
  { title: "Understand the problem", body: "Who it is for, what goes wrong today, and what \"working\" has to mean." },
  { title: "Design how it fits", body: "The architecture, and how the parts should talk to each other." },
  { title: "Build it", body: "Interface, API and data, with the rules kept on the server." },
  { title: "Refine it", body: "As the product and its requirements become clearer." },
];

/**
 * The kinds of problems Enoch solves, each backed by work described on this site.
 * `where` names the project the evidence comes from.
 */
export const capabilities: { title: string; evidence: string; where: string }[] = [
  {
    title: "Full-stack product development",
    evidence:
      "Took over a half-built frontend, finished it, and built the API that the business website, a shuttle-booking app and a staff dashboard all share.",
    where: "Novo",
  },
  {
    title: "Backend and API architecture",
    evidence:
      "One NestJS API decides every price, seat count and booking status for three apps, so changing a rule once changes it everywhere, and a tampered browser can't change what a trip costs.",
    where: "Novo",
  },
  {
    title: "Payments and transaction workflows",
    evidence:
      "Paystack payments confirmed on the server and by webhook, seats held for 15 minutes while a rider pays, and booking statuses that move only on payment events.",
    where: "Novo · NShuttle",
  },
  {
    title: "Authentication and application security",
    evidence:
      "Sessions designed to resist theft, company data kept strictly apart on a multi-tenant platform, and a personal project on token rotation and two-factor sign-in.",
    where: "SmartBioTrack · Auth System",
  },
  {
    title: "Data integrity and production debugging",
    evidence:
      "Clock-ins that can't be recorded twice, seat availability that is never served from cache, and live bugs traced to their cause: a seat counted twice, dates parsed without a time zone, and a sign-in race in a dashboard.",
    where: "SmartBioTrack · Novo",
  },
];

/**
 * Work history, newest first. Matches the CV (cv/cv-content.cjs) role for role and date for date.
 * Clover Tech: role and general frontend work only. Enoch does not want the product described
 * publicly (25 Nov 2026).
 */
export const experience: { role: string; company: string; period: string; summary: string }[] = [
  {
    role: "Lead Full Stack Software Developer",
    company: "Elonatech Nigeria Limited",
    period: "Oct 2025 – Present",
    summary:
      "Sole developer of Novo's transport platform: finished its half-built frontend and built the API behind its three apps. Backend lead on a multi-tenant attendance platform, reporting progress to non-technical management. I also lead a small team and mentor junior developers.",
  },
  {
    role: "Front-End Developer (Remote)",
    company: "Clover Tech",
    period: "Aug 2024 – Nov 2024",
    summary: "Built React and Tailwind CSS interfaces, forms and sign-in flows in a remote team with designers and backend developers.",
  },
  {
    role: "Web Development Instructor",
    company: "New Horizons System Solutions",
    period: "Jan 2024 – Nov 2024",
    summary:
      "Taught HTML, CSS and JavaScript to more than 20 students through projects they built themselves, debugging their code live so they could see how a problem is found, not just fixed.",
  },
  {
    role: "Frontend Developer Intern",
    company: "Excite Panacea Limited",
    period: "Aug 2022 – Sep 2022",
    summary: "Refined responsive interfaces with Bootstrap and JavaScript.",
  },
  {
    role: "Software Developer & QA Intern",
    company: "PayedIn International Limited",
    period: "Mar 2022 – Aug 2022",
    summary:
      "Started by building Vue.js interface features through reviewed pull requests, then moved into QA: writing and running manual and regression tests, and verifying fixes with the developers.",
  },
];

export const education = {
  degree: "B.Eng., Computer Engineering",
  school: "Covenant University",
  period: "2018 – 2023",
  detail: "Second Class Upper (2:1), CGPA 3.66/5.0",
};

/**
 * Skills by how well Enoch knows them, not as a wall of logos (brief, 25 Nov 2026).
 * Core: what he works with every day. Used: real projects. Familiar: limited experience,
 * deliberately not presented as strengths. No ratings, percentages or years.
 */
export const skills: { tier: string; note: string; groups: { area: string; items: string[] }[] }[] = [
  {
    tier: "Core",
    note: "Technologies I work with most confidently",
    groups: [
      { area: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { area: "Backend", items: ["NestJS", "Node.js", "Express", "REST APIs"] },
      { area: "Databases", items: ["MongoDB", "PostgreSQL"] },
    ],
  },
  {
    tier: "Used in projects",
    note: "In production work or on this site",
    groups: [
      { area: "Frontend", items: ["JavaScript", "HTML5", "CSS3", "Vue.js"] },
      { area: "Data", items: ["Prisma", "Mongoose", "Redis"] },
      { area: "Payments & email", items: ["Paystack", "Stripe", "Flutterwave", "Resend"] },
      { area: "Motion", items: ["Motion", "GSAP", "Lenis"] },
      { area: "Tools", items: ["Git", "GitHub", "Vercel", "pnpm", "Postman"] },
    ],
  },
  {
    tier: "Familiar with",
    note: "Some hands-on experience",
    groups: [
      // Used in production at Novo, but Enoch rates his familiarity as limited (27 Nov 2026).
      { area: "Production exposure", items: ["SendGrid (transactional email at Novo)"] },
      { area: "Limited", items: ["React Native", "Zod", "Jest", "class-validator"] },
    ],
  },
];

export const nav = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;
