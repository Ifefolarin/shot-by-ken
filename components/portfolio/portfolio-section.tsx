"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PortfolioSkeleton } from "./portfolio-skeleton";

type Category = "all" | "studio" | "weddings";

const PORTFOLIO_IMAGES = [
  { src: "/images/portfolio/01.jpg", alt: "Bride by the window in natural light",   width: 2048, height: 1365, category: "weddings" },
  { src: "/images/portfolio/02.jpg", alt: "Studio portrait on orange background",    width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/03.jpg", alt: "Couple laughing — black and white",       width: 1742, height: 2048, category: "weddings" },
  { src: "/images/portfolio/04.jpg", alt: "Woman in green dress among trees",         width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/05.jpg", alt: "Winter wedding first kiss",                width: 2048, height: 1365, category: "weddings" },
  { src: "/images/portfolio/06.jpg", alt: "Portrait with gold jewellery detail",      width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/09.jpg", alt: "Editorial portrait",                       width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/10.jpg", alt: "Studio portrait",                          width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/11.jpg", alt: "Portrait session",                         width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/12.jpg", alt: "Studio portrait session",                  width: 1393, height: 2048, category: "studio"   },
  { src: "/images/portfolio/13.jpg", alt: "Studio portrait",                          width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/14.jpg", alt: "Portrait session",                         width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/15.jpg", alt: "Editorial portrait session",               width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/16.jpg", alt: "Studio session portrait",                  width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/17.jpg", alt: "Portrait session",                         width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/18.jpg", alt: "Studio portrait",                          width: 1365, height: 2048, category: "studio"   },
  { src: "/images/portfolio/19.jpg", alt: "Wedding portrait session",                 width: 1365, height: 2048, category: "weddings" },
  { src: "/images/portfolio/20.jpg", alt: "Wedding photography",                      width: 1365, height: 2048, category: "weddings" },
  { src: "/images/portfolio/23.jpg", alt: "Wedding ceremony portrait",                width: 1365, height: 2048, category: "weddings" },
  { src: "/images/portfolio/24.jpg", alt: "Wedding day portrait",                     width: 1365, height: 2048, category: "weddings" },
] as const;

const FILTERS: { label: string; value: Category }[] = [
  { label: "All",      value: "all"      },
  { label: "Studio",   value: "studio"   },
  { label: "Weddings", value: "weddings" },
];

const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 6;

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState<Category>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLoaded(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filtered = active === "all"
    ? PORTFOLIO_IMAGES
    : PORTFOLIO_IMAGES.filter((img) => img.category === active);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleFilterChange(value: Category) {
    setActive(value);
    setVisibleCount(INITIAL_COUNT);
  }

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      aria-labelledby="portfolio-heading"
      className="pt-0 pb-[var(--spacing-section)] px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)] max-w-[1440px] mx-auto"
    >
      {/* Header */}
      <p className="font-sans text-[13px] font-medium tracking-[0.1em] uppercase text-[var(--color-outline)] mb-4">
        Work
      </p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <h2
          id="portfolio-heading"
          className="font-serif font-normal text-[clamp(2rem,4vw,2.5rem)] leading-[1.2]"
        >
          Selected Portfolio
        </h2>

        {/* Filter tabs */}
        <div role="tablist" aria-label="Filter portfolio by category" className="flex items-center">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              role="tab"
              aria-selected={active === value}
              onClick={() => handleFilterChange(value)}
              className={`
                font-sans text-[12px] font-medium tracking-[0.1em] uppercase
                px-5 py-2.5 border border-[var(--color-outline-variant)]
                -ml-px first:ml-0
                transition-colors duration-300
                ${active === value
                  ? "bg-[var(--color-primary)] text-[var(--color-surface)] border-[var(--color-primary)] z-10 relative"
                  : "bg-transparent text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]"}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {!loaded ? (
        <PortfolioSkeleton />
      ) : (
        <>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-[var(--spacing-stack-lg)]">
            {visible.map((img, i) => (
              <div
                key={`${img.src}-${active}`}
                className="mb-[var(--spacing-stack-lg)] break-inside-avoid overflow-hidden group"
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.4s ease forwards`,
                  animationDelay: `${i * 50}ms`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount((n) => n + LOAD_MORE_COUNT)}
                className="
                  font-sans text-[13px] font-medium tracking-[0.1em] uppercase
                  border border-[var(--color-primary)] text-[var(--color-primary)]
                  px-10 py-3
                  hover:bg-[var(--color-primary)] hover:text-[var(--color-surface)]
                  transition-colors duration-300
                "
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
}
