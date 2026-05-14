"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function HtmlStructureLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 9 min read"
      titleMain="HTML document structure,"
      titleAccent="the skeleton every page is built on."
      subtitle="Every HTML file on the internet has the same five-piece skeleton. Once you know it, you can read any web page's source and find what you're looking for in 10 seconds."
      backHref="/learn/web/unit-2"
      backLabel="Unit 2 · Document Markup"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Markup languages",
        href: "/learn/web/lessons/markup-languages",
      }}
      nextLesson={{
        label: "Links, images & media",
        href: "/learn/web/lessons/links-images-media",
      }}
    >
      <Section title="The minimum viable HTML page" sectionNumber="01">
        <P>
          The shortest valid HTML5 page is shorter than most people think:
        </P>
        <Code>{`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, web.</h1>
  </body>
</html>`}</Code>
        <P>
          That&rsquo;s a complete, valid web page. Save it as{" "}
          <Inline>index.html</Inline> and open it in your browser. Every
          page from yorksims.com to youtube.com is some variant of this
          shape.
        </P>
      </Section>

      <Section title="The DOCTYPE — telling the browser to behave" sectionNumber="02">
        <P>
          The <Inline>&lt;!doctype html&gt;</Inline> line at the top tells
          the browser &ldquo;render this as modern HTML.&rdquo; Without
          it, browsers fall into <em>quirks mode</em> — a backward-compat
          rendering engine from the 90s where margins are different,
          width calculations are different, and your CSS won&rsquo;t work
          how you expect.
        </P>
        <P>
          Always include it. Always make it the first line. That&rsquo;s
          the rule.
        </P>
      </Section>

      <Section title="The <html> element and its lang attribute" sectionNumber="03">
        <P>
          <Inline>&lt;html&gt;</Inline> wraps the entire document. The{" "}
          <Inline>lang</Inline> attribute tells the browser, screen
          readers, and search engines what language the page is in.{" "}
          <Inline>lang=&quot;en&quot;</Inline> for English,{" "}
          <Inline>lang=&quot;es&quot;</Inline> for Spanish, and so on.
        </P>
        <P>
          This is a 5-character accessibility win. Setting it correctly
          lets screen readers pronounce words right and lets translators
          (and Google Translate) work properly.
        </P>
      </Section>

      <Section title="The <head> — metadata for everyone but the reader" sectionNumber="04">
        <P>
          The <Inline>&lt;head&gt;</Inline> holds stuff that <em>isn&rsquo;t</em>{" "}
          shown on the page — but matters enormously for how the page
          works, ranks, and shares.
        </P>
        <Code>{`<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>YorkSims — Learn Web Development</title>
  <meta name="description" content="A practical free path from how the internet works to JavaScript and databases." />
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="/styles.css" />

  <!-- Open Graph (social sharing) -->
  <meta property="og:title" content="YorkSims — Learn Web Development" />
  <meta property="og:description" content="A practical free path..." />
  <meta property="og:image" content="https://yorksims.com/og.png" />
</head>`}</Code>
        <SubHeading className="mt-6">The four meta tags that matter most</SubHeading>
        <Code>{`<meta charset="utf-8">                — text encoding (must be utf-8)
<meta name="viewport" ...>              — controls mobile rendering (Unit 1, lesson 6)
<title>...</title>                      — browser tab + Google search result title
<meta name="description" ...>           — Google search result snippet`}</Code>
      </Section>

      <Section title="The <body> — what the user actually sees" sectionNumber="05">
        <P>
          Everything visible on the page goes inside{" "}
          <Inline>&lt;body&gt;</Inline>. Inside it, HTML5 gives you{" "}
          <em>semantic elements</em> — tags whose names describe what the
          content <em>is</em>, not what it looks like.
        </P>
        <Code>{`<body>
  <header>
    <h1>YorkSims</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/learn">Learn</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>How the web works</h2>
      <p>The web works because of one repeated transaction...</p>
    </article>
    <aside>
      <h3>Related</h3>
      <a href="/dns">DNS</a>
    </aside>
  </main>

  <footer>
    <p>© 2026 YorkSims</p>
  </footer>
</body>`}</Code>
      </Section>

      <Section title="Semantic HTML — why it matters" sectionNumber="06">
        <P>
          A <Inline>&lt;div&gt;</Inline> and a <Inline>&lt;nav&gt;</Inline>{" "}
          can be styled to look identical. So why use one over the other?
          Because tags carry <em>meaning</em>:
        </P>
        <Code>{`<header>   — top section, usually contains site title + nav
<nav>      — navigation links (any kind)
<main>     — the primary content; exactly one per page
<section>  — a thematic grouping
<article>  — self-contained content (blog post, product card, comment)
<aside>    — sidebar content, related but secondary
<footer>   — bottom section
<h1>-<h6>  — headings in order of importance (only one h1 per page)`}</Code>
        <SubHeading className="mt-6">Who benefits</SubHeading>
        <P>
          Screen readers use these tags to let blind users skip directly
          to &ldquo;main content&rdquo; or &ldquo;navigation&rdquo;.
          Search engines use them to figure out what part of the page is
          important. Other devs reading your code use them to understand
          the structure without running it. Use semantic tags, not endless{" "}
          <Inline>&lt;div&gt;</Inline>s.
        </P>
      </Section>

      <Section title="Block vs inline" sectionNumber="07">
        <P>
          HTML elements come in two flavors by default:
        </P>
        <Code>{`Block      — take full available width, stack vertically
             (p, div, h1, section, article, ul, li...)

Inline     — flow with the text, only as wide as their content
             (a, span, strong, em, code, img...)`}</Code>
        <P>
          You can override these defaults in CSS with{" "}
          <Inline>display: block</Inline>, <Inline>inline</Inline>,{" "}
          <Inline>inline-block</Inline>, <Inline>flex</Inline>, or{" "}
          <Inline>grid</Inline> — see lesson 6 of this unit. But knowing
          the default flow tells you why a paragraph takes a full line and
          a link doesn&rsquo;t.
        </P>
      </Section>

      <Section title="What's next" sectionNumber="08">
        <P>
          You can now write a complete, valid HTML page. The next three
          lessons add the things that actually fill a page — links and
          media, then forms, then how CSS targets the elements you just
          learned to write.
        </P>
      </Section>
    </LessonShell>
  );
}
