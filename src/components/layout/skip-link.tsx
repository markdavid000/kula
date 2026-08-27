/**
 * Lets keyboard and screen-reader users jump past the header straight to the
 * page content (WCAG 2.4.1). Hidden until focused.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="bg-accent text-ink sr-only rounded-b-lg px-4 py-3 font-semibold focus:not-sr-only focus:absolute focus:top-0 focus:left-4 focus:z-100"
    >
      Skip to main content
    </a>
  );
}
