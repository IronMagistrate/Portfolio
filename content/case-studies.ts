/**
 * Case-study pages (/work/<slug>). One entry per project in site.ts, same slug.
 * Every study has: problem, role, architecture, outcome, screens; Novo also has the platform's
 * three apps, the rider journey and the production problems solved.
 *
 * HONESTY: placeholders are wrapped in `unverified(...)` and show a visible TODO tag.
 * PRIVACY: Novo and SmartBioTrack are Elonatech's software. Describe, never paste code;
 * no teammates' names, hostnames, database names or open security findings.
 *
 * Sources (checked 10–25 Nov 2026):
 * - Novo (business website, NShuttle, staff dashboard): Enoch's own account, his CV and
 *   Elonatech's technical documentation. One case study since 25 Nov 2026; the old
 *   /work/nshuttle and /work/novo-admin addresses redirect here (next.config.ts).
 * - SmartBioTrack: Enoch's own account. This repo is public, so comments follow the same
 *   privacy rule as page text: no dates, progress, counts or internal details.
 * - Auth System: public repo github.com/enochenebeli/auth-system, read 10 Nov 2026.
 *
 * Never carried over from the original Stitch mockup (invented): -48% time to ticket,
 * 99.4% payment success, <800ms 3G loads, 12,000+ tickets, Redis seat locks, USSD/NIP
 * transfers, offline QR passes, weekly/monthly rider passes, seat selection.
 */

// Add `unverified` to this import again if a placeholder is ever needed.
import { type Claim } from "./site";

export type Fact = { label: string; value: string; detail: string };
export type Step = { title: string; body: string };
export type Card = { title: string; body: string };
export type Decision = Card & { tag: string };
/** One app of a multi-app platform. `link` only for public apps. */
export type Surface = { name: string; body: string; link?: { label: string; href: string } };
/** A screenshot slot. Leave `src` out until a real capture exists in public/. */
export type Screen = { caption: string; src?: string; width?: number; height?: number };

export type CaseStudy = {
  slug: string;
  tagline: string;
  /** Public URL of the product, if it has one. */
  live?: string;
  facts: Fact[];
  problem: Claim[];
  /** The apps that make up the product, when there is more than one. */
  surfaces?: Surface[];
  role: { summary: string; areas: Card[] };
  /** Optional step-by-step of the main user journey. */
  flow?: { label: string; steps: Step[] };
  architecture: { summary: string; decisions: Decision[] };
  /** Real problems found and fixed. Only ones Enoch has confirmed. */
  challenges?: Card[];
  outcome: { summary: Claim; points: string[] };
  screens: Screen[];
};

export const caseStudies: CaseStudy[] = [
  {
    // Enoch, 16 Nov 2026: three parts. (1) Business page novo.ng. (2) NShuttle, the rider
    // web app. (3) Staff dashboard: PRIVATE. No screenshots, no address, no link, ever.
    // Role: sole developer. Took over with about half the frontend built; built the whole API.
    slug: "novo",
    tagline:
      "Novo is a Nigerian transport company, and its platform is three apps on one API. I joined as its only developer with about half of the frontend built, finished it, and built the backend that brings the whole platform together.",
    live: "https://novo.ng",
    facts: [
      {
        label: "Role",
        value: "Sole developer",
        detail: "Finished the half-built frontend and built the entire backend API",
      },
      { label: "Client", value: "Novo, via Elonatech", detail: "Transport and logistics, Nigeria" },
      { label: "Platform", value: "Three apps, one API", detail: "Business website, NShuttle rider app, private staff dashboard" },
      { label: "Stack", value: "Next.js / NestJS", detail: "TypeScript, MongoDB, Redis, Paystack, SendGrid" },
    ],
    problem: [
      "Novo runs six service lines at once: car rentals, shuttle services, fleet management, logistics, a driving school and staff outsourcing. When I joined in October 2025, about half of the business website's frontend had been built, there was no backend behind it, and nothing was finished.",
      "Every booking request reached staff by email, so a lost email meant a lost request. Then Novo asked for something new: commuters booking and paying for seats on scheduled shuttle routes, where a rider must never pay for a seat that isn't there, or be told they paid when they didn't.",
    ],
    surfaces: [
      {
        name: "Business website",
        body: "Where every Novo service is presented and every booking request is made. I completed the half-built frontend and connected it to the new API.",
        link: { label: "novo.ng", href: "https://novo.ng" },
      },
      {
        name: "NShuttle",
        body: "The rider-facing shuttle booking app on its own subdomain, which I designed and built: sign up, search a route, hold seats, pay with Paystack and see every booking.",
        link: { label: "nshuttle.novo.ng", href: "https://nshuttle.novo.ng" },
      },
      {
        name: "Staff dashboard",
        body: "Private to Novo's staff, so it is described here but never shown. Staff manage what the website shows, set up routes, schedules and fares, and find every request and booking, even when a notification email never arrived.",
      },
    ],
    role: {
      summary:
        "I am the sole developer. I completed the frontend I inherited, built NShuttle and the staff dashboard, and designed and built the NestJS API that all three depend on. I still maintain the platform.",
      areas: [
        {
          title: "Shared API",
          body: "One NestJS API for all three apps: sign-in and permissions for riders and staff, bookings, schedules, payments and notifications.",
        },
        {
          title: "Payments",
          body: "Paystack checkout, webhook handling and server-side verification, with booking statuses (pending, paid, expired, refunded) driven by payment events.",
        },
        {
          title: "Notifications",
          body: "Transactional email for every service, including confirmations to every passenger on a shuttle booking.",
        },
        {
          title: "Production support",
          body: "Diagnosing and fixing live issues across sign-in, scheduling, booking and payments, then adding guards so they can't come back.",
        },
      ],
    },
    flow: {
      label: "Booking a shuttle seat",
      steps: [
        { title: "Search a route", body: "From, to and a date, one-way or round trip. Seat availability is read live on every search, never from cache." },
        { title: "Pick a departure", body: "Sold-out trips are disabled and the last few seats are flagged." },
        { title: "Add passengers", body: "Up to six, each with a name, email and a valid Nigerian phone number." },
        { title: "Hold the seats", body: "The seats are reserved for 15 minutes, so nobody else can take them while the rider pays." },
        { title: "Pay with Paystack", body: "Card details go only into Paystack's own popup, never through our servers." },
        { title: "Verify on the server", body: "The API confirms the payment with Paystack and through its webhook. A \"success\" reported by the browser is never trusted on its own." },
        { title: "Confirmed, or released", body: "A verified payment marks the booking paid and emails every passenger. An unpaid reservation expires and its seats go back on sale." },
        { title: "My bookings", body: "Every booking and its status, on any device the rider signs in from." },
      ],
    },
    architecture: {
      summary:
        "Three browser apps, one API. The front ends hold no business rules: prices, seats, reservations and payment results are all decided on the server.",
      decisions: [
        {
          title: "One API, three front ends",
          tag: "Architecture",
          body: "The website, the rider app and the dashboard deploy separately but call the same NestJS API. A rule changed once on the server changes everywhere, and no app can disagree with another about a price or a booking.",
        },
        {
          title: "A separate app for shuttle booking",
          tag: "Delivery",
          body: "Rather than rework the whole business website for one new service, I proposed NShuttle as its own app on its own subdomain. The main site hands a rider's search across, and each side can change without breaking the other.",
        },
        {
          title: "The browser never decides a payment",
          tag: "Payments",
          body: "The apps ask the API to start a payment and then show what the API reports. The API verifies every payment with Paystack and processes its webhook, so a tampered browser can't mark a booking as paid.",
        },
        {
          title: "Sign-in that the API enforces",
          tag: "Security",
          body: "Riders and staff sign in separately, with their own permissions. The dashboard's page guards only decide what the browser shows; the API refuses any staff request without a valid staff token.",
        },
        {
          title: "A cache that is allowed to fail",
          tag: "Resilience",
          body: "Redis sits in front of MongoDB and paid map lookups to keep the API within its hosting budget. Every cache call falls back to the database on error, and live seat availability is never cached, so a rider never sees a seat that's gone.",
        },
        {
          title: "Email that survived a blocked mail port",
          tag: "Operations",
          body: "When the hosting provider blocked outbound SMTP, I moved transactional email from SMTP to SendGrid's web API, and notifications kept flowing.",
        },
      ],
    },
    // From Enoch's CV and his account; described, not quantified.
    challenges: [
      {
        title: "One booking, two seats",
        body: "A booking could take a trip's seat count down twice, so trips looked fuller than they were. I traced it to where the count was changed and made it change exactly once.",
      },
      {
        title: "Dates without a time zone",
        body: "Dates were being parsed without a time zone, which can quietly move a trip to the wrong day. I fixed the parsing so dates mean the same thing on every machine.",
      },
      {
        title: "A sign-in race in the dashboard",
        body: "The staff dashboard could check sign-in before the saved session had loaded, and briefly treat a signed-in member of staff as signed out. I fixed it with a reusable readiness hook.",
      },
      {
        title: "A deleted schedule that broke bookings",
        // Confirmed in Enoch's Novo project notes: found with test bookings, fixed in the API and in NShuttle.
        body: "Deleting a schedule that still had bookings left them pointing at nothing, and the bookings page crashed on them. I added a server-side guard so a schedule with active bookings can't be deleted, and made the page cope with orphaned records.",
      },
    ],
    outcome: {
      summary:
        "Live, with online booking requests across Novo's service lines, and end-to-end shuttle bookings and payments through NShuttle.",
      points: [
        "The business website at novo.ng takes booking requests across Novo's service lines",
        "NShuttle takes real bookings and payments, end to end",
        "Every request is stored as well as emailed, so staff can always find it in the dashboard",
        "One API runs all three apps, and I still maintain the platform",
      ],
    },
    // The staff dashboard is private: never add a screenshot of it here.
    // width/height are each file's real size. novo-career.png is left out: it shows test data.
    screens: [
      { caption: "Business website: services", src: "/screens/novo-business-page.png", width: 1586, height: 718 },
      { caption: "Business website: airport transfer fleet and rates", src: "/screens/novo-airport-transfers.png", width: 1318, height: 795 },
      { caption: "Business website: booking a car rental", src: "/screens/novo-car-rentals-modal.png", width: 1586, height: 724 },
      { caption: "NShuttle: home and route search", src: "/screens/nshuttle-home.png", width: 1585, height: 731 },
      { caption: "NShuttle: my bookings", src: "/screens/nshuttle-my-plan.png", width: 1328, height: 798 },
    ],
  },

  {
    // PRIVACY (Enoch, 16 Nov 2026): describe the product only. No dates, phases, progress,
    // staging, test counts, security-review findings, team details or places.
    slug: "smartbiotrack",
    tagline:
      "A multi-tenant attendance platform. Staff clock in and out, and the system works out lateness, overtime and absences under each company's own rules. Because those records feed payroll, the backend is built around three things: data isolation, secure sessions and correctness.",
    facts: [
      { label: "Role", value: "Backend lead", detail: "Backend architecture, security and the attendance engine" },
      { label: "Type", value: "Multi-tenant SaaS", detail: "Many companies, each with its own rules and data" },
      { label: "Stack", value: "NestJS / Next.js", detail: "TypeScript, PostgreSQL, Prisma" },
      { label: "Focus", value: "Security & correctness", detail: "Isolation, sessions and concurrency" },
    ],
    problem: [
      "Attendance feeds payroll, so the records have to be right: who came in, when, how late, how much overtime. Every company counts those differently, and paper registers and shared spreadsheets are easy to get wrong and easy to game.",
      "Many companies share one platform, so a mistake isn't only a wrong number: it could show one company's staff records to another.",
    ],
    role: {
      summary:
        "I lead the backend: its architecture, its security, and the engine that turns clock-ins into attendance records. I also report technical progress to non-technical management.",
      areas: [
        {
          title: "Accounts & companies",
          body: "Company sign-up, invitations, roles, departments and offices, with every company's data kept apart from every other's.",
        },
        {
          title: "Attendance engine",
          body: "Clock in and out, breaks, daily summaries, lateness, overtime, work rules and holidays, each set per company.",
        },
        {
          title: "Security",
          body: "Sign-in, sessions and the checks that keep one company's data out of another's reach.",
        },
      ],
    },
    flow: {
      label: "An attendance day",
      steps: [
        { title: "Clock in", body: "Recorded on the server's clock, so a device's time can't change it." },
        { title: "Breaks", body: "Several work sessions a day, with breaks handled by one consistent rule." },
        { title: "Clock out", body: "A forgotten clock-out is flagged for review. The system never invents a punch." },
        { title: "Day closes", body: "Each day closes in the company's own time zone, marking absences and incomplete days." },
      ],
    },
    architecture: {
      summary:
        "Attendance data ends up in payroll, so the design favours records that can't drift and data that can't leak: strict isolation between companies, sessions that resist theft, and records that stay correct even when requests arrive at the same moment.",
      decisions: [
        {
          title: "Each company's data stays its own",
          tag: "Multi-tenancy",
          body: "Isolation is enforced by the backend on every request, not left to the interface, so a user can only ever reach their own company's records.",
        },
        {
          title: "Sessions that are hard to steal",
          tag: "Security",
          body: "Sign-in sessions are designed so that a stolen or replayed session is detected and refused, rather than quietly accepted.",
        },
        {
          title: "No double clock-ins",
          tag: "Concurrency",
          body: "A double tap or two open tabs can't record two clock-ins. Requests that arrive together are handled safely, so every punch is recorded once and in the right order.",
        },
        {
          title: "Punches are facts, summaries are derived",
          tag: "Integrity",
          body: "Clock events are never edited. Daily summaries are computed from them, so any day can be rebuilt and checked.",
        },
        {
          title: "Protections are tested",
          tag: "Testing",
          body: "The key security and concurrency protections are covered by automated tests, so a protection that stops working is caught before it ships.",
        },
      ],
    },
    outcome: {
      summary: "Built to give companies attendance records they can pay from, under rules they set themselves.",
      points: [
        "Each company's data is kept separate from every other company's",
        "Attendance rules, work hours, holidays and overtime are configured per company",
        "Key security and concurrency protections are covered by automated tests",
      ],
    },
    screens: [],
  },

  {
    slug: "auth-system",
    tagline:
      "A personal project, not client work: a standalone authentication API, built to understand what really happens behind a sign-in form. The source is public.",
    facts: [
      { label: "Role", value: "Personal project", detail: "Designed and built alone, outside client work" },
      { label: "Timeline", value: "Jun 2026", detail: "In progress" },
      { label: "Stack", value: "NestJS / Prisma", detail: "PostgreSQL, Redis, Resend email" },
      { label: "Source", value: "Public on GitHub", detail: "Anyone can read the code" },
    ],
    problem: [
      // In Enoch's words, 17 Nov 2026.
      "A personal project to learn what really happens behind sign-in: token rotation, sessions, two-factor codes, and where authentication sits in a system's architecture. Most of my production work lives in private company repositories; this one anyone can read.",
    ],
    role: {
      summary: "I designed the data model, wrote the API and its guards, and set up email and two-factor sign-in.",
      areas: [
        {
          title: "Sessions & tokens",
          body: "Each sign-in is its own session with its own refresh token. Users can list their sessions, revoke one, or revoke all the others.",
        },
        {
          title: "Two-factor sign-in",
          body: "Time-based one-time codes with QR-code setup, so a stolen password alone isn't enough. Turning it off also requires a valid code.",
        },
        {
          title: "Account lifecycle",
          body: "Registration, email verification, forgotten-password and reset, each with validated request bodies.",
        },
      ],
    },
    architecture: {
      summary: "A NestJS service on PostgreSQL through Prisma, with Redis for rate limiting and the refresh token kept in a cookie. Each feature answers a specific way accounts get attacked.",
      decisions: [
        {
          title: "Refresh tokens rotate on every use",
          tag: "Tokens",
          body: "Each refresh replaces the session's token, so a refresh token that leaks stops working as soon as it has been used once.",
        },
        {
          title: "Sessions are rows you can see and revoke",
          tag: "Sessions",
          body: "Because every sign-in is stored as its own session, signing out a lost phone, or every device but this one, is a single action.",
        },
        {
          title: "Email is verified before it is trusted",
          tag: "Accounts",
          body: "A new account confirms its email address through a link, which can be resent, so the system knows the address belongs to the person who signed up.",
        },
        {
          title: "Login is rate limited in Redis",
          tag: "Abuse",
          body: "A guard on the login route counts attempts in Redis and refuses once the limit is reached, before any password is checked, which slows down password guessing.",
        },
      ],
    },
    outcome: {
      summary: "In progress. The source is public on GitHub.",
      points: [
        "14 endpoints covering sign-up, sign-in, refresh, sessions, password reset and two-factor sign-in",
        "Verification and password-reset emails sent through Resend",
      ],
    },
    screens: [],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
