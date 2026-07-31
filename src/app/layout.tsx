import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const sora = Sora({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Growing Chem India | Specialty Chemical Distribution",
  description:
    "Growing Chem India is a trusted importer and distributor of pigments, additives, minerals and ready-to-use compounds for the plastics, PVC, rubber, paint and printing-ink industries.",
  keywords: [
    "chemical distributor India",
    "PVC resin supplier",
    "pigments and dyes",
    "titanium dioxide",
    "calcium carbonate",
    "polymer additives",
  ],
  openGraph: {
    title: "Growing Chem India | Specialty Chemical Distribution",
    description:
      "Pigments, additives, minerals and ready-to-use compounds for the plastics, PVC, rubber, paint and printing-ink industries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
