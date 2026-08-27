import type { LegalDocument } from "@/content/legal";

/**
 * Renders a legal document.
 *
 * Each clause is a real <section> with an <h2>, so the numbered structure is
 * navigable by heading rather than existing only as visual formatting.
 */
export function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <div className="flex flex-col gap-10">
      {document.blocks.map((block) => (
        <section key={block.heading}>
          <h2 className="text-2xl">{block.heading}</h2>

          {block.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="text-ink/80 mt-4 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {block.listIntro ? (
            <p className="text-ink/80 mt-4 leading-relaxed">{block.listIntro}</p>
          ) : null}

          {block.items ? (
            <ul className="text-ink/80 mt-4 list-disc space-y-2 pl-6 leading-relaxed">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
