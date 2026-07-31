import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Contact | Growing Chem India",
  description:
    "Send your requirement and our team will respond with availability, grades and pricing.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Let's talk about your requirement">
        Share the grade, quantity and application. We&apos;ll come back with availability and
        pricing.
      </PageHeader>
      <Contact />
    </>
  );
}
