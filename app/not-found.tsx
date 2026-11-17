import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center gap-6 pt-28 pb-16">
      <span className="label text-accent-ink">Error 404</span>
      <h1 className="font-display text-display">Page not found.</h1>
      <p className="max-w-xl text-lead text-muted">
        That address doesn&apos;t exist. It may have moved, or the link was mistyped.
      </p>
      <div>
        <ButtonLink href="/" arrow="right">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
