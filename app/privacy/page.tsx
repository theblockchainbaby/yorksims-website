"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../components/Nav";

const ACCENT = "#e63946";

const EFFECTIVE_DATE = "May 14, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />

      {/* HERO */}
      <section
        className="relative px-6 md:px-16 overflow-hidden"
        style={{ paddingTop: "100px", paddingBottom: "40px" }}
      >
        <motion.div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none"
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse, ${ACCENT}15 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-xs font-mono text-white/20 hover:text-white transition-colors"
          >
            ← Home
          </Link>
          <div style={{ height: "28px" }} />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#e63946] font-semibold mb-5">
            Legal
          </p>
          <motion.h1
            className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Privacy Policy
          </motion.h1>
          <p className="text-sm text-white/40 font-mono">
            Effective {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      {/* BODY */}
      <article
        className="px-6 md:px-16"
        style={{ paddingTop: "20px", paddingBottom: "80px" }}
      >
        <div className="max-w-3xl mx-auto text-[15px] md:text-base text-white/65 leading-relaxed">
          <Section title="01 · Who we are">
            <P>
              YorkSims.com is operated by <strong>Caipher AI LLC</strong>, a
              Wyoming limited liability company. In this policy
              &ldquo;we,&rdquo; &ldquo;us,&rdquo; and
              &ldquo;YorkSims&rdquo; mean Caipher AI LLC. &ldquo;You&rdquo;
              means anyone who visits the site.
            </P>
            <P>
              Contact:{" "}
              <a
                href="mailto:contact@yorksims.com"
                className="text-[#e63946] hover:text-white transition-colors"
              >
                contact@yorksims.com
              </a>
              .
            </P>
          </Section>

          <Section title="02 · What we collect">
            <P>
              We try to collect as little as possible. In practice that means:
            </P>
            <List
              items={[
                "Account information you give us when you sign up (email address, optionally a name).",
                "Information you submit to free tools or quizzes — e.g. the optional email at the end of a quiz used to send a personalized study plan.",
                "Payment information processed by our payment provider (we don't see or store full card numbers).",
                "Standard server logs (IP address, user-agent, requested URL, timestamp) kept short-term for debugging and abuse prevention.",
                "If we enable usage analytics on the site, they're anonymous and aggregate (page views, referrer, country-level location) — never tied to your identity.",
              ]}
            />
          </Section>

          <Section title="03 · What we don't collect">
            <List
              items={[
                "We don't sell your data. Not to advertisers, not to data brokers, not to anyone.",
                "We don't load third-party ad trackers.",
                "We don't use cross-site behavioral profiles.",
              ]}
            />
          </Section>

          <Section title="04 · How we use what we collect">
            <List
              items={[
                "Operate the site, deliver the courses and tools you asked for, and process any purchases.",
                "Send you product-related email (account confirmations, receipts, course updates). We only send marketing email if you opted in.",
                "Detect and prevent abuse (spam, fraud, automated scraping).",
                "Where analytics are enabled, aggregate and anonymized usage to improve the product.",
              ]}
            />
          </Section>

          <Section title="05 · Cookies & similar tech">
            <P>
              We use a small number of cookies and local-storage entries:
            </P>
            <List
              items={[
                "Essential cookies for sign-in and basic site function. Without these, the site doesn't work.",
                "Analytics cookies / local storage for anonymized usage statistics.",
                "No third-party advertising cookies.",
              ]}
            />
            <P>
              You can clear cookies and local storage from your browser at any
              time. Doing so may sign you out and reset preferences.
            </P>
          </Section>

          <Section title="06 · Third-party services we use">
            <P>
              We use a handful of standard SaaS providers to run the site.
              Each of them only sees the data they need to do their specific
              job:
            </P>
            <List
              items={[
                "Hosting & CDN (Vercel) — serves the site.",
                "Database (Supabase / Postgres) — stores account and content data.",
                "Email delivery — sends transactional and (opt-in) marketing email.",
                "Payment processing — handles purchases and never lets us see full card numbers.",
                "Analytics — aggregates anonymous usage statistics.",
              ]}
            />
            <P>
              Each of these providers has its own privacy policy. They are
              required by contract to handle your data only on our behalf and
              in line with this policy.
            </P>
          </Section>

          <Section title="07 · Your rights">
            <P>
              Regardless of where you live, you can ask us to:
            </P>
            <List
              items={[
                "Access the personal data we have about you.",
                "Correct any data that's wrong.",
                "Delete your account and associated data (we'll keep what's needed for legal/tax reasons, e.g., past invoices).",
                "Export your data in a portable format.",
                "Stop sending you marketing email — also possible via the unsubscribe link in any email we send.",
              ]}
            />
            <P>
              Email{" "}
              <a
                href="mailto:contact@yorksims.com"
                className="text-[#e63946] hover:text-white transition-colors"
              >
                contact@yorksims.com
              </a>{" "}
              and we&rsquo;ll handle it. If you&rsquo;re in the EU/UK, the
              same rights apply under GDPR; we&rsquo;ll respond within the
              statutory 30 days.
            </P>
          </Section>

          <Section title="08 · How long we keep your data">
            <List
              items={[
                "Account data: until you delete the account.",
                "Quiz / tool submissions: as long as needed to deliver the result, then aggregated and anonymized.",
                "Server logs: typically 30 days, then deleted.",
                "Records required by law (invoices, tax records): as long as required by applicable law.",
              ]}
            />
          </Section>

          <Section title="09 · Security">
            <P>
              We use HTTPS everywhere, encrypt data in transit, and follow
              standard practices for storing passwords (hashed, never
              plaintext). No system is 100% secure; if a breach affects you
              we&rsquo;ll notify you and the relevant authorities as required
              by law.
            </P>
          </Section>

          <Section title="10 · Children">
            <P>
              YorkSims is not directed at children under 13. We don&rsquo;t
              knowingly collect personal information from children under 13.
              If you believe a child has provided us with information, email{" "}
              <a
                href="mailto:contact@yorksims.com"
                className="text-[#e63946] hover:text-white transition-colors"
              >
                contact@yorksims.com
              </a>{" "}
              and we&rsquo;ll delete it.
            </P>
          </Section>

          <Section title="11 · Changes to this policy">
            <P>
              We&rsquo;ll update this policy when our practices change. The
              effective date at the top reflects the most recent change.
              Material changes will be flagged on the site or by email if you
              have an account.
            </P>
          </Section>

          <Section title="12 · Contact">
            <P>
              Questions, requests, complaints — email{" "}
              <a
                href="mailto:contact@yorksims.com"
                className="text-[#e63946] hover:text-white transition-colors"
              >
                contact@yorksims.com
              </a>
              . The legal entity is Caipher AI LLC, a Wyoming limited
              liability company.
            </P>
          </Section>
        </div>
      </article>

      {/* FOOTER */}
      <footer
        className="px-6 md:px-16 border-t border-white/[0.06]"
        style={{
          paddingTop: "48px",
          paddingBottom: "48px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/york-state-logo.png"
            alt="York State University"
            style={{ height: "60px", width: "auto" }}
          />
          <p className="text-xs text-white/20 font-mono">
            Teaching Execution, Not Theory
          </p>
          <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
            {[
              { label: "Home", href: "/" },
              { label: "Terms", href: "/terms" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-white/30 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-black tracking-tight mb-5 text-white/90">
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 leading-relaxed">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="mt-[8px] w-1 h-1 rounded-full flex-shrink-0"
            style={{ backgroundColor: ACCENT }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
