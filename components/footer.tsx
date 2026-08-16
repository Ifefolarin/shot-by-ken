import Image from "next/image";
import Link from "next/link";
import { SiInstagram, SiTiktok } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const phone    = process.env.NEXT_PUBLIC_PHONE         ?? "+14372278884";
  const email    = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "shottbykenneth@gmail.com";
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/shot.by.ken_/";
  const tiktok    = process.env.NEXT_PUBLIC_TIKTOK_URL    ?? "https://www.tiktok.com/@shot.by.ken";

  return (
    <footer className="border-t border-[var(--color-outline-variant)] bg-[var(--color-background)]">
      <div className="
        max-w-[1440px] mx-auto
        px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)]
        py-12
        flex flex-col md:flex-row items-start md:items-center justify-between gap-8
      ">
        {/* Logo */}
        <Image
          src="/images/logo/logo.png"
          alt="Shot by Ken"
          width={48}
          height={53}
          className="h-10 w-auto"
        />

        {/* Contact icons */}
        <div className="flex items-center gap-5">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            aria-label={`Call ${phone}`}
            className="text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
            </svg>
          </a>
          <a
            href={`mailto:${email}`}
            aria-label={`Email ${email}`}
            className="text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>

        {/* Social + copyright */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Shot by Ken on Instagram"
              className="text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              <SiInstagram size={18} aria-hidden="true" />
            </Link>
            <Link
              href={tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Shot by Ken on TikTok"
              className="text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              <SiTiktok size={18} aria-hidden="true" />
            </Link>
          </div>
          <p className="font-sans text-xs text-[var(--color-outline)]">
            © {year} Shot by Ken. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
