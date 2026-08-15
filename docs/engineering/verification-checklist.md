# YorkSims.com — Verification Before Completion

> The list to run through before claiming any change is "done." From `superpowers-verification-before-completion` — evidence before assertions, always.

---

## The principle

**Do not claim a change is done until the evidence exists.**

Typing "this should work" is not the same as running the build and watching it succeed. Reviewing your own code mentally is not the same as hitting the route in a browser. The harness cannot read your intent — only your actions. Every claim of completion must be preceded by evidence you can point to.

## The pre-commit checklist

Before you commit (or claim the change is done in a message), run through this list. It takes 5 minutes and prevents 80% of "works on my machine" incidents.

### 1. The change is what you think it is
- [ ] Read the full diff of files you touched (`git diff`)
- [ ] No unexpected files modified
- [ ] No stray `console.log`, `debugger`, or commented-out code
- [ ] No secrets accidentally pasted into code
- [ ] No giant blocks of duplicated code you forgot to deduplicate

### 2. Lint passes
```bash
npm run lint
```
- [ ] Lint runs
- [ ] Any warnings on touched files are addressed or documented
- [ ] You did not silence a warning with `eslint-disable` without a comment explaining why

### 3. TypeScript is happy
```bash
npx tsc --noEmit
```
- [ ] No new TypeScript errors
- [ ] No new `any` types (unless explicitly justified)
- [ ] Imports resolve correctly

### 4. Build succeeds
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] No "page X could not be rendered" warnings on routes you touched
- [ ] Bundle sizes for touched pages didn't balloon (check the build output summary)

### 5. Dev server runs the changed routes
```bash
npm run dev
```
- [ ] The dev server starts without errors
- [ ] Every route you touched loads (200, not 500)
- [ ] Every route you touched renders without console errors in the browser
- [ ] Every route you touched renders without network errors (404s on assets, missing CSS, etc.)

### 6. The change does what you said it does
- [ ] You actually hit the changed feature in the browser
- [ ] You took the path a real user would take (not a shortcut)
- [ ] You tested the happy path AND at least one edge case
- [ ] If you fixed a bug, you verified the bug is fixed with the exact steps from the original report
- [ ] If you added a new UI element, you verified it's visible, clickable, and triggers the right action

### 7. Metadata / SEO if you touched a route
- [ ] Inspect the `<head>` in the browser DevTools
- [ ] Verify the `<title>` is correct
- [ ] Verify the canonical `<link rel="canonical">` is present and absolute
- [ ] Verify OG tags are populated
- [ ] Verify JSON-LD appears in `<head>` if expected
- [ ] If this is a new route, verify it appears in the sitemap (`curl localhost:3000/sitemap.xml | grep <slug>`)

### 8. Accessibility sanity check if you touched UI
- [ ] Tab through the page with keyboard — every interactive element reachable
- [ ] Every interactive element has a visible focus state
- [ ] Images have alt text
- [ ] Contrast looks okay (no white-on-near-white or dark-on-near-dark)
- [ ] Page works with JavaScript disabled for critical paths (home, blog, etc.)

### 9. Mobile check if you touched layout
- [ ] DevTools mobile emulator: iPhone SE width (375px)
- [ ] No horizontal scroll
- [ ] Text doesn't overflow containers
- [ ] Buttons are tap-sized (min 44×44px)
- [ ] Hero images don't cause layout shift

### 10. Tests if any exist for the area
- [ ] Existing tests still pass
- [ ] If you added a new feature, you added a test (per `testing-strategy.md`)
- [ ] If you fixed a bug, you added a regression test

## The ban list

**Things you should never say until you've run the evidence gathering:**

- "This should work"
- "I think this fixes it"
- "The change looks correct"
- "It builds locally" — does it? show the output
- "All tests pass" — run them, quote the line
- "I verified the metadata" — show the `<head>` content
- "No TypeScript errors" — run `tsc --noEmit` and show it
- "The build succeeds" — run `next build` and quote the success line

## What "done" actually means

A change is done when:

1. The code is written
2. The lint passes
3. The build succeeds
4. TypeScript compiles
5. The feature works in the browser when you hit it
6. (If tests exist) the tests pass
7. You've read the final diff one more time

Not before. Never before.

## The mental model

You are operating in an environment where you cannot re-read your own history perfectly. The only things that survive are:

- The files you wrote
- The commands you ran
- The output of those commands

"I was careful" is not a file. "I reviewed it" is not a command. Only artifacts count.

If you can't point at an artifact that proves the change works, you haven't finished yet.

## Common failure modes

### Mode 1: "I edited the right file"
Fix: Always show the diff before committing. Always. Even if you're sure.

### Mode 2: "TypeScript is fine"
Fix: Run `tsc --noEmit`. TypeScript's editor feedback is lossy.

### Mode 3: "The test passes"
Fix: Run the test. Quote the output line. Never trust memory.

### Mode 4: "The UI looks right"
Fix: Open the browser. Hit the route. See it with your own eyes. Screenshots do not count as evidence unless you took them during the current change.

### Mode 5: "The build works"
Fix: Run `npm run build`. Watch it complete. Note the bundle size.

### Mode 6: "The metadata is correct"
Fix: Inspect the `<head>` in the browser DevTools. Never trust `generateMetadata` to just work.

### Mode 7: "I didn't change anything else"
Fix: `git status` + `git diff` before every commit. Uncover the file you forgot you touched.

## Emergency rollback

If you pushed something broken and can't fix it fast:

1. `git revert <commit>` — creates a new commit that undoes the broken one
2. Push the revert
3. Then fix the underlying issue calmly

Never `git push --force` on main to "fix" a broken commit. That removes history.

## Claiming work is done in a commit message

A good "done" commit message:

> feat(blog): add 8 new posts
>
> - 8 new blog posts in app/blog/*/page.tsx
> - Each uses BlogPostShell and pulls metadata from app/lib/blog.ts
> - Verified: `npm run build` succeeds with 0 errors
> - Verified: `npx tsc --noEmit` clean
> - Verified: Each post route renders in dev mode with correct metadata in `<head>`

Evidence. In the commit message. Future you will thank present you.

## When a check fails

If any checklist item fails, DO NOT mark the task as done. Either:

1. Fix the underlying issue
2. Create a follow-up task explicitly noting what's incomplete

The worst possible outcome is silently moving on from a failure.
