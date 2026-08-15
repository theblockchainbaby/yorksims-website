import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("blog index loads and lists posts", async ({ page }) => {
    const response = await page.goto("/blog");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();

    // At least a handful of post cards should be present
    const postLinks = page.locator('a[href^="/blog/"]');
    expect(await postLinks.count()).toBeGreaterThan(3);
  });

  test("an individual blog post loads with correct metadata", async ({ page }) => {
    const response = await page.goto("/blog/business-runs-without-me");
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Business.*YorkSims/i);

    // BlogPosting schema should be present
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .all();
    const contents = await Promise.all(scripts.map((s) => s.textContent()));
    const hasBlogPosting = contents.some((c) => c?.includes('"@type":"BlogPosting"'));
    expect(hasBlogPosting).toBe(true);
  });

  test("the newest blog post (ai-tools-skills-repos) loads", async ({ page }) => {
    const response = await page.goto("/blog/ai-tools-skills-repos");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("back link from post returns to blog index", async ({ page }) => {
    await page.goto("/blog/business-runs-without-me");
    const backLink = page.locator('a[href="/blog"]').first();
    await backLink.click();
    await expect(page).toHaveURL(/\/blog$/);
  });
});
