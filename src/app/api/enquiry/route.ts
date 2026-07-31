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

export async function POST(request: Request) {
  let data: EnquiryPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = data.name?.trim();
  const email = data.email?.trim();
  const phone = data.phone?.trim() || "N/A";
  const product = data.product?.trim() || "N/A";
  const message = data.message?.trim() || "N/A";

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
