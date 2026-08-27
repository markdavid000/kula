"use client";

import { useSearchParams } from "next/navigation";

/**
 * Echoes the query handed over by the hero search field.
 *
 * Read on the client on purpose: doing it via the page's `searchParams` would
 * opt the whole vendors route out of static prerendering for the sake of one
 * line of text. Wrapped in <Suspense> by the caller, as Next requires.
 */
export function SearchNotice() {
  const query = useSearchParams().get("q")?.trim();
  if (!query) return null;

  return (
    <p className="border-brand/40 bg-brand/10 text-ink mt-8 rounded-2xl border px-4 py-3">
      Showing vendors for <strong className="font-semibold">{query}</strong>. Full menu search lives
      in the Kula app.
    </p>
  );
}
