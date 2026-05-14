"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function CookiesSessionsStorageLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 8 min read"
      titleMain="Cookies, sessions & storage,"
      titleAccent="where web data lives between requests."
      subtitle="HTTP is stateless — every request is its own thing. To know who's logged in or what's in their cart, you need somewhere to keep state. Five options, each with a different shape."
      backHref="/learn/web/unit-3"
      backLabel="Unit 3 · Scripting & Storage"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Client vs server-side code",
        href: "/learn/web/lessons/client-vs-server",
      }}
      nextLesson={{
        label: "Database basics",
        href: "/learn/web/lessons/databases-basics",
      }}
    >
      <Section title="HTTP is stateless — and why that's a problem" sectionNumber="01">
        <P>
          Each HTTP request is independent. The server doesn&rsquo;t
          remember you between requests. So how does a logged-in user
          stay logged in? How does a cart survive a refresh? With one
          of five storage mechanisms.
        </P>
        <Code>{`Cookies         — small key/value pairs sent on every request to a domain
Sessions        — server-side state identified by a session-id cookie
localStorage    — bigger blob, JS-only, persists forever
sessionStorage  — same, but cleared when the tab closes
IndexedDB       — full client-side database for structured data`}</Code>
      </Section>

      <Section title="Cookies — small, automatic, persistent" sectionNumber="02">
        <P>
          A <strong>cookie</strong> is a small (~4KB) key/value pair the
          server sets on a response. The browser stores it and{" "}
          <em>automatically sends it back</em> on every subsequent
          request to that domain.
        </P>
        <Code>{`HTTP response:
  Set-Cookie: session_id=abc123; Max-Age=3600; HttpOnly; Secure; SameSite=Lax; Path=/

HTTP request (next visit, automatic):
  Cookie: session_id=abc123`}</Code>
        <SubHeading className="mt-6">The flags that matter</SubHeading>
        <Code>{`HttpOnly        — JavaScript can't read this cookie (defeats XSS theft)
Secure          — only send over HTTPS
SameSite=Lax    — don't send on cross-site requests (defeats CSRF for most cases)
Max-Age=3600    — expires in 3600 seconds; without this, expires when tab closes
Path=/          — which paths the cookie applies to`}</Code>
        <P>
          Every session cookie needs HttpOnly + Secure + SameSite. No
          exceptions. Three lines that prevent two entire classes of
          attack.
        </P>
      </Section>

      <Section title="Sessions — cookies that point to server state" sectionNumber="03">
        <P>
          A <strong>session</strong> is the pattern of putting only an
          opaque session ID in the cookie and keeping the actual user
          data on the server (in memory, Redis, or a database).
        </P>
        <Code>{`Cookie         — only the session ID (a random opaque string)
                  Example: session_id=abc123_random_unguessable

Server-side    — a record keyed by that ID, containing:
                  - user_id
                  - permissions
                  - cart_id
                  - expires_at`}</Code>
        <P>
          Why use sessions instead of stuffing data into cookies
          directly? Cookies are sent on every request — so packing user
          state into them bloats every request. And client-side data
          can&rsquo;t be trusted; server-side data can.
        </P>
        <P>
          Stateless alternatives like <strong>JWT</strong> (JSON Web
          Tokens) put signed user data directly in a cookie or header.
          The server can verify the signature without a database
          lookup. Tradeoff: tokens can&rsquo;t be revoked immediately
          (they stay valid until expiration).
        </P>
      </Section>

      <Section title="localStorage — JS-readable, persistent" sectionNumber="04">
        <P>
          <Inline>localStorage</Inline> is a JavaScript-only key/value
          store that survives tabs, refreshes, and browser restarts.
          ~5-10MB depending on browser.
        </P>
        <Code>{`localStorage.setItem("theme", "dark");
localStorage.getItem("theme");          // "dark"
localStorage.removeItem("theme");

// JSON for objects
localStorage.setItem("user", JSON.stringify({ id: 1, name: "York" }));
const user = JSON.parse(localStorage.getItem("user"));`}</Code>
        <P>
          Use for: theme/preferences, draft form data, non-sensitive
          UI state. <strong>Never</strong> use for: auth tokens.
          localStorage is readable by any JavaScript on the page,
          including malicious code injected via XSS. Cookies with
          HttpOnly cannot be read by JavaScript at all — that&rsquo;s
          why they&rsquo;re the right place for session IDs.
        </P>
      </Section>

      <Section title="sessionStorage — same API, smaller lifetime" sectionNumber="05">
        <Code>{`sessionStorage.setItem("wizard-step", "3");
sessionStorage.getItem("wizard-step");
// All sessionStorage data is cleared when the tab closes.`}</Code>
        <P>
          Use sessionStorage when you want state to survive a refresh
          but not survive closing the tab — like a multi-step form
          wizard or a one-time onboarding flow.
        </P>
      </Section>

      <Section title="IndexedDB — a database in the browser" sectionNumber="06">
        <P>
          <strong>IndexedDB</strong> is a real (NoSQL-ish) database
          built into the browser, with indexes, transactions, and the
          ability to store gigabytes. The API is awkward — most people
          use a wrapper like <Inline>idb</Inline> or{" "}
          <Inline>Dexie</Inline>.
        </P>
        <P>
          When to reach for it: offline-first apps (PWAs), file
          editors that cache work in progress, anything where you need
          to keep meaningful amounts of structured data on the client.
          For 95% of web apps, you don&rsquo;t need it.
        </P>
      </Section>

      <Section title="Pick the right tool — a decision tree" sectionNumber="07">
        <Code>{`Is it an auth token / session?
  YES → HttpOnly cookie. Always. (Or server-side session keyed by an HttpOnly cookie.)

Does the server need to see it on every request?
  YES → Cookie (with proper flags).
  NO  → next question.

Does it need to survive closing the tab?
  YES → localStorage.
  NO  → sessionStorage.

Is it structured data, queryable, possibly huge?
  YES → IndexedDB.

Is it sensitive in any way?
  YES → server, not browser. Don't even start.`}</Code>
        <P>
          Next lesson: the place server-side state actually lives —
          databases. Relational vs document, basic SQL, and the ORMs
          that put a nicer face on it.
        </P>
      </Section>
    </LessonShell>
  );
}
