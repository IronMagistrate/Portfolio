"use client";

import { motion, useReducedMotion } from "motion/react";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import { sendContactMessage } from "@/app/contact/actions";
import { contact } from "@/content/site";
import { type ContactField, type ContactState, initialContactState, LIMITS } from "@/lib/contact";

const EASE = [0.22, 1, 0.36, 1] as const;

const inputBase =
  "w-full border border-line-strong bg-transparent px-6 text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-accent-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink aria-invalid:border-danger";

type FieldProps = {
  index: number;
  name: ContactField;
  label: string;
  required?: boolean;
  error?: string;
  /** Right-hand note on the label row, e.g. "Optional" or a character count. */
  hint?: React.ReactNode;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby": string | undefined }) => React.ReactNode;
};

/** Label row, the control, and its error message wired together for screen readers. */
function Field({ index, name, label, required = false, error, hint, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <div className="label flex items-center justify-between gap-4">
        <label htmlFor={id} className="flex items-center gap-3">
          <span aria-hidden="true" className="text-muted">
            {String(index).padStart(2, "0")}
          </span>
          {label}
          {required ? (
            <span aria-hidden="true" className="text-accent-ink">
              *
            </span>
          ) : null}
        </label>
        <span className="text-muted">{hint}</span>
      </div>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : undefined })}
      {/* Always rendered so screen readers announce the error the moment it appears. */}
      <p id={errorId} role="alert" data-field-error={name} className="min-h-5 text-sm text-danger">
        {error}
      </p>
    </div>
  );
}

export function ContactForm() {
  const reduce = useReducedMotion();
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactState);
  // Bumping this key remounts the form empty for "Send another message".
  const [round, setRound] = useState(0);
  // The success result the visitor has dismissed. Each send returns a new object, so a
  // later success is a different object and shows again.
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const showSuccess = state.status === "success" && state !== dismissed;
  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : undefined;
  const [count, setCount] = useState(0);

  // Move focus to the result, so keyboard and screen-reader users land on what changed.
  useEffect(() => {
    if (showSuccess) {
      successRef.current?.focus();
    } else if (state.status === "error") {
      const firstBad = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      firstBad?.focus();
    }
  }, [state, showSuccess]);

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col gap-6 border border-line bg-surface p-8 md:p-12"
      >
        <span className="label flex items-center gap-2 text-accent-ink">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-ink" />
          Message sent
        </span>
        <h2 ref={successRef} tabIndex={-1} className="font-display text-h3 focus:outline-none">
          Thank you. It&apos;s in my inbox.
        </h2>
        <p className="max-w-lg text-lead text-muted">
          I read every message myself and reply within 2 working days, to the email address you gave.
        </p>
        <div>
          <button
            type="button"
            onClick={() => {
              setDismissed(state);
              setRound((n) => n + 1);
              setCount(0);
            }}
            className="link-sweep label py-2"
          >
            ← Send another message
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} key={round} action={formAction} noValidate className="flex flex-col gap-4">
      {/* Honeypot: hidden from people and from assistive technology. Only bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field index={1} name="name" label="Name" required error={errors.name}>
        {(a11y) => (
          <input
            {...a11y}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.nameMax}
            defaultValue={values?.name}
            placeholder="Your name"
            className={`${inputBase} h-14 rounded-full`}
          />
        )}
      </Field>

      <Field index={2} name="email" label="Email" required error={errors.email}>
        {(a11y) => (
          <input
            {...a11y}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={values?.email}
            placeholder="you@company.com"
            className={`${inputBase} h-14 rounded-full`}
          />
        )}
      </Field>

      <Field index={3} name="subject" label="Subject" hint="Optional" error={errors.subject}>
        {(a11y) => (
          <input
            {...a11y}
            name="subject"
            type="text"
            maxLength={LIMITS.subjectMax}
            defaultValue={values?.subject}
            placeholder="Role, contract or project"
            className={`${inputBase} h-14 rounded-full`}
          />
        )}
      </Field>

      <Field
        index={4}
        name="message"
        label="Message"
        required
        error={errors.message}
        hint={
          <span className="tabular-nums">
            {(count || values?.message.length || 0).toLocaleString("en-US")} / {LIMITS.messageMax.toLocaleString("en-US")}
          </span>
        }
      >
        {(a11y) => (
          <textarea
            {...a11y}
            name="message"
            required
            rows={6}
            maxLength={LIMITS.messageMax}
            defaultValue={values?.message}
            onChange={(event) => setCount(event.target.value.length)}
            placeholder="What are you building, and where could I help?"
            className={`${inputBase} resize-y rounded-3xl py-4 leading-relaxed`}
          />
        )}
      </Field>

      <div className="flex flex-col-reverse items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
        {/* General problems (sending failed, too many attempts) are announced politely. */}
        <p aria-live="polite" className="max-w-sm text-sm text-danger">
          {state.status === "error" ? state.message : null}
        </p>
        <motion.button
          type="submit"
          disabled={pending}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="group/btn inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-accent px-8 text-sm font-medium text-on-accent transition-colors duration-300 hover:bg-ink hover:text-canvas disabled:cursor-progress disabled:opacity-70"
        >
          {pending ? (
            <>
              <span
                aria-hidden="true"
                className="size-4 rounded-full border-2 border-current border-t-transparent motion-ok:animate-spin"
              />
              Sending…
            </>
          ) : (
            <>
              Send message
              <span aria-hidden="true" className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                →
              </span>
            </>
          )}
        </motion.button>
      </div>
      <p className="text-sm text-muted">
        Prefer email? Write to{" "}
        <a href={`mailto:${contact.email}`} className="link-sweep text-ink">
          {contact.email}
        </a>
        .
      </p>
    </form>
  );
}
