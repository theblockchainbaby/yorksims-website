import { describe, it, expect } from "vitest";
import sitemap from "../../app/sitemap";
import robots from "../../app/robots";
import { POSTS } from "../../app/lib/blog";
import { VERTICALS } from "../../app/lib/portals";
import { SHIPPED_TOOLS } from "../../app/lib/tools";
import { SITE } from "../../app/lib/seo";

describe("sitemap()", () => {
  const entries = sitemap();

  it("includes the home page", () => {
    expect(entries.some((e) => e.url === SITE.url)).toBe(true);
  });

  it("includes core static routes", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${SITE.url}/hub`);
    expect(urls).toContain(`${SITE.url}/verticals`);
    expect(urls).toContain(`${SITE.url}/blog`);
    expect(urls).toContain(`${SITE.url}/tools`);
    expect(urls).toContain(`${SITE.url}/contact`);
    expect(urls).toContain(`${SITE.url}/community`);
  });

  it("includes every blog post", () => {
    const urls = entries.map((e) => e.url);
    for (const post of POSTS) {
      expect(urls).toContain(`${SITE.url}/blog/${post.slug}`);
    }
  });

  it("includes every vertical", () => {
    const urls = entries.map((e) => e.url);
    for (const v of VERTICALS) {
      expect(urls).toContain(`${SITE.url}${v.route}`);
    }
  });

  it("includes every shipped tool", () => {
    const urls = entries.map((e) => e.url);
    for (const t of SHIPPED_TOOLS) {
      expect(urls).toContain(`${SITE.url}/tools/${t.slug}`);
    }
  });

  it("excludes auth-gated routes", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).not.toContain(`${SITE.url}/dashboard`);
    expect(urls).not.toContain(`${SITE.url}/signup`);
    expect(urls).not.toContain(`${SITE.url}/login`);
    expect(urls).not.toContain(`${SITE.url}/success`);
  });

  it("all lastModified dates are valid Dates", () => {
    for (const entry of entries) {
      const d = entry.lastModified as Date | undefined;
      expect(d).toBeInstanceOf(Date);
      expect((d as Date).getTime()).not.toBeNaN();
    }
  });

  it("priorities are within 0..1", () => {
    for (const entry of entries) {
      if (entry.priority !== undefined) {
        expect(entry.priority).toBeGreaterThanOrEqual(0);
        expect(entry.priority).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe("robots()", () => {
  const result = robots();

  it("points to the sitemap", () => {
    expect(result.sitemap).toBe(`${SITE.url}/sitemap.xml`);
  });

  it("has a wildcard rule", () => {
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const wildcard = rules.find(
      (r) => r.userAgent === "*" || (Array.isArray(r.userAgent) && r.userAgent.includes("*"))
    );
    expect(wildcard).toBeDefined();
  });

  it("disallows auth-gated routes", () => {
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const wildcard = rules.find((r) => r.userAgent === "*");
    const disallow = Array.isArray(wildcard?.disallow)
      ? wildcard?.disallow
      : wildcard?.disallow
        ? [wildcard.disallow]
        : [];
    expect(disallow).toEqual(
      expect.arrayContaining(["/api/", "/dashboard", "/portals"])
    );
  });
});
