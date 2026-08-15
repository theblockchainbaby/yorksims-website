/**
 * YorkSims.com — Book catalog.
 *
 * Single source of truth for the three purchasable PDF books. Read by:
 *   - app/books/page.tsx            (public storefront)
 *   - app/books/layout.tsx          (metadata + Book JSON-LD)
 *   - app/portals/books/page.tsx    (books portal items)
 *   - app/api/checkout/route.ts     (server-side price — never trust the client)
 *   - app/api/download/route.ts     (maps a paid session to its PDF file)
 *   - app/sitemap.ts                (via the /books static route)
 *
 * PDF files are NOT stored in /public (that would bypass payment). They live
 * in app/private/books/ — see the README there for how to add them.
 */

export interface Book {
  /** Stable id — used as the Stripe metadata key and checkout identifier. */
  id: string;
  title: string;
  /** Short hook shown under the title on the storefront. */
  tagline: string;
  description: string;
  /** Cover image path under /public. */
  cover: string;
  /** PDF price in USD cents — the server-side amount sent to Stripe. */
  priceCents: number;
  /**
   * Physical copy price in USD cents, shipping included (US only).
   * Fulfilled manually: each paid order lands in the Stripe dashboard with
   * the buyer's shipping address; York places a Lulu print order to that
   * address. Print costs (2026-08): YORK $27.68, BFM $7.87, FIO $9.02.
   */
  printPriceCents: number;
  printFormat: "hardcover" | "paperback";
  /** PDF filename inside app/private/books/. */
  fileName: string;
  /** ISBN or year published, if known. Optional display metadata. */
  year?: number;
}

export const BOOKS: Book[] = [
  {
    id: "york-built-in-silence",
    title: "YORK: Built in Silence, Proven in Pressure",
    tagline: "The memoir.",
    description:
      "The full story of building, losing, and rebuilding when no one was watching. From D1 basketball to pro ball in Ankara to founding companies across 10 industries.",
    cover: "/books/york.webp",
    priceCents: 5000,
    printPriceCents: 10000,
    printFormat: "hardcover",
    fileName: "york-built-in-silence.pdf",
  },
  {
    id: "built-for-more",
    title: "Built For More",
    tagline: "Life after the game.",
    description:
      "Why every athlete's career ends, and how to build an identity that doesn't. For every athlete, every sport, every level.",
    cover: "/books/built-for-more.webp",
    priceCents: 1900,
    printPriceCents: 3000,
    printFormat: "paperback",
    fileName: "built-for-more.pdf",
  },
  {
    id: "figure-it-out",
    title: "Figure It Out",
    tagline: "Twelve rules for building from nothing.",
    description:
      "Resilience and self-reliance when no one hands you the answers. Twelve rules for building something from nothing.",
    cover: "/books/figure-it-out.webp",
    priceCents: 1900,
    printPriceCents: 3000,
    printFormat: "paperback",
    fileName: "figure-it-out.pdf",
  },
];

export function getBookById(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

/** "$24" — whole dollars, no trailing zeros (all books are whole-dollar). */
export function formatBookPrice(priceCents: number): string {
  return `$${Math.round(priceCents / 100)}`;
}
