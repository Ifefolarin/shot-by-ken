"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Used only for the mobile overlay (keeps "Book Now" label for contact)
const MOBILE_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services",  href: "#services"  },
  { label: "Book Now",  href: "#contact"   },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const lineColor = isOpen ? "var(--color-surface)" : "var(--color-primary)";

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen
            ? "bg-[var(--color-primary)]"
            : scrolled
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
          {/* Left: Logo */}
          <a
            href="#"
            className="hover:opacity-70 transition-opacity"
            aria-label="Shot by Ken — return to top"
            onClick={() => setIsOpen(false)}
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

          {/* Center: Portfolio + Services */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            <a
              href="#portfolio"
              className="
                font-sans text-[13px] font-medium tracking-[0.1em] uppercase
                text-[var(--color-primary)] hover:text-[var(--color-on-surface-variant)]
                transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
              "
            >
              Portfolio
            </a>
            <a
              href="#services"
              className="
                font-sans text-[13px] font-medium tracking-[0.1em] uppercase
                text-[var(--color-primary)] hover:text-[var(--color-on-surface-variant)]
                transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
              "
            >
              Services
            </a>
          </div>

          {/* Right: Book Now */}
          <a
            href="#contact"
            className="
              hidden md:inline-block
              font-sans text-[13px] font-medium tracking-[0.1em] uppercase
              bg-[var(--color-primary)] text-[var(--color-surface)]
              px-5 py-2
              hover:opacity-80 active:scale-[0.98]
              transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
            "
          >
            Book Now
          </a>

          {/* Mobile hamburger — visible below md only */}
          <button
            className="md:hidden p-1 -mr-1"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {/* 3-line morph to ✕ */}
            <span className="relative flex h-5 w-6 flex-col items-stretch justify-between" aria-hidden="true">
              <span
                className="h-[1.5px] rounded-full origin-center transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  backgroundColor: lineColor,
                  transform: isOpen ? "translateY(9px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="h-[1.5px] rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  backgroundColor: lineColor,
                  opacity: isOpen ? 0 : 1,
                  transform: isOpen ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="h-[1.5px] rounded-full origin-center transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  backgroundColor: lineColor,
                  transform: isOpen ? "translateY(-9px) rotate(-45deg)" : "none",
                }}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu overlay */}
      <div
        className="md:hidden fixed inset-0 z-40"
        style={{
          backgroundColor: "var(--color-primary)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.45s cubic-bezier(0.32,0.72,0,1)",
        }}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full px-[var(--spacing-margin-mobile)] pt-24 pb-12">
          <nav aria-label="Mobile navigation" className="flex-1">
            <ul className="list-none m-0 p-0" role="list">
              {MOBILE_LINKS.map(({ label, href }, i) => (
                <li
                  key={href}
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "none" : "translateY(2rem)",
                    transition: `opacity 0.6s cubic-bezier(0.32,0.72,0,1) ${120 + i * 80}ms, transform 0.6s cubic-bezier(0.32,0.72,0,1) ${120 + i * 80}ms`,
                  }}
                >
                  <a
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="
                      block py-5
                      font-serif font-normal
                      text-[clamp(2.5rem,10vw,3.75rem)]
                      leading-[1.1]
                      border-b border-white/10
                      hover:opacity-60
                      transition-opacity duration-300
                    "
                    style={{ color: "var(--color-surface)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Staggered footer tag */}
          <div
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "none" : "translateY(1rem)",
              transition: `opacity 0.6s cubic-bezier(0.32,0.72,0,1) ${120 + MOBILE_LINKS.length * 80 + 60}ms, transform 0.6s cubic-bezier(0.32,0.72,0,1) ${120 + MOBILE_LINKS.length * 80 + 60}ms`,
            }}
          >
            <p
              className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase"
              style={{ color: "color-mix(in srgb, var(--color-surface) 40%, transparent)" }}
            >
              Shot by Ken Photography
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
