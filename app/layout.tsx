import type { Metadata } from "next";
import { EB_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { SkipNav } from "@/components/ui/skip-nav";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shot by Ken — Photography",
  description:
    "High-end portrait, event, and editorial photography by Ken. Book a session today.",
  openGraph: {
    title: "Shot by Ken — Photography",
    description:
      "High-end portrait, event, and editorial photography by Ken. Book a session today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${dmSans.variable}`}
    >
      <body className="bg-[var(--color-background)] text-[var(--color-primary)] antialiased">
        <SkipNav />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
