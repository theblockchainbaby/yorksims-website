# YorkSims.com — Analytics, Customer Research & Experimentation

> Consolidated measurement playbook. Covers: marketing-analytics-tracking, marketing-customer-research, marketing-ab-test-setup, marketing-seo-audit (measurement portion).

---

## 1. The one number

**North Star Metric:** *Active Pro members who completed at least one vertical module in the past 7 days.*

Not signups. Not MRR. Not visits. Real engagement with the product. This is the metric every decision gets tested against.

Secondary metrics:
- **MRR** (keep honest, but don't optimize primarily)
- **M2 retention** (month-over-month Pro retention)
- **Activation rate** (% of signups who hit first completion within 14 days)
- **Organic traffic** (weekly visits, tracked via Search Console)
- **Viral coefficient** (referrals per active member per month — for when referral program launches)

## 2. Analytics stack

### What to ship (in order)

1. **Vercel Analytics** — free, already available, zero setup. Get page view data day one.
2. **PostHog** (self-hosted or cloud free tier) — event tracking, funnels, feature flags. Essential for product analytics.
3. **Google Search Console** — free, essential for SEO health and query data.
4. **Plausible** or **Fathom** (optional) — if you want a cleaner privacy-first page view dashboard separate from PostHog.
5. **Stripe dashboard** — revenue truth. Every reported revenue number comes from Stripe, never from a derived metric.

### Do not ship
- Google Analytics 4 — poor privacy story, poor UX, the ICP expects better
- Heatmap tools (Hotjar, FullStory) — overkill until you have >1k DAU
- Segment — overkill until you have multiple destinations

## 3. Event schema

The events MoltBot + PostHog track. Lock this schema in before shipping instrumentation.

### User lifecycle events
- `user_signed_up` — props: source, referrer, plan
- `user_started_trial` — props: plan
- `user_activated` — fired when first module completion happens
- `user_churned` — fired on cancellation, props: reason, tenure_days
- `user_reactivated` — won-back member returns

### Product events
- `vertical_viewed` — props: slug
- `module_started` — props: vertical, module_num
- `module_completed` — props: vertical, module_num, duration_seconds
- `portal_item_opened` — props: portal_slug, item_id
- `xp_earned` — props: source, amount
- `certificate_unlocked` — props: vertical

### Marketing events
- `blog_post_viewed` — props: slug, vertical
- `cta_clicked` — props: location, target_plan
- `free_tool_used` — props: tool_slug, completed (bool)
- `email_captured` — props: source
- `newsletter_subscribed` — props: source

### Revenue events
- `subscription_created` — props: plan, interval, amount
- `subscription_upgraded` — props: from_plan, to_plan
- `subscription_cancelled` — props: plan, tenure_days, reason
- `refund_issued` — props: amount, reason

**Rule:** No event without a prop. If a prop is unknown at fire time, use `source: "unknown"`. Never drop the prop.

## 4. The funnel dashboard

Build as a PostHog insight. Pin to a shared team dashboard.

**Acquisition funnel:**
1. `page_viewed` → `blog_post_viewed` → `cta_clicked` → `user_signed_up`

**Activation funnel:**
2. `user_signed_up` → `vertical_viewed` → `module_started` → `module_completed` → `user_activated`

**Upgrade funnel:**
3. `user_activated` → `xp_earned` sum > 1000 → `subscription_upgraded` (to Builder)

**Retention funnel:**
4. By cohort: `subscription_created` date → M1, M2, M3, M6 retention curve

Review these four dashboards every Monday. The North Star metric lives in funnel 2.

## 5. Customer research plan

### Phase 1 — First 20 interviews (weeks 1–4 of launch)

**Who:** First 20 Pro signups. Offer a free month extension in exchange for a 30-minute conversation.

**Goal:** Understand why they signed up, what they expected, and what almost made them not sign up.

**Script (30 min):**

1. "Tell me about the moment you decided to sign up." (5 min)
2. "What almost stopped you?" (5 min)
3. "What were you doing instead before this?" (5 min)
4. "Walk me through your first week as a member." (5 min)
5. "If we removed one thing, what would make you quit?" (5 min)
6. "If we added one thing, what would you pay more for?" (3 min)
7. "Anything else?" (2 min)

Record (with permission). Transcribe. Store in `/docs/research/interviews/` with a date-slug filename.

### Phase 2 — Quant survey (month 2)

Short, no-login survey. 5 questions:

1. How disappointed would you be if you could no longer use YorkSims? (Sean Ellis PMF question)
2. What type of person benefits most from YorkSims?
3. What's the main benefit you get from it?
4. What have you used instead?
5. How can we make it better?

Send to all active Pro members. Target >40% response rate. The PMF question is the single most useful signal — >40% "very disappointed" = PMF.

### Phase 3 — Churn exit interviews (ongoing)

Every cancellation triggers a 1-question survey:

> "We'd love to know what went wrong. Which best describes why you canceled?"
>
> - Too expensive
> - Not using it enough
> - Not what I expected
> - Found a better alternative
> - Just trying it out
> - Other (please explain)

Route the free-text "other" answers to York's inbox for manual review.

### Synthesis cadence

- Read all interviews / surveys monthly
- Produce one "customer insights" memo at the end of each month
- Store in `/docs/research/insights/YYYY-MM.md`
- Every new roadmap decision must cite a piece of research

## 6. A/B testing framework

### When to test
- You have a hypothesis
- You have enough traffic for statistical significance within 14 days
- The test has a single primary metric

### When NOT to test
- You don't have traffic (minimum ~300 conversions per variant)
- You don't have a clear hypothesis ("let's see what happens")
- The cost of testing > the cost of just shipping the better version

### Test template (document every test)

```markdown
# Test: [descriptive name]

**Start date:** YYYY-MM-DD
**Target end date:** YYYY-MM-DD (min 14 days)
**Owner:** York

## Hypothesis
If we [change], then [metric] will [direction] by [amount], because [reason].

## Variants
- Control: [current state]
- Variant A: [proposed change]

## Primary metric
[The one number this test moves or doesn't]

## Secondary metrics (guard rails)
- [Metric that must not degrade]
- [Metric that must not degrade]

## Sample size target
[Calculation based on baseline rate and minimum detectable effect]

## Result (filled after test)
- Primary: X → Y (significant / not)
- Guard rails: [impact]
- Decision: ship / kill / iterate
- Lessons learned
```

### Primary metric discipline

Only one primary metric per test. If you watch multiple metrics equally, you will cherry-pick.

### Test execution rules

1. Never peek before the 14-day mark unless there's a severe guard rail breach
2. Never call a winner on less than 95% confidence
3. Never run two tests that affect the same metric simultaneously
4. Document every test, including the ones that failed

See `growth-conversion.md` section 11 for the first 12 tests to run.

## 7. SEO measurement

### Weekly review (every Monday)

- Search Console: new queries, impressions, CTR on key pages
- PostHog: blog post views by source
- Top 10 pages by organic traffic
- Top 10 queries by impressions (are we capturing them?)
- Index coverage issues — any pages blocked or noindexed accidentally?

### Monthly review (first Monday of month)

- Cumulative organic traffic growth
- Ranking changes on top 20 target keywords
- Competitor comparison (Ahrefs or similar)
- Content gaps — which target queries have no page yet?
- Backlink additions (manual review if >5 new domains)

### Quarterly review (first Monday of quarter)

- Full audit rerun using the `seo-audit.md` worksheet
- Refresh the `seo-plan.md` roadmap based on what's working
- Content refresh cycle — update the top 20 organic pages with new data, new internal links, new CTAs
- Goal check: did we hit the 90-day organic traffic target?

## 8. Reporting cadence

### Daily
Nothing automated. York checks Stripe and Discord manually (5 min).

### Weekly — Monday 7 AM Eastern
MoltBot compiles a Monday morning rollup:
- New signups
- Active users (North Star)
- MRR change
- Top 3 blog posts by traffic
- Top 3 funnels with dropoff
- Notable churn events
- Research insights added

Delivered as a single dashboard screenshot + a 200-word summary in York's inbox.

### Monthly — first Friday
York writes a 500–800 word "month in review" memo:
- What shipped
- What the numbers said
- What we learned (linking to research memo)
- What's next
- Roadmap changes

Published internally, also used as source material for the public newsletter.

### Quarterly — end of quarter
Full product + business review:
- North Star trajectory
- M2/M3/M6 retention cohorts
- Acquisition channel ROAS
- Content ROI (revenue per post)
- Decisions for next quarter

## 9. Data quality & governance

- **PII:** Never send PII to PostHog. Hash user ID before sending.
- **Email:** Email lives only in Supabase + Stripe + the email provider. Never in PostHog.
- **Event naming:** `snake_case` verbs in past tense. `user_signed_up`, not `SignUp`.
- **Deprecation:** Never rename an event. Deprecate the old one, launch the new one, migrate downstream dashboards.
- **Backfill:** Never try to backfill events from logs. If you missed it, you missed it.
- **Truth source:** Stripe is the source of truth for revenue. PostHog is the source of truth for engagement. Supabase is the source of truth for account state. Always.
