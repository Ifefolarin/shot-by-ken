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
          className="h-10 w-auto opacity-80"
        />

        {/* Contact details */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-sans text-sm text-[var(--color-on-surface-variant)]">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="underline underline-offset-2 decoration-[var(--color-outline-variant)] hover:text-[var(--color-primary)] hover:decoration-[var(--color-primary)] transition-all"
          >
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className="underline underline-offset-2 decoration-[var(--color-outline-variant)] hover:text-[var(--color-primary)] hover:decoration-[var(--color-primary)] transition-all"
          >
            {email}
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
