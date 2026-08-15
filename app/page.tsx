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
          <div className="
            flex-1 lg:max-w-[680px]
            py-[var(--spacing-section)]
            px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)]
          ">
            <Reveal>
              <p className="font-sans text-[13px] font-medium tracking-[0.1em] uppercase text-[var(--color-outline)] mb-4">
                Contact
              </p>
              <h2
                id="contact-heading"
                className="font-serif font-normal text-[clamp(2rem,4vw,2.5rem)] leading-[1.2] mb-4"
              >
                Book a Session
              </h2>
              <p className="font-sans text-base text-[var(--color-on-surface-variant)] max-w-lg mb-10">
                Ready to create something together? Fill in the form below and Ken will
                get back to you within 2–3 business days.
              </p>

              {/* Contact info */}
              <div className="grid grid-cols-2 gap-8 pb-10 mb-10 border-b border-[var(--color-outline-variant)]">
                <div>
                  <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-outline)] mb-2">
                    Inquiries
                  </p>
                  <a
                    href="mailto:shottbykenneth@gmail.com"
                    className="font-sans text-sm text-[var(--color-primary)] underline underline-offset-2 decoration-[var(--color-outline-variant)] hover:decoration-[var(--color-primary)] transition-all"
                  >
                    shottbykenneth@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-outline)] mb-2">
                    Studio
                  </p>
                  <a
                    href="tel:+14372278884"
                    className="font-sans text-sm text-[var(--color-primary)] underline underline-offset-2 decoration-[var(--color-outline-variant)] hover:decoration-[var(--color-primary)] transition-all"
                  >
                    +1 437 227 8884
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>

          {/* Photo column — fills remaining viewport width */}
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
