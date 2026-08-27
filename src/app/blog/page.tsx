import { ContentPending } from "@/components/content-pending";
import { KulaFooter } from "@/components/layout/kula-footer";
import { PageHeader } from "@/components/ui/page-header";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "News, product updates and stories from the Kula team and the kitchens we work with.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="From the Kula kitchen"
        description="Product updates, vendor spotlights and notes from the road."
      >
        {/* The design's nav links to Blog but the export contains no blog screen,
            so there is no layout to port — this needs a content model first. */}
        <ContentPending source="Blog (no screen in the Figma export)" />
      </PageHeader>

      {/*
        Not a designed page — the Figma file has no frame for this route. It
        takes the design's consumer footer at its Home gap so the route is not
        left without one; there is no drawn value to transcribe.
      */}
      <KulaFooter />
    </>
  );
}
