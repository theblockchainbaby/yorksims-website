import { NextResponse } from "next/server";
import { getServerSupabase } from "../../lib/supabase-server";

/**
 * Lead capture endpoint.
 *
 * Accepts POST { email, source, toolSlug?, metadata? }
 *
 * Writes to the public.leads table in Supabase. RLS on the table denies
 * anonymous access, so this route must run with SUPABASE_SERVICE_ROLE_KEY
 * set in the environment. The anon key is used as a development fallback
 * but will be blocked by RLS if the table policies are applied correctly.
 *
 * Duplicate submissions (same email + source) hit a unique index and return
 * a friendly 200 with `duplicate: true` rather than a 500.
 */

interface LeadPayload {
  email: string;
  source: string;
  toolSlug?: string;
  metadata?: Record<string, unknown>;
}

function isValidEmail(email: unknown): email is string {
  return (
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email.length < 254
  );
}

function getClientIp(request: Request): string | null {
  // Vercel sets this header; fall back to x-real-ip for self-hosted
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 }
    );
  }

  if (typeof payload.source !== "string" || payload.source.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Missing source" },
      { status: 400 }
    );
  }

  const supabase = getServerSupabase();
  const { error } = await supabase.from("leads").insert({
    email: payload.email.toLowerCase().trim(),
    source: payload.source,
    tool_slug: payload.toolSlug ?? null,
    metadata: payload.metadata ?? {},
    ip_address: getClientIp(request),
    user_agent: request.headers.get("user-agent") ?? null,
  });

  if (error) {
    // Unique violation on (lower(email), source) — treat as success so users
    // don't see an error for submitting the same email twice.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    console.error("[leads] insert failed", {
      code: error.code,
      message: error.message,
      source: payload.source,
    });

    return NextResponse.json(
      { ok: false, error: "Could not save lead" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
