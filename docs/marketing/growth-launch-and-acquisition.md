# YorkSims.com — Launch, Paid Acquisition & Sales Enablement

> Launch playbook + paid acquisition + sales assets. Covers: marketing-launch-strategy, marketing-ad-creative, marketing-paid-ads, marketing-sales-enablement, marketing-competitor-alternatives, seo-competitor-pages.

---

## 1. Launch tiers

Not every launch needs the same firepower. Pick the tier based on what's shipping.

| Tier | What triggers it | Channels |
|---|---|---|
| **Micro** | Small feature, new vertical module | Newsletter + LinkedIn + Discord |
| **Mid** | New vertical fully live, pricing change, free tool | All of above + X thread + Reddit + IndieHackers |
| **Major** | Pro+ launch, Builder tier reveal, annual plan | All of above + Product Hunt + HN Show + press outreach + paid ads |

## 2. The 14-day launch window (for Major tier)

### Day -14 to -7 — Preparation
- Finalize landing page and pricing page copy per `positioning-and-copy.md`
- Brief ambassadors in Discord (top 10 engaged members get early access)
- Record 3 video assets: founder story, product walkthrough, pricing walkthrough
- Line up 5 allies for launch-day amplification (micro-influencers you've talked to)
- Draft all launch posts (X, LinkedIn, newsletter, Reddit, IndieHackers)
- Set up Product Hunt page (submit to ship)

### Day -7 to -3 — Warm-up
- Tease on LinkedIn with "what's coming" post
- Email list: "Something new ships [day]"
- Tell the Discord: early access goes live tomorrow for Builder members
- Ensure MoltBot is running at 100% — no outages during launch window

### Day -3 — Dress rehearsal
- Ship to Builder members 3 days early
- Collect 3 testimonials within 48 hours
- Fix anything that broke

### Day 0 — Launch
- 8 AM Eastern: Product Hunt submission goes live
- 8:30 AM: LinkedIn post + X thread
- 9 AM: Newsletter blast
- 10 AM: Reddit (r/SideProject, r/indiehackers) — comment-first, link-second
- 11 AM: Hacker News Show submission
- All day: reply to every comment personally within 1 hour

### Day +1 to +7 — Amplification
- Day 1: Follow-up thread with "what happened yesterday"
- Day 2: Share 3 screenshots of real usage
- Day 3: Founder interview post / podcast outreach
- Day 5: "What I learned in the launch" post
- Day 7: Wrap-up newsletter with stats

### Day +7 to +14 — Compound
- Start writing the launch retrospective blog post
- Turn Discord feedback into a 30-day roadmap post
- Reach out to 5 podcasts with the launch as the peg

## 3. Launch copy templates

### Product Hunt launch copy

**Title:** "YorkSims — Ship across 10 industries with a builder who actually does it"

**Tagline:** "A subscription that replaces 10 courses, 1 newsletter, and a cohort program"

**Description:**
> Most learning platforms are theoretical. YorkSims is the opposite — it's a subscription to watch a builder ship across 10 industries (SaaS, AI agents, hardware, blockchain, business, real estate, and 4 more) with the actual code, contracts, and receipts.
>
> Every vertical has a live case study: VitrOS (SaaS in 30 days), MoltBot (autonomous AI agent), DualPay (XRPL payments), a raw land development with real permits, and more.
>
> $29/mo for Pro. Cancel anytime. Join the builders building everything at once.

### Launch day LinkedIn post

```
Today I'm launching the thing I've been quietly building for 6 months.

YorkSims is a subscription platform where I document building across 10 industries in public — with the code, contracts, and receipts.

Why it matters: most founders specialize, and specialization leaves you blind. The builders who compound across domains have an unfair advantage, but nobody teaches how.

So I started doing it and recording everything.

What's in it:
→ 10 verticals (SaaS, AI agents, hardware, blockchain, business, land, athlete, voice agents, creative, partnerships)
→ Weekly build breakdowns with the actual repos
→ Real contracts, LLC docs, SOPs you'd pay a lawyer for
→ Monthly live Q&A
→ Private Discord

$29/month. Cancel anytime. Link in comments.

(This is the platform I wish existed when I transitioned from D1 basketball to building tech companies.)
```

### Launch day X thread (7 tweets)

Tweet 1: Hook — "I'm launching YorkSims today. Here's why most learning platforms are broken and what I built instead:"
Tweet 2: Problem — the tutorial trap
Tweet 3: Why specialization fails
Tweet 4: The 10-vertical angle
Tweet 5: The receipts (specific builds)
Tweet 6: The pricing ($29/mo, cancel anytime)
Tweet 7: Link + "Built for the builders who won't pick a lane"

## 4. Paid acquisition strategy

### Stance: paid is a tool, not the engine

YorkSims is built for content-led growth. Paid acquisition exists to:
- Amplify winning organic posts
- Fill specific gaps in the funnel
- Test new ICPs / creative

**Not** to be the primary channel.

### Budget: start small

- Month 1: $500 test budget split across 3 platforms
- Month 2: double the channel that returned >1.5× ROAS
- Month 3: kill the losers, scale the winners

### The three channels (in priority order)

**1. LinkedIn Ads** — best ICP fit

Target: people with job titles like "founder", "indie hacker", "developer", "founding engineer" in the US/UK/Canada, age 22–40.

Creative: native-looking single-image ads. The image is a screenshot from a blog post or a Discord conversation. The copy is a direct quote from the post.

Primary text:
> "I built a 20-skill autonomous agent for under $250/mo. It handles 85% of my back office.
>
> Here's the full architecture breakdown."

CTA: "Learn More" → blog post → Pro signup.

**2. Twitter/X Ads** — for amplification of organic wins

Only promote tweets that have already gotten organic traction (50+ likes). Don't originate ads on X — amplify.

Target: followers of specific indie hacker accounts (Pieter Levels, Sahil Lavingia, etc.).

**3. Reddit Ads** — for specific subreddits

r/SideProject, r/indiehackers, r/EntrepreneurRideAlong, r/learnprogramming.

Creative: native image + copy that matches subreddit voice. Never corporate-sounding.

CTA: "Read the full breakdown" → blog post.

### Ad creative generator

Start with 3 variants per platform, rotate in new ones every 2 weeks. Track CTR and CPA separately.

**Hook formulas that work for YorkSims specifically:**

- Binary claim: "Most founders are wrong about [X]. Here's what I see building [Y]."
- Specific number: "$14.50. That's what an Apple-grade animation costs now."
- Contrarian frame: "I stopped optimizing for focus. Now I build 10 things at once."
- Counter-intuitive: "The best way to validate a SaaS idea is to launch 30 days early."
- Receipts format: "6 months. 10 verticals. 5 operating subsidiaries. $4,200 MRR. Here's what broke."

### Landing pages for paid

Never send paid traffic to the home page. Each ad goes to a dedicated landing page with matching message.

Build these 5 first:
1. `/l/moltbot` — for AI Agents ads
2. `/l/vitros` — for SaaS ads
3. `/l/athlete` — for the athlete transition ICP
4. `/l/ten-verticals` — for the polymath ICP
5. `/l/launch` — for "launch day" ads

Each landing page:
- 1 headline matching ad copy
- 1 proof point
- 1 CTA
- Nothing else above the fold
- Below the fold: full value props, pricing, FAQ, testimonials

## 5. Sales enablement (for Builder tier)

Even though there's no traditional sales team, the Builder tier is sold. These assets handle the consideration phase.

### The Builder tier brochure (PDF + web)

One-pager (8.5×11) with:
- Who Builder is for
- What's different vs Pro
- Success stories from current Builder members (once we have them)
- The "capped at 20" explanation
- How to apply
- Cost breakdown

### Discovery call script (30 min)

Used for every Builder tier applicant, no exceptions.

**Opening (2 min):** "Thanks for applying. I want to spend 30 minutes on 3 things: what you're trying to build, whether Builder is actually right for you, and if so, what we'd work on together."

**Goals segment (10 min):**
- What are you building?
- What's the timeline?
- Where are you stuck?
- What does success look like in 90 days?

**Fit segment (10 min):**
- Walk through what Builder actually includes
- Honest conversation about what it is NOT (not a course, not a bootcamp, not coaching on everything)
- Share the specific problem Builder will solve for them

**Close segment (8 min):**
- If yes: here's the link, send it in the chat, set the first coaching session
- If no: "Here's what I'd recommend instead" (could be Pro only, could be another resource)

**Never close by pressure. The cap is real — if it's not a fit, there's always the next applicant.**

### Objection handling

| Objection | Response |
|---|---|
| "$499 is a lot" | "It's less than one hour with a good attorney. What would you build if you could ask York anything for 30 days?" |
| "I don't know if I'll use it enough" | "Pro is $29. Start there. If you find yourself wanting the direct line, upgrade." |
| "Can I pay quarterly?" | "Yes — $1,497/quarter. Same access. Saves you a decision every month." |
| "Do you offer refunds?" | "Full refund within 14 days if it's not a fit. No questions." |
| "Why is it capped at 20?" | "Because the direct email promise stops working above that. Every member gets a 24-hour reply time. That's only possible at small scale." |

## 6. Competitor comparison pages

High-intent SEO keyword: "YorkSims vs [X]" and "[X] alternatives." Each page should be honest, not salesy.

### Pages to build (order by search volume / intent)

1. `/compare/yorksims-vs-udemy` — the theory vs execution angle
2. `/compare/yorksims-vs-coursera` — same
3. `/compare/yorksims-vs-lennys-newsletter` — the "breadth across verticals" angle
4. `/compare/yorksims-vs-indie-hackers` — the "structured vs scattered" angle
5. `/compare/yorksims-vs-on-deck` — the "price accessibility" angle
6. `/compare/yorksims-vs-maven` — the "subscription vs cohort" angle
7. `/alternatives-to-yorksims` — a meta page listing honest alternatives

### Page template

Each comparison page has this structure:

1. **H1:** "YorkSims vs [X]: Which is Right for You?"
2. **TL;DR box** (before the fold): "TL;DR — [X] is better if [A]. YorkSims is better if [B]."
3. **What [X] does well** (3–5 bullets)
4. **What YorkSims does well** (3–5 bullets)
5. **Feature comparison table** (11 rows: price, format, cadence, community, etc.)
6. **Who should pick [X]**
7. **Who should pick YorkSims**
8. **Honest verdict**
9. **CTA** — but soft: "Still not sure? Try Pro for 7 days."

### Tone rules

- **Never trash the competitor.** Lenny is a great product. Say so.
- **Always identify cases where the competitor wins.** Credibility sells.
- **Link to the competitor's site.** Mature.
- **Don't use their logo without permission.** Text references only.

## 7. Alternatives page

`/alternatives` — a single page listing honest alternatives to YorkSims, grouped by what you actually need.

**Sections:**

- **If you want one deep course:** Udemy, Coursera, specific creators
- **If you want a newsletter:** Lenny's, Stratechery, Not Boring
- **If you want a cohort program:** Reforge, On Deck, Maven
- **If you want community:** Indie Hackers, r/SideProject, r/startups
- **If you want a bootcamp:** Lambda School, etc.
- **If you want YorkSims:** "You want all of the above in one subscription at $29/mo, plus the receipts."

This page ranks for "alternatives to" queries and demonstrates confidence.

## 8. Press & podcast outreach

### The target list (first 30)

Focus on shows/publications that hit the builder ICP:

- Indie Hackers Podcast
- My First Million
- Startup School / YC Library
- The Startup Chat
- Software Engineering Daily
- The Changelog
- The Future of Coding
- Slam Jam (hardware / chip design)
- Athletes Unlimited (athlete transition)
- IRL Founder (gritty founder stories)

### Cold outreach template for podcasts

```
Subject: Pitch: [specific angle tied to their recent episode]

Hey [first name],

Loved your episode with [guest] on [topic]. The [specific moment] was the part I remembered after.

I'm York Sims — I run YorkSims.com, a subscription platform where I document building across 10 industries in public (SaaS, AI agents, hardware, blockchain, real estate, etc).

The angle I'd bring to your show: [specific angle, tailored]. For example:

— The unfair advantage of building across verticals instead of specializing
— How I built a 20-skill autonomous agent for under $250/mo that runs my back office
— The D1 basketball → Ankara, Turkey → tech founder transition

Happy to send you the posts for any of those if you want to vet before a pitch. No pressure.

— York
```

**Rules:**
- Personalize every single send
- Never send without listening to at least one episode
- Never mass-pitch

## 9. Partnership & affiliate

### Not now.
Build the product. Build the audience. Then build partnerships.

Reassess at 500 active Pro members. Until then, partnerships dilute focus.
