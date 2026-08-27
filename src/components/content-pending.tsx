/**
 * Marks a page whose copy and layout still need to come from the Figma design.
 *
 * Rendered visibly on purpose: an unfinished page that *looks* finished is how
 * placeholder content reaches production. Delete this component once every
 * route has its real content.
 */
export function ContentPending({ source }: { source: string }) {
  return (
    <aside
      role="note"
      className="border-brand/40 bg-brand/8 text-ink mt-10 rounded-2xl border border-dashed p-5"
    >
      <p className="font-semibold">Design content pending</p>
      <p className="text-muted mt-1 text-sm">
        This page&apos;s layout and copy come from <code className="font-mono">{source}</code> in
        the Kula Figma export, which exceeds the 256&nbsp;KB read limit of the design API. The page
        shell, metadata and routing are final.
      </p>
    </aside>
  );
}
