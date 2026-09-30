import { ContactForm } from "@/components/contact-form";
import { KulaFooter } from "@/components/layout/kula-footer";
import { ContactDetails } from "@/components/marketing";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.name} team about orders, becoming a vendor, or riding with us.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Clears the fixed header — see PageHeader. */}
      <Container className="pt-[calc(clamp(76px,8.1944vw,118px)+2.5rem)] pb-20">
        <h1 className="max-w-3xl text-[clamp(36px,4.1667vw,60px)] leading-[1.1]">
          Need to Reach us?
        </h1>

        <div className="mt-12">
          <ContactDetails>
            <ContactForm />
          </ContactDetails>
        </div>
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
