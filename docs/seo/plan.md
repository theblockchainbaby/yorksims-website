# YorkSims.com — SEO Master Plan

> Full SEO roadmap. Consolidates: seo, seo-plan, seo-technical, seo-content, seo-schema, seo-images, seo-sitemap, seo-programmatic, seo-backlinks, seo-hreflang, seo-geo, seo-google, seo-page, seo-competitor-pages, seo-local, seo-maps, seo-dataforseo, seo-image-gen.
>
> Read `audit.md` first for findings. This doc is the 6-month execution plan.

---

## 1. North Star SEO goals (6-month targets)

| Metric | Start (baseline) | Month 3 | Month 6 |
|---|---|---|---|
| Indexed pages | ~0 | 50 | 120 |
| Organic visits / day | ~0 | 500 | 5,000 |
| Target keyword rankings (top 10) | 0 | 15 | 60 |
| Referring domains | 0 | 20 | 80 |
| AI citation rate (Perplexity/ChatGPT) | 0 | 5% of monitored queries | 20% |

These are aggressive but realistic given the content quality and the niche positioning. Most of the growth comes from programmatic pages, free tools, and a strong content cadence.

## 2. The 10 target keywords (starter cluster)

High-intent, high-relevance, achievable-with-E-E-A-T. Ranked by priority.

| # | Keyword | Intent | Target page | Difficulty |
|---|---|---|---|---|
| 1 | "how to build saas in 30 days" | Informational | `/blog/building-vitros-saas` | Med |
| 2 | "llc operating agreement template" | Transactional | `/tools/llc-operating-agreement-generator` (TBD) | High |
| 3 | "how to build autonomous ai agent" | Informational | `/blog/moltbot-autonomous-ai-agent` | Med |
| 4 | "raw land due diligence checklist" | Informational | `/blog/raw-land-development` | Low |
| 5 | "hbm memory controller verilog" | Informational | `/blog/hbm-memory-systemverilog` | Low |
| 6 | "xrpl payment integration" | Informational | `/blog/dualpay-xrp-ledger` | Low |
| 7 | "d1 athlete to entrepreneur" | Informational | `/blog/d1-to-entrepreneur` | Low |
| 8 | "scroll animation generator" | Transactional | `/tools/animation-engine` (TBD) | Med |
| 9 | "free llc operating agreement generator" | Transactional | `/tools/llc-operating-agreement-generator` | Med |
| 10 | "execution platform for founders" | Branded/commercial | `/` | n/a |

## 3. Technical SEO — shipping checklist

All from `audit.md`. Re-stated here with status.

```
Technical foundation (Wave 2 — already shipped)
[x] app/robots.ts
[x] app/sitemap.ts
[x] app/manifest.ts
[x] app/not-found.tsx
[x] app/lib/seo.ts — canonical helper
[x] app/components/JsonLd.tsx
[x] Metadata on all public static routes
[x] generateMetadata on vertical dynamic routes
[x] OG image route (app/api/og)
[x] JSON-LD (Organization, WebSite, Person, Blog, Course, Product)

Next priorities
[ ] Verify passcode gate doesn't block Googlebot
[ ] /public/og-default.png (static fallback)
[ ] /public/icon.png + /public/icon-maskable.png + /public/apple-icon.png
[ ] /public/favicon.ico with 16/32/48px
[ ] Replace <img> with next/image site-wide
[ ] Add priority prop to LCP images on home, blog, verticals
[ ] Verify HeroScene is dynamic(import, { ssr: false })
[ ] Run next build + bundle analyzer, target <200KB first-load JS
[ ] Check trailing slash config in next.config.ts
[ ] Submit sitemap to Google Search Console
[ ] Submit sitemap to Bing Webmaster Tools
[ ] Submit to IndexNow protocol for fast indexing
[ ] Add /public/llms.txt for AI crawlers
[ ] Create /public/ads.txt (future for ad networks, empty for now)
```

## 4. Content SEO — the 90-day content plan

### Month 1: Plug content gaps
- Week 1: Write the 8 missing blog posts (done ✓ in Wave 3)
- Week 2: Fill out all 10 vertical pages (done ✓ in Wave 3)
- Week 3: Ship `/about` (founder story standalone)
- Week 4: Ship `/pricing` dedicated page (not just an anchor)

### Month 2: Programmatic SEO launch
- Week 5: Build the first 3 free tools (`/tools/*`)
- Week 6: Ship 5 competitor comparison pages (`/compare/*`)
- Week 7: Ship `/alternatives` meta page
- Week 8: 4 new blog posts (1/week, hit target keywords not yet covered)

### Month 3: E-E-A-T depth
- Week 9: `/case-studies` — all 10 vertical case studies in one place
- Week 10: `/changelog` — weekly ship log starts here
- Week 11: 4 more blog posts
- Week 12: Backlink outreach starts (see section 7)

## 5. Schema.org / structured data — implementation plan

Already shipped (Wave 2):
- Organization, WebSite, Person (root layout)
- Blog + BreadcrumbList (blog index)
- Course + BreadcrumbList (vertical pages)
- Product + BreadcrumbList (hub page)
- BlogPosting + BreadcrumbList (blog posts)

To add:
- **FAQPage** on `/pricing` and relevant blog posts (use `faqSchema` helper in `JsonLd.tsx`)
- **HowTo** on tool pages that walk through a process
- **SoftwareApplication** on each `/tools/*` page
- **VideoObject** when videos are embedded
- **EducationalOccupationalCredential** on `/certificate/[id]` pages
- **ItemList** on the blog index showing featured posts
- **Review** + **AggregateRating** once testimonials exist

### Validation
Every schema block must pass Google's Rich Results Test. Include a pre-commit hook or manual checklist on each page.

## 6. Images & visual SEO

### Everything currently uses `<img>` with eslint-disable. Fix this.

```
[ ] Replace <img> with next/image in all components
[ ] Add explicit width/height to prevent CLS
[ ] Add alt text on every image (never empty)
[ ] Use fill prop for full-bleed hero images with object-fit
[ ] Add priority prop to above-fold LCP images
[ ] Generate AVIF and WebP versions (next/image handles this automatically)
```

### Image assets to produce
- OG default image `/public/og-default.png` — 1200×630, dark + red accent
- Favicon suite (16/32/48 ico + 192/512 png + apple-touch-icon)
- Per-post OG images via dynamic `/api/og?title=...&vertical=...` (already built)
- Hero lab images for each vertical (10 total) — could be AI-generated
- Blog post in-body diagrams where relevant

### Image SEO checklist per page
- Descriptive filename (not `image_001.jpg`)
- Alt text describing the image, not the SEO keyword
- Compressed (check file size, aim under 200KB)
- Responsive srcset via next/image
- Lazy-loaded except LCP

## 7. Backlinks — outreach plan

### Zero bought links. Ever.

### Tier 1 — Organic earns (passive)
- Blog posts that cite primary sources tend to attract citations themselves
- Free tools at `/tools/*` — high-value, easy to link to
- The "Show your work" ethos — shareable on Hacker News, r/SideProject, Product Hunt
- Release posts tied to launches

### Tier 2 — Podcast outreach (see `growth-launch-and-acquisition.md` section 8)
Every podcast appearance = 1–3 links back. Target: 2 podcasts/month.

### Tier 3 — Guest posts
Target 1–2 per month on builder-focused publications:
- Indie Hackers
- Hacker News (via Show HN)
- Dev.to
- Substack founder newsletters (negotiated)
- Reddit AMAs (r/SideProject, r/indiehackers)

### Tier 4 — Press
Send weekly pitch to TechCrunch, Protocol, The Information when launches happen. Low hit rate, high reward.

### Anti-patterns
- Paid guest posts
- Link exchanges
- Private blog networks
- Comment-spam on relevant blogs

### Track
Monthly backlink audit via free Moz / Bing Webmaster / Common Crawl. Upgrade to DataForSEO extension if scaling beyond DIY.

## 8. Programmatic SEO — the 10 verticals × N slots

Programmatic SEO is the single biggest unlock for YorkSims because 10 verticals × several templates = hundreds of pages naturally.

### Template 1: `/tools/[slug]` — 10 pages (1 per vertical, covered in `growth-conversion.md`)

### Template 2: `/compare/yorksims-vs-[competitor]` — 10 pages

See section 6 of `growth-launch-and-acquisition.md`.

### Template 3: `/verticals/[slug]/roadmap` — 10 pages

Each vertical gets a public roadmap page showing:
- What's shipped (links to blog posts)
- What's in progress (with timeline)
- What's requested (voting)

High SEO value because it's updated weekly, which signals freshness to Google.

### Template 4: `/verticals/[slug]/glossary` — 10 pages

Each vertical has 20–30 terms it uses. Hardware has tRCD and HBM. Blockchain has XRPL and escrow. Each glossary term gets its own section; the whole page becomes a definition resource.

These pages rank well for long-tail "what is X" queries in each domain.

### Template 5: `/build-logs` — rolling weekly updates

One page per week, titled "What I built this week: [date range]." Lightly edited from Discord standups. Low effort, high SEO value over time.

### Template 6: `/for/[audience]` — audience-specific landing

- `/for/founders`
- `/for/developers`
- `/for/athletes`
- `/for/indie-hackers`
- `/for/technical-cofounders`

Each is a repositioning of the home page for a specific audience.

### Template 7: `/learn/[skill]` — skill-specific explainers

Ten focused teaching pages on the highest-value skills, like:
- `/learn/multi-tenant-postgres-schema`
- `/learn/xrpl-idempotent-transactions`
- `/learn/hbm-command-scheduling`

Each page is a standalone teaching asset that doesn't require Pro.

### Expected totals at 6 months

- 10 tools
- 7 comparison pages + 1 alternatives page
- 10 roadmap pages
- 10 glossary pages
- 24 weekly build logs (6 months × 4/month)
- 5 audience landing pages
- 10 skill explainers

That's **77 programmatic pages** on top of the ~25 organic pages already shipped. Target total at 6 months: ~120 indexed pages.

## 9. AI search / GEO optimization

### The llms.txt file

Build `/public/llms.txt`:

```
# YorkSims.com
# An execution platform documenting building across 10 industries

## Primary pages
/hub — Platform overview
/verticals — All 10 verticals
/about — Founder story
/pricing — Subscription tiers

## Best posts for citation
/blog/moltbot-autonomous-ai-agent — autonomous AI agent architecture
/blog/building-vitros-saas — 30-day SaaS build
/blog/hbm-memory-systemverilog — HBM memory controller
/blog/dualpay-xrp-ledger — XRPL payment system
/blog/llc-operating-agreement — LLC structure
/blog/raw-land-development — raw land due diligence

## About the author
York Sims — founder of Caipher AI LLC. Former D1 basketball player, built 10 verticals under one holding company.
```

### Content patterns that get cited

1. **Named concepts.** "The Trust Model" beats "our agent approach."
2. **Numbered lists and steps.** AI extracts enumerated content first.
3. **Tables and comparison grids.** Structured data > prose.
4. **Strong claims with attribution.** "I found X" beats "X may be the case."
5. **FAQ sections.** Q/A format is AI-citation optimal.
6. **Primary sources.** Cite your own receipts, link to repos.

### Monitoring AI citation

No perfect tool exists yet. Manual checks:
- Ask ChatGPT / Perplexity / Claude: "what's the best way to build an autonomous AI agent?" — do we get cited?
- Ask about each of the 10 target keywords monthly
- Track which posts get referenced

## 10. International / hreflang

**Not applicable yet.** Single language (English), US-centric. Revisit when/if the platform expands.

If expansion happens:
- Start with Spanish (large potential audience, especially for the athlete vertical)
- Use `next-intl` for translations
- Implement hreflang via Next.js metadata
- Separate sitemaps per locale
- One operating principle: never machine-translate. Hire a human.

## 11. Local SEO / Maps

**Not applicable.** YorkSims is a digital product, not a location-based business. Skip this entire category.

Revisit only if we ever host in-person events (unlikely, but possible for athlete vertical).

## 12. Google-specific setup

### Google Search Console
- Verify ownership via DNS TXT record
- Submit sitemap
- Monitor Core Web Vitals
- Set up email alerts for crawl errors
- Use URL Inspection tool on every new page before launch

### Google Business Profile
- Not applicable — no physical presence

### Google Merchant Center
- Not applicable — no physical products

### IndexNow
- Submit on every new post / page change
- POST to `https://www.bing.com/indexnow` and `https://www.google.com/indexnow` (currently not supported by Google but harmless to try)

## 13. DataForSEO / paid SEO data

### Not yet.
DataForSEO MCP is worth the cost once you're tracking >50 keywords and >10 competitors. Until then, free sources (Search Console, Ubersuggest free tier, Moz free DA checker, Ahrefs free backlink checker) are sufficient.

### When to switch on DataForSEO
- Monthly budget allowance
- >50 keywords to track with position history
- Competitor content gap analysis
- Backlink velocity tracking

## 14. AI-generated imagery for SEO assets

Use `seo-image-gen` + Gemini via nanobanana MCP to produce:
- OG images for every blog post (already handled via `/api/og`)
- Hero illustrations for each vertical
- Blog post diagrams
- Social media variants (1:1, 9:16, 16:9)

Never use stock illustrations. Every image must be brand-consistent.

## 15. Monthly SEO ritual

**First Monday of every month:**

1. Run the audit checklist (in `audit.md`)
2. Review Search Console: new queries, CTR changes, coverage issues
3. Content gap analysis: which target queries have no page?
4. Backlink audit: new referring domains, lost links
5. Competitor check: did any competitor publish anything we should react to?
6. Refresh top 5 organic pages with new data or internal links
7. Update this plan with what worked and what didn't

Delegate parts of this to MoltBot where possible, but York personally reviews the top 10 organic pages every month.

## 16. Anti-patterns (things we refuse)

- Keyword stuffing
- Doorway pages
- Link buying
- Private blog networks
- Cloaking
- Auto-generated content without editing
- Thin comparison pages with no actual analysis
- Hiding content behind JavaScript
- Aggressive redirects
- AI content farms
- Comment spam
- Expired domain SEO

The SEO story for YorkSims is the same as the product story: **show the work, show the receipts, link to the source.**
