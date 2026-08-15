"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services",  href: "#services"  },
  { label: "Contact",   href: "#contact"   },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-[background-color,border-color,backdrop-filter]
        duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${scrolled
          ? "bg-[var(--color-background)] border-b border-[var(--color-outline-variant)]"
          : "bg-transparent"}
      `}
    >
      <nav
        aria-label="Main navigation"
        className="
          max-w-[1440px] mx-auto
          px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)]
          h-16 flex items-center justify-between
        "
      >
        {/* Logo */}
        <a
          href="#"
          className="hover:opacity-70 transition-opacity"
          aria-label="Shot by Ken — return to top"
        >
          <Image
            src="/images/logo/logo.png"
            alt="Shot by Ken"
            width={48}
            height={53}
            className="h-10 w-auto"
            priority
          />
        </a>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="
                  font-sans text-[13px] font-medium tracking-[0.1em] uppercase
                  text-[var(--color-primary)] hover:text-[var(--color-on-surface-variant)]
                  transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                "
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
