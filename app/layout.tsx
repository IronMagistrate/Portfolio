import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono, Syne } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
// Must come from a plain module: a constant exported from a "use client" file reaches
// server code as a client reference, not as the string itself.
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

// next/font self-hosts these at build time: no request to Google from the visitor's browser.
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const description =
  "Portfolio of Enoch Enebeli, a full stack engineer building secure, scalable systems with Next.JS, React, NestJS, Node.js and PostgreSQL.";

export const metadata: Metadata = {
  // Makes relative URLs (Open Graph images, canonical links) absolute.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Enoch Enebeli | Full Stack Engineer",
    template: "%s | Enoch Enebeli",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Enoch Enebeli",
    title: "Enoch Enebeli | Full Stack Engineer",
    description,
    url: "/",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enoch Enebeli | Full Stack Engineer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4ef" },
  ],
};

// Runs while the HTML is parsed, before first paint, so a saved light theme never flashes dark.
// See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${syne.variable} ${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (Grammarly, ColorZilla) inject attributes on <body> before React loads. */}
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-canvas font-sans text-ink">
        <a
          href="#main"
          className="sr-only z-[60] bg-accent px-4 py-2 font-mono text-label-md uppercase text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1 pt-20">
          {children}
        </main>
        <SiteFooter />
        <MobileNav />
      </body>
    </html>
  );
}
