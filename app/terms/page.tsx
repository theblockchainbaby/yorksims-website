"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../components/Nav";

const ACCENT = "#e63946";

const EFFECTIVE_DATE = "May 14, 2026";

export default function TermsPage() {
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
            Terms of Service
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
          <Section title="01 · Plain-language summary">
            <P>
              This is a contract between you and Caipher AI LLC
              (&ldquo;YorkSims&rdquo;). Short version: use the site for its
              intended purpose, don&rsquo;t resell or rip off our content, and
              we&rsquo;re not liable if a free course doesn&rsquo;t make you a
              millionaire. The longer version is below — please read it.
            </P>
          </Section>

          <Section title="02 · Who&rsquo;s offering this service">
            <P>
              YorkSims.com is operated by <strong>Caipher AI LLC</strong>, a
              Wyoming limited liability company. Contact:{" "}
              <a
                href="mailto:contact@yorksims.com"
                className="text-[#e63946] hover:text-white transition-colors"
              >
                contact@yorksims.com
              </a>
              .
            </P>
          </Section>

          <Section title="03 · Acceptance">
            <P>
              By visiting or using YorkSims.com (the &ldquo;Service&rdquo;),
              you accept these Terms. If you don&rsquo;t accept them,
              don&rsquo;t use the Service. If you&rsquo;re using the Service
              on behalf of a company, you confirm you have authority to bind
              that company.
            </P>
          </Section>

          <Section title="04 · Eligibility">
            <P>
              You must be at least 13 years old. If you&rsquo;re under 18, you
              need permission from a parent or legal guardian.
            </P>
          </Section>

          <Section title="05 · Accounts">
            <List
              items={[
                "You're responsible for keeping your password secret.",
                "Don't share your account with others — one human per account.",
                "Tell us promptly if you suspect unauthorized access.",
                "We can suspend or close accounts that violate these Terms.",
              ]}
            />
          </Section>

          <Section title="06 · Free content & paid content">
            <P>
              Some content on YorkSims is free (the learn paths, the
              quizzes, several tools, free modules). Some content is paid
              (currently the Pro subscription described on the pricing page).
              Paid features are described at point of purchase. Free content
              may be discontinued or changed at any time.
            </P>
          </Section>

          <Section title="07 · Pricing, billing & refunds">
            <List
              items={[
                "Prices are stated on the pricing page and are charged in U.S. dollars.",
                "Subscriptions renew automatically on the same cadence (e.g. monthly) until you cancel.",
                "You can cancel at any time from your account — cancellation takes effect at the end of the current billing period.",
                "We offer a 14-day refund window for first-time paid subscriptions if you've used less than 25% of the included content. Email contact@yorksims.com to request a refund.",
                "We don't refund partial months on cancellation.",
              ]}
            />
          </Section>

          <Section title="08 · Intellectual property">
            <P>
              We retain ownership of the YorkSims content, brand, course
              materials, tools, lessons, quiz questions, and code published on
              this site (collectively &ldquo;our content&rdquo;). You get a
              limited, personal, non-transferable license to view our content
              for your own learning and use.
            </P>
            <P>
              You may NOT:
            </P>
            <List
              items={[
                "Copy or republish our content in bulk (lessons, quizzes, tool output) without written permission.",
                "Sell, resell, or sublicense access to our content.",
                "Use our content to train generative AI models without prior written agreement.",
                "Reverse-engineer or scrape the Service in ways that overload it or evade rate limits.",
              ]}
            />
            <P>
              You may quote small portions of our content with proper attribution
              (this is fair use in most jurisdictions, and we appreciate it).
            </P>
          </Section>

          <Section title="09 · Acceptable use">
            <P>
              Don&rsquo;t use the Service to:
            </P>
            <List
              items={[
                "Break the law.",
                "Send spam, malware, phishing attempts, or other harmful content.",
                "Probe, scan, or test vulnerabilities without written authorization.",
                "Harass or threaten other users.",
                "Interfere with the Service or other users' ability to use it.",
              ]}
            />
          </Section>

          <Section title="10 · Educational content is not professional advice">
            <P>
              YorkSims publishes educational material across business, software,
              hardware, blockchain, real estate, voice agents, and other
              technical and entrepreneurial topics. <strong>It is not legal
              advice, tax advice, financial advice, medical advice, or any
              other licensed professional advice.</strong> For specific
              decisions, consult a licensed professional in your jurisdiction.
            </P>
            <P>
              Form templates (e.g. operating agreements), checklists, and
              tools we publish are general starting points. Have them reviewed
              before signing or filing.
            </P>
          </Section>

          <Section title="11 · Third-party links">
            <P>
              We link to third-party sites (GitHub, MDN, Stripe, etc.). We
              don&rsquo;t control those sites and aren&rsquo;t responsible for
              their content, terms, or privacy practices.
            </P>
          </Section>

          <Section title="12 · Disclaimer of warranties">
            <P>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
              AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL
              WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE
              DON&rsquo;T WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR
              ERROR-FREE.
            </P>
          </Section>

          <Section title="13 · Limitation of liability">
            <P>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, CAIPHER AI LLC AND ITS
              MEMBERS, OFFICERS, EMPLOYEES, AND AGENTS ARE NOT LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL
              ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR
              ANY CLAIM RELATED TO THE SERVICE IS LIMITED TO THE GREATER OF
              (A) THE AMOUNTS YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM OR
              (B) USD $100.
            </P>
          </Section>

          <Section title="14 · Indemnification">
            <P>
              You agree to indemnify and hold harmless Caipher AI LLC from
              claims arising out of your misuse of the Service, your violation
              of these Terms, or your infringement of someone else&rsquo;s
              rights.
            </P>
          </Section>

          <Section title="15 · Termination">
            <P>
              You may stop using the Service at any time and close your
              account from your account settings. We may suspend or terminate
              access if you violate these Terms or use the Service in a way
              that harms us or other users. Sections that by their nature
              should survive termination (IP, disclaimers, limits of
              liability, indemnification, governing law) will survive.
            </P>
          </Section>

          <Section title="16 · Governing law & disputes">
            <P>
              These Terms are governed by the laws of the State of Wyoming,
              without regard to its conflict-of-law rules. Disputes will be
              resolved in the state and federal courts located in Wyoming, and
              you consent to personal jurisdiction there.
            </P>
            <P>
              Before filing a formal dispute, you agree to email{" "}
              <a
                href="mailto:contact@yorksims.com"
                className="text-[#e63946] hover:text-white transition-colors"
              >
                contact@yorksims.com
              </a>{" "}
              and give us 30 days to resolve it informally.
            </P>
          </Section>

          <Section title="17 · Changes to these Terms">
            <P>
              We may update these Terms from time to time. Material changes
              will be announced on the site or by email at least 14 days
              before they take effect. If you continue using the Service after
              the change is effective, you accept the new Terms.
            </P>
          </Section>

          <Section title="18 · Contact">
            <P>
              Questions about these Terms — email{" "}
              <a
                href="mailto:contact@yorksims.com"
                className="text-[#e63946] hover:text-white transition-colors"
              >
                contact@yorksims.com
              </a>
              . Legal entity: Caipher AI LLC, a Wyoming limited liability
              company.
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
              { label: "Privacy", href: "/privacy" },
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
