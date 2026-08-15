# YorkSims.com — Positioning, Copywriting & Copy Edit Pass

> Voice, positioning, and a per-page copy edit pass. Read `product-context.md` and `brand-guidelines.md` first — this doc applies both. Covers: marketing-copywriting, marketing-copy-editing, marketing-marketing-psychology, marketing-product-marketing-context.

---

## 1. The core positioning statement

**For** technical and semi-technical builders (22–38)
**Who** are tired of tutorial-trap content and want to see how real products ship
**YorkSims.com** is an execution platform
**That** subscribes you to a builder shipping across 10 verticals with all the code, contracts, and receipts
**Unlike** courses, newsletters, cohort programs, or creator content (which each cover one domain or one format)
**Our product** gives you live builds, real artifacts, and a community of builders across every domain a solo founder actually needs.

## 2. The one-liners (tested in order of conversion strength)

1. **"Stop learning. Start building."** (current hero — strong, keep)
2. **"One builder. Ten verticals. All receipts."** (challenger — use on verticals page)
3. **"Teaching execution, not theory."** (tagline — use as subline only)
4. **"The subscription that watches a builder build, with the code."** (explanatory variant for cold traffic)
5. **"The platform that replaces ten courses, one newsletter, and a cohort program."** (long-form for feature pages)

## 3. Page-by-page copy edit pass

Below, each page gets: (a) what's working, (b) what to change, (c) proposed replacement copy. Apply by priority top to bottom.

### 3.1 Home (`/`) — hero section

**Working:**
- "Stop Learning. Start Building." — punchy, 4 words, verb-verb parallelism
- 10 verticals callout in stats
- Three pillars are distinct and concrete

**Change:**
- Subheadline is too long. 32 words. Cut to 16-20.
- "A premium platform for builders shipping across 10 industries" buries the builder angle. Lead with the receipts.
- Stats are good but "10K+ Builder Hours Logged" is vague. Replace with something with a verifiable source.

**Replace:**
> **Stop Learning. Start Building.**
>
> Watch a builder ship across 10 industries — with the code, the contracts, and the receipts. No theory. No fluff. Monthly live Q&A and a private community of builders. $29/mo.

Stats replacement:
- "10 Verticals Shipping Now"
- "15+ Public GitHub Repos"
- "$4,200 MRR on VitrOS"
- "5 Live Subsidiaries under Caipher AI LLC"

(Only use verifiable numbers. Every stat must link to a proof URL — the repo, the Stripe screenshot, the filing.)

### 3.2 Home — three pillars

**Current pillars:** Live Builds Real Code, Templates Contracts & SOPs, Direct Access & Community.

**Change:**
- Pillar 2 title "Templates, Contracts & SOPs" is boring. Nobody got excited about a template.
- Pillar 3 is great — keep.

**Replace:**

1. **Watch the repo get built.** Every live session ships with the full GitHub repo. No demos. No edited highlight reels. The build as it happens, commits and all.
2. **The files you'd pay a lawyer for.** Real LLC operating agreements, client contracts, NDAs, SOPs. Copied from the documents running my companies, not pulled off Google.
3. **Direct access & community.** Monthly live Q&A. Private Discord of builders across every vertical. Small-group coaching at the Builder tier, capped at 20.

### 3.3 Home — pricing section

**Working:** Two-tier structure, clear price difference.

**Change:**
- "Start Building" CTA on Pro is weak. The CTA is the most important copy on a pricing card.
- The $499 Builder tier is undersold. It needs a reason-to-upgrade that isn't just "more stuff."
- Neither tier handles the "why now" question.

**Replace Pro CTA:** "Join Pro — Cancel Anytime"
**Replace Builder CTA:** "Apply to Builder"
**Add to Pro card (below bullets):** "Most members end up using 3+ verticals in the first month."
**Add to Builder card:** "For serious builders who want York's direct email, priority repo access, and coaching. We cap this at 20 members for real reasons."

### 3.4 /blog — index page

**Working:** "Show the work. All of it." is strong.

**Change:** The CTA ("Pro members get full breakdowns, code repos, and templates with every post") is accurate but doesn't create urgency.

**Replace CTA block:**
> Every post above links to a private Pro vault: the full repo, the actual templates, and the stuff I cut from the public version because it was too raw to ship. $29/month. Cancel anytime.

### 3.5 /verticals/[slug] — vertical landing

**Working:** The new structure ships real content per vertical.

**Change:** The hero statement generated per vertical should lead with the outcome, not the topic.

**Rule of thumb for each vertical:**
- Bad: "Build software from zero" (topic)
- Good: "Ship production SaaS in 30 days — real stack, real users, real revenue" (outcome + proof)

This is already done in `lib/vertical-content.ts` → `heroStatement`. Review each one against the rule.

### 3.6 /contact

**Change:** Currently likely just a form. Add a warm intro paragraph.

**Add above the form:**
> Fastest route: join Pro, ask York anything in the monthly Q&A. For partnerships, press, or Builder tier applications, use this form. York reads every message. Reply time is usually within 24 hours but can be slower during sprint weeks.

## 4. Psychological levers at work (and where they're deployed)

| Lever | How we use it | Where |
|---|---|---|
| **Social proof** | "15+ public repos", "Most members use 3+ verticals" | Home stats, pricing |
| **Scarcity** | "Capped at 20 members" (genuine, not manufactured) | Builder tier |
| **Loss aversion** | "Cancel anytime" removes the risk | Every CTA |
| **Authority** | Founder story, verifiable receipts, GitHub footprint | /about (TBD), blog bylines |
| **Specificity bias** | "$14.50 per animation", "4.2 second settlement" | Blog posts, case studies |
| **Contrast framing** | "$14.50 vs $8,000 traditional" | Vertical case studies |
| **Identity framing** | "For builders, by a builder" | Everywhere |
| **Commitment escalation** | Free blog → $29 Pro → $499 Builder | Whole funnel |

## 5. Word-level rules (enforce in every copy edit)

**Ban list:** game-changing, unleash, revolutionary, 10x, secret, hack, insane, crazy, magical, transform, leverage (as verb), cutting-edge, seamlessly, effortlessly, mindblowing, one-of-a-kind, elite (outside "Elite Eighth" brand), synergize.

**Prefer list:** ship, build, real, actual, the code, here's how, receipts, live, production, week, month, dollars (not $), specific numbers.

**Sentence length:** Default to under 20 words. Vary rhythm by occasionally going shorter. Paragraphs max 3 sentences.

**Header case:** Sentence case in h2/h3, Title Case only in H1 branded statements.

**First person:** "I" only when York is the voice (blog posts, personal updates). "We" never — it's dishonest for a solo founder. "You" when addressing the reader.

## 6. Active copy review checklist

Apply to any new page before it ships.

```
[ ] One primary CTA per view
[ ] Every number is verifiable or has a source
[ ] No banned words
[ ] H1 ≤ 10 words
[ ] Lead paragraph ≤ 40 words
[ ] Sentences average under 20 words
[ ] No adverbs except necessary ones
[ ] Specific > general (the week, not "recently")
[ ] Proof link within 1 scroll
[ ] Value prop restated in a different frame somewhere below the fold
```

## 7. ICP-specific copy variants (for PPC and landing pages)

### Variant A — The Frustrated Builder
Hero: "You already know how to code. The problem isn't learning. It's shipping."
CTA: "Join Pro — $29/mo, Cancel Anytime"

### Variant B — The Crossover Athlete
Hero: "D1 to founder. The transition playbook for athletes who don't want to become a tech bro."
CTA: "Read the Founder's Story"

### Variant C — The Polymath
Hero: "Ten verticals. One builder. One subscription. The only platform built for people who won't pick a lane."
CTA: "See All Ten Verticals"

Use these on paid landing pages, cold email CTAs, and A/B test variants. Never as the default home experience.
