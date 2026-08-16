import Image from "next/image";
import { Hero } from "@/components/hero";
import { CuratedWorksSection } from "@/components/curated-works/curated-works-section";
import { PortfolioSection } from "@/components/portfolio/portfolio-section";
import { ServicesSection } from "@/components/services/services-section";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <CuratedWorksSection />
      <PortfolioSection />
      <ServicesSection />

      {/* Contact / Book a Session — two-column: form left, photo right */}
      <section id="contact" aria-labelledby="contact-heading">
        <div className="flex flex-col lg:flex-row">
          {/* Form column */}
          <div className="flex-1 lg:max-w-[680px] py-[var(--spacing-section)] px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)]">
            <Reveal>
              <p className="font-sans text-[13px] font-medium tracking-[0.1em] uppercase text-[var(--color-outline)] mb-4">
                Contact
              </p>
              <h2
                id="contact-heading"
                className="font-serif font-normal text-[clamp(2rem,4vw,2.5rem)] leading-[1.2] mb-4 text-[var(--color-primary)]"
              >
                Book a Session
              </h2>
              <p className="font-sans text-base text-[var(--color-on-surface-variant)] max-w-lg mb-10">
                Ready to create something together? Fill in the form below and Ken will
                get back to you within 2–3 business days.
              </p>

              {/* Contact info */}
              <div className="flex flex-wrap gap-x-12 gap-y-8 pb-10 mb-10 border-b border-[var(--color-outline-variant)]">
                <div>
                  <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-outline)] mb-2">
                    Inquiries
                  </p>
                  <a
                    href="mailto:shottbykenneth@gmail.com"
                    className="font-sans text-sm text-[var(--color-primary)] underline underline-offset-2 decoration-[var(--color-outline-variant)] hover:decoration-[var(--color-primary)] transition-all flex items-center gap-1.5"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    shottbykenneth@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-outline)] mb-2">
                    Studio
                  </p>
                  <a
                    href="tel:+14372278884"
                    className="font-sans text-sm text-[var(--color-primary)] underline underline-offset-2 decoration-[var(--color-outline-variant)] hover:decoration-[var(--color-primary)] transition-all flex items-center gap-1.5"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
                    </svg>
                    +1 437 227 8884
                  </a>
                </div>
                <div>
                  <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-outline)] mb-2">
                    Location
                  </p>
                  <p className="font-sans text-sm text-[var(--color-primary)] flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Ottawa, Ontario
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>

          {/* Photo column — fills remaining viewport width on desktop */}
          <div className="hidden lg:block flex-1 relative min-h-[700px]">
            <Image
              src="/images/contact.jpg"
              alt="Photography by Ken"
              fill
              className="object-cover object-top"
              sizes="50vw"
              quality={75}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
