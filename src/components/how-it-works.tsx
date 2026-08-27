import Image from "next/image";

import { Container } from "@/components/ui/container";
import { orderSteps } from "@/content/pages";

/**
 * "Get your order in 3 easy steps" — Figma node 264:2842.
 *
 * The design draws this as a pale-lemon panel whose top corners are rounded to
 * 1000px, making a dome. `rounded-t-[1000px]` reproduces that at the design's
 * width and degrades to a gentler curve on narrow screens, where a true
 * semicircle would eat most of the viewport height.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-lemon mt-16 rounded-t-[1000px] pt-32 pb-20"
    >
      <Container>
        <h2 id="how-it-works-heading" className="mx-auto max-w-3xl text-center text-6xl">
          Get your order in 3 easy steps
        </h2>

        <ol className="mt-14 grid grid-cols-3 gap-8">
          {orderSteps.map((step) => (
            <li
              key={step.title}
              className="border-ink overflow-hidden rounded-[28px] border bg-transparent"
            >
              <div className="border-ink relative aspect-[822/620] border-b">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl">{step.title}</h3>
                <p className="text-ink/70 mt-2 leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
