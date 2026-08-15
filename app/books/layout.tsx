import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import { JsonLd, breadcrumbSchema, bookSchema } from "../components/JsonLd";
import { BOOKS } from "../lib/books";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Books by York Sims — PDF Downloads",
    description:
      "Three books by York Sims: the memoir YORK, Built For More for athletes after the game, and Figure It Out — twelve rules for building from nothing. Instant PDF download.",
    path: "/books",
  }),
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Books", path: "/books" },
          ]),
          ...BOOKS.map(bookSchema),
        ]}
      />
      {children}
    </>
  );
}
