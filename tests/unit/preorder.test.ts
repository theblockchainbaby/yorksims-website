import { describe, it, expect } from "vitest";
import { getBookById, isPreorder } from "../../app/lib/books";

describe("isPreorder", () => {
  const bfm = getBookById("built-for-more")!;
  const release = Date.parse(bfm.releaseAt!);

  it("Built For More is a preorder until its release moment", () => {
    expect(isPreorder(bfm, release - 1)).toBe(true);
    expect(isPreorder(bfm, release)).toBe(false);
    expect(isPreorder(bfm, release + 86_400_000)).toBe(false);
  });

  it("releases at midnight Pacific on December 11, 2026", () => {
    expect(bfm.releaseAt).toBe("2026-12-11T08:00:00Z");
    expect(bfm.releaseLabel).toBe("December 11");
  });

  it("books without a release date are never preorders", () => {
    expect(isPreorder(getBookById("figure-it-out")!)).toBe(false);
  });
});
