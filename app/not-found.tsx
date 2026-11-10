import Link from "next/link";
import { buttonPrimary } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="fit-title-box flex min-h-[60vh] flex-col justify-center gap-6 border-b-2 border-line px-5 py-16 md:px-12">
      <span className="font-mono text-sm font-bold text-accent-ink">{"// "}ERROR_404</span>
      <h1 className="fit-title font-display font-extrabold tracking-[-0.03em] uppercase [--fit-max:4.5rem]">
        Page not found.
      </h1>
      <p className="max-w-xl text-lg text-muted">That route doesn&apos;t exist. It may have moved, or the link was mistyped.</p>
      <Link href="/" className={`${buttonPrimary} self-start`}>
        Back to home
      </Link>
    </section>
  );
}
