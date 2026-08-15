# YorkSims.com — SEO Audit Findings

> Point-in-time audit based on static inspection of the repo. No live crawl yet (site may not be indexed). Findings prioritized by impact × effort.

**Audit date:** 2026-04-14
**Auditor:** automated inspection of `/Users/york/Documents/augment-projects/yorksims-website`

---

## Executive summary

**SEO health score: 38 / 100** (poor but easily fixable)

Good news: the content is strong and the design is fast. Bad news: essentially zero SEO infrastructure exists. Nothing is indexed because nothing tells Google how to crawl the site. Every finding below is fixable in hours, not weeks. **Estimated total effort to reach 85/100: 8–12 hours.**

**Top 5 actions (in priority order):**
1. Ship `app/sitemap.ts` — currently missing, blocker for indexing
2. Ship `app/robots.ts` — currently missing, blocker for crawlers
3. Add per-page `metadata` exports (currently only root has any)
4. Add JSON-LD schema to home, blog posts, verticals
5. Fix the `<PasscodeGate>` — if it blocks crawlers, *nothing* is indexable (critical, verify this first)

---

## Category breakdown

### 1. Crawlability & Indexability — 2 / 20 ❌ critical

| Check | Status | Notes |
|---|---|---|
| robots.txt exists | ❌ | Missing. `app/robots.ts` not present. |
| sitemap.xml exists | ❌ | Missing. `app/sitemap.ts` not present. |
| Meta robots tags | ⚠️ | No explicit directives. Google defaults to "index, follow" but no control over auth pages. |
| X-Robots-Tag headers | ❌ | Not configured. |
| Canonical URLs | ❌ | No `<link rel="canonical">` on any page. |
| `<html lang>` | ✅ | Present (`en` — verify in root layout). |
| Passcode gate blocks crawl? | 🔴 **BLOCKER** | `<PasscodeGate>` wraps the entire app in `app/layout.tsx`. If it gates crawlers, **nothing is indexable**. Must be audited immediately. |
| Broken internal links | ⚠️ | Not automated-scanned yet — run `npx next build` with link checker. |
| 404 page | ❓ | No `app/not-found.tsx` found. |

**Fix list:**
- [ ] Add `app/robots.ts` — allow crawl, point to sitemap, disallow `/api/`, `/dashboard`, `/portals/`, `/success`, `/login`, `/signup`
- [ ] Add `app/sitemap.ts` — dynamic, include home + hub + verticals + blog + verticals/*, blog/* from data source
- [ ] Audit `<PasscodeGate>` — does it fire for unauthenticated non-member traffic? If yes, either whitelist Googlebot by user-agent OR remove the gate from public pages
- [ ] Add `metadata.alternates.canonical` to every public page
- [ ] Add `app/not-found.tsx` with 404 page
- [ ] Add `app/manifest.ts` for PWA/social

### 2. On-page metadata — 4 / 15 ❌

| Check | Status | Notes |
|---|---|---|
| Root `title` | ✅ | Present in `app/layout.tsx` |
| Root `description` | ✅ | Present |
| Per-page titles | ❌ | Only root layout has metadata. `/blog`, `/hub`, `/verticals`, `/blog/[slug]`, `/verticals/[slug]`, `/contact`, `/community` all inherit root — duplicate titles everywhere. |
| Per-page descriptions | ❌ | Same as above. |
| OG tags | ⚠️ | Root has OG but no dynamic OG images per post. |
| Twitter cards | ⚠️ | `summary_large_image` set but no actual `images` config. |
| `og:image` dimensions | ❌ | No image defined. Default Google preview broken. |
| Structured `metadata` exports | ❌ | None of the individual pages use Next.js 16's `export const metadata`. |

**Fix list:**
- [ ] Add `export const metadata` to every public page file
- [ ] For dynamic routes (`/blog/[slug]`, `/verticals/[slug]`), implement `generateMetadata`
- [ ] Create default OG image at `/public/og-default.png` (1200×630)
- [ ] Add OG image generator: `app/api/og/route.tsx` using `next/og` for dynamic social cards per post/vertical

### 3. Schema.org / Structured data — 0 / 10 ❌

Zero structured data anywhere. This is the highest-leverage quick win — one component + per-page JSON-LD blocks and you get rich results eligibility.

**Fix list:**
- [ ] Create `app/components/JsonLd.tsx` helper
- [ ] Add Organization + WebSite + SearchAction to root layout
- [ ] Add BlogPosting to every blog post (including breadcrumbs)
- [ ] Add Course / LearningResource to every vertical page
- [ ] Add Offer / Product to pricing section on home
- [ ] Add Person schema for York Sims on `/about` when it exists
- [ ] Validate all schemas via Google Rich Results Test (`schema.org/validator`)

### 4. Content quality — 8 / 15 ⚠️ partial

| Check | Status | Notes |
|---|---|---|
| H1 present per page | ⚠️ | Home yes. Blog index yes. Vertical pages likely "coming soon" placeholder — verify. |
| Single H1 per page | ✅ | Pattern looks consistent. |
| Heading hierarchy | ⚠️ | Some pages skip H2 to H3. |
| Word count depth | ⚠️ | Only 2 of 10 blog posts have actual body. 8 posts listed but only slugs exist. |
| Readability | ✅ | Existing post (business-runs-without-me) reads at ~8th grade. Good. |
| Internal linking | ❌ | No cross-linking between blog posts or from blog → verticals. |
| Expert signals (E-E-A-T) | ⚠️ | Author byline missing from blog pages. No `/about` page. |
| Freshness signals | ⚠️ | Dates present but no "last updated" semantics. |

**Fix list:**
- [ ] **Write the 8 missing blog posts** (blocker — content-level work, see Wave 3)
- [ ] Fill out all 10 vertical pages (currently "coming soon")
- [ ] Add author byline + links to author page on every post
- [ ] Add 2+ internal links per blog post to related content
- [ ] Add "last updated" date to long-lived pages

### 5. Technical performance — 12 / 15 ✅ strong

| Check | Status | Notes |
|---|---|---|
| Next.js version | ✅ | 16.1.7 (latest major) |
| React version | ✅ | 19.2.0 (streaming, RSC ready) |
| Image optimization | ⚠️ | Using `<img>` with eslint-disable comments instead of `next/image`. Non-optimal. |
| Font loading | ✅ | `next/font/google` for Geist + Geist Mono |
| JS bundle | ❓ | Not measured yet — run `next build` with analyzer |
| CSS strategy | ✅ | Tailwind 4 + minimal custom CSS |
| Lazy loading | ⚠️ | Three.js HeroScene should be dynamically imported (verify it is) |
| Smooth scroll | ⚠️ | Lenis may conflict with anchor links and keyboard nav — audit |
| Core Web Vitals | ❓ | Cannot measure without live site |

**Fix list:**
- [ ] Replace `<img>` with `next/image` site-wide (except dynamic external URLs)
- [ ] Verify HeroScene is `dynamic(import, { ssr: false })`
- [ ] Run `next build` + bundle analyzer, target <200KB first-load JS
- [ ] Add `priority` to LCP images on home/blog/vertical pages
- [ ] Test CWV on Vercel Analytics once deployed

### 6. Mobile / Responsive — 10 / 10 ✅

| Check | Status | Notes |
|---|---|---|
| Viewport meta | ✅ | Next.js default |
| Responsive breakpoints | ✅ | Tailwind md:/lg: used throughout |
| Touch targets | ✅ | Pills are large enough |
| Horizontal scroll | ✅ | None visible in spot-checks |

### 7. URL structure — 4 / 5 ✅

| Check | Status | Notes |
|---|---|---|
| Clean URLs | ✅ | `/blog/slug`, `/verticals/slug` — no query strings |
| Lowercase | ✅ | Yes |
| Hyphenated | ✅ | Yes (`business-runs-without-me`) |
| Trailing slash consistency | ⚠️ | Next.js default is no trailing slash — verify via `next.config.ts` `trailingSlash: false` |
| URL depth | ✅ | Max 2 levels — good |

### 8. Accessibility (SEO overlap) — 6 / 10 ⚠️

| Check | Status | Notes |
|---|---|---|
| Alt text on images | ⚠️ | Footer logo has `alt` but `eslint-disable` comments suggest many `<img>` without alt |
| ARIA labels on nav | ❓ | Not inspected |
| Focus states | ⚠️ | Some hover states have no focus equivalent |
| Color contrast | ⚠️ | `white/0.2` metadata text on `#0a0a0a` is below WCAG AA |
| Skip-to-content | ❌ | Not present |
| `prefers-reduced-motion` | ❌ | Framer Motion animations don't respect it |

### 9. International — 5 / 5 ✅ (by default)

Single-language (English). No hreflang needed. Monitor if expanding.

### 10. Backlinks — 0 / 5 ❓

Not audited — requires external tooling. Track via DataForSEO or Ahrefs once live.

---

## Quick-win worksheet (ship in 1 sitting)

```
[ ] app/robots.ts                           — 5 min
[ ] app/sitemap.ts                          — 20 min (dynamic from data)
[ ] app/manifest.ts                         — 5 min
[ ] app/not-found.tsx                       — 15 min
[ ] Audit passcode gate for crawlers        — 10 min
[ ] metadata exports on 7 public pages      — 45 min
[ ] generateMetadata on 2 dynamic routes    — 30 min
[ ] /public/og-default.png                  — 15 min (canvas)
[ ] app/components/JsonLd.tsx helper        — 15 min
[ ] JSON-LD on home + 2 blog posts          — 30 min
[ ] app/api/og/route.tsx (dynamic OG)       — 45 min
[ ] Fix <img> → next/image site-wide        — 60 min
```

**Total: ~5 hours.** After these, revisit score — should land around 75–85.

---

## Blockers before launch

1. 🔴 **Passcode gate crawler policy** — verify Googlebot can reach public pages
2. 🔴 **8 missing blog posts** — content is the biggest single SEO asset
3. 🟡 **Vertical pages "coming soon"** — every vertical page is a thin-content liability until filled
4. 🟡 **Missing /about** — E-E-A-T suffers without founder page with credentials
5. 🟡 **No dedicated /pricing** — losing commercial-intent traffic to an anchor on home

---

## Long-term SEO roadmap (detailed plan in `docs/seo/plan.md`)

**Month 1:** Ship audit fixes + 8 blog posts + 10 vertical pages. Target: 80 health score.
**Month 2:** Launch 10 free tools (lead magnets) at `/tools/*`. Target: 500 organic visits/day.
**Month 3:** Competitor comparison pages (5 at `/compare/*`). Target: 1,500 organic visits/day.
**Month 4:** Programmatic SEO pages — "how to ship [X] in [Y]" combinatorial expansion. Target: 5,000/day.
**Month 5:** Backlink outreach, guest posts, podcast tour. Target: 50 DR referring domains.
**Month 6:** Review, double down on what's working, cut what isn't.
