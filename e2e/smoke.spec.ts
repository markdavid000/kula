import { expect, test } from "@playwright/test";

test.describe("site shell", () => {
  test("home page renders with a single h1 and working nav", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

    await page
      .getByRole("navigation", { name: "Primary" })
      .first()
      .getByRole("link", { name: "Riders" })
      .click();
    await expect(page).toHaveURL(/\/riders$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Ride");
  });

  test("skip link is the first tab stop and moves focus to main", async ({ page }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });

  test("serves security headers", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response?.headers() ?? {};

    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers).not.toHaveProperty("x-powered-by");
  });

  test("exposes a sitemap and robots.txt", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain("/riders");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toContain("Sitemap:");
  });

  test("publishes structured data and honours the route table", async ({ page, request }) => {
    await page.goto("/");
    const types = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts.flatMap((s) => {
        const data = JSON.parse(s.textContent ?? "{}");
        return (data["@graph"] ?? [data]).map((node: { "@type": string }) => node["@type"]);
      }),
    );
    expect(types).toEqual(expect.arrayContaining(["LocalBusiness", "WebSite", "FAQPage"]));

    await page.goto("/blog");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/blog");

    const llms = await request.get("/llms.txt");
    expect(llms.ok()).toBe(true);
    expect(await llms.text()).toContain("## Key facts");
  });

  test("every page has its own share card, and the app icons are served", async ({ page }) => {
    for (const path of ["/", "/vendors", "/riders", "/legal/terms"]) {
      await page.goto(path);
      const card = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(new URL(card ?? "").pathname).toBe(`${path === "/" ? "" : path}/opengraph-image`);

      const image = await page.request.get(card ?? "");
      expect(image.headers()["content-type"]).toBe("image/png");
    }

    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
    const manifest = await (await page.request.get("/manifest.webmanifest")).json();
    expect(manifest.icons).toHaveLength(3);
  });

  test("unknown routes return the 404 page", async ({ page }) => {
    const response = await page.goto("/definitely-not-a-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("couldn't find");
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("menu toggles and reports its state", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Open main menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(page.getByRole("button", { name: "Close main menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open main menu" })).toBeFocused();
  });
});
