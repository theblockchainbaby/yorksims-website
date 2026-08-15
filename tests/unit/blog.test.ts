import { describe, it, expect } from "vitest";
import { POSTS, getPostBySlug, getRelatedPosts } from "../../app/lib/blog";

describe("POSTS array", () => {
  it("contains posts", () => {
    expect(POSTS.length).toBeGreaterThan(0);
  });

  it("every post has required fields", () => {
    for (const post of POSTS) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.isoDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.readTime).toBeTruthy();
      expect(post.vertical).toBeTruthy();
      expect(post.verticalSlug).toBeTruthy();
      expect(post.author).toBeTruthy();
      expect(Array.isArray(post.tags)).toBe(true);
    }
  });

  it("every post has a unique slug", () => {
    const slugs = POSTS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("slugs are URL-safe (lowercase, hyphen-separated)", () => {
    for (const post of POSTS) {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("isoDate is parseable as a valid Date", () => {
    for (const post of POSTS) {
      const d = new Date(post.isoDate);
      expect(d.getTime()).not.toBeNaN();
    }
  });
});

describe("getPostBySlug", () => {
  it("returns a post for a known slug", () => {
    const post = getPostBySlug("business-runs-without-me");
    expect(post).toBeDefined();
    expect(post?.slug).toBe("business-runs-without-me");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPostBySlug("nope-not-a-real-slug")).toBeUndefined();
  });
});

describe("getRelatedPosts", () => {
  it("excludes the source post", () => {
    const related = getRelatedPosts("business-runs-without-me", 5);
    expect(related.every((p) => p.slug !== "business-runs-without-me")).toBe(
      true
    );
  });

  it("respects the limit", () => {
    const related = getRelatedPosts("business-runs-without-me", 2);
    expect(related.length).toBe(2);
  });

  it("prefers same-vertical posts first", () => {
    const related = getRelatedPosts("business-runs-without-me", 1);
    // business-runs-without-me is in the Business vertical, so
    // llc-operating-agreement (also Business) should come first.
    expect(related[0]?.verticalSlug).toBe("business");
  });
});
