import { test, expect } from "@playwright/test";

test.describe("Books storefront", () => {
  test("books page loads and shows all three books", async ({ page }) => {
    const response = await page.goto("/books");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(
      page.getByText("YORK: Built in Silence, Proven in Pressure")
    ).toBeVisible();
    await expect(page.getByText("Built For More")).toBeVisible();
    await expect(page.getByText("Figure It Out")).toBeVisible();
  });

  test("each book shows a price and a buy button", async ({ page }) => {
    await page.goto("/books");
    await expect(page.getByText("$50")).toBeVisible();
    await expect(page.getByText("$19").first()).toBeVisible();
    const buyButtons = page.getByRole("button", { name: /buy the pdf/i });
    await expect(buyButtons).toHaveCount(3);
  });

  test("nav links to the books page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Books" }).first()
    ).toBeVisible();
  });

  test("download API rejects requests without a session", async ({
    request,
  }) => {
    const res = await request.get("/api/download");
    expect(res.status()).toBe(400);
  });

  test("checkout API rejects unknown books", async ({ request }) => {
    const res = await request.post("/api/checkout", {
      data: { bookId: "not-a-real-book" },
    });
    expect(res.status()).toBe(400);
  });
});
