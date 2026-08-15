# YorkSims.com — Conversion Rate Optimization, Pricing & Lead Magnets

> Consolidated conversion playbook. Covers: marketing-page-cro, marketing-signup-flow-cro, marketing-form-cro, marketing-popup-cro, marketing-paywall-upgrade-cro, marketing-pricing-strategy, marketing-lead-magnets, marketing-free-tool-strategy, marketing-referral-program, marketing-revops.

---

## 1. The funnel today

```
Cold traffic
   ↓ (~2% convert)
Blog reader / vertical page visitor
   ↓ (~8% convert)
Email list / Discord member
   ↓ (~12% convert)
Pro signup ($29/mo)
   ↓ (~3% upgrade over 90 days)
Builder signup ($499/mo)
```

**Baseline conversion targets** (to beat as we measure):

| Stage | Current assumption | 90-day target |
|---|---|---|
| Visitor → email | 2% | 5% |
| Email → Pro | 8% | 15% |
| Pro → Builder | 3% | 8% |
| Pro monthly retention | 85% | 92% |

## 2. Home page CRO pass

### Above the fold

**Current:** Hero headline, subheading, 3D scene, CTA to pricing anchor.

**Fix:**
- Add a 15-second loom-style video of York actually building (not talking at camera)
- Move one specific proof point above the fold: the VitrOS MRR screenshot
- Single CTA: "Join Pro — $29/mo"
- Remove any secondary CTA above the fold (people click the one thing you tell them to)

### Social proof bar

Add a thin bar directly below the hero with 4 badges:
- "15+ public GitHub repos"
- "VitrOS generating $4,200 MRR"
- "5 operating subsidiaries"
- "10 verticals shipping now"

Each links to proof (the repo, the Stripe screenshot, the filings, the portal).

### Value props (the three pillars)

Keep the structure. Update copy per `positioning-and-copy.md` section 3.2.

Add a small "see it" link under each pillar to a proof artifact:
- Pillar 1 → link to the most recent commit in a public repo
- Pillar 2 → link to a sample LLC operating agreement
- Pillar 3 → link to a Discord preview (screenshot)

### Pricing section

**Fix:**
- Move it above the fold? No — keep below value props. But add a sticky pricing CTA in the nav that appears after scroll.
- Add a "what you'll pay in the first month" section to Pro:
  - $29 for all 10 verticals
  - Cancel before day 7 for a full refund
  - Average member uses 3+ verticals in month 1
- Apply to Builder: make it feel exclusive, not expensive
  - "Capped at 20 members"
  - "Currently 14 of 20 filled"
  - Show the application form, not a direct checkout

### FAQ

Add an FAQ section at the bottom with the top 6 objections (from `product-context.md` section 7). Each answer in 2–3 sentences. Use schema markup for FAQPage (`marketing-schema-markup`).

## 3. Pricing strategy

### Current state
Two tiers: Pro $29/mo, Builder $499/mo.

### Analysis

**Problems:**
1. The 17× gap between tiers is dissonant. Most SaaS do 3-5× jumps.
2. There's no annual option. 20% of SaaS buyers default to annual if offered.
3. The Builder tier has no visible upgrade path — it feels like an all-or-nothing.

**Opportunities:**
1. Add a middle tier at $99/mo that unlocks one vertical's premium content (live office hours, priority Q&A).
2. Add an annual plan at $290 (save $58, 2 months free).
3. Offer a 7-day free trial for Pro only (requires card but doesn't charge).
4. For Builder: offer a $1,497 quarterly plan — feels smaller than $499/mo when it's only 4 decisions per year.

### Proposed pricing matrix

| Plan | Monthly | Annual | Audience |
|---|---|---|---|
| **Pro** | $29/mo | $290/yr (save $58) | Primary |
| **Pro+** (new) | $99/mo | $990/yr | Power users who want office hours |
| **Builder** | $499/mo or $1,497/quarter | n/a | Applied only, capped at 20 |

**Warning — do not launch all at once.** Ship the annual option first, measure, then evaluate Pro+. Price changes are retention risk.

### Price anchoring on the page

Order matters. Show in this order:
1. Builder ($499) first — anchors the ceiling
2. Pro+ ($99) second — makes Pro feel like the deal
3. Pro ($29) third — the actual conversion target

Visually emphasize Pro as "Most Popular" with a badge and border glow.

### Discount discipline

**No general discounts. Ever.** The only exceptions:
- Annual plan (built into the price)
- Win-back offer (20% off first month, max 1 per person)
- Student discount (50% with .edu verification, future)

Don't run Black Friday sales. It erodes value perception.

## 4. Signup flow CRO

### Current issues (assumed)
- Likely requires email + password on one form
- Likely no social proof on the signup page
- Likely no risk reversal visible during checkout

### Fix — the 3-step signup

**Step 1: Email only.** Ask for email first. That's it.
**Step 2: Plan pick.** Pro / Pro+ / Builder. Default: Pro.
**Step 3: Stripe checkout.** Capture card, redirect to `/success`.

**Each step should show:**
- Progress bar (top)
- The total on the right (even for free tier)
- "Cancel anytime" assurance
- Social proof quote (pulled from a real Discord message)

### Post-signup

Redirect to `/success` with:
- York's loom video (30 seconds, "welcome, here's what to do")
- Single CTA: "Pick your first vertical"
- NOT "explore the dashboard" — give them one obvious next step

## 5. Paywall & upgrade CRO

### When content is gated

The blog post structure already primes this: public blog posts link to private Pro vault content. When a non-member clicks a private link, they see a paywall modal with:

- Headline: "This is Pro-only content"
- 1 sentence explanation of what they're missing
- The 3 most recent unlocked Pro additions (freshness signal)
- Single CTA: "Join Pro — $29/mo, cancel anytime"
- Small link: "Already a member? Sign in."

No multi-button paywalls. No "learn more" escape hatches.

### Pro → Builder upgrade modal

Triggered when:
- A Pro member has earned 1,000+ XP (they're engaged)
- Or has opened 3+ verticals in month 1
- Or has sent 5+ messages in Discord

Modal content:
- "Ready for the direct line?"
- 3 benefits of Builder (direct email, priority, coaching)
- Single CTA: "Apply to Builder"
- Show: "14 of 20 seats filled"

Don't show the modal more than once per week per member.

## 6. Form CRO (contact + Builder application)

### Contact form
- Max 4 fields: name, email, reason, message
- Reason is a dropdown with 5 options, not free text
- Submit button says what happens: "Send — York reads every message"
- Below the button: "Usually replies in 24h"

### Builder application
- 8 fields, all required, all substantive
- Name, email, GitHub, company (if any), what you've shipped, which vertical, why now, how you'd use direct access
- Save progress on field blur (people bail on long forms)
- Submit button: "Apply — York reviews every application personally"
- Acknowledge hard: "Applications reviewed weekly. Builder is capped at 20 members for real reasons."

## 7. Popup strategy

**Use one popup type only.** Multiple popups are the #1 reason people bounce.

### The one popup: exit intent on pricing page

- Trigger: mouse exits viewport top on `/` when scroll position is below pricing
- Copy: "Before you go — here's what happens in your first 14 days."
- Content: a 5-bullet list of actual activation milestones Pro members hit in week 1–2
- Single CTA: "Alright, I'm in"
- Dismissal saved in localStorage for 30 days

**Do not use:**
- Time-delayed popups (annoying)
- Scroll popups (too intrusive)
- "Wait, don't leave" popups (desperate energy)

## 8. Lead magnets + free tools

The free tool strategy is a core growth lever. Every vertical gets one free tool that solves one specific painful moment in that domain. The tool acts as:
1. SEO — targets high-intent long-tail queries
2. Email capture — gate the result behind email
3. Proof — demonstrates we actually know the domain

### The 10 tools to build (in order of leverage)

1. **LLC Operating Agreement Generator** (Business) — 5-question wizard → downloadable draft → email delivery. SEO goldmine.
2. **Raw Land Due Diligence Checklist** (Land) — interactive checklist with state-specific permit links.
3. **SaaS Pricing Calculator** (Software) — inputs: seat price, seats, churn → 12-month projection.
4. **Agent Skills Planner** (AI Agents) — pick your use case → get the suggested n8n workflow skeleton.
5. **HBM Memory Controller Visualizer** (Hardware) — toy simulation of bank scheduling. Niche but unique.
6. **XRPL Transaction Simulator** (Blockchain) — run a test transfer without a wallet. Great for developer onboarding.
7. **Athlete Transition Self-Assessment** (Athlete) — 20 questions, score, personalized next steps.
8. **Animation Engine Cost Calculator** (Creative) — how much would this animation cost across traditional vs AI pipelines.
9. **Voice Agent ROI Calculator** (Voice Agents) — how much does every missed call cost you.
10. **Product Landed Cost Calculator** (Products) — COGS + freight + tariff + warehousing → landed cost.

### Each tool template

- Route: `/tools/[slug]`
- Has its own SEO metadata via layout.tsx
- Email gate: show 80% of the result, require email for the full result (not for interaction — for export)
- After email: drop into welcome sequence
- Each tool has its own schema.org markup (SoftwareApplication)

### Growth flow for each tool

1. SEO — rank for the specific long-tail query
2. Reddit + IndieHackers — post in relevant communities once, let them be found
3. LinkedIn — York posts about the tool at launch
4. Newsletter — announce to existing list
5. In-app — live in the related vertical's page as "free companion tool"

## 9. Referral program

### The model: give $10, get $10

- Every Pro member gets a unique referral code
- Referred user gets $10 off first month
- Referrer gets $10 credit on their next bill
- Builder members get $50/$50
- Max 10 successful referrals per Pro member per year (prevents gaming)

### Where to surface
- Dashboard: permanent tile on the home
- Email: weekly newsletter PS line
- Discord: monthly pinned announcement
- Success page (post-checkout): "Here's your code, share with one builder you know"

### Don't build this yet

Referral programs work when you have >200 engaged members. Below that threshold, the engineering isn't worth it. Target: launch the referral program once Pro hits 200 active members.

## 10. RevOps — lead lifecycle & scoring

### Lead sources
| Source | Scoring |
|---|---|
| Blog organic (7 days of views) | +1 |
| Newsletter subscriber | +3 |
| Free tool user | +5 |
| Discord join | +5 |
| GitHub star / fork | +2 |
| Referral from existing member | +10 |

### Stages
1. **Lurker** (cold, not in any system) — SEO content only
2. **Subscriber** (email captured) — welcome sequence
3. **Engaged** (score > 10) — personal email from York, invite to office hours preview
4. **Trial/Free member** (signed up, no payment) — activation sequence
5. **Pro member** — onboarding + retention sequence
6. **Power user** (XP > 1000) — Builder upgrade offer
7. **Builder member** — white-glove

### Tools
- Email list: Mailchimp or ConvertKit (cheap, adequate)
- Scoring: Supabase `lead_scores` table updated by MoltBot
- CRM: Notion database (simple until >500 leads)

### MQL → SQL handoff
In solo operator mode, all SQLs go to York. MoltBot flags them in Slack with full context. York replies personally within 24h.

## 11. A/B test roadmap (first 12 tests)

Priority order, ship one test at a time, run each 14 days minimum.

1. Home hero — short vs long subheadline
2. Pricing — 2-tier vs 3-tier (Pro+ added)
3. Pricing — monthly only vs monthly + annual
4. Pro CTA — "Start Building" vs "Join Pro — Cancel Anytime"
5. Home — with vs without video in hero
6. Blog post CTA — bottom only vs bottom + sticky side
7. Signup — 1 page vs 3 step wizard
8. Contact form — 4 fields vs 6 fields
9. Dashboard onboarding — text intro vs York loom video
10. Paywall modal — 3 bullets vs single hero sentence
11. Builder application — open form vs application waitlist
12. Exit intent — with popup vs without (sanity check)

Measure: primary metric per test, secondary metric to check for unintended effects. Document results in `/docs/experiments/results.md`.
