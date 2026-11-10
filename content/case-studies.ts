/**
 * Case-study pages (/work/<slug>). Same honesty rule as site.ts: anything not
 * confirmed is wrapped in `unverified(...)` and shows a VERIFY tag on the page.
 *
 * Sources for NShuttle (checked 10 Nov 2026):
 * - nshuttle repo: routes (/routes, /checkout, /my-plan), sitemap base URL, git history dates
 * - Admin Novo repo: 11 dashboard pages under src/app/(app)
 * - novo-backend-api: src/common/cache/cache.service.ts, docs/CACHING.md
 * - Novo project memory: schedule delete guard, plan/base-price validation, Paystack inline checkout
 *
 * Left out on purpose — invented by the Stitch mockup, not supported by anything above:
 * -48% time to ticket, 99.4% payment success, <800ms 3G loads, 12,000+ tickets,
 * "38% of sales vanished", Redis seat locks, USSD/NIP transfers, offline signed QR passes,
 * SMS/WhatsApp passes, Mixpanel chart, "3 months (2024)", Prisma.
 */

import { type Claim, unverified } from "./site";

export type Fact = { label: string; value: Claim; detail: string };
export type Step = { title: string; body: string };
export type Card = { title: string; body: string; tag?: string };
export type Snippet = { caption: string; file: string; code: string };

export type CaseSection = {
  id: string;
  title: string;
  /** Short mono callout under the section title (desktop only, as in the mockup). */
  aside?: { label: string; value: string };
  paragraphs: Claim[];
  cards?: Card[];
  /** Numbered decision panels ("DECISION_01 // ..."). */
  decisions?: (Card & { snippet?: Snippet })[];
};

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  tagline: string;
  live?: { href: string; verify?: string };
  facts: Fact[];
  flow?: { label: string; steps: Step[] };
  sections: CaseSection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nshuttle",
    eyebrow: "Shuttle booking // Novo",
    title: "NShuttle",
    tagline:
      "Rider-facing web app for booking scheduled shuttle trips, buying single, weekly or monthly plans, and paying with Paystack, backed by a NestJS API and an admin dashboard.",
    live: {
      href: "https://nshuttle.novo.ng",
      verify: "Domain taken from the app's own sitemap. Confirm it is live and public.",
    },
    facts: [
      {
        label: "Role",
        value: unverified("Full stack developer", "Confirm your role on NShuttle."),
        detail: "Rider app, admin dashboard and API",
      },
      {
        label: "Timeline",
        value: "Jun – Sep 2026",
        detail: "First commit 25 Jun, latest release 7 Sep",
      },
      {
        label: "Tech stack",
        value: "Next.js 16 / NestJS 11",
        detail: "TypeScript, MongoDB, Redis (Upstash), Paystack",
      },
      {
        label: "Deliverable",
        value: "Three apps, one API",
        detail: "Rider app, 11-screen admin dashboard, shared backend",
      },
    ],
    flow: {
      label: "Rider flow",
      steps: [
        { title: "Search routes", body: "Pick origin, destination and date. Results show live seat availability for each scheduled trip." },
        { title: "Choose a plan", body: "Book a single trip, or a weekly or monthly plan priced per route." },
        { title: "Pay with Paystack", body: "Checkout runs in Paystack's inline popup, so the rider never leaves the app." },
        { title: "Manage trips", body: "\"My plan\" lists every booking and its status: reserved, paid or refund pending." },
      ],
    },
    sections: [
      {
        id: "problem",
        title: "The problem",
        paragraphs: [
          unverified(
            "Novo runs scheduled shuttle routes and needed riders to book and pay for seats online, while staff managed routes, fares and bookings from one place instead of by hand.",
            "Placeholder framing. Describe the real problem in your own words: who booked how, and what went wrong.",
          ),
        ],
      },
      {
        id: "built",
        title: "What I built",
        aside: { label: "Scope", value: "Rider app + admin + API" },
        paragraphs: [
          "Three separate applications sharing one backend: the rider app where people book and pay, an admin dashboard where staff run the service, and a NestJS API behind both.",
        ],
        cards: [
          {
            title: "Rider app",
            body: "Next.js 16. Route search, plan selection, Paystack checkout, \"My plan\" and account pages.",
          },
          {
            title: "Admin dashboard",
            body: "11 screens covering schedules and fares, bookings, payments, cars, subscribers and airport transfers.",
          },
          {
            title: "NestJS API",
            body: "MongoDB via Mongoose, Paystack payments and verification, email notifications and a Redis cache.",
          },
        ],
      },
      {
        id: "architecture",
        title: "Key decisions",
        aside: { label: "Engineering focus", value: "Correct first, then fast" },
        paragraphs: [
          "The backend runs on Render with a fixed resource budget, so it caches aggressively, but never anywhere a stale answer would cost a rider a seat or money.",
        ],
        decisions: [
          {
            title: "A cache that can fail without breaking anything",
            tag: "Resilience",
            body: "Redis (Upstash) sits in front of MongoDB and the paid Google Maps API. Every cache call catches its own errors and falls back to a cache miss, so a Redis outage removes the speed-up but never fails a request.",
          },
          {
            title: "Never cache live seat availability",
            tag: "Correctness",
            body: "Route lists are cached for 5 minutes and admin lists for 30 seconds, but the per-date seat search is deliberately left uncached, so a rider never sees a seat that is already gone.",
          },
          {
            title: "Only cache payments that are final",
            tag: "Payments",
            body: "Paystack verification results are cached for 10 minutes, and only when the status is \"success\". A pending or failed payment is always checked again.",
          },
          {
            title: "Guards that came from a real crash",
            tag: "Data integrity",
            body: "Deleting a schedule once left bookings pointing at nothing and crashed the rider's plan page. Schedules with reserved, paid or refund-pending bookings now cannot be deleted, and a route's single-trip price is validated against its base fare on every create and update.",
          },
        ],
      },
    ],
  },
];

/*
 * SmartBioTrack sources (checked 10 Nov 2026): SmartBioTrack project memory
 * (where-we-are, phase-2-complete-history, phase-3-attendance-plan) and
 * apps/api/src/attendance/attendance.service.ts in the Elonatech/Smart-Bio-Track repo.
 * Test count as of 3 Nov 2026: 329 API unit + 196 e2e + 617 web = 1,142.
 *
 * Kept off this public page on purpose: teammates' names, infrastructure URLs and
 * database names, and the detail of the review findings that are still open.
 * The code snippet is Elonatech's: confirm the company is happy for it to be public.
 */
caseStudies.push({
  slug: "smartbiotrack",
  eyebrow: "Attendance platform // Elonatech",
  title: "SmartBioTrack",
  tagline:
    "Multi-tenant attendance platform: staff clock in and out on the web, and the system works out lateness, overtime and absences under each company's own rules. Biometric and geo-fence checks come next.",
  facts: [
    {
      label: "Role",
      value: "Team & backend lead",
      detail: "Team of three. Owns the platform, security and reporting to management",
    },
    {
      label: "Timeline",
      value: "Aug 2026 – now",
      detail: "Phase 3 of 8 on staging since 27 Oct",
    },
    {
      label: "Tech stack",
      value: "NestJS 11 / Next.js 16",
      detail: "Prisma 7, PostgreSQL (Neon), pnpm + Turborepo",
    },
    {
      label: "Automated tests",
      value: "1,100+",
      detail: "329 API unit, 196 end-to-end, 617 web (3 Nov 2026)",
    },
  ],
  flow: {
    label: "An attendance day",
    steps: [
      { title: "Clock in", body: "Server time only, never the device's. Location is recorded on every punch, ready for geo-fencing." },
      { title: "Breaks", body: "Several work sessions a day are allowed. Breaks are subtracted as unpaid time, in one place in the code." },
      { title: "Clock out", body: "A forgotten clock-out is left open and flagged for review. The system never invents a punch." },
      { title: "Day closes", body: "An hourly job closes each day in the company's own time zone, marking absences and incomplete days." },
    ],
  },
  sections: [
    {
      id: "problem",
      title: "The problem",
      paragraphs: [
        unverified(
          "Companies need attendance records they can pay from: who came in, when, how late, how much overtime, worked out the same way every time and under each company's own rules.",
          "Placeholder framing. Describe the real problem in your own words.",
        ),
      ],
    },
    {
      id: "role",
      title: "What I led",
      aside: { label: "Team", value: "Backend, frontend, me" },
      paragraphs: [
        "I lead a team of three as backend lead. I own the platform and security work, review every backend change before it merges, and write the progress reports that go to management.",
      ],
      cards: [
        {
          title: "Auth & tenancy",
          body: "Company sign-up, invitations, four roles, departments and offices, with every query scoped to the caller's company.",
        },
        {
          title: "Attendance engine",
          body: "Clock in and out, breaks, daily summaries, lateness, overtime, work rules, holidays and the end-of-day job.",
        },
        {
          title: "Delivery",
          body: "Eight-phase roadmap, an end-to-end test gate on every HTTP change, and plain-English reports to management.",
        },
      ],
    },
    {
      id: "review",
      title: "Security review",
      aside: { label: "Result", value: "28 of 32 closed" },
      paragraphs: [
        "When the authentication phase met its done bar, I ran a consultant-style review of our own code before building on it: 32 findings, 28 closed, including every urgent one. The automated test suite grew from 87 to 758 tests over that work.",
      ],
      cards: [
        {
          title: "Tokens out of reach",
          body: "Refresh token moved to an httpOnly cookie and the access token kept in memory, with refresh-token reuse detection.",
        },
        {
          title: "No account probing",
          body: "Identical login errors with equalised timing (a decoy hash), plus per-account lockout after repeated failures.",
        },
        {
          title: "Isolation on the server",
          body: "Team leads once received the whole company's user list, filtered only in the browser. Scoping now happens in the API.",
        },
      ],
    },
    {
      id: "decisions",
      title: "Key decisions",
      aside: { label: "Engineering focus", value: "Records you can pay from" },
      paragraphs: [
        "Attendance data ends up in payroll, so the design favours records that can't drift: append-only events, derived summaries, and a lock wherever two requests could race.",
      ],
      decisions: [
        {
          title: "One lock stops the double clock-in",
          tag: "Concurrency",
          body: "A double tap or two open tabs could both read \"not clocked in\" and both insert. Each punch now locks the user's row inside the transaction and reads the clock after the lock, so the second request waits and punches stay in order.",
        },
        {
          title: "Punches are facts, summaries are derived",
          tag: "Integrity",
          body: "Clock events are append-only. Daily summaries are computed by a pure function from those events, so any day can be rebuilt and checked.",
        },
        {
          title: "Each company keeps its own time",
          tag: "Correctness",
          body: "Times are stored in UTC, and each company's days are worked out in its own time zone, defaulting to Africa/Lagos.",
        },
        {
          title: "Prove every guard by breaking it",
          tag: "Testing",
          body: "Each protection is tested by removing it and watching a test fail. Removing the company-ownership check, for example, let another company's work rule attach to an office. A test now fails if that check ever goes.",
        },
      ],
    },
  ],
});

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
