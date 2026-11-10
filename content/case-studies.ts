/**
 * Case-study pages (/work/<slug>). Same honesty rule as site.ts: anything not
 * confirmed is wrapped in `unverified(...)` and shows a VERIFY tag on the page.
 *
 * Sources for NShuttle (checked 10 Nov 2026):
 * - Enoch's own account: sole developer, live, still maintained, the client story, the subdomain decision
 * - "Technical Documentation For NShuttle" (Elonatech, 9 Nov 2026): rider journey, static export,
 *   up to 6 passengers, 15-minute reservations, Paystack popup, main-site handoff
 * - nshuttle repo: sitemap base URL, git history dates
 * - novo-backend-api docs/CACHING.md and Novo project memory: caching rules, schedule delete guard,
 *   plan/base-price validation
 *
 * PRIVACY: NShuttle's code belongs to Elonatech and must not appear on this site. Describe, never paste.
 *
 * Left out on purpose. Not built, per the 9 Nov technical doc: weekly/monthly passes for riders,
 * interactive seat selection, email verification in the app. Invented by the Stitch mockup:
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
    // Sources: Enoch's own account (10 Nov 2026) and "Technical Documentation For NShuttle"
    // (9 Nov 2026, Elonatech). NShuttle's code and repo are Elonatech's and must NOT be shown:
    // describe what it does, never paste its code.
    slug: "nshuttle",
    eyebrow: "Shuttle booking // Novo",
    title: "NShuttle",
    tagline:
      "Shuttle booking for Novo's scheduled routes. Riders sign up, search a route and date, pick a departure, add passengers and pay with Paystack, all on its own subdomain, nshuttle.novo.ng.",
    live: { href: "https://nshuttle.novo.ng" },
    facts: [
      {
        label: "Role",
        value: "Sole developer",
        detail: "Product thinking, system design, frontend and backend. Still maintain it",
      },
      {
        label: "Timeline",
        value: "Jun – Sep 2026",
        detail: "Built over the summer; live and maintained since",
      },
      {
        label: "Tech stack",
        value: "Next.js 16 / NestJS 11",
        detail: "TypeScript, MongoDB, Redis (Upstash), Paystack",
      },
      {
        label: "Built for",
        value: "Novo, via Elonatech",
        detail: "Client work. Elonatech owns the software, so the code stays private",
      },
    ],
    flow: {
      label: "Rider journey",
      steps: [
        { title: "Sign up & sign in", body: "Create an account or sign in. Password rules are checked live as the rider types." },
        { title: "Search a route", body: "Pick from and to cities and a date, one-way or round trip. Results show the seats still available." },
        { title: "Pick a departure", body: "Choose a time. \"Sold out\" trips are disabled and the last few seats are flagged." },
        { title: "Passenger details", body: "Up to six passengers, each with a name, email and a valid Nigerian phone number." },
        { title: "Pay with Paystack", body: "Seats are held for 15 minutes. Card details go only into Paystack's own popup, never through our servers." },
        { title: "My bookings", body: "Every booking and its status, on any device the rider signs in from." },
      ],
    },
    sections: [
      {
        id: "problem",
        title: "The problem",
        aside: { label: "Client", value: "Novo, via Elonatech" },
        paragraphs: [
          "Novo wanted shuttle booking for its own selected routes, in the spirit of Shuttler, and came to Elonatech for it. I was already maintaining Novo's main website, so the work came to me.",
          "The brief was unclear at first. I took my questions to our MD, and we set up a walkthrough with Novo where their MD was present. That one meeting cleared about 90% of the open questions, and the build could start on firm ground.",
        ],
      },
      {
        id: "built",
        title: "What I built",
        aside: { label: "Scope", value: "Sole developer, end to end" },
        paragraphs: [
          "I was the only developer, from system design to deployment, and I still maintain it. The rider app works with the shared Novo API, and Novo's staff set up the routes, schedules and fares it sells from the admin dashboard.",
        ],
        cards: [
          {
            title: "Rider app",
            body: "Next.js 16, exported as a static site. Sign-up, password reset, route search with round trips, checkout, bookings and profile.",
          },
          {
            title: "Booking & payment",
            body: "Reservations that hold seats for 15 minutes, Paystack payment, and booking status from reserved through paid, expired and refunded.",
          },
          {
            title: "Main-site handoff",
            body: "The shuttle form on Novo's main website hands the search to NShuttle, which skips straight to results.",
          },
        ],
      },
      {
        id: "architecture",
        title: "Key decisions",
        aside: { label: "Engineering focus", value: "Correct first, then fast" },
        paragraphs: [
          "Most of these are about one thing: a rider must never pay for a seat that isn't there, or be told they paid when they didn't.",
        ],
        decisions: [
          {
            title: "A separate app on its own subdomain",
            tag: "Architecture",
            body: "Rather than rework Novo's whole business website for one new feature, I proposed NShuttle as a separate app on nshuttle.novo.ng. The main site stays as it is and simply hands a rider's search across, so each can change without breaking the other.",
          },
          {
            title: "The browser never decides a payment",
            tag: "Payments",
            body: "The app asks the backend to start a payment, opens Paystack's popup, and then shows whatever the backend reports. Card details stay inside Paystack, and an unpaid reservation simply expires and releases its seats.",
          },
          {
            title: "Never cache live seat availability",
            tag: "Correctness",
            body: "Route lists are cached for 5 minutes and admin lists for 30 seconds, but the per-date seat search is deliberately left uncached, so a rider never sees a seat that is already gone.",
          },
          {
            title: "A cache that can fail without breaking anything",
            tag: "Resilience",
            body: "Redis sits in front of MongoDB and the paid Google Maps API to keep the API within its hosting budget. Every cache call falls back to the database on error, so a Redis outage removes the speed-up but never fails a request.",
          },
          {
            title: "Guards that came from a real crash",
            tag: "Data integrity",
            body: "Deleting a schedule once left bookings pointing at nothing and crashed a rider's bookings page. Schedules with live bookings can no longer be deleted, and each route's single-trip fare is checked against its base price on every save.",
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
 * PRIVACY: SmartBioTrack's code belongs to Elonatech and must not appear on this site.
 * The row-lock decision is described in words only (code snippet removed 10 Nov 2026).
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
