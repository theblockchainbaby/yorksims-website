import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import path from "path";
import { BOOKS, getBookById, formatBookPrice } from "../../app/lib/books";

describe("BOOKS catalog", () => {
  it("contains exactly the three books", () => {
    expect(BOOKS.map((b) => b.id)).toEqual([
      "york-built-in-silence",
      "built-for-more",
      "figure-it-out",
    ]);
  });

  it("every book has required fields", () => {
    for (const book of BOOKS) {
      expect(book.id).toMatch(/^[a-z0-9-]+$/);
      expect(book.title).toBeTruthy();
      expect(book.tagline).toBeTruthy();
      expect(book.description).toBeTruthy();
      expect(book.cover).toMatch(/^\/books\/.+\.(webp|png|jpg)$/);
      expect(book.fileName).toMatch(/^[a-z0-9-]+\.pdf$/);
    }
  });

  it("prices are whole-dollar amounts in a sane range", () => {
    for (const book of BOOKS) {
      expect(book.priceCents % 100).toBe(0);
      expect(book.priceCents).toBeGreaterThanOrEqual(500);
      expect(book.priceCents).toBeLessThanOrEqual(10000);
    }
  });

  it("cover images exist in /public", () => {
    for (const book of BOOKS) {
      const coverPath = path.join(process.cwd(), "public", book.cover);
      expect(existsSync(coverPath), `missing cover: ${book.cover}`).toBe(true);
    }
  });

  it("every book's PDF exists in app/private/books", () => {
    for (const book of BOOKS) {
      const pdfPath = path.join(
        process.cwd(),
        "app",
        "private",
        "books",
        book.fileName
      );
      expect(existsSync(pdfPath), `missing PDF: ${book.fileName}`).toBe(true);
    }
  });

  it("ids are unique", () => {
    const ids = BOOKS.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getBookById", () => {
  it("finds each book by id", () => {
    for (const book of BOOKS) {
      expect(getBookById(book.id)).toBe(book);
    }
  });

  it("returns undefined for unknown ids", () => {
    expect(getBookById("not-a-book")).toBeUndefined();
    expect(getBookById("")).toBeUndefined();
  });
});

describe("formatBookPrice", () => {
  it("formats whole dollars without cents", () => {
    expect(formatBookPrice(2400)).toBe("$24");
    expect(formatBookPrice(1900)).toBe("$19");
  });
});
