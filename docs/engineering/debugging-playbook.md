# YorkSims.com — Systematic Debugging Playbook

> Root cause analysis first, fix second. From `superpowers-systematic-debugging`.

---

## The principle

**The bug is never where it looks like it is.** If the bug were obvious, it wouldn't be a bug. Don't fix the first theory. Don't fix the second theory. Fix the actual cause.

## The 4-phase method

### Phase 1 — Reproduce (don't skip this)

Before touching code, you must be able to trigger the bug on demand.

**Do:**
- Write down the exact steps
- Record the environment (dev/staging/prod, browser, user state)
- Capture the error message verbatim — full stack trace, not a summary
- If it's flaky, note how often it reproduces

**Don't:**
- Start debugging from memory
- Trust the bug report without reproducing
- Assume "it's probably the same as last time"

**Output of this phase:** a sentence like "When I do X with Y state, I see Z every time (or 3/10 times)."

If you cannot reproduce the bug, you are not ready to debug it. Your job is to find a reliable reproduction first.

### Phase 2 — Isolate

Once you can reproduce, narrow down the surface area.

**Techniques:**
- Binary search the commit history (`git bisect`)
- Binary search the code path — comment out halves until the bug disappears
- Flip feature flags on/off
- Run with a different user / workspace / tenant
- Check the same route in incognito mode to eliminate cache/state
- Compare browser behavior (Chrome vs Safari vs Firefox)
- Check the network tab — is a request failing, slow, or returning wrong data?
- Check the console — is an error being swallowed?
- Check the server logs — is anything erroring upstream?

**Do:**
- Record what you ruled out, not just what's still on the table
- Narrow to the smallest possible reproduction
- Keep binary searching

**Don't:**
- Fix a theory without confirming it
- Stop at the first plausible culprit
- Assume intermittent = random

**Output of this phase:** "The bug happens in [specific module/function/line/commit] when [specific condition]."

### Phase 3 — Understand

Now that you know where, understand *why*.

**Ask:**
- What is the code supposed to do?
- What is it actually doing?
- What's the difference between what it should do and what it does?
- Why does that difference exist?
- Is this a symptom of a deeper issue?

**Techniques:**
- Read the code aloud
- Trace the data flow by hand
- Add temporary `console.log` at each step (remove before commit)
- Use the debugger — step through the failing path
- Check assumptions about inputs — log them
- Check assumptions about state — log it
- Check assumptions about types — log `typeof` and shapes

**Do:**
- Form a hypothesis with specific predictions
- Verify your hypothesis with evidence
- Ask "why" until you hit something immutable

**Don't:**
- Stop at the first "probably because..."
- Assume you understand without verifying
- Guess at the cause based on vibes

**Output of this phase:** "The bug happens because [specific mechanism], which we didn't expect because [assumption that turned out wrong]."

### Phase 4 — Fix

Only now do you write code.

**Do:**
- Fix the root cause, not the symptom
- If the root cause is too deep to fix now, document why, fix the symptom explicitly labeled as a workaround
- Add a test that would have caught this
- Verify the fix with the exact reproduction from Phase 1
- Check for related bugs — if X broke because of Y, what else depends on Y?

**Don't:**
- Write a "shotgun fix" (change 10 things hoping one works)
- Catch-and-ignore the error
- Add a try/catch to hide the symptom
- Ship without the test

**Output of this phase:** A commit with (a) the fix, (b) the test, (c) a commit message explaining the root cause.

## Common debugging scenarios in YorkSims

### Scenario 1: A page renders empty / blank
Likely causes, in order:
1. Client component trying to use a server-only API
2. Async data not awaited
3. `use()` or `useState` called outside a client component
4. Silent throw in a child component caught by the root error boundary
5. Tailwind class purged that was dynamically generated

Debug by: checking the browser console, checking `next build` output, checking if the error boundary is catching something.

### Scenario 2: Metadata isn't appearing
Likely causes:
1. You added `export const metadata` in a client component (not allowed)
2. You put metadata in page.tsx instead of layout.tsx for a client page
3. `generateMetadata` is returning undefined for unknown slug
4. The page route doesn't match what you expected

Debug by: viewing `<head>` in DevTools, logging the metadata object from within `generateMetadata`, checking the route actually matches.

### Scenario 3: Sitemap missing pages
Likely causes:
1. `app/sitemap.ts` imports stale data
2. New post not added to `app/lib/blog.ts` POSTS array
3. Vertical ID mismatch between `portals.ts` and `vertical-content.ts`

Debug by: curling `/sitemap.xml` in dev and checking for the specific slug.

### Scenario 4: Stripe webhook not firing
Likely causes:
1. Webhook secret mismatch between Stripe dashboard and `.env.local`
2. Route not receiving POST (check Vercel logs)
3. Middleware blocking the request
4. Signature verification failing silently

Debug by: using `stripe listen` locally, checking Vercel function logs, verifying `.env.local` matches the live secret.

### Scenario 5: Supabase query returns empty
Likely causes:
1. RLS (Row Level Security) policy blocking the query
2. User not authenticated / session expired
3. Wrong schema / table name
4. Scoped query helper returning wrong workspace

Debug by: running the query in the Supabase SQL editor with the user's JWT, checking RLS policies, logging the query parameters.

### Scenario 6: Build fails in CI but passes locally
Likely causes:
1. Dependency version drift (`package.json` vs `package-lock.json`)
2. Case-sensitive filesystem (Mac is not, Linux CI is — `Foo.tsx` ≠ `foo.tsx`)
3. Missing env vars in CI
4. Node version mismatch

Debug by: running the exact CI command locally, comparing `node --version`, checking for mixed-case imports.

## The debugger > console.log

`console.log` tells you what a value is. The debugger tells you *when* and *why*. Use both, but default to the debugger for non-trivial issues.

### In Next.js
```bash
node --inspect-brk node_modules/.bin/next dev
```
Then open `chrome://inspect` and attach.

### In tests
```bash
vitest --inspect-brk
```

### In the browser
- React DevTools — component tree, props, state
- Network tab — every request and response
- Sources tab — breakpoints in client code
- Performance tab — frame timing (for animation issues)

## What to NOT do when debugging

1. **Do not change multiple things at once.** You will not know which one fixed it.
2. **Do not guess.** "Let me try X" is not debugging, it's gambling.
3. **Do not dismiss a failing test as flaky.** Flaky tests are bugs. Investigate.
4. **Do not ignore intermittent errors.** Intermittent means race condition, almost always.
5. **Do not add `try/catch` to make an error go away.** That's not a fix, that's hiding.
6. **Do not stop at the first cause you find.** Keep asking "why" until you hit bedrock.
7. **Do not debug in production.** Reproduce locally or in staging.
8. **Do not skip writing down what you tried.** A week from now you will not remember.

## The bug journal

For bugs that take more than 30 minutes, write a bug journal entry:

```markdown
# Bug: [short description]

## Symptoms
What the user sees / what the system does.

## Reproduction
Exact steps.

## What I tried
- Theory 1: [...] — ruled out because [...]
- Theory 2: [...] — partially confirmed, led to [...]

## Root cause
The specific mechanism.

## Fix
Link to commit.

## Regression test
Link to test.

## Similar bugs
What else might be affected.
```

Save these in `docs/engineering/bug-journals/YYYY-MM-DD-short-name.md`. Over time this becomes the most valuable engineering asset in the repo.

## When to ask for help

Ask for help when:
- You've been stuck for >90 minutes on the same bug
- You don't understand the relevant subsystem at all
- You suspect a library bug
- You're about to make a fix that affects >3 unrelated modules

Don't ask for help when:
- You haven't reproduced the bug yet
- You haven't read the error message carefully
- You haven't checked the logs
- You haven't tried the obvious thing

## The root cause question

Before closing any bug, ask: **"Would this bug have been caught by a test if one existed?"**

If yes — add the test. If no — why not, and how can we fix that?

The goal isn't to stop bugs from happening. It's to make sure the same bug never happens twice.
