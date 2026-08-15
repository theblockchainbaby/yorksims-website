# Loom Script — Software Module 01: Schema & Multi-Tenancy

> Target length: 12–18 minutes. Screen-record VS Code + the repo + a Postgres GUI (TablePlus/Neon).
> Tone: direct, builder-to-builder. No slides. Show the actual code. Pause on the parts that matter.

---

## Pre-roll setup (do before you hit record)

- [ ] `git clone https://github.com/theblockchainbaby/yorksims-software-01-schema` in a clean folder
- [ ] `pnpm install` done, `.env` filled in with a fresh Neon database URL
- [ ] VS Code open at the repo root, file tree visible
- [ ] A second terminal tab ready
- [ ] TablePlus / Neon SQL editor open in a browser tab, connected to the same DB
- [ ] Close Slack, email, notifications
- [ ] Camera bubble bottom-right, small

---

## SECTION 1 — The hook (0:00–1:30)

**[Screen: the repo README, scrolled to the top]**

> "If you've built a multi-tenant SaaS, you've had this nightmare. A developer writes a query, forgets the `where workspaceId` clause, and now Customer A is looking at Customer B's data. It's the single most common way SaaS apps leak data, and it happens because the schema *lets* it happen.
>
> This module is the schema layer from VitrOS — the SaaS I built from empty repo to a paying customer in 30 days. The whole point of this schema is to make that data leak *structurally impossible*. Not 'we'll be careful.' Impossible.
>
> Twelve minutes. By the end you'll have it running locally with seed data. Let's go."

---

## SECTION 2 — Clone & install (1:30–3:00)

**[Screen: terminal]**

> "Clone the starter."

```bash
git clone https://github.com/theblockchainbaby/yorksims-software-01-schema
cd yorksims-software-01-schema
pnpm install
```

> "Node 20+, pnpm, and a Postgres database. README has setup for local Postgres or Neon free tier — I'm using Neon here because it takes 30 seconds.
>
> Copy `.env.example` to `.env`, drop your database URL in. Done."

```bash
cp .env.example .env
# paste DATABASE_URL
```

---

## SECTION 3 — The schema (3:00–8:00) ← THE CORE OF THE VIDEO

**[Screen: VS Code, open `prisma/schema.prisma`]**

> "Here's the whole thing. Four models. Let me walk through why it's shaped this way."

**[Highlight `Workspace`]**

> "Workspace is the tenant. Every customer is a Workspace. It has a slug for URLs, a name, and relations down to memberships and projects."

**[Highlight `User`]**

> "User is a person. Notice — and this is the important part — a User does *not* belong to a Workspace directly. There's no `workspaceId` on User. A person can be in multiple workspaces."

**[Highlight `Membership` — slow down here]**

> "Membership is the join table. It's the only thing that connects a User to a Workspace. It carries the role — owner, admin, member. And look at the bottom: `@@unique([userId, workspaceId])` means a person can't be added to the same workspace twice. `@@index([workspaceId])` — write this down — every tenant-scoped table needs this index. Without it, your queries do a full table scan once you have real customers. I learned that one in production."

**[Highlight `Project`]**

> "And here's a tenant-scoped table. `workspaceId`, indexed. Every other table you add — Task, Document, Invoice, whatever — follows this exact pattern. `workspaceId String`, `@@index([workspaceId])`. No exceptions.
>
> That's the schema. Now — why does this prevent leaks? It doesn't, by itself. The schema makes it *possible* to be safe. The next part makes it *automatic*."

---

## SECTION 4 — Scoped queries (8:00–12:00) ← THE SECOND HALF OF THE CORE

**[Screen: VS Code, open `lib/db.ts`]**

> "Here's the trick. You don't trust yourself to remember the `where workspaceId` clause. You make it impossible to write a query without it.
>
> `scopedDb` takes a workspaceId and returns a thin wrapper around Prisma. Every method on it injects the workspaceId for you. `findMany` adds it to the where clause. `create` adds it to the data."

**[Scroll through the wrapper, point at the `where: { ...args.where, workspaceId }` line]**

> "So in your app code, you never write `prisma.project.findMany()`. You write `scopedDb(workspaceId).project.findMany()`. The unsafe version still exists — Prisma is still there — but in your route handlers, you only ever reach for the scoped version. And if you're disciplined about it, the compiler enforces it for you.
>
> Is this airtight? No. A determined developer can still import raw Prisma. But it turns 'forgot the where clause' from a thing that happens weekly into a thing that requires actively going around the guardrail. That's the difference between a leak and no leak."

**[Optional: show `scripts/query-demo.ts` running]**

```bash
pnpm tsx scripts/query-demo.ts
```

> "There's a demo script in the repo that proves it — it tries to query projects with the demo workspaceId and then with a fake 'attacker' workspaceId. Same query shape, different scope. The attacker scope returns nothing. That's the whole game."

---

## SECTION 5 — Migrations, briefly (12:00–14:00)

**[Screen: terminal]**

> "Three migration rules, fast, because they bite everyone:
>
> One — never edit a migration after it's deployed. Add a new one.
>
> Two — additive changes are safe by default. New columns get a default or are nullable. Adding NOT NULL to an existing column? That's a backfill migration first, then the constraint.
>
> Three — renames are two migrations, not one. Add the new column, copy the data, deploy. Then drop the old column, deploy. If you do it in one shot, your old pods break during a rolling deploy. Ask me how I know."

```bash
pnpm prisma migrate dev --name add_projects
pnpm prisma migrate deploy   # production
```

---

## SECTION 6 — Seed & run (14:00–16:00)

**[Screen: terminal, then TablePlus]**

> "The repo ships with seed data so it works the second you clone it. Demo workspace, demo user, three projects."

```bash
pnpm prisma db seed
```

**[Switch to TablePlus, show the tables populated]**

> "There it is. Workspace, User, the Membership linking them, three projects all scoped to the workspace. The seed is idempotent — run it twice, you don't get duplicates.
>
> If you want to wire this into a Next.js app right now, the README has the snippet. But the schema layer is the foundation, and that's what this module is."

---

## SECTION 7 — Close + CTA (16:00–17:30)

**[Screen: back to the README, or the YorkSims free-module page]**

> "So — you now have a multi-tenant schema you can't accidentally leak across, a scoped query layer that makes the safe path the only path you reach for, and seed data so it actually runs.
>
> Modules 02 through 06 build the rest of VitrOS on top of this: NextAuth v5 for auth, the app shell, Stripe with the webhook handlers that survive replays, the PWA offline queue, and the admin panel I wish I'd built on day one instead of day thirty. Same approach — real code from a real product, no toy examples.
>
> That's on the Pro tier, twenty-nine bucks a month, cancel anytime. Link's on the module page and in the description.
>
> This is the model for every vertical — one free module that's genuinely useful on its own, then the rest of the build. Next free drop is the Business vertical: LLC formation, the operating agreement template I actually use, the formation checklist. That's this week.
>
> Clone the repo, break it, build on it. See you in Module 02."

**[End recording]**

---

## Post-production checklist

- [ ] Trim dead air at the start
- [ ] Title: "Free Module: Multi-Tenant SaaS Schema (from VitrOS)"
- [ ] Thumbnail: the `schema.prisma` file with the Membership model highlighted
- [ ] Description: repo link + `/verticals/software/free-module` link + Pro link
- [ ] Pinned comment: "Repo: github.com/theblockchainbaby/yorksims-software-01-schema — questions in the Discord"
- [ ] Replace the placeholder block in `app/verticals/software/free-module/page.tsx` with the Loom embed
- [ ] Post to X + LinkedIn with the "$X / 30 days" framing from the content playbook

## Embed swap (when the Loom is live)

In `app/verticals/software/free-module/page.tsx`, replace the `{/* VIDEO PLACEHOLDER */}` Section with:

```tsx
<Section>
  <FadeIn>
    <div className="aspect-video rounded-2xl overflow-hidden border border-white/[0.06]">
      <iframe
        src="https://www.loom.com/embed/YOUR_LOOM_ID"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  </FadeIn>
</Section>
```
