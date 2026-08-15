# YorkSims.com — Site Architecture & Information Hierarchy

> The canonical map. Every page, its parent, its purpose, its link targets, its SEO priority.

---

## 1. Navigation hierarchy (what users see in Nav)

```
Home (/)
├── Platform  → /hub
├── Verticals → /verticals
│   ├── /verticals/ai-agents
│   ├── /verticals/software
│   ├── /verticals/blockchain
│   ├── /verticals/hardware
│   ├── /verticals/business
│   ├── /verticals/land
│   ├── /verticals/finance
│   ├── /verticals/athlete
│   ├── /verticals/creative
│   └── /verticals/partnerships
├── Books → /books (3 paid PDFs — the only paid products besides 1-on-1 sessions)
├── Blog → /blog
│   └── /blog/[slug]
├── Community → /community
└── Contact → /contact
```

## 2. Auth-gated hierarchy (what members see)

```
Dashboard (/dashboard)
├── Portals (8 specialized sub-products)
│   ├── /portals/ai-agents
│   ├── /portals/dualacademy
│   ├── /portals/dualpay
│   ├── /portals/crypto
│   ├── /portals/books
│   ├── /portals/90straight
│   ├── /portals/elite-eighth
│   └── /portals/marketplace
├── Certificates → /certificate/[id]
├── Signup / Login / Success (transactional)
└── Stripe checkout → /api/checkout
```

## 3. Complete URL inventory

| URL | Parent | Purpose | Auth | SEO priority | Indexed |
|---|---|---|---|---|---|
| `/` | — | Landing. Hero, value props, pricing | Public | **1.0 (critical)** | ✅ |
| `/hub` | Home | Platform overview. "Not a course. A builder OS." | Public | 0.9 | ✅ |
| `/verticals` | Home | All 10 verticals grid | Public | 0.9 | ✅ |
| `/verticals/[slug]` | /verticals | Individual vertical landing + curriculum | Public | 0.8 | ✅ |
| `/books` | Home | Book storefront — 3 PDFs, Stripe checkout | Public | 0.9 | ✅ |
| `/blog` | Home | Blog index with 10 posts | Public | 0.9 | ✅ |
| `/blog/[slug]` | /blog | Individual post | Public | 0.7 | ✅ |
| `/contact` | Home | Contact form | Public | 0.5 | ✅ |
| `/community` | Home | Community landing | Public | 0.6 | ✅ |
| `/signup` | — | Create account | Public | 0.3 | ❌ noindex |
| `/login` | — | Sign in | Public | 0.3 | ❌ noindex |
| `/success` | /signup | Post-checkout confirmation | Public | — | ❌ noindex |
| `/dashboard` | — | Member home, XP, progress | Auth | — | ❌ noindex |
| `/portals/ai-agents` | /dashboard | AI Agents portal | Auth | — | ❌ noindex |
| `/portals/dualacademy` | /dashboard | DualAcademy portal | Auth | — | ❌ noindex |
| `/portals/dualpay` | /dashboard | DualPay portal | Auth | — | ❌ noindex |
| `/portals/crypto` | /dashboard | Crypto portal | Auth | — | ❌ noindex |
| `/portals/books` | /dashboard | Books portal | Auth | — | ❌ noindex |
| `/portals/90straight` | /dashboard | 90Straight portal | Auth | — | ❌ noindex |
| `/portals/elite-eighth` | /dashboard | Elite Eighth portal | Auth | — | ❌ noindex |
| `/portals/marketplace` | /dashboard | Marketplace portal | Auth | — | ❌ noindex |
| `/certificate/[id]` | /dashboard | Shareable certificate | Public (ID-gated) | 0.5 | ✅ (individually) |

## 4. Link architecture (internal linking strategy)

### Home page must link to:
- `/hub` (primary CTA)
- `/verticals` and all 10 sub-verticals (secondary nav)
- `/blog` (latest 3 posts cards)
- `/signup` (pricing CTAs)
- `/community`

### Every blog post must link to:
- **Parent vertical page** (`/verticals/{slug}`) — contextual, in-body
- **2 related posts** (same vertical first, then topic-adjacent)
- **`/signup` pricing anchor** (bottom CTA)
- **Home** (via nav)

### Every vertical page must link to:
- Its **2–3 related blog posts** (evidence the vertical is active)
- Other **2 adjacent verticals** (encourage cross-sell)
- `/hub` (product overview)
- `/signup` (conversion)
- Authenticated portal (if one maps 1:1 — e.g. AI Agents vertical → /portals/ai-agents for members)

### Blog index must link to:
- Every individual post
- `/signup` pricing
- `/verticals` (cross-sell)

## 5. SEO sitemap priority (for `app/sitemap.ts`)

```
Priority 1.0 (weekly):
  /

Priority 0.9 (weekly):
  /hub
  /verticals
  /blog

Priority 0.8 (monthly):
  /verticals/* (all 10)

Priority 0.7 (monthly):
  /blog/* (all 10 posts)
  /community

Priority 0.5 (yearly):
  /contact
  /certificate/*

EXCLUDE from sitemap:
  /signup /login /success /dashboard /portals/* /api/*
```

## 6. Information gaps (TODO — pages that should exist but don't)

These represent both content and SEO opportunities. Each is a programmatic SEO play or conversion page.

### High priority (build next)
1. **`/alternatives`** — "YorkSims alternatives" landing for comparison queries
2. **`/compare/yorksims-vs-[competitor]`** — individual comparison pages (5 to start):
   - `/compare/yorksims-vs-udemy`
   - `/compare/yorksims-vs-coursera`
   - `/compare/yorksims-vs-lennys-newsletter`
   - `/compare/yorksims-vs-indie-hackers`
   - `/compare/yorksims-vs-on-deck`
3. **`/tools/[tool-name]`** — free tool lead magnets (1 per vertical, 10 total):
   - `/tools/llc-operating-agreement-generator` (Business)
   - `/tools/hbm-memory-calculator` (Hardware)
   - `/tools/xrpl-transaction-simulator` (Blockchain)
   - `/tools/raw-land-cost-calculator` (Land)
   - `/tools/saas-pricing-calculator` (Software)
   - `/tools/ai-agent-starter-kit` (AI Agents)
   - `/tools/angel-investor-roi-calculator` (Finance)
   - `/tools/athlete-transition-playbook` (Athlete)
   - `/tools/animation-engine-quickstart` (Creative)
   - `/tools/partnership-email-template` (Partnerships)
4. **`/pricing`** — dedicated pricing page (currently anchor on home)
5. **`/about`** — founder story as a standalone page
6. **`/case-studies`** or `/proof` — the receipts page (repos, contracts, revenue)
7. **`/changelog`** — what shipped each week (huge for retention + SEO)

### Medium priority
8. **`/podcast`** — if/when a podcast launches
9. **`/events`** — live Q&A schedule
10. **`/press`** — press kit and assets
11. **`/legal/terms`**, **`/legal/privacy`** — required for Stripe & trust
12. **`/newsletter`** — standalone newsletter landing (free tier top-of-funnel)

### Low priority
13. **`/for-athletes`** — ICP-specific landing for the D1 → founder story
14. **`/for-polymaths`** — ICP-specific landing for the 10-vertical value
15. **`/faq`** — consolidated FAQs
16. **`/affiliate`** — referral/affiliate program landing

## 7. Redirect map (once implemented)

| From | To | Reason |
|---|---|---|
| `/home` | `/` | common mistake |
| `/pricing` (initially) | `/#pricing` | until dedicated pricing page ships |
| `/courses` | `/verticals` | category rename |
| `/about` (initially) | `/hub` | until dedicated about page ships |

## 8. Canonical rules

- Every page must have a `<link rel="canonical">` — absolute URL, no query strings.
- Pagination on `/blog` (future): canonical to page 1.
- `/certificate/[id]` is public but **not** in global sitemap — only individual canonicals if/when shared.

## 9. Schema.org coverage (for `docs/seo/schema.md`)

| Page type | Schema type | Notes |
|---|---|---|
| `/` | Organization + WebSite + SearchAction | Org with founder, logo, sameAs socials |
| `/blog` | Blog | Parent of all posts |
| `/blog/[slug]` | BlogPosting + BreadcrumbList | Author=York Sims, datePublished, articleBody |
| `/verticals/[slug]` | Course (or LearningResource) + BreadcrumbList | Each vertical = a Course |
| `/hub` | WebPage + BreadcrumbList + Product | Pro/Builder as Offers |
| `/contact` | ContactPage | |
| `/certificate/[id]` | EducationalOccupationalCredential | Shareable proof |

## 10. Breadcrumbs

Every page below the home level should render a breadcrumb component and emit `BreadcrumbList` schema.

```
Home › Verticals › AI Agents
Home › Blog › How I Built a Business That Runs Without Me
```

Breadcrumb component does not yet exist. Build it in Wave 5.
