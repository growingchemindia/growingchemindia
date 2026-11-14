import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/content";

export type EnquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  product?: string;
  message?: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Where enquiries are sent, and the verified sender. Configured via env so
// they can change without touching code. MAIL_TO falls back to the site email.
const MAIL_TO = process.env.MAIL_TO ?? site.email;
const MAIL_FROM = process.env.MAIL_FROM ?? "Growing Chem India <onboarding@resend.dev>";
const resendKey = process.env.RESEND_API_KEY;

// Max lengths per field, so oversized payloads can't flood the inbox.
const LIMITS = { name: 100, email: 200, phone: 40, product: 120, message: 5000 } as const;

// Best-effort per-IP rate limit. Lives in memory, so it resets on deploy and is
// per instance; use Vercel Firewall rate limiting for a hard guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/** Reads a string field, trimmed and capped. Non-strings become "". */
function field(data: Record<string, unknown>, key: keyof typeof LIMITS) {
  const v = data[key];
  return typeof v === "string" ? v.trim().slice(0, LIMITS[key]) : "";
}

/** Single-line value for the email subject (no CR/LF). */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

function sameHost(origin: string, host: string | null) {
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // Only accept submissions from this site's own pages.
  const origin = request.headers.get("origin");
  if (origin && !sameHost(origin, request.headers.get("host"))) {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let data: Record<string, unknown>;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    data = body as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "website" field.
  if (typeof data.website === "string" && data.website) {
    return NextResponse.json({ ok: true });
  }

  const name = oneLine(field(data, "name"));
  const email = field(data, "email");
  const phone = field(data, "phone") || "N/A";
  const product = oneLine(field(data, "product")) || "N/A";
  const message = field(data, "message") || "N/A";

  if (!name || !email || !emailRe.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid name and email." },
      { status: 422 }
    );
  }

  // Without an API key (e.g. local dev), log and acknowledge so the form
  // stays usable. In production, set RESEND_API_KEY to actually deliver.
  if (!resendKey) {
    console.info("[enquiry] (no RESEND_API_KEY set, not emailed)", {
      name,
      email,
      phone,
      product,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject: `New enquiry: ${product} for ${name}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone}`,
        `Product: ${product}`,
        "",
        "Requirement:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[enquiry] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please email or call us." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please email or call us." },
      { status: 502 }
    );
  }
}
