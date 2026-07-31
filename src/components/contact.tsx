"use client";

import { useState, type FormEvent } from "react";
import { products, site } from "@/lib/content";
import { Button } from "./ui/button";

type Status = "idle" | "sending" | "ok" | "error";

const infoRows = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
  { label: "Branches", value: site.branches },
];

const fieldClass =
  "w-full rounded-[10px] border-[1.5px] border-line bg-white px-3.5 py-3 text-[0.95rem] text-ink transition-all focus:border-brand-500 focus:outline-none focus:ring-[3px] focus:ring-brand-500/15";
const labelClass =
  "mb-1.5 block font-[family-name:var(--font-head)] text-[0.85rem] font-medium text-ink";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("ok");
      setNote("Thanks! Your enquiry is in. Our team will reply shortly.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setNote(err instanceof Error ? err.message : "Could not send. Please try again.");
    }
  }

  return (
    <section id="contact" className="py-[clamp(3.5rem,7vw,6rem)]">
      <div className="mx-auto grid w-[92%] max-w-[1160px] items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
        {/* Info */}
        <div>
          <span className="mb-3.5 inline-block font-[family-name:var(--font-head)] text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-brand-600">
            Get in touch
          </span>
          <h2 className="text-[clamp(1.6rem,3.2vw,2.35rem)] font-bold leading-[1.15]">
            Tell us what you need. We&apos;ll get you a quote.
          </h2>
          <p className="mt-4 text-slatemuted">
            Send your requirement and our team will respond with availability, grades and pricing.
          </p>
          <ul className="mt-8 grid gap-[1.1rem]">
            {infoRows.map((row) => (
              <li
                key={row.label}
                className="grid grid-cols-[90px_1fr] items-center gap-4 border-b border-line pb-[1.1rem]"
              >
                <span className="font-[family-name:var(--font-head)] text-[0.82rem] font-semibold uppercase tracking-wide text-muted">
                  {row.label}
                </span>
                {row.href ? (
                  <a href={row.href} className="hover:text-brand-600">
                    {row.value}
                  </a>
                ) : (
                  <address className="not-italic">{row.value}</address>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-soft)]"
        >
          <div className="mb-[1.1rem]">
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input id="name" name="name" required placeholder="Your full name" className={fieldClass} />
          </div>

          <div className="mb-[1.1rem] grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input id="phone" name="phone" type="tel" placeholder="+91" className={fieldClass} />
            </div>
          </div>

          <div className="mb-[1.1rem]">
            <label htmlFor="product" className={labelClass}>
              Product of interest
            </label>
            <select id="product" name="product" className={fieldClass} defaultValue="">
              <option value="">Select a division</option>
              {products.map((p) => (
                <option key={p.slug}>{p.title}</option>
              ))}
            </select>
          </div>

          <div className="mb-[1.1rem]">
            <label htmlFor="message" className={labelClass}>
              Requirement
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Grade, quantity, application…"
              className={`${fieldClass} resize-y`}
            />
          </div>

          <Button type="submit" block disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Enquiry"}
          </Button>

          {note ? (
            <p
              role="status"
              aria-live="polite"
              className={`mt-3.5 text-[0.9rem] font-medium ${
                status === "ok" ? "text-brand-600" : "text-red-600"
              }`}
            >
              {note}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
