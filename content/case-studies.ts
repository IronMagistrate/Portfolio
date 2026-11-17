/**
 * Case-study pages (/work/<slug>). One entry per project in site.ts, same slug.
 * Every study has the same five parts: problem, role, architecture, outcome, screens.
 *
 * HONESTY: placeholders are wrapped in `unverified(...)` and show a visible TODO tag.
 * PRIVACY: Novo and SmartBioTrack are Elonatech's software. Describe, never paste code;
 * no teammates' names, hostnames, database names or open security findings.
 *
 * Sources (checked 10–16 Nov 2026):
 * - Novo, NShuttle, Admin dashboard: Enoch's own account and Elonatech's technical documentation.
 * - SmartBioTrack: Enoch's own account. This repo is public, so comments follow the same
 *   privacy rule as page text: no dates, progress, counts or internal details.
 * - Auth System: public repo github.com/enochenebeli/auth-system (controller, sessions service,
 *   package.json), read 10 Nov 2026.
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
/** A screenshot slot. Leave `src` out until a real capture exists in public/. */
export type Screen = { caption: string; src?: string; width?: number; height?: number };

export type CaseStudy = {
  slug: string;
  tagline: string;
  /** Public URL of the product, if it has one. */
  live?: string;
  facts: Fact[];
  problem: Claim[];
  role: { summary: string; areas: Card[] };
  /** Optional step-by-step of the main user journey. */
  flow?: { label: string; steps: Step[] };
  architecture: { summary: string; decisions: Decision[] };
  outcome: { summary: Claim; points: string[] };
  screens: Screen[];
};

export const caseStudies: CaseStudy[] = [
  {
    // Enoch, 16 Nov 2026: three parts. (1) Business page novo.ng, where most services are
    // rendered and all booking requests go. (2) NShuttle, the dedicated rider web app.
    // (3) Staff dashboard: PRIVATE. No screenshots, no address, no link, ever.
    // Role: sole developer. Took over with about half the frontend built; built the whole API.
    slug: "novo",
    tagline:
      "Novo Cars is a Nigerian transport company: car rentals and leasing, shuttles, fleet management, logistics, a driving school and staff outsourcing. Its business website is where all of that is presented and booked, and I built it on an API that also runs the NShuttle rider app and Novo's private admin dashboard.",
    live: "https://novo.ng",
    facts: [
      {
        label: "Role",
        value: "Sole developer",
        detail: "Took over with about half the frontend built, finished it, and built the entire backend API",
      },
      { label: "Client", value: "Novo Cars Nigeria", detail: "Transport and logistics, via Elonatech" },
      { label: "Stack", value: "Next.js 16 / NestJS 11", detail: "TypeScript, MongoDB, Redis, SendGrid" },
      { label: "Scope", value: "Website + API", detail: "The same API also runs NShuttle and the admin dashboard" },
    ],
    problem: [
      "Novo Cars offers several services at once: car rentals and leasing, shuttle booking, fleet management, logistics, a driving school and employee outsourcing. I joined in October 2025 to a codebase with about half the frontend built and no finished product.",
      "Every booking request comes in through the business website and reaches staff by email. When an email didn't arrive, there was nowhere else to find the request, and nowhere for staff to manage what the website shows.",
    ],
    role: {
      summary:
        "I am the sole developer. I took the business website from about half-built to a finished product, built the entire backend API, built the NShuttle rider app, and built the staff dashboard.",
      areas: [
        {
          title: "Business website",
          body: "novo.ng, where most of Novo's services are presented and every booking request is made: car rentals, airport transfers, logistics and more.",
        },
        {
          title: "NShuttle (own case study)",
          body: "A dedicated rider web app on its own subdomain: sign up, search a route and date, book seats and pay with Paystack.",
        },
        {
          title: "Admin dashboard (own case study)",
          body: "Where staff manage what appears on the website and check every request, even when a notification email never arrived. Private to Novo Cars.",
        },
        {
          title: "Backend API",
          body: "One NestJS API for all three: authentication, bookings, schedules, Paystack payments and the email notifications for every service.",
        },
      ],
    },
    architecture: {
      summary:
        "Three browser apps and one API. The front ends hold no business rules: prices, seats, reservations and payment results are all decided on the server.",
      decisions: [
        {
          title: "One API, many front ends",
          tag: "Architecture",
          body: "The website, rider app and dashboard are separate apps that each deploy on their own, but they all call the same NestJS API. A rule changed once on the server changes everywhere.",
        },
        {
          title: "A separate app for a new service",
          tag: "Delivery",
          body: "When Novo Cars asked for shuttle booking, I proposed a separate app on its own subdomain instead of reworking the whole website. The main site hands a rider's search across, and each side can change without breaking the other.",
        },
        {
          title: "The browser never decides a payment",
          tag: "Payments",
          body: "The apps ask the API to start a payment and then display what the API reports. Card details stay inside Paystack, and the dashboard only shows payment results the server has recorded.",
        },
        {
          title: "A cache that can fail without breaking anything",
          tag: "Resilience",
          body: "Redis sits in front of MongoDB and paid map lookups to keep the API inside its hosting budget. Every cache call falls back to the database on error, and live seat availability is never cached.",
        },
        {
          title: "Email that survived a blocked mail port",
          tag: "Operations",
          body: "One notification system serves every service. When the hosting provider blocked outbound SMTP, I moved it from SMTP sending to SendGrid's web API, and transactional email kept flowing without an outage.",
        },
      ],
    },
    outcome: {
      summary: "Live at novo.ng, with every one of Novo Cars' services bookable online.",
      points: [
        "The business website is live at novo.ng and takes booking requests for every service",
        "Every request is emailed to staff and also stored, so the admin dashboard can show it",
        "One API now runs the website, the NShuttle rider app and the admin dashboard",
      ],
    },
    // The staff dashboard is private: never add a screenshot of it here.
    // width/height are each file's real size. novo-career.png is left out: it shows test data.
    screens: [
      { caption: "Business website: services", src: "/screens/novo-business-page.png", width: 1586, height: 718 },
      { caption: "Airport transfer fleet and rates", src: "/screens/novo-airport-transfers.png", width: 1318, height: 795 },
      { caption: "Booking a car rental", src: "/screens/novo-car-rentals-modal.png", width: 1586, height: 724 },
    ],
  },

  {
    // PRIVACY (Enoch, 16 Nov 2026): describe the finished product only. No dates, phases,
    // progress, staging, test counts, security-review findings, team details or places.
    slug: "smartbiotrack",
    tagline:
      "A multi-tenant attendance platform. Staff clock in and out, and the system works out lateness, overtime and absences under each company's own rules, with biometric and location checks to make every record trustworthy.",
    facts: [
      { label: "Role", value: "Backend lead", detail: "Platform architecture, security and the attendance engine" },
      { label: "Type", value: "Multi-tenant SaaS", detail: "Many companies, each with its own rules and data" },
      { label: "Stack", value: "NestJS / Next.js", detail: "TypeScript, PostgreSQL, Prisma, Turborepo" },
      { label: "Status", value: "In progress", detail: "Being built for production" },
    ],
    problem: [
      "Attendance feeds payroll, so the records have to be right: who came in, when, how late, how much overtime. Every company counts those differently, and paper registers and shared spreadsheets are easy to get wrong and easy to game.",
    ],
    role: {
      summary:
        "I lead the backend: the platform's architecture, its security, and the engine that turns clock-ins into attendance records.",
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
          title: "Trust checks",
          body: "Biometric verification and location checks on clock-in, so a record shows who was really there.",
        },
      ],
    },
    flow: {
      label: "An attendance day",
      steps: [
        { title: "Clock in", body: "On server time, never the device's, with the location recorded." },
        { title: "Breaks", body: "Several work sessions a day, with breaks handled by one consistent rule." },
        { title: "Clock out", body: "A forgotten clock-out is flagged for review. The system never invents a punch." },
        { title: "Day closes", body: "Each day closes in the company's own time zone, marking absences and incomplete days." },
      ],
    },
    architecture: {
      summary:
        "Attendance data ends up in payroll, so the design favours records that cannot drift: append-only events, derived summaries, and a lock wherever two requests could race.",
      decisions: [
        {
          title: "One lock stops the double clock-in",
          tag: "Concurrency",
          body: "A double tap or two open tabs could both read \"not clocked in\" and both write. Each punch locks the user's record inside its transaction and reads the clock after the lock, so the second request waits and punches stay in order.",
        },
        {
          title: "Punches are facts, summaries are derived",
          tag: "Integrity",
          body: "Clock events are never edited. Daily summaries are computed from them by a pure function, so any day can be rebuilt and checked.",
        },
        {
          title: "Each company keeps its own time",
          tag: "Correctness",
          body: "Times are stored in UTC, and each company's working days are worked out in its own time zone.",
        },
        {
          title: "Sessions that are hard to steal",
          tag: "Security",
          body: "The refresh token lives in an httpOnly cookie and the access token only in memory. Login errors look identical whether or not an account exists.",
        },
        {
          title: "Every guard is proven by breaking it",
          tag: "Testing",
          body: "Each protection is tested by removing it and watching a test fail, so a guard that silently stops working is caught immediately.",
        },
      ],
    },
    outcome: {
      summary: "Built to give companies attendance records they can pay from, with the rules set by them, not by the software.",
      points: [
        "Each company's data is kept separate from every other company's",
        "Attendance rules, work hours, holidays and overtime are configured per company",
        "Every protection is covered by an automated test",
      ],
    },
    screens: [],
  },

  {
    slug: "nshuttle",
    tagline:
      "Shuttle booking for Novo's scheduled routes. Riders sign up, search a route and date, pick a departure, add passengers and pay with Paystack, all on its own subdomain.",
    live: "https://nshuttle.novo.ng",
    facts: [
      {
        label: "Role",
        value: "Sole developer",
        detail: "Product thinking, system design, frontend and backend. I still maintain it",
      },
      { label: "Timeline", value: "Jun – Sep 2026", detail: "Built over the summer; live and maintained since" },
      { label: "Stack", value: "Next.js 16 / NestJS 11", detail: "TypeScript, MongoDB, Redis, Paystack" },
      { label: "Built for", value: "Novo Cars Nigeria, via Elonatech", detail: "Client work. Elonatech owns the software, so the code stays private" },
    ],
    problem: [
      "Novo Cars wanted a commuter shuttle-booking service for its own selected routes, and came to Elonatech for it. I was already maintaining Novo Cars' main website, so the work came to me.",
      "The brief was unclear at first. I took my questions to our MD, and we set up a walkthrough with Novo Cars where their MD was present. That one meeting cleared about 90% of the open questions, and the build could start on firm ground.",
    ],
    role: {
      summary:
        "I was the only developer, from system design to deployment, and I still maintain it. The rider app works with the shared Novo API, and Novo's staff set up the routes, schedules and fares it sells from the staff dashboard.",
      areas: [
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
    flow: {
      label: "Rider journey",
      steps: [
        { title: "Sign up & sign in", body: "Create an account or sign in. Password rules are checked live as the rider types." },
        { title: "Search a route", body: "Pick from and to cities and a date, one-way or round trip. Results show the seats still available." },
        { title: "Pick a departure", body: "Choose a time. Sold-out trips are disabled and the last few seats are flagged." },
        { title: "Passenger details", body: "Up to six passengers, each with a name, email and a valid Nigerian phone number." },
        { title: "Pay with Paystack", body: "Seats are held for 15 minutes. Card details go only into Paystack's own popup, never through our servers." },
        { title: "My bookings", body: "Every booking and its status, on any device the rider signs in from." },
      ],
    },
    architecture: {
      summary:
        "Most of these decisions are about one thing: a rider must never pay for a seat that isn't there, or be told they paid when they didn't.",
      decisions: [
        {
          title: "A separate app on its own subdomain",
          tag: "Architecture",
          body: "Rather than rework Novo's whole business website for one new feature, I proposed NShuttle as a separate app. The main site stays as it is and simply hands a rider's search across, so each can change without breaking the other.",
        },
        {
          title: "The browser never decides a payment",
          tag: "Payments",
          body: "The app asks the backend to start a payment, opens Paystack's popup, and then shows whatever the backend reports. An unpaid reservation simply expires and releases its seats.",
        },
        {
          title: "Never cache live seat availability",
          tag: "Correctness",
          body: "Route lists are cached for 5 minutes and admin lists for 30 seconds, but the per-date seat search is deliberately left uncached, so a rider never sees a seat that is already gone.",
        },
        {
          title: "Guards that came from a real crash",
          tag: "Data integrity",
          body: "Deleting a schedule once left bookings pointing at nothing and crashed a rider's bookings page. Schedules with live bookings can no longer be deleted, and each route's single-trip fare is checked against its base price on every save.",
        },
      ],
    },
    outcome: {
      summary: "Live at nshuttle.novo.ng, taking real bookings and payments. I still maintain it.",
      points: [
        "The whole journey works end to end: search, pick, pay, see the booking",
        "Bookings follow the rider to any device they sign in on",
        "A search started on Novo's main website lands directly on NShuttle's results",
      ],
    },
    // The home screen is the cover, so it is not repeated here.
    screens: [{ caption: "My bookings", src: "/screens/nshuttle-my-plan.png", width: 1328, height: 798 }],
  },

  {
    // PRIVATE to Novo: no screenshots, no address, no link, ever (Enoch, 16 Nov 2026).
    // Facts: "Technical Documentation For Admin Dashboard" (Elonatech, 9 Nov 2026).
    slug: "novo-admin",
    tagline:
      "Novo's private staff dashboard. Staff manage what the business website shows, and see every booking request, shuttle booking and payment in one place, even when a notification email never arrived.",
    facts: [
      { label: "Role", value: "Sole developer", detail: "Screens, sign-in and the API behind them" },
      { label: "Access", value: "Staff only", detail: "Private to Novo, so it is described here but not shown" },
      { label: "Stack", value: "Next.js 16 / NestJS 11", detail: "TypeScript, Tailwind CSS, MongoDB" },
      { label: "Size", value: "11 screens", detail: "47 API endpoints, two admin roles" },
    ],
    problem: [
      "Every booking request on Novo's website reached staff by email. When an email didn't arrive, there was nowhere else to find the request, and changing what the website showed meant asking a developer.",
    ],
    role: {
      summary: "I built the dashboard and the API endpoints it uses, alone.",
      areas: [
        {
          title: "Requests & bookings",
          body: "Booking requests, airport transfers and shuttle bookings with their payment status, each with search, filters and status changes.",
        },
        {
          title: "Website content",
          body: "The fleet, routes and fares, news articles, job postings and newsletter subscribers that the business website shows.",
        },
        {
          title: "Access",
          body: "Staff sign-in with admin and super-admin roles; only super admins can manage other admin accounts.",
        },
      ],
    },
    architecture: {
      summary: "A static Next.js app with no server of its own. Every action is a call to the shared Novo API, which holds all the rules and checks every request.",
      decisions: [
        {
          title: "The API is the real security boundary",
          tag: "Security",
          body: "The dashboard's page guards only decide what the browser shows. The API refuses any request without a valid staff token, so a modified browser cannot reach data it shouldn't.",
        },
        {
          title: "Requests are stored, not just emailed",
          tag: "Reliability",
          body: "Every request from the website is saved before any email is sent, so staff can always find it in the dashboard even if the email fails.",
        },
        {
          title: "Fares that cannot disagree",
          tag: "Data integrity",
          body: "A route's single-trip fare must match its base price, enforced in the form and on the server, and a schedule with live bookings cannot be deleted.",
        },
      ],
    },
    outcome: {
      summary: "In production and used by Novo's staff every day.",
      points: [
        "11 screens on 47 API endpoints",
        "Staff can find every request, including ones whose email never arrived",
        "The website's content is managed without a developer",
      ],
    },
    // Never add screens here: the dashboard is private.
    screens: [],
  },

  {
    slug: "auth-system",
    tagline:
      "A standalone authentication API with its source public: sign-up with email verification, sessions you can list and revoke, refresh-token rotation, two-factor sign-in and a rate-limited login.",
    facts: [
      { label: "Role", value: "Personal project", detail: "Designed and built alone, outside client work" },
      { label: "Timeline", value: "Jun 2026", detail: "In progress" },
      { label: "Stack", value: "NestJS 10 / Prisma 5", detail: "PostgreSQL, Redis, Resend email" },
      { label: "Source", value: "Public on GitHub", detail: "14 endpoints under /auth" },
    ],
    problem: [
      // In Enoch's words, 17 Nov 2026.
      "A personal project to learn what really happens behind sign-in: token rotation, sessions, two-factor codes, and where authentication sits in a system's architecture. Most of my production work lives in private company repositories; this one anyone can read.",
    ],
    role: {
      summary: "A personal project: I designed the data model, wrote the API and its guards, and set up email and two-factor sign-in.",
      areas: [
        {
          title: "Sessions & tokens",
          body: "Each sign-in is a session row with its own refresh token. Users can list their sessions, revoke one, or revoke all the others.",
        },
        {
          title: "Two-factor sign-in",
          body: "Time-based one-time codes with QR-code setup. Turning it off also requires a valid code.",
        },
        {
          title: "Account lifecycle",
          body: "Registration, email verification with resend, forgotten-password and reset, each with validated request bodies.",
        },
      ],
    },
    architecture: {
      summary: "A NestJS service on PostgreSQL through Prisma, with Redis for rate limiting and the refresh token kept in a cookie.",
      decisions: [
        {
          title: "Refresh tokens rotate on every use",
          tag: "Tokens",
          body: "Each refresh replaces the session's token and extends its expiry, so an old refresh token stops working as soon as it has been used.",
        },
        {
          title: "Sessions are rows you can see and revoke",
          tag: "Sessions",
          body: "Because every sign-in is stored as its own session, signing out one device, or every device but this one, is a single delete.",
        },
        {
          title: "Login is rate limited in Redis",
          tag: "Abuse",
          body: "A guard on the login route counts attempts in Redis and refuses once the limit is reached, before any password is checked.",
        },
      ],
    },
    outcome: {
      summary: "In progress. The source is public on GitHub.",
      points: [
        "14 endpoints covering sign-up, sign-in, refresh, sessions, password reset and two-factor",
        "Email verification and password-reset emails sent through Resend",
      ],
    },
    screens: [],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
