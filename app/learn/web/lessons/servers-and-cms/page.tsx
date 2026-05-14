"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ServersAndCmsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 8 min read"
      titleMain="Web servers & CMSes,"
      titleAccent="what runs the site you're about to build."
      subtitle="A web server is just a program that listens on a port and answers HTTP. A CMS is a server with a friendly editor bolted on. Most of the choices in modern web dev are about how much of each you want to write yourself."
      backHref="/learn/web/unit-1"
      backLabel="Unit 1 · Web Foundations"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "DNS, IP addresses & URLs",
        href: "/learn/web/lessons/dns-ip-urls",
      }}
      nextLesson={{
        label: "Wireframes & UX",
        href: "/learn/web/lessons/wireframes-and-ux",
      }}
    >
      <Section title="A web server, demystified" sectionNumber="01">
        <P>
          The word &ldquo;server&rdquo; means two things and they get
          confused constantly. Hardware: a physical or virtual machine
          running 24/7 somewhere. Software: a program on that machine that
          listens for HTTP requests and answers them.
        </P>
        <Code>{`The most common web server software you'll see:

Nginx       — fast, static-friendly, also a reverse proxy
Apache      — older, plugin-rich, classic LAMP stack default
Caddy       — modern, automatic HTTPS, sane defaults
Node.js     — JavaScript can also be a web server (via Express, Next.js, etc.)`}</Code>
        <P>
          Your laptop can run web server software too. When you run{" "}
          <Inline>npm run dev</Inline> on a Next.js project and visit{" "}
          <Inline>localhost:3000</Inline>, you&rsquo;re a client making
          requests to a web server you started thirty seconds ago. The only
          difference between that and yorksims.com is what address it&rsquo;s
          listening on.
        </P>
      </Section>

      <Section title="Static vs dynamic content" sectionNumber="02">
        <P>
          <strong>Static</strong>: the server has a file on disk and sends
          it as-is. Same bytes for every visitor. Fast, cheap, hard to
          break.
        </P>
        <P>
          <strong>Dynamic</strong>: the server runs code to build a response
          on the fly. Different output for different users (their name in
          the header, their cart, their search results). More flexible,
          more expensive, more ways to break.
        </P>
        <Code>{`Static:    GET /about.html  →  read file  →  send file       (5ms)
Dynamic:   GET /cart        →  check session → query DB → render → send  (200ms)`}</Code>
        <SubHeading className="mt-6">The modern trick: pre-render</SubHeading>
        <P>
          Most sites are <em>mostly</em> static with a few dynamic parts.
          Modern frameworks (Next.js, Astro, SvelteKit) let you build a
          page once, save it as static HTML, and only run dynamic code for
          the bits that genuinely need it. You get static-fast performance
          with dynamic-friendly developer ergonomics. This is what
          &ldquo;static site generation&rdquo; (SSG) and &ldquo;incremental
          static regeneration&rdquo; (ISR) are about.
        </P>
      </Section>

      <Section title="What a CMS is for" sectionNumber="03">
        <P>
          A <strong>Content Management System</strong> is a web app whose
          job is to let non-technical people edit a website. You log in,
          click around in a UI, write a blog post, hit Publish — and the
          CMS handles storing it, rendering it, and serving it.
        </P>
        <Code>{`The popular ones:

WordPress    — 40%+ of the web. PHP. Endless plugin ecosystem.
Shopify      — e-commerce-specific CMS. Hosted, opinionated.
Webflow      — designer-friendly visual CMS, generates clean HTML.
Sanity       — headless CMS — provides only the data + editor, you bring the frontend.
Contentful   — same idea as Sanity, more enterprise-leaning.
Ghost        — focused on writers and newsletters.`}</Code>
        <P>
          The CMS&rsquo;s tradeoff: you trade <em>flexibility</em> for{" "}
          <em>speed</em>. A CMS site you can build in a weekend; a custom
          codebase takes weeks. But a CMS site has limits a custom one
          doesn&rsquo;t.
        </P>
      </Section>

      <Section title="Headless vs traditional CMSes" sectionNumber="04">
        <P>
          Traditional CMSes (WordPress, Shopify) ship the data, the editor,
          AND the frontend together. The same software that lets you edit
          a post also renders the post for visitors.
        </P>
        <P>
          A <strong>headless</strong> CMS (Sanity, Contentful, Strapi)
          ships only the data and the editor. You query it via an API and
          render the result in whatever frontend you want — Next.js,
          mobile app, smart fridge.
        </P>
        <Code>{`Traditional:   Editor ↔ CMS (WordPress) → renders HTML directly
Headless:      Editor ↔ CMS (Sanity)    → JSON API → your frontend renders`}</Code>
        <P>
          Headless is more work upfront. It&rsquo;s worth it when you have
          multiple frontends (web + mobile), or when you want full control
          over how content gets displayed.
        </P>
      </Section>

      <Section title="Which one should you use?" sectionNumber="05">
        <P>
          Boring but honest answer: it depends what you&rsquo;re building
          and who edits it.
        </P>
        <Code>{`A marketing site with 5 pages         →  hand-code in Next.js or Astro
A blog you'll update weekly           →  Ghost or WordPress
An e-commerce store                   →  Shopify (full stop)
A content app with multiple frontends →  Sanity or Contentful + Next.js
A side project for yourself           →  Next.js + Markdown files
A client site where they want to edit →  WordPress or Webflow`}</Code>
        <P>
          The mistake new devs make is reaching for a CMS when they
          don&rsquo;t need one (slower, more attack surface, more
          dependencies). The mistake new founders make is{" "}
          <em>not</em> reaching for one (now they&rsquo;re paying a dev to
          fix every typo).
        </P>
      </Section>

      <Section title="Where this lesson lives in the stack" sectionNumber="06">
        <P>
          So far in Unit 1 we&rsquo;ve gone: history (lesson 1) → how
          packets move (lesson 2) → how names become addresses (lesson 3) →
          what&rsquo;s actually on the other end (this lesson). You now
          know enough about the plumbing.
        </P>
        <P>
          The next three lessons shift from the network to the design and
          process: wireframes, responsive layout, and dev workflow. Then
          Unit 2 puts your hands on the markup — HTML and CSS.
        </P>
      </Section>
    </LessonShell>
  );
}
