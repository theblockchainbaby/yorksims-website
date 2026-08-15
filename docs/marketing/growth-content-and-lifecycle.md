# YorkSims.com — Content Strategy, Email & Social Lifecycle

> Consolidated content playbook. Covers: marketing-content-strategy, marketing-marketing-ideas, marketing-social-content, marketing-email-sequence, marketing-cold-email, marketing-onboarding-cro, marketing-churn-prevention, marketing-ai-seo.

---

## 1. Content strategy at a glance

| Channel | Cadence | Purpose | Owner |
|---|---|---|---|
| Blog (build breakdowns) | 1 per week | SEO + authority + referrals | York |
| LinkedIn | 3–5 posts per week | Reach new ICPs | MoltBot drafts, York approves |
| X / Twitter | 1–2 threads per week | Existing audience | York |
| Newsletter | 1 per week | Retention + upsell | York |
| YouTube | 1 video every 2 weeks | Deep lead magnet | York |
| Discord | Daily | Community retention | York + moderators |
| Email lifecycle | Automated | Activation + retention | MoltBot |

## 2. Content pillars (the 5 topics we own)

1. **Building in multiple domains** — the 10-verticals angle, cross-pollination stories
2. **Shipping SaaS from zero** — VitrOS breakdowns, Next.js stack decisions
3. **AI agents that actually work** — MoltBot architecture, Claude Code skills, MCP
4. **The athlete → founder transition** — discipline, habits, mental models
5. **The unglamorous foundations** — LLC structure, raw land, well/septic, contracts

Every post, video, or thread should live in exactly one pillar. Tag them that way in the CMS.

## 3. Editorial calendar template (90-day rolling)

```
Week 1   — Blog: SaaS pillar    | LinkedIn: Athlete hook   | Newsletter: Rollup
Week 2   — Blog: Agent pillar   | LinkedIn: SaaS tactical  | Newsletter: Ask-me
Week 3   — Blog: Hardware pillar| LinkedIn: Business tip   | Newsletter: Behind the scenes
Week 4   — Blog: Business pillar| LinkedIn: Agent demo clip| Newsletter: Monthly review
… rotate
```

Never ship two blog posts from the same pillar back to back. Diversity is part of the positioning.

## 4. Social templates (LinkedIn)

**Template 1 — The contrarian hook (highest engagement)**

```
Most founders are wrong about [topic].

They think [common belief].

Here's what I actually see building [proof context]:

1. [counter-observation]
2. [counter-observation]
3. [counter-observation]

The uncomfortable truth: [punchline].

(Full breakdown in this week's build blog: [link])
```

**Template 2 — The specific number (second highest)**

```
$14.50.

That's what it costs me to ship an Apple-grade product launch animation now.

A year ago the same output would have cost $8,000 and taken a week.

Here's the pipeline:

— fal.ai Nano Banana 2 for keyframes
— Kling 3.0 for motion interpolation
— ffmpeg for frame extraction
— A 600-line Python glue script

Full repo + walkthrough: [link]
```

**Template 3 — The receipts carousel**

One slide for each receipt. Build in Canva. Post natively.

```
Slide 1: "I ship across 10 industries. Here's what $X month of tool spend looks like."
Slide 2–10: Screenshot proof for each vertical.
Slide 11: "Full breakdown: [link]"
```

## 5. X / Twitter thread patterns

**The 7-tweet thread**

1. Hook (binary claim + timeframe)
2. Context (the problem)
3. Setup (why others failed)
4. The key insight
5. Example 1 (specific, numbered)
6. Example 2 (specific, numbered)
7. Payoff + link to full breakdown

Never thread without a link. Every tweet in the thread should be able to stand alone if quoted.

## 6. Newsletter sections (weekly)

1. **The build this week** — 150 words on what shipped
2. **One link worth your time** — external, generous
3. **The number** — one specific metric with commentary
4. **Community spotlight** — a builder from the Discord
5. **What's next** — preview of upcoming work
6. **PS** — always a Pro upsell framed as value (not pressure)

Target: 600–900 words, 3–4 minute read. Send Tuesday 10 AM Eastern.

## 7. Email lifecycle sequences

### 7.1 Welcome sequence (triggered on signup)

**Email 1 — Immediate: "You're in. Here's exactly what to do next."**
- Confirm they're in
- Tell them the 3 things to do in the first 24 hours (pick a vertical, join Discord, read the flagship blog post)
- Link to `/hub`

**Email 2 — +1 day: "The first receipt"**
- Link to `business-runs-without-me` (flagship post)
- Explain the post exists because of Pro receipts
- Soft nudge toward their most relevant vertical

**Email 3 — +3 days: "The unfair advantage"**
- Share the athlete → founder frame
- Link to `d1-to-entrepreneur`
- Mention direct Discord support

**Email 4 — +7 days: "The first week check-in"**
- Ask one question: what vertical are you focused on?
- Reply goes to York's inbox for real response (MoltBot routes)
- Cadence note: "I read every reply"

**Email 5 — +14 days: "The 14-day moment"**
- Show progression: what Pro members typically have done by day 14
- Soft upgrade prompt to Builder tier if they're very active
- Otherwise: "stay the course" message

### 7.2 Activation rescue (triggered if no portal activity in 5 days)

**Email A:** "Stuck? Here's the fastest path to value."
**Email B (if no response after 3 more days):** "One question: what are you trying to build?"
**Email C (if still no response after 5 days):** "We won't keep emailing — here's how to pause."

### 7.3 Churn prevention (triggered on cancel click)

**Before the cancel confirms:**
- Offer 1 month free if usage has been real (>5 portal items touched)
- Offer a tier downgrade (full Pro → lite Pro concept, future)
- Ask the "what went wrong" question — one answer, one button

**After cancel confirmed:**
- Immediate: "You're out. Here's what's yours to keep."
- +14 days: one high-value check-in with new content highlights
- +60 days: win-back offer (20% off first month back)
- Then stop. No more emails.

### 7.4 Payment failure rescue (dunning)

Day 0 — card fails: "Heads up, your card got declined. Here's the update link."
Day 2 — still failing: "Second try — same link. No stress."
Day 4 — still failing: "Final retry today. After that we pause your access."
Day 7 — account paused: "You're paused. Reactivate anytime: [link]"

Stripe handles retries; MoltBot handles the messaging.

## 8. Cold email (outbound)

### When to use
- Builder tier outreach (high-fit founders who should upgrade)
- Podcast / press
- Partnership prospecting
- **Never** mass-cold for Pro tier. Pro is inbound-only.

### Template: The founder-to-founder cold email

```
Subject: [Specific thing they shipped]

Hey [first name],

I saw you shipped [specific thing] last [week/month]. The [specific detail] was the interesting part.

I'm York. I run YorkSims — a subscription platform where I document building across 10 verticals (SaaS, AI agents, hardware, etc). Not a course. Real builds with the repos.

One thing I think would resonate: [specific angle tied to their work]. Want me to send you the breakdown I wrote about [related build]?

No CTA. No sign-up. Just thought you'd like it.

— York
```

**Rules:**
- Never send without a specific reference to their work
- Never pitch the product in email 1
- Never send to someone who hasn't shipped anything
- Max 30 per week. Quality over volume.

### Follow-up cadence
- Day 4: polite bump with one extra resource
- Day 11: break-up email ("I'll stop here")
- Stop after 3 touches. Period.

## 9. Onboarding CRO (in-app, post-signup)

The 14-day activation window is everything. Here's the sequence that starts on first login.

**Step 1 (first login):** Personal welcome from York (pre-recorded 30-second video). Asks: "What are you trying to build?" with 10 vertical buttons.

**Step 2:** Based on answer, route to that vertical's curriculum page. Pre-select "Module 01" and show a single "Start Here" CTA.

**Step 3:** After completing Module 01 (or after 15 minutes of activity, whichever comes first), trigger a Discord invite modal with a specific channel recommendation.

**Step 4:** Progress bar on dashboard shows XP for each vertical. Gamify the first 500 XP with a certificate.

**Step 5:** At 500 XP, offer a 1-on-1 async video message from York (real touch, under 2 min, drives word of mouth).

Gate the certificate so it becomes a shareable asset (enables `/certificate/[id]` as a distribution channel).

## 10. AI SEO / GEO (be cited by ChatGPT and Perplexity)

Optimizing for AI search engines means:

1. **Use llms.txt** — add `/public/llms.txt` listing the most citable pages
2. **Structured answers to common questions** — FAQ sections with direct Q: A: pairs
3. **Attribution-rich content** — every claim has a source
4. **Name your concepts** — "The Trust Model" (shadow → draft → autonomous) is more citable than "our agent approach"
5. **Tables and lists over prose** — AI extracts structured data first
6. **Opinion with conviction** — AI engines cite strong-opinion sources more than hedged ones

Pages to optimize first for AI citation:
- `/blog/moltbot-autonomous-ai-agent` (name the trust model)
- `/blog/hbm-memory-systemverilog` (name the scheduler patterns)
- `/blog/raw-land-development` (the 8-item due diligence checklist)
- `/blog/llc-operating-agreement` (the holding company pattern)

Add `llms.txt` and verify each page has an FAQ block below the main content.

## 11. Content ideas bank (120 days of ideas)

Quick categories, rotate through:

**Build breakdowns (1/week):** Each of the 10 verticals gets a detailed build breakdown post every 10 weeks.

**The "X days" format:** "30 days to production SaaS", "14 days of raw land permits", "7 days to a working voice agent".

**The "I was wrong" format:** "I was wrong about [X] — here's what I learned." Extremely high conversion for authentic founder voice.

**The decision log:** "Why I picked [X] over [Y]: the 3 tradeoffs that mattered." Works for every tool choice.

**The reading list:** "The 5 papers/books/repos that actually changed how I build [X]." Generosity posts get linked.

**The failure post:** "This didn't work. Here's what I'd do differently." Never bury a failure.

**The specific-number post:** "$X to build [Y]." Numbers are thread food.

**The meta-post:** "Here's how this post was written." Pulling back the curtain works.

Tag each idea with the pillar, the target ICP, the format, and the expected channels at the time of drafting.
