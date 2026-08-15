export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[100]
        focus:bg-[var(--color-primary)] focus:text-[var(--color-surface)]
        focus:px-4 focus:py-2 focus:text-sm focus:font-sans
        focus:tracking-widest focus:uppercase
      "
    >
      Skip to main content
    </a>
  );
}
