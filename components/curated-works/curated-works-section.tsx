import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const CURATED = [
  {
    src: "/images/curated/01.jpg",
    alt: "Gold lace portrait — studio session",
    width: 1336,
    height: 2048,
    tag: "Studio Session",
    title: "Black Valentine",
  },
  {
    src: "/images/curated/02.jpg",
    alt: "A proposal moment captured against a floral wall",
    width: 2048,
    height: 1365,
    tag: "Wedding",
    title: "The Proposal",
  },
  {
    src: "/images/curated/03.jpg",
    alt: "Steph and Favour — wedding portrait",
    width: 1742,
    height: 2048,
    tag: "Wedding",
    title: "Steph and Favour",
  },
];

export function CuratedWorksSection() {
  return (
    <section aria-label="Curated works" className="py-[var(--spacing-section)]">
      <div className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)]">
        <Reveal>
          <p className="font-sans text-[13px] font-medium tracking-[0.1em] uppercase text-[var(--color-outline)] mb-4">
            Curated Works
          </p>
          <h2 className="font-serif font-normal text-[clamp(2rem,4vw,2.5rem)] leading-[1.2] mb-16">
            Selected Stories
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {CURATED.map((item, i) => (
            <Reveal key={item.src} delay={i * 120} className="flex flex-col">
              <article className="group flex flex-col">
                <div className="overflow-hidden mb-5">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--color-outline)] border border-[var(--color-outline-variant)] px-3 py-1">
                    {item.tag}
                  </span>
                  <h3 className="font-serif font-bold text-lg leading-[1.3] uppercase tracking-[0.05em]">
                    {item.title}
                  </h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
