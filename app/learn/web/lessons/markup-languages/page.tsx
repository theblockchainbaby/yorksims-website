"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function MarkupLanguagesLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 7 min read"
      titleMain="Markup languages,"
      titleAccent="five formats that run the web."
      subtitle="A markup language wraps content in tags that describe what the content means — heading, paragraph, link, list. You'll meet five of them. HTML is the main one, but you'll see the others daily."
      backHref="/learn/web/unit-2"
      backLabel="Unit 2 · Document Markup"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Dev workflow & the IDE",
        href: "/learn/web/lessons/dev-workflow",
      }}
      nextLesson={{
        label: "HTML document structure",
        href: "/learn/web/lessons/html-structure",
      }}
    >
      <Section title="What a markup language actually is" sectionNumber="01">
        <P>
          A markup language is a way to add structure and meaning to text
          by wrapping it in <em>tags</em>. The text inside the tags is the
          content. The tags describe what kind of content it is. Think of
          a highlighter — the text doesn&rsquo;t change, but yellow means
          important and pink means definition.
        </P>
        <P>
          Markup languages separate <strong>structure</strong> (what this
          is) from <strong>presentation</strong> (how it looks). That
          separation is the whole reason we can restyle a site without
          rewriting it, or feed the same content to a phone, a printer,
          and a screen reader.
        </P>
      </Section>

      <Section title="HTML — the web" sectionNumber="02">
        <P>
          <strong>HTML</strong> (HyperText Markup Language) is the markup
          of the web. Every page in your browser is HTML at the root, even
          if a framework generates it.
        </P>
        <Code>{`<article>
  <h1>How to make sourdough</h1>
  <p>Start by feeding your <strong>starter</strong>.</p>
  <a href="/recipes">More recipes</a>
</article>`}</Code>
        <P>
          The tags here say: article, heading, paragraph, strong emphasis,
          hyperlink. A browser uses that information to display the page.
          A screen reader uses it to read the page aloud. A search engine
          uses it to figure out what the page is about.
        </P>
      </Section>

      <Section title="XML — a more general cousin" sectionNumber="03">
        <P>
          <strong>XML</strong> (Extensible Markup Language) is HTML&rsquo;s
          older, more flexible cousin. Where HTML has a fixed set of
          tags (<Inline>&lt;p&gt;</Inline>, <Inline>&lt;div&gt;</Inline>,
          etc.), XML lets you invent your own tags for any data you have.
        </P>
        <Code>{`<library>
  <book>
    <title>The Pragmatic Programmer</title>
    <author>Andy Hunt</author>
    <year>1999</year>
  </book>
</library>`}</Code>
        <P>
          XML was huge in the 2000s — RSS feeds, SOAP web services, config
          files. It&rsquo;s still used in a few places (Microsoft Office
          files, RSS, SVG, some enterprise APIs) but for transferring data
          between systems it&rsquo;s mostly been replaced by JSON.
        </P>
      </Section>

      <Section title="JSON — the data format that ate the web" sectionNumber="04">
        <P>
          <strong>JSON</strong> (JavaScript Object Notation) is technically
          a data format, not a markup language — but you&rsquo;ll meet it
          every day and it&rsquo;s easier to learn alongside the others.
          JSON is what almost every modern web API returns.
        </P>
        <Code>{`{
  "title": "The Pragmatic Programmer",
  "author": "Andy Hunt",
  "year": 1999,
  "topics": ["software", "craft", "career"]
}`}</Code>
        <P>
          Compare it to the XML version above. Half as many characters,
          easier to read, and it maps directly to data structures in any
          language — objects/dicts, arrays/lists, strings, numbers,
          booleans, null. JSON won the API wars sometime around 2012 and
          isn&rsquo;t losing.
        </P>
      </Section>

      <Section title="SVG — vector graphics that are actually XML" sectionNumber="05">
        <P>
          <strong>SVG</strong> (Scalable Vector Graphics) is XML for
          images. Instead of a grid of pixels (PNG, JPG), an SVG describes
          shapes — circles, paths, lines — as math. Result: an SVG looks
          sharp at any size, from a 16px favicon to a billboard.
        </P>
        <Code>{`<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#e63946" />
</svg>`}</Code>
        <P>
          That&rsquo;s a red circle. You can paste it directly into an
          HTML file and it renders. SVG is the right choice for logos,
          icons, simple illustrations, and charts. Photographs still want
          to be JPGs or WebPs.
        </P>
      </Section>

      <Section title="Markdown — the prose-friendly markup" sectionNumber="06">
        <P>
          <strong>Markdown</strong> is a lightweight markup language
          designed to look like the text you&rsquo;d write in a notebook.
          You don&rsquo;t see angle brackets. You use asterisks for bold,
          underscores for italic, hashes for headings.
        </P>
        <Code>{`# How to make sourdough

Start by feeding your **starter**.
- Flour
- Water
- Patience

[More recipes](/recipes)`}</Code>
        <P>
          Markdown gets converted to HTML when published. Most of the
          web&rsquo;s technical writing — README files, GitHub issues,
          blog platforms, this very lesson — is authored in Markdown.
        </P>
      </Section>

      <Section title="When you use which" sectionNumber="07">
        <Code>{`HTML       — anything you put in a browser
JSON       — talking between systems (APIs, configs, data)
XML        — legacy systems, SVG, a few config files
SVG        — logos, icons, simple graphics
Markdown   — anything you write that needs to become HTML later`}</Code>
        <P>
          Don&rsquo;t memorize the syntax of all of them. Recognize them
          when you see them and you&rsquo;ll be fine. The next lesson dives
          into HTML for real — the structure every web page on the
          internet uses.
        </P>
      </Section>
    </LessonShell>
  );
}
