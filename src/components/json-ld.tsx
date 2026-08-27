/**
 * Renders a JSON-LD block.
 *
 * The payload is serialized with JSON.stringify and `<` escaped, so a value
 * containing "</script>" cannot break out of the tag — the standard injection
 * risk with structured data.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
