import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads with 200 status and renders the hero", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("has the expected title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/YorkSims/i);
  });

  test("has at least one link to the blog", async ({ page }) => {
    await page.goto("/");
    const blogLinks = page.locator('a[href="/blog"]');
    await expect(blogLinks.first()).toBeAttached();
  });

  test("emits JSON-LD for Organization", async ({ page }) => {
    await page.goto("/");
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const contents = await Promise.all(scripts.map((s) => s.textContent()));
    const anyHasOrganization = contents.some((c) =>
      c?.includes('"@type":"Organization"')
    );
    expect(anyHasOrganization).toBe(true);
  });
});
