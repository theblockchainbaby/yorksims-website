"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ClientVsServerLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 8 min read"
      titleMain="Client vs server-side code,"
      titleAccent="and why the difference matters more than the language."
      subtitle="Some code runs on the user's machine. Some code runs on yours. The boundary between them is the most important thing in web architecture — and the most common place security disasters live."
      backHref="/learn/web/unit-3"
      backLabel="Unit 3 · Scripting & Storage"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Async, fetch & APIs",
        href: "/learn/web/lessons/async-and-apis",
      }}
      nextLesson={{
        label: "Cookies, sessions & storage",
        href: "/learn/web/lessons/cookies-sessions-storage",
      }}
    >
      <Section title="The two halves of a web app" sectionNumber="01">
        <P>
          Every web app has code in two places:
        </P>
        <Code>{`CLIENT side                    SERVER side
─────────────                  ─────────────
Runs in the user's browser     Runs on your machine
HTML, CSS, JavaScript          Anything — Node, Python, Go, PHP, Rust, ...
Anyone can read it             Only you can read it
Can't be trusted               Can be trusted (with caveats)
Talks to the server via fetch  Talks to the database, file system, other services
~10s of MB available           ~GB of RAM available`}</Code>
        <P>
          The line between them is the network. Code on the client side
          is shipped — anyone with DevTools can read it. Code on the
          server stays on your machine and only its outputs cross the
          wire.
        </P>
      </Section>

      <Section title="Why this matters: secrets" sectionNumber="02">
        <Code>{`// CLIENT CODE — yorksims.com/app.js
const STRIPE_SECRET_KEY = "sk_live_8jZ...";  // EVERY visitor sees this. You just leaked your account.
const DB_PASSWORD = "hunter2";                // Same. Disaster.

const STRIPE_PUBLISHABLE_KEY = "pk_live_8jZ..."; // OK — pub keys are designed to be public.`}</Code>
        <P>
          API keys, database passwords, signing secrets — anything that
          gives access to a system — never go in client code. The rule
          is mechanical:{" "}
          <strong>
            anything that runs in the browser will be read by an
            attacker
          </strong>
          . Bundlers don&rsquo;t change that. Minification
          doesn&rsquo;t change that. Variable names don&rsquo;t change
          that. If the browser can run it, the browser can leak it.
        </P>
      </Section>

      <Section title="Server-side languages — what each is for in 2026" sectionNumber="03">
        <Code>{`Node.js / TypeScript    — same language as the client; popular for web APIs
Python                  — data, ML, scripting, internal tools, increasingly web (FastAPI)
Go                      — high-throughput services, CLI tools, infrastructure
Rust                    — performance-critical, embedded, infra
PHP                     — still 40%+ of the web (WordPress); Laravel is excellent
Ruby                    — Rails; mature ecosystem, smaller community than it was
Java / Kotlin           — large enterprise backends, Android
C#                      — Microsoft stack, gaming (Unity), enterprise`}</Code>
        <P>
          For a new web project the realistic short list is Node/TS,
          Python, or Go. Pick what you know. The framework choice
          (Next.js, Django, Express, FastAPI, Rails) matters more than
          the language for most teams.
        </P>
      </Section>

      <Section title="Rendering models — SSR, CSR, SSG" sectionNumber="04">
        <P>
          Where HTML gets generated is a choice with real consequences:
        </P>
        <Code>{`SSG — Static Site Generation
  Build time. HTML is pre-rendered into files.
  Pros: fastest possible; ship cheaply to a CDN.
  Cons: needs rebuild on content change.
  Use: blogs, docs, marketing pages.

SSR — Server-Side Rendering
  Request time. Server runs code, returns HTML.
  Pros: fresh per request; user-specific content; great SEO.
  Cons: server cost per request.
  Use: dashboards, e-commerce, anything personalized.

CSR — Client-Side Rendering
  Request time, in the browser. Server returns empty HTML + JS bundle; JS builds the page.
  Pros: SPA feel, no full page loads.
  Cons: slow first paint, SEO problems, runs the user's CPU.
  Use: web apps where SEO doesn't matter (admin UIs, internal tools).`}</Code>
        <P>
          Modern frameworks (Next.js, Astro, SvelteKit) let you pick
          per-page. This site renders the marketing pages statically
          and dashboard pages on the server.
        </P>
      </Section>

      <Section title="Serverless functions" sectionNumber="05">
        <P>
          <strong>Serverless</strong> is a deployment model where you
          write small functions and let a provider (Vercel, AWS Lambda,
          Cloudflare Workers) run them on demand. No server to manage,
          billed per request. Cold starts are a concern; long-running
          tasks aren&rsquo;t a great fit.
        </P>
        <Code>{`// app/api/hello/route.ts  (Next.js example)
export async function GET(request) {
  return new Response(JSON.stringify({ hi: "there" }), {
    headers: { "Content-Type": "application/json" },
  });
}`}</Code>
        <P>
          For most modern web projects the realistic stack is: Next.js
          (or similar) handling both server rendering and API routes,
          deployed to Vercel/Netlify/Cloudflare, with a managed database
          (Neon, Supabase, PlanetScale).
        </P>
      </Section>

      <Section title="A worked example: PHP, the classic server language" sectionNumber="06">
        <P>
          Most of the older internet runs on PHP. WordPress alone is
          40% of the web. It&rsquo;s worth seeing what server-side code
          looks like outside of JavaScript.
        </P>
        <Code>{`<!-- contact.php -->
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"] ?? "";
    $email = $_POST["email"] ?? "";

    // Save to database (pseudo)
    saveContact($name, $email);

    echo "<p>Thanks, $name. We'll email you at $email.</p>";
}
?>

<form method="post">
  <input name="name" required />
  <input name="email" type="email" required />
  <button type="submit">Submit</button>
</form>`}</Code>
        <P>
          PHP literally mixes HTML and code in one file. The{" "}
          <Inline>&lt;?php ... ?&gt;</Inline> blocks run on the server;
          everything outside runs as plain HTML. Modern PHP (Laravel,
          Symfony) uses templating and routing instead, but the
          underlying model is the same.
        </P>
      </Section>

      <Section title="The takeaway" sectionNumber="07">
        <P>
          Three rules:
        </P>
        <Code>{`1. Secrets stay on the server. Always.
2. Validate user input on the server. Client validation is for UX, not security.
3. The right amount of client-side code is the minimum that gives users a snappy UX.
   Everything else belongs on the server.`}</Code>
        <P>
          Next lesson: where data lives between requests — cookies,
          sessions, and the browser&rsquo;s storage APIs.
        </P>
      </Section>
    </LessonShell>
  );
}
