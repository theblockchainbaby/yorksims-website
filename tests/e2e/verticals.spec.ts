import { test, expect } from "@playwright/test";

test.describe("Verticals", () => {
  test("verticals index loads", async ({ page }) => {
    const response = await page.goto("/verticals");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("one vertical page (ai-agents) loads with curriculum content", async ({
    page,
  }) => {
    const response = await page.goto("/verticals/ai-agents");
    expect(response?.status()).toBe(200);

    // Has the vertical title
    await expect(page.locator("h1").first()).toBeVisible();

    // Has curriculum section
    await expect(page.getByText("Curriculum", { exact: false })).toBeVisible();

    // Has case study section
    await expect(page.getByText("Case Study", { exact: false })).toBeVisible();
  });

  test("vertical page emits Course schema", async ({ page }) => {
    await page.goto("/verticals/software");
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .all();
    const contents = await Promise.all(scripts.map((s) => s.textContent()));
    const hasCourse = contents.some((c) => c?.includes('"@type":"Course"'));
    expect(hasCourse).toBe(true);
  });
});
