import { test, expect } from "@playwright/test";

test.describe("SEO infrastructure", () => {
  test("sitemap.xml loads and contains key pages", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("yorksims.com");
    expect(body).toContain("/blog/business-runs-without-me");
    expect(body).toContain("/verticals/software");
    expect(body).toContain("/tools/llc-operating-agreement-generator");
  });

  test("robots.txt loads and references the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body.toLowerCase()).toContain("sitemap");
    expect(body).toContain("Disallow");
  });

  test("manifest.webmanifest loads", async ({ request }) => {
    const res = await request.get("/manifest.webmanifest");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toContain("YorkSims");
  });

  test("404 page renders the not-found component", async ({ page }) => {
    const response = await page.goto("/this-route-will-never-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/Wrong turn/i)).toBeVisible();
  });
});
