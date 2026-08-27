import type { Metadata } from "next";

import { KulaFooter } from "@/components/layout/kula-footer";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Container className="flex flex-col items-start gap-6 py-32">
        <p className="text-brand text-sm font-semibold tracking-wide uppercase">Error 404</p>
        <h1 className="max-w-2xl text-5xl">We couldn&apos;t find that page</h1>
        <p className="text-muted max-w-prose text-lg">
          The link may be out of date, or the page may have moved. Let&apos;s get you back to
          something you can order from.
        </p>
        <ButtonLink href="/">Back to home</ButtonLink>
      </Container>

      {/*
        Not a designed page — the Figma file has no frame for this route. It
        takes the design's consumer footer at its Home gap so the route is not
        left without one; there is no drawn value to transcribe.
      */}
      <KulaFooter />
    </>
  );
}
