# CLAUDE.md — Instructions for AI assistants working on this repo

> Read this first. Every piece of guidance below has a reason, and those reasons are non-obvious from reading the code alone.

---

## 1. Project identity

This is **YorkSims.com** — a Next.js 16 subscription learning + execution platform documenting York Sims building across 10 industries. Dark-first design, `#e63946` red accent, Geist fonts, Tailwind 4. See `docs/marketing/product-context.md` for the positioning and `docs/brand/brand-guidelines.md` for the visual system.

**Holding company:** Caipher AI LLC (Wyoming).
**Founder:** York Sims — former D1 basketball, pro in Ankara, now building.
**Tagline:** Teaching Execution, Not Theory.

## 2. Source of truth files

Before making meaningful changes, read:

| Purpose                              | File                                               |
| ------------------------------------ | -------------------------------------------------- |
| Product positioning, ICP, voice      | `docs/marketing/product-context.md`                |
| Visual design system                 | `docs/brand/brand-guidelines.md`                   |
| Full site architecture               | `docs/architecture/site-map.md`                    |
| SEO strategy                         | `docs/seo/plan.md`                                 |
| SEO audit findings                   | `docs/seo/audit.md`                                |
| Growth / content / email / social    | `docs/marketing/growth-content-and-lifecycle.md`   |
| CRO / pricing / funnels              | `docs/marketing/growth-conversion.md`              |
| Launch / ads / sales                 | `docs/marketing/growth-launch-and-acquisition.md`  |
| Analytics / research / A/B           | `docs/marketing/growth-measurement.md`             |
| Copy voice and edit rules            | `docs/marketing/positioning-and-copy.md`           |
| Testing strategy                     | `docs/engineering/testing-strategy.md`             |
| Verification checklist               | `docs/engineering/verification-checklist.md`       |
| Debugging playbook                   | `docs/engineering/debugging-playbook.md`           |

Don't regenerate these from scratch. Edit in place.

## 3. Stack

- **Framework:** Next.js 16 (App Router, RSC, streaming)
- **Runtime:** React 19
- **Styling:** Tailwind 4 + `app/globals.css`
- **Fonts:** `next/font/google` → Geist + Geist Mono
- **Database:** Supabase (Postgres + auth + SSR)
- **Payments:** Stripe (Checkout, subscriptions, webhooks)
- **Animation:** Framer Motion (primary), GSAP (complex), Lenis (scroll)
- **3D:** Three.js (hero scene only)
- **Web3:** ethers.js + Web3Modal
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Deploy:** Vercel

Scripts: `dev`, `build`, `start`, `lint`, `test`, `test:ci`, `test:coverage`, `test:e2e`, `test:e2e:ui`.

## 4. Architectural conventions

### 4.1 File layout

```text
app/
  layout.tsx              — root layout, metadata, JsonLd org/website/person
  page.tsx                — home
  sitemap.ts              — dynamic sitemap from lib/blog + lib/portals + lib/tools
  robots.ts               — allow/disallow rules
  manifest.ts             — PWA manifest
  not-found.tsx           — 404 page
  api/og/route.tsx        — dynamic OG image generator
  api/checkout/           — Stripe checkout: one-time book PDF purchases (no subscriptions)
  api/download/route.ts   — Stripe-verified PDF delivery (reads app/private/books/)
  api/leads/route.ts      — lead capture endpoint (writes to Supabase leads table)
  books/                  — public book storefront (3 PDFs, Stripe checkout)
  private/books/          — the actual PDFs, payment-gated (see README there)
  lib/
    seo.ts                — SITE constants + pageMetadata() helper
    books.ts              — BOOKS catalog: the 3 paid PDFs, server-side prices, file names
    blog.ts               — POSTS array + getPostBySlug + VERTICAL_COLORS
    portals.ts            — VERTICALS array (10 verticals)
    vertical-content.ts   — rich per-vertical content (modules, stack, case study, SEO)
    tools.ts              — TOOLS registry (shipped + coming-soon lead magnets)
    llc-template.ts       — LLC operating agreement generator logic
    supabase.ts           — client-side supabase (anon key)
    supabase-server.ts    — server-side supabase (service role, RLS-bypass)
    utils.ts              — clsx helper
  components/
    Nav.tsx
    JsonLd.tsx            — schema.org helpers (Organization, Course, BlogPosting, etc.)
    BlogPostShell.tsx     — reusable blog post chrome (client component)
    [...other components]
  blog/
    page.tsx              — blog index (client, reads from lib/blog)
    layout.tsx            — /blog metadata + Blog schema
    [slug]/page.tsx       — individual post pages (server components)
    [slug]/layout.tsx     — per-post metadata + BlogPosting schema
  verticals/
    page.tsx              — /verticals index
    layout.tsx            — /verticals metadata
    [slug]/page.tsx       — dynamic vertical page reads lib/vertical-content
    [slug]/layout.tsx     — per-vertical generateMetadata + Course schema
  tools/
    page.tsx              — /tools index
    layout.tsx            — /tools metadata
    llc-operating-agreement-generator/
      page.tsx            — 6-step wizard (client)
      layout.tsx          — metadata + SoftwareApplication + FAQPage schema
  portals/                — auth-gated member portals
  hub/ contact/ community/ signup/ login/ dashboard/ success/
    page.tsx + layout.tsx per route

tests/
  setup.ts                — vitest + jest-dom setup
  unit/                   — Vitest unit tests for lib/* helpers
  e2e/                    — Playwright E2E smoke tests

supabase/
  migrations/             — SQL migrations applied via Supabase SQL Editor
    0001_leads_table.sql
    README.md
```

### 4.2 Metadata pattern

- **Every public route has a `layout.tsx`** that exports `metadata` (static) or `generateMetadata` (dynamic)
- Use `pageMetadata()` from `lib/seo.ts` to build the metadata object — this guarantees canonical URL, OG, Twitter, robots are consistent
- Auth-gated routes set `noIndex: true`
- JSON-LD is emitted via `<JsonLd data={...} />` in the layout, not page

### 4.3 SEO rule of thumb

If you add a new public route:

1. Add a `layout.tsx` with `pageMetadata(...)`
2. Add the route to `app/sitemap.ts`
3. Decide if it needs JSON-LD and add it in the layout
4. Add it to `docs/architecture/site-map.md`
5. Add a Playwright smoke test that hits it

### 4.4 Styling

- Tailwind for 95% of styling
- Inline `style={{}}` ONLY for values Tailwind doesn't express cleanly (border-radius 24px, etc.)
- **Never** add new CSS-in-JS libraries
- **Never** add a UI library other than shadcn/ui if truly needed
- Dark mode only — no light mode logic anywhere
- Use the transparency ladder for text colors: `white/0.8` → headlines, `white/0.5` → body, `white/0.3` → secondary, `white/0.2` → tertiary

### 4.5 Animation

- Framer Motion for entrance and hover
- Standard easing: `[0.16, 1, 0.3, 1]`
- Standard duration: `0.8s` for entrance, `0.5s` for hover
- Use `useInView` with `margin: "-60px"` for scroll-triggered reveals
- Respect `prefers-reduced-motion` (TODO)

## 5. Non-obvious rules

### 5.1 Client vs server components

- Pages that use Framer Motion, useState, useEffect, event handlers → client components (`"use client"`)
- Pages that need `export const metadata` or `generateMetadata` → server components
- **Trick:** put metadata in `layout.tsx` (server) and keep the page.tsx as client. Both work together.

### 5.2 The blog POSTS array is the source of truth

- Defined in `app/lib/blog.ts`
- All blog data (slugs, dates, verticals, tags, excerpts) lives here
- `app/blog/page.tsx` imports `POSTS` and renders
- `app/sitemap.ts` imports `POSTS` and emits sitemap entries
- Individual post layouts use `getPostBySlug(SLUG)` for metadata + JSON-LD
- **Never** duplicate post metadata in the page.tsx itself

### 5.3 The vertical content lives in two places

- `app/lib/portals.ts` — `VERTICALS` array (id, num, title, shortTitle, desc, tags, route)
- `app/lib/vertical-content.ts` — `VERTICAL_CONTENT` record (longDescription, modules, stack, case study, SEO)
- The dynamic vertical page reads from both
- **To add a new vertical:** update `portals.ts` AND `vertical-content.ts`, then the sitemap picks it up automatically

### 5.4 The tools registry

- `app/lib/tools.ts` — `TOOLS` array with `status: "shipped" | "coming-soon"`
- `SHIPPED_TOOLS` is the filtered list used by the sitemap
- Adding a new tool: update `TOOLS` first, then create `app/tools/[slug]/page.tsx` + `layout.tsx`, then set `status: "shipped"`
- Tool pages should emit `SoftwareApplication` + `FAQPage` + `BreadcrumbList` schema

### 5.5 Images

- Currently uses `<img>` with `eslint-disable-next-line`. This is a known tech debt item (see `docs/seo/audit.md`).
- Going forward, use `next/image`. Migrate existing usages incrementally.
- Every image needs `alt` text — not empty, not SEO keywords, descriptive.

### 5.6 The passcode gate

- `<PasscodeGate>` wraps the app in `app/layout.tsx`
- **Unknown status:** does it block Googlebot? Verify before SEO matters. See `docs/seo/audit.md` section 1.
- If it blocks crawlers, either whitelist Googlebot by user-agent or remove from public routes.

### 5.7 Testing

- Unit tests live in `tests/unit/*.test.ts` and target `app/lib/*` helpers
- E2E tests live in `tests/e2e/*.spec.ts` and run against a real dev server
- `npm run test` runs vitest in watch mode; `npm run test:ci` runs once for CI
- `npm run test:e2e` runs Playwright (requires `npx playwright install` once)
- See `docs/engineering/testing-strategy.md` for the pyramid and priority order
- Every new feature should add at least one test (unit if pure, E2E if route-level)

### 5.8 Environment variables

- `NEXT_PUBLIC_SUPABASE_URL` — public, used client + server
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public, anon access (RLS-gated)
- `SUPABASE_SERVICE_ROLE_KEY` — **server-only**, bypasses RLS, required for `/api/leads` and any other trusted inserts. Never import from a client component.
- Stripe keys in `.env.local`
- Never commit `.env.local`
- Never print env vars in logs
- Supabase migrations live in `supabase/migrations/` — apply via SQL Editor, see `supabase/migrations/README.md`

## 6. Voice & tone when generating copy

Read `docs/marketing/positioning-and-copy.md` first. Key rules:

- **Ban list:** game-changing, unleash, revolutionary, 10x, secret, hack, insane, crazy, magical, transform, leverage (as verb), seamlessly, effortlessly, mindblowing
- **Prefer:** ship, build, real, actual, receipts, the code, specific numbers
- **"I"** when the voice is York (blog posts, personal). **"you"** when addressing the reader. **Never "we"** — it's dishonest for a solo founder.
- **Sentence length:** average under 20 words. Vary rhythm.
- **Headline case:** sentence case in h2/h3, Title Case only for branded H1 statements.
- **Verify claims.** Every number has a source. If you can't source it, don't write it.

## 7. Safety rails (what not to do)

- **Never** commit without reading the diff
- **Never** skip the pre-commit hook unless the user explicitly asks
- **Never** run destructive git commands (hard reset, force push to main, branch -D)
- **Never** change the brand color palette
- **Never** introduce a UI library that overlaps with what's already installed
- **Never** add a new database ORM — we're on `@supabase/supabase-js`
- **Never** rename the `#e63946` token or change Geist fonts
- **Never** touch `<PasscodeGate>` without understanding the consequences
- **Never** auto-approve a subscription state change — Stripe webhook is the source of truth
- **Never** send email via a new provider without understanding the existing flow
- **Always** ask before creating new top-level directories (keep `/app`, `/public`, `/docs`, `/tests`, `/supabase` clean)
- **Never** modify `app/lib/seo.ts` without running `npm run test:ci` afterward — it has dedicated unit tests
- **Never** expose `SUPABASE_SERVICE_ROLE_KEY` to the client (no `NEXT_PUBLIC_` prefix, ever)

## 8. Verification before claiming work is done

Per `docs/engineering/verification-checklist.md`. Before claiming a change is done:

- Run `npm run lint` and fix warnings relevant to touched files
- Run `npm run test:ci` — all tests must pass
- Run `npm run build` and verify it succeeds
- Manually hit the changed route(s) in dev
- If metadata changed, verify via the browser inspect → `<head>`
- If a new page was added, verify it's in `app/sitemap.ts`
- If a new feature was added, verify at least one test covers it

## 9. Collaboration mode

The user (York) is a solo founder shipping across 10 verticals. He values:

- **Direct answers.** No hedging, no preamble.
- **Concrete artifacts.** Ship the file, don't describe it.
- **Batched parallel tool calls** when independent.
- **Explicit tradeoffs** when there's a decision to make.
- **Rigor > speed** for architectural decisions, **speed > polish** for content drafts.

When in doubt: ask one pointed question. Don't ask three.

## 10. Open known issues / TODO

Track these in `docs/seo/audit.md`, `docs/engineering/testing-strategy.md`, and `docs/architecture/site-map.md`. Highlights:

- Passcode gate crawler audit
- `<img>` → `next/image` migration
- `/about`, `/pricing`, `/case-studies`, `/changelog` pages
- OG image static fallback (`/public/og-default.png`)
- Favicon suite
- `prefers-reduced-motion` support
- Focus states on interactive elements
- Contrast audit (white/0.2 is below WCAG AA on dark bg)
- Wire lead capture destination beyond Supabase (ConvertKit/Resend for welcome sequence)
- Apply `supabase/migrations/0001_leads_table.sql` in production Supabase project
