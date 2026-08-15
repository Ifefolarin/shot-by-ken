import Image from "next/image";

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative h-[100dvh] min-h-[600px] flex items-end"
    >
      {/* Mobile hero image (portrait, grayscale) */}
      <Image
        src="/images/hero-mobile.jpg"
        alt="Bride portrait photograph by Ken"
        fill
        priority
        quality={90}
        className="object-cover object-top grayscale md:hidden"
        sizes="100vw"
      />

      {/* Desktop hero image */}
      <Image
        src="/images/hero.jpg"
        alt="Artistic portrait photograph by Ken"
        fill
        priority
        quality={90}
        className="object-cover object-center hidden md:block"
        sizes="100vw"
      />

      {/* Gradient overlay — bottom-heavy for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
      />

      {/* Content — staggered CSS entry via .hero-eyebrow / .hero-heading */}
      <div
        className="
          relative z-10 w-full
          px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)]
          pb-20 lg:pb-28
          max-w-[1440px] mx-auto
        "
      >
        <p className="
          hero-eyebrow
          font-sans text-[13px] font-medium tracking-[0.15em] uppercase
          text-[var(--color-secondary)] mb-5
        ">
          Photography by Ken
        </p>

        <h1 className="
          hero-heading
          font-serif font-normal text-white
          text-[clamp(2.75rem,6vw,5rem)] leading-[1.08] tracking-[-0.02em]
          max-w-3xl
        ">
          Moments captured<br className="hidden sm:block" /> with intention.
        </h1>

      </div>
    </section>
  );
}
