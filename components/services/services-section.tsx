import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const SERVICES = [
  {
    id: "events",
    label: "Events",
    badge: null,
    description:
      "Corporate events, galas, birthdays, and social gatherings. Candid and directed photography that captures the energy of the room.",
    includes: ["$250 per hour", "2-hour minimum booking", "Same-week delivery", "Full resolution files"],
    note: null,
    price: "$250/hr",
  },
  {
    id: "studio",
    label: "Studio Sessions",
    badge: "Most Preferred",
    description:
      "Maternity, birthday, pre-wedding, branding, and headshot sessions. Every session is crafted to feel personal and unhurried.",
    includes: ["1 hour session", "10 professionally edited images", "Online gallery"],
    note: "Print release available at an additional cost.",
    price: "$250",
  },
  {
    id: "weddings",
    label: "Weddings",
    badge: null,
    description:
      "Full-day wedding coverage from getting ready through the reception. Every detail, every emotion, beautifully documented.",
    includes: ["Full day coverage", "Two shooters available", "Online gallery", "Print release"],
    note: null,
    price: "From $1,600",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-[var(--spacing-section)] relative"
    >
      {/* Background image */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/services-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-white/80" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)]">
        <Reveal>
          <p className="font-sans text-[13px] font-medium tracking-[0.1em] uppercase text-[var(--color-outline)] mb-4">
            Services
          </p>
          <h2
            id="services-heading"
            className="font-serif font-normal text-[clamp(2rem,4vw,2.5rem)] leading-[1.2] mb-16"
          >
            What I Offer
          </h2>
        </Reveal>

        {/* Cards — middle card (Studio) is scaled 20% larger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {SERVICES.map((service, i) => {
            const isFeature = service.id === "studio";
            return (
              <Reveal key={service.id} delay={i * 110} className="flex flex-col">
                <article
                  aria-labelledby={`service-${service.id}-title`}
                  className={`
                    bg-[var(--color-surface)] border border-[var(--color-outline-variant)] flex flex-col h-full
                    transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                    hover:-translate-y-3 hover:border-[var(--color-primary)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]
                    ${isFeature ? "p-10 scale-[1.08] z-10 relative shadow-[0_4px_24px_rgba(0,0,0,0.06)]" : "p-8"}
                  `}
                >
                  {/* Badge */}
                  {service.badge && (
                    <span className="self-start mb-4 font-sans text-[10px] font-medium tracking-[0.15em] uppercase bg-[var(--color-primary)] text-[var(--color-surface)] px-3 py-1">
                      {service.badge}
                    </span>
                  )}

                  <h3
                    id={`service-${service.id}-title`}
                    className={`font-serif font-normal leading-[1.3] mb-4 ${isFeature ? "text-[1.6rem]" : "text-2xl"}`}
                  >
                    {service.label}
                  </h3>
                  <p className="font-sans text-base text-[var(--color-on-surface-variant)] leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  <ul className="mb-2 space-y-2 list-none p-0" role="list">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="font-sans text-sm text-[var(--color-on-surface-variant)] flex items-start gap-2"
                      >
                        <span aria-hidden="true" className="text-[var(--color-secondary)] mt-0.5 shrink-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {service.note && (
                    <p className="font-sans text-xs text-[var(--color-outline)] italic mb-6">
                      * {service.note}
                    </p>
                  )}

                  {/* Price + CTA — 80% width, centered */}
                  <div className="mt-auto pt-6 border-t border-[var(--color-outline-variant)]">
                    <div className="w-4/5 mx-auto flex flex-col items-center gap-4">
                      <span className={`font-serif font-normal ${isFeature ? "text-4xl" : "text-3xl"}`}>
                        {service.price}
                      </span>
                      <a
                        href="#contact"
                        className="
                          w-full text-center
                          bg-[var(--color-primary)] text-[var(--color-surface)]
                          px-6 py-3 font-sans text-[12px] font-medium tracking-[0.1em] uppercase
                          transition-opacity duration-300 hover:opacity-80
                          active:scale-[0.97]
                        "
                      >
                        Book
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
