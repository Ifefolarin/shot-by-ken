import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="
        flex flex-col items-center justify-center
        min-h-[70vh]
        px-[var(--spacing-margin-mobile)] lg:px-[var(--spacing-margin-desktop)]
        text-center
      "
    >
      <p className="font-sans text-[12px] font-medium tracking-[0.12em] uppercase text-[var(--color-outline)] mb-6">
        Error 404
      </p>
      <h1 className="font-serif font-normal text-[clamp(4rem,10vw,7rem)] leading-none tracking-[-0.02em] mb-8">
        404
      </h1>
      <p className="font-sans text-lg text-[var(--color-on-surface-variant)] max-w-sm mb-12">
        This page doesn&apos;t exist — but great work lives here.
      </p>
      <Link
        href="/"
        className="
          font-sans text-[13px] font-medium tracking-[0.1em] uppercase
          bg-[var(--color-primary)] text-[var(--color-surface)]
          px-8 py-4
          hover:bg-[var(--color-on-surface-variant)] transition-colors duration-200
        "
      >
        Back to Home
      </Link>
    </main>
  );
}
