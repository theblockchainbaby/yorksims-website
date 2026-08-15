import { test, expect } from "@playwright/test";

test.describe("Tools", () => {
  test("tools index loads and shows tool cards", async ({ page }) => {
    const response = await page.goto("/tools");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(
      page.getByText("LLC Operating Agreement Generator")
    ).toBeVisible();
  });

  test("LLC generator wizard loads", async ({ page }) => {
    const response = await page.goto("/tools/llc-operating-agreement-generator");
    expect(response?.status()).toBe(200);

    // Step 1: entity name
    await expect(page.getByText(/What is the entity name/i)).toBeVisible();

    // Continue button is disabled until we fill the field
    const continueBtn = page.getByRole("button", { name: /continue/i });
    await expect(continueBtn).toBeDisabled();

    // Fill in and Continue enables
    await page.fill('input[placeholder*="Acme"]', "Test LLC");
    await expect(continueBtn).toBeEnabled();
  });

  test("LLC generator can walk through all 6 steps and generate", async ({
    page,
  }) => {
    await page.goto("/tools/llc-operating-agreement-generator");

    // Step 1
    await page.fill('input[placeholder*="Acme"]', "Test Holdings LLC");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2 (state + date are pre-filled)
    await expect(page.getByText(/Where is the LLC formed/i)).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3
    await expect(
      page.getByRole("heading", { name: /principal office/i })
    ).toBeVisible();
    await page.fill('input[placeholder*="Main"]', "123 Test St, Casper, WY 82601");
    await page.fill('textarea', "software consulting services");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4 — single-member is the default selection
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5 — member details
    await page.fill('input[placeholder*="York"]', "Test Member");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6 — management structure (default is selected)
    await page.getByRole("button", { name: /generate agreement/i }).click();

    // Result page shows the preview + email gate
    await expect(page.getByText(/Your Operating Agreement/i)).toBeVisible();
    await expect(page.getByText(/Unlock full agreement/i)).toBeVisible();
  });

  test("LLC generator emits SoftwareApplication + FAQPage schema", async ({
    page,
  }) => {
    await page.goto("/tools/llc-operating-agreement-generator");
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .all();
    const contents = await Promise.all(scripts.map((s) => s.textContent()));
    const hasSoftware = contents.some((c) =>
      c?.includes('"@type":"SoftwareApplication"')
    );
    const hasFaq = contents.some((c) => c?.includes('"@type":"FAQPage"'));
    expect(hasSoftware).toBe(true);
    expect(hasFaq).toBe(true);
  });
});
