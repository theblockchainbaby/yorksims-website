# Private book PDFs

Drop the final PDF of each book in this folder. These files are **not** publicly
served — `/api/download` streams them only after Stripe confirms payment.

Required filenames (must match `fileName` in `app/lib/books.ts`):

| Book                                        | Filename                      |
| ------------------------------------------- | ----------------------------- |
| YORK: Built in Silence, Proven in Pressure  | `york-built-in-silence.pdf`   |
| Built For More                              | `built-for-more.pdf`          |
| Figure It Out                               | `figure-it-out.pdf`           |

Until a file is here, buyers of that book see: "purchase confirmed, download
temporarily unavailable — email contact@yorksims.com" on the success page.

Notes:

- Do **not** put these in `/public` — that would let anyone download them free.
- `next.config.ts` has `outputFileTracingIncludes` for this folder so Vercel
  bundles the PDFs with the download route. Keep files reasonably sized
  (Vercel functions cap around 250 MB uncompressed total).
- After adding a PDF, redeploy.
