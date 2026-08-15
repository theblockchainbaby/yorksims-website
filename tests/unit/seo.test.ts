import { describe, it, expect } from "vitest";
import { pageMetadata, absoluteUrl, SITE } from "../../app/lib/seo";

describe("absoluteUrl", () => {
  it("returns SITE.url for /", () => {
    expect(absoluteUrl("/")).toBe(SITE.url);
  });

  it("prefixes SITE.url for relative paths", () => {
    expect(absoluteUrl("/blog/foo")).toBe(`${SITE.url}/blog/foo`);
  });

  it("handles paths without leading slash", () => {
    expect(absoluteUrl("blog/bar")).toBe(`${SITE.url}/blog/bar`);
  });
});

describe("pageMetadata", () => {
  it("sets canonical to the absolute URL", () => {
    const m = pageMetadata({
      title: "Test",
      description: "Desc",
      path: "/blog/foo",
    });
    expect(m.alternates?.canonical).toBe(`${SITE.url}/blog/foo`);
  });

  it("sets indexable robots by default", () => {
    const m = pageMetadata({
      title: "Test",
      description: "Desc",
      path: "/",
    });
    expect(m.robots).toMatchObject({ index: true, follow: true });
  });

  it("sets noindex when noIndex: true", () => {
    const m = pageMetadata({
      title: "Test",
      description: "Desc",
      path: "/signup",
      noIndex: true,
    });
    expect(m.robots).toMatchObject({ index: false, follow: false });
  });

  it("populates openGraph with absolute image URL", () => {
    const m = pageMetadata({
      title: "Test",
      description: "Desc",
      path: "/",
    });
    const images = (m.openGraph as { images: { url: string }[] }).images;
    expect(images[0].url).toMatch(/^https:\/\//);
    expect(images[0].url).toContain(SITE.url);
  });

  it("passes through custom OG image path as absolute", () => {
    const m = pageMetadata({
      title: "Test",
      description: "Desc",
      path: "/",
      ogImage: "/custom.png",
    });
    const images = (m.openGraph as { images: { url: string }[] }).images;
    expect(images[0].url).toBe(`${SITE.url}/custom.png`);
  });

  it("keeps externally-provided absolute image URLs", () => {
    const m = pageMetadata({
      title: "Test",
      description: "Desc",
      path: "/",
      ogImage: "https://example.com/image.png",
    });
    const images = (m.openGraph as { images: { url: string }[] }).images;
    expect(images[0].url).toBe("https://example.com/image.png");
  });

  it("article type includes publishedTime", () => {
    const m = pageMetadata({
      title: "Test",
      description: "Desc",
      path: "/blog/foo",
      type: "article",
      publishedTime: "2026-01-01",
    });
    expect((m.openGraph as { type: string }).type).toBe("article");
    expect((m.openGraph as { publishedTime: string }).publishedTime).toBe(
      "2026-01-01"
    );
  });

  it("twitter card is summary_large_image", () => {
    const m = pageMetadata({
      title: "Test",
      description: "Desc",
      path: "/",
    });
    expect((m.twitter as { card: string }).card).toBe("summary_large_image");
  });
});
