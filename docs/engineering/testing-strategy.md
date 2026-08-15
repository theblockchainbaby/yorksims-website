# YorkSims.com — Testing Strategy

> The test plan. Currently there are zero tests. This doc is the path from zero to confident CI.

---

## 1. Philosophy

**Test what's load-bearing. Skip what isn't.**

The load-bearing parts of YorkSims are:
1. The Stripe subscription lifecycle
2. Auth gating on member routes
3. SEO metadata generation on every public route
4. The blog POSTS / VERTICALS data integrity
5. The sitemap output
6. The Supabase scoped query helper (when it exists)

Everything else is "test later" or "test never." Marketing components with hero animations do not need unit tests.

## 2. Stack

| Layer | Tool | Why |
|---|---|---|
| Unit | Vitest | Fast, ESM-first, works with Next 16 |
| Component | React Testing Library | Standard, interops with Vitest |
| E2E | Playwright | Multi-browser, fast, debuggable |
| Type | TypeScript + strict mode | Already in use, free tests |
| Accessibility | axe-core (via Playwright) | Automated a11y on every E2E |
| Lint | ESLint + Next.js config | Already configured |

Do NOT add: Jest (slower, CJS baggage), Cypress (slower, worse DX than Playwright), Storybook (premature at this stage).

## 3. Test pyramid

```
         /\
        /E2\         10%  — Playwright flows (signup, checkout, content gates)
       /----\
      /Integ.\       30%  — Component + route-level tests (metadata, layouts)
     /--------\
    /   Unit   \     60%  — Pure functions (seo helpers, blog helpers, formatters)
   /____________\
```

60% unit is aggressive but appropriate — most of the real logic in this repo is in helper functions, not UI.

## 4. Phase 1 — Ship the foundation (first week)

### Setup

```bash
npm i -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
npm i -D @playwright/test
npx playwright install
```

Add to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:ci": "vitest run",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./") },
  },
});
```

Create `tests/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

Create `playwright.config.ts` with the basic dev-server integration.

### First tests (do these before any feature work)

```
tests/
  unit/
    seo.test.ts             — pageMetadata() produces canonical, OG, robots correctly
    blog.test.ts            — getPostBySlug + getRelatedPosts behavior
    sitemap.test.ts         — sitemap() output matches expected shape + includes all slugs
    robots.test.ts          — robots() disallows the right paths
  e2e/
    home.spec.ts            — home page loads, has h1, has pricing, CTA present
    blog-index.spec.ts      — blog index renders N posts, click opens individual post
    blog-post.spec.ts       — individual post loads, has metadata, back link works
    verticals.spec.ts       — one vertical page loads with real content
    signup-flow.spec.ts     — (future) full signup → checkout → success
    accessibility.spec.ts   — axe scan on all public pages
```

## 5. Unit test priorities (in order)

### 5.1 `lib/seo.ts` — pageMetadata
```ts
describe("pageMetadata", () => {
  it("builds a canonical URL from the path", () => {
    const result = pageMetadata({
      title: "Test",
      description: "Desc",
      path: "/blog/foo",
    });
    expect(result.alternates.canonical).toBe("https://yorksims.com/blog/foo");
  });

  it("sets noindex when noIndex: true", () => { /* ... */ });
  it("produces absolute OG image URL", () => { /* ... */ });
  it("article type includes publishedTime", () => { /* ... */ });
});
```

### 5.2 `lib/blog.ts` — blog helpers
- POSTS array has unique slugs
- Every POST has required fields (slug, title, date, isoDate, etc.)
- `getPostBySlug` returns undefined for unknown slug
- `getRelatedPosts` returns the right count

### 5.3 `app/sitemap.ts` — sitemap output
- Includes all static routes
- Includes all VERTICALS
- Includes all POSTS
- Never includes auth-gated routes
- lastModified dates parse as valid Date

### 5.4 `app/robots.ts` — robots output
- Disallows `/api/`, `/dashboard`, `/portals`, `/signup`, `/login`, `/success`
- Allows `/` and `/blog`
- Points to the correct sitemap URL

## 6. E2E test priorities

### 6.1 Smoke tests (run on every PR)

```
home loads
blog index loads
one blog post loads
one vertical page loads
404 renders
```

Smoke tests should take under 10 seconds total. They're the canary.

### 6.2 Critical path tests (run nightly)

```
new signup → payment → success → dashboard (use Stripe test mode)
sign in with existing user → dashboard
paywall triggers for non-member on gated content
cancellation flow (in Stripe test mode)
```

These take longer and need Stripe test cards and a seeded test database.

### 6.3 Accessibility scan

Every E2E test also runs axe-core on the rendered page. Any WCAG AA violation fails the test.

```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home page is accessible", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

## 7. Coverage targets

- Unit tests: **80% coverage** on `app/lib/*`. Helpers must be fully covered.
- Component tests: **60% coverage** on `app/components/*`. Skip pure-motion wrappers.
- E2E: **cover every primary user journey** (home, blog, pricing, signup, dashboard).

Don't chase 100%. The last 20% of coverage on marketing components is not worth the maintenance cost.

## 8. Test data strategy

### Seed data for local dev / test
- Create `tests/fixtures/` with static JSON for: test users, test subscriptions, test portals
- Supabase: use a dedicated `yorksims_test` schema reset on each test run
- Stripe: always use test mode, never production keys

### Factories
Write small factories in `tests/factories.ts`:
```ts
export const mockPost = (overrides = {}) => ({
  slug: "test",
  title: "Test",
  // ...defaults
  ...overrides,
});
```

### Never hit external APIs in tests
- Mock Stripe via `stripe-mock`
- Mock Supabase with an in-memory client or test schema
- Mock fetch with `msw` for HTTP calls

## 9. CI integration

### GitHub Actions workflow (`.github/workflows/ci.yml`)
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: "npm" }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test:ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

### Branch protection
- `main` branch protected
- CI must pass before merge
- At least 1 review on PRs (future, when there are collaborators)

## 10. What NOT to test

- Framer Motion animations — visual, not functional
- Exact pixel positions
- Specific CSS class names (those change)
- Third-party library internals
- External API responses (mock them)
- Visual regressions — skip until you have a designer

## 11. Debugging failing tests

When a test fails in CI but passes locally:

1. Check the Playwright report artifact for screenshots + traces
2. Re-run locally with `npm run test:e2e -- --headed --debug`
3. Compare the test database seed state
4. Check for timezone / locale differences
5. Check for race conditions — is the test relying on undefined ordering?

Never skip a flaky test. Fix it or delete it.

## 12. TDD workflow (for features going forward)

Per `superpowers-test-driven-development`:

1. **Red** — write a failing test that expresses the new behavior
2. **Green** — write the minimum code to make it pass
3. **Refactor** — clean up, keep tests green
4. **Commit** — in that order (test → pass → refactor → commit)

Applied to YorkSims:
- New public route? Write the metadata assertion first, then ship the layout.
- New blog post? Write the sitemap assertion that it's included, then add to POSTS.
- New Supabase query? Write a test against a seeded database first.
- Stripe webhook handler change? Write the webhook test first, always.

## 13. Phase roadmap

| Phase | Duration | Deliverables |
|---|---|---|
| **Phase 1** | 1 week | Vitest + Playwright set up, 10 unit tests, 5 smoke E2E |
| **Phase 2** | 2 weeks | 80% unit coverage on lib/*, accessibility scan on all pages |
| **Phase 3** | 2 weeks | Stripe test mode integration, payment E2E flows |
| **Phase 4** | ongoing | Test-first for every new feature |
