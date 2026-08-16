"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CURATED = [
  {
    src: "/images/curated/01.jpg",
    alt: "Gold lace portrait — studio session",
    width: 1336,
    height: 2048,
    tag: "Studio Session",
    title: "Black Valentine",
    index: "01",
  },
  {
    src: "/images/curated/02.jpg",
    alt: "A proposal moment captured against a floral wall",
    width: 2048,
    height: 1365,
    tag: "Wedding",
    title: "The Proposal",
    index: "02",
  },
  {
    src: "/images/curated/03.jpg",
    alt: "Steph and Favour — wedding portrait",
    width: 1742,
    height: 2048,
    tag: "Wedding",
    title: "Steph and Favour",
    index: "03",
  },
] as const;

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function CuratedRow({
  item,
  reversed,
}: {
  item: (typeof CURATED)[number];
  reversed: boolean;
}) {
  const { ref: imgRef, visible: imgVisible } = useReveal();
  const { ref: textRef, visible: textVisible } = useReveal();

  return (
    <article
      className={`
        flex flex-col
        ${reversed ? "md:flex-row-reverse" : "md:flex-row"}
        items-center gap-10 md:gap-16 lg:gap-24
        mb-24 md:mb-40 last:mb-0
      `}
    >
      {/* Image */}
      <div
        ref={imgRef}
        className="w-full md:w-1/2"
        style={{
          opacity: imgVisible ? 1 : 0,
          transform: imgVisible ? "none" : "translateY(2.5rem)",
          transition:
            "opacity 0.9s cubic-bezier(0.32,0.72,0,1), transform 0.9s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Double-bezel shell */}
        <div className="p-1.5 bg-black/[0.025] ring-1 ring-black/[0.05]">
          {/* Inner core */}
          <div className="overflow-hidden group">
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Text */}
      <div
        ref={textRef}
        className="w-full md:w-1/2 flex flex-col justify-center"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "none" : "translateY(1.5rem)",
          transition:
            "opacity 0.9s cubic-bezier(0.32,0.72,0,1) 130ms, transform 0.9s cubic-bezier(0.32,0.72,0,1) 130ms",
        }}
      >
        <span className="font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-[var(--color-outline)] mb-5 block">
          {item.index}
        </span>
        <span
          className="
            inline-flex mb-5 w-max
            rounded-full px-3 py-1
            text-[10px] font-medium font-sans uppercase tracking-[0.2em]
            border border-[var(--color-outline-variant)]
            text-[var(--color-outline)]
          "
        >
          {item.tag}
        </span>
        <h3
          className="
            font-serif font-normal
            text-[clamp(2.25rem,5vw,3.75rem)]
            leading-[1.05] tracking-[-0.01em]
            text-[var(--color-primary)]
            mb-8
          "
        >
          {item.title}
        </h3>
        <div
          className="h-px w-14 bg-[var(--color-outline-variant)] origin-left"
          style={{
            transform: textVisible ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.9s cubic-bezier(0.32,0.72,0,1) 380ms",
          }}
        />
      </div>
    </article>
  );
}

export function CuratedWorksSection() {
  const { ref: headRef, visible: headVisible } = useReveal(0.2);

  return (
    <section aria-label="Curated works" className="py-[var(--spacing-section)]">
      <div className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)]">
        {/* Section header */}
        <div
          ref={headRef}
          className="mb-20 md:mb-32"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "none" : "translateY(1.5rem)",
            transition:
              "opacity 0.8s cubic-bezier(0.32,0.72,0,1), transform 0.8s cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          <p className="font-sans text-[13px] font-medium tracking-[0.1em] uppercase text-[var(--color-outline)] mb-4">
            Curated Works
          </p>
          <h2 className="font-serif font-normal text-[clamp(2rem,4vw,2.5rem)] leading-[1.2]">
            Selected Stories
          </h2>
        </div>

        {/* Zigzag rows: 1→right, 2→left, 3→right */}
        {CURATED.map((item, i) => (
          <CuratedRow key={item.src} item={item} reversed={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}
