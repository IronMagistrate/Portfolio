import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";
// Must come from a plain module: a constant exported from a "use client" file reaches
// server code as a client reference, not as the string itself.
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

// next/font self-hosts these at build time: no request to Google from the visitor's browser.
const display = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sans = Geist({ variable: "--font-geist", subsets: ["latin"] });

const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = `${profile.name} | ${profile.role}`;
const description =
  "Portfolio of Enoch Enebeli, a lead full stack software developer in Lagos building production web platforms with Next.js, NestJS, TypeScript, PostgreSQL and MongoDB. Open to remote roles.";

export const metadata: Metadata = {
  // Makes relative URLs (Open Graph images, canonical links) absolute.
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    title,
    description,
    url: "/",
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
  ],
};

/*
 * Runs while the HTML is parsed, before first paint:
 * 1. applies a saved theme, so a light-theme visitor never sees a dark flash;
 * 2. adds `motion-ok` to <html> when the visitor has NOT asked for reduced motion.
 *    CSS uses that class to hide headings that are about to animate in, so with JavaScript
 *    off or reduced motion on, nothing is ever hidden.
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
const bootScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("motion-ok")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      {/* suppressHydrationWarning: browser extensions inject attributes on <body> before React loads. */}
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-canvas font-sans text-ink">
        <a
          href="#main"
          className="label sr-only z-[60] bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
