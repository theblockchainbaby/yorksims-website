-- ─────────────────────────────────────────────────────────────────────────
-- Migration: 0001_leads_table.sql
-- Purpose:   Capture leads from free tools, newsletter, and lead magnets.
-- How to apply:
--   1) Open Supabase Studio → SQL Editor for your project
--   2) Paste this file and run
--   3) Verify the table, index, and RLS policy were created
-- ─────────────────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

create table if not exists public.leads (
  id            uuid primary key default uuid_generate_v4(),
  email         text not null,
  source        text not null,
  tool_slug     text,
  metadata      jsonb not null default '{}'::jsonb,
  ip_address    text,
  user_agent    text,
  created_at    timestamptz not null default now()
);

-- Fast lookup by email + source (e.g. "has this email used this tool before?")
create index if not exists leads_email_source_idx
  on public.leads (email, source);

-- Recency index for dashboard queries
create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

-- Enforce case-insensitive uniqueness per (email, source) to prevent double-submit dupes
create unique index if not exists leads_email_source_unique
  on public.leads (lower(email), source);

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────
-- RLS is enabled. No anon policies are granted — all writes must come from
-- the service role (server-side API route). This prevents scraping of the
-- leads table from the client and keeps emails out of reach of anon JWTs.
-- ─────────────────────────────────────────────────────────────────────────

alter table public.leads enable row level security;

-- Explicitly deny anon SELECT / INSERT / UPDATE / DELETE.
-- Service role bypasses RLS entirely, so the /api/leads route still works.
drop policy if exists "leads_deny_anon_select" on public.leads;
create policy "leads_deny_anon_select"
  on public.leads
  for select
  to anon
  using (false);

drop policy if exists "leads_deny_anon_insert" on public.leads;
create policy "leads_deny_anon_insert"
  on public.leads
  for insert
  to anon
  with check (false);

-- ─────────────────────────────────────────────────────────────────────────
-- Verification queries (run these after applying)
-- ─────────────────────────────────────────────────────────────────────────
-- select * from information_schema.tables where table_name = 'leads';
-- select * from pg_indexes where tablename = 'leads';
-- select * from pg_policies where tablename = 'leads';
