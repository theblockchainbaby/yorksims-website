# Supabase Migrations

SQL migrations for the YorkSims Supabase project. Each file is idempotent and safe to re-run.

## How to apply

1. Open your Supabase project → **SQL Editor**
2. Open the next unapplied migration from this folder (in order)
3. Paste and run
4. Verify via the commented verification queries at the bottom of each file
5. Commit any schema changes back to this folder

## Env vars required

```
NEXT_PUBLIC_SUPABASE_URL        — public, used client-side too
NEXT_PUBLIC_SUPABASE_ANON_KEY   — public, anon access (RLS-gated)
SUPABASE_SERVICE_ROLE_KEY       — server-only, bypasses RLS, used by API routes
```

Set `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` for dev and in Vercel project settings for prod. **Never** expose it to the browser.

## Migrations

| File | Purpose |
|---|---|
| `0001_leads_table.sql` | Leads table for free tools + newsletter + lead magnets. RLS denies anon — writes via service role only. |
