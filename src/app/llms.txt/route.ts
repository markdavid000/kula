import { hero } from "@/content/home";
import { homeFaqItems } from "@/content/home-faq";
import { privacyPolicy } from "@/content/legal-privacy";
import { refundPolicy } from "@/content/legal-refunds";
import { termsAndConditions } from "@/content/legal-terms";
import { ridersFaq, ridersHero } from "@/content/riders-page";
import { vendorsFaqItems, vendorsHero } from "@/content/vendors-page";
import type { IndexablePath } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig, socialProfiles } from "@/lib/site";

/**
 * /llms.txt — a plain-Markdown fact sheet for AI assistants and answer engines,
 * in the format proposed at llmstxt.org.
 *
 * Nothing here is written for it: every line is assembled from the same
 * content modules the pages render, so it cannot say anything the site does not.
 * It is a convenience for crawlers that read it — the pages themselves, which
 * are fully prerendered HTML with structured data, remain the real source.
 */
export const dynamic = "force-static";

/** One line per indexable page. Typed so a newly indexable page must be added. */
const pages: Record<IndexablePath, { title: string; summary: string }> = {
  "/": { title: "Home", summary: hero.subhead },
  "/vendors": {
    title: "Sell on Kula",
    summary: `${vendorsHero.titleLead}${vendorsHero.titleAccent} ${vendorsHero.subtitle}`,
  },
  "/riders": { title: "Ride with Kula", summary: `${ridersHero.title}. ${ridersHero.subtitle}` },
  "/legal/terms": { title: termsAndConditions.title, summary: termsAndConditions.intro },
  "/legal/privacy": { title: privacyPolicy.title, summary: privacyPolicy.intro },
  "/legal/refunds": { title: refundPolicy.title, summary: refundPolicy.intro },
};

function faq(heading: string, items: readonly { question: string; answer?: string }[]) {
  const answered = items.filter((item) => item.answer);
  return [
    `## ${heading}`,
    "",
    ...answered.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
  ];
}

export function GET() {
  const { contact } = siteConfig;
  const link = (path: IndexablePath) =>
    `- [${pages[path].title}](${absoluteUrl(path)}): ${pages[path].summary}`;

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.about} ${siteConfig.description}`,
    "",
    "## Key facts",
    "",
    `- Company: ${siteConfig.legalName}`,
    `- What it is: ${siteConfig.tagline} — food delivery from local kitchens, by Kula riders`,
    `- Where: ${siteConfig.servedCities.join(", ")} (${contact.region}, Nigeria)`,
    `- Office: ${contact.address}, ${contact.region}`,
    `- Phone: ${contact.phone}`,
    `- Email: ${contact.email}`,
    `- Social: ${socialProfiles.join(", ")}`,
    "",
    "## Pages",
    "",
    ...(Object.keys(pages) as IndexablePath[]).map(link),
    "",
    ...faq("Ordering food — FAQ", homeFaqItems),
    ...faq("Selling on Kula (vendors) — FAQ", vendorsFaqItems),
    ...faq("Riding with Kula (riders) — FAQ", ridersFaq.items),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
