"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function TypographyAndResponsiveLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 9 min read"
      titleMain="Typography, accessibility & responsive CSS,"
      titleAccent="the polish that makes it shippable."
      subtitle="Three skills that separate a working page from a good one: type that's actually readable, markup that works for everyone, and CSS that flexes for any screen. All in one lesson."
      backHref="/learn/web/unit-2"
      backLabel="Unit 2 · Document Markup"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "The box model & layout",
        href: "/learn/web/lessons/box-model-and-layout",
      }}
      nextLesson={{
        label: "JavaScript basics",
        href: "/learn/web/lessons/javascript-basics",
      }}
    >
      <Section title="Font properties — the five that matter" sectionNumber="01">
        <Code>{`p {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  font-size: 1rem;            /* base size */
  font-weight: 400;           /* 100 thin → 900 black */
  line-height: 1.5;           /* unitless multiplier of font-size */
  letter-spacing: -0.01em;    /* tighten a little for sans serifs */
}`}</Code>
        <SubHeading className="mt-6">Font stacks</SubHeading>
        <P>
          The browser walks the comma-separated list and uses the first
          font it finds. Always end with a generic family (sans-serif,
          serif, monospace) as a fallback. The{" "}
          <Inline>system-ui</Inline> keyword is great — it picks the OS
          default UI font (SF Pro on Mac, Segoe UI on Windows, Roboto on
          Android). Free, fast, looks native.
        </P>
      </Section>

      <Section title="Web fonts" sectionNumber="02">
        <Code>{`/* In your <head> */
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />

/* In your CSS */
body { font-family: "Inter", system-ui, sans-serif; }`}</Code>
        <P>
          Three rules for web fonts: pick one font with two weights (you
          rarely need more), use{" "}
          <Inline>display=swap</Inline> so text renders in a fallback
          while the font downloads, and self-host where you can (Google
          Fonts is fine for indie projects but adds a third-party DNS
          lookup).
        </P>
      </Section>

      <Section title="px vs rem vs em — pick rem" sectionNumber="03">
        <Code>{`px   — absolute pixels; ignores user font-size settings
em   — relative to parent's font-size (compounds; gets messy)
rem  — relative to the root <html> element's font-size (the right default)
%    — same idea as em for some properties
vw, vh — % of viewport width / height`}</Code>
        <SubHeading className="mt-6">Why rem matters</SubHeading>
        <P>
          When a user with bad eyes sets their browser to a larger
          default font size, <Inline>rem</Inline>-based layouts scale up
          with them. <Inline>px</Inline>-based layouts don&rsquo;t. This
          is accessibility, not preference — your site will be unusable
          for some people if you size everything in pixels.
        </P>
        <P>
          The trick: set <Inline>html &#123; font-size: 100% &#125;</Inline>{" "}
          (which is normally 16px). Then 1rem = 16px,{" "}
          <Inline>1.5rem</Inline> = 24px, etc. Use rem for fonts,
          spacing, and most sizes. Use px sparingly (borders, very small
          fixed details).
        </P>
      </Section>

      <Section title="Accessibility — the rules" sectionNumber="04">
        <P>
          Accessibility (a11y) is the practice of making your site
          usable by people with disabilities. It&rsquo;s also good for
          SEO, mobile UX, and aging users — and often required by law.
          The wins are big and the lift is small.
        </P>
        <Code>{`The 6 wins every site should have:

1. Use semantic HTML (Unit 2 lesson 2). Don't div everything.
2. Every image has meaningful alt text. Decorative images have alt="".
3. Color contrast at least 4.5:1 for body text (use a checker).
4. Don't rely on color alone (don't say "the red items are sold out" — add a label).
5. Every interactive element is keyboard-accessible (Tab through your site).
6. Focus states are visible. Don't disable outlines without replacing them.`}</Code>
      </Section>

      <Section title="ARIA — when semantic HTML isn't enough" sectionNumber="05">
        <P>
          <strong>ARIA</strong> (Accessible Rich Internet Applications)
          is a set of HTML attributes that add accessibility info to
          custom widgets — modals, tabs, autocompletes, dropdowns —
          that don&rsquo;t have a native HTML equivalent.
        </P>
        <Code>{`<button aria-label="Close menu" aria-expanded="false">
  ✕
</button>

<div role="alert" aria-live="polite">
  Saved!
</div>

<input aria-describedby="pw-help" type="password" />
<p id="pw-help">At least 8 characters</p>`}</Code>
        <SubHeading className="mt-6">The first rule of ARIA</SubHeading>
        <P>
          Don&rsquo;t use ARIA. The first rule of ARIA is to not use
          ARIA — if there&rsquo;s a native HTML element that does what
          you want, use it. A real{" "}
          <Inline>&lt;button&gt;</Inline> is better than a{" "}
          <Inline>&lt;div role=&quot;button&quot;&gt;</Inline> every
          time. ARIA is the escape hatch for custom widgets, not the
          starting point.
        </P>
      </Section>

      <Section title="Media queries — responsive in real CSS" sectionNumber="06">
        <P>
          From Unit 1 lesson 6, you know mobile-first means writing base
          styles for the smallest screen, then layering bigger-screen
          styles with min-width media queries. Here&rsquo;s a complete,
          realistic example:
        </P>
        <Code>{`/* Base — mobile */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
}
.headline {
  font-size: 1.5rem;
}

/* Tablet up */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 32px;
  }
  .headline {
    font-size: 2rem;
  }
}

/* Desktop up */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .headline {
    font-size: 3rem;
  }
}`}</Code>
      </Section>

      <Section title="Other useful media features" sectionNumber="07">
        <Code>{`@media (prefers-color-scheme: dark)       — user has dark mode on
@media (prefers-reduced-motion: reduce)    — user wants less animation
@media (hover: hover)                      — has real hover (not touch)
@media (orientation: portrait)             — phone in portrait`}</Code>
        <P>
          <strong>prefers-reduced-motion</strong> is the easiest a11y
          win: wrap any non-essential animation in a media query so
          users who get motion sick can opt out.
        </P>
        <Code>{`@media (prefers-reduced-motion: no-preference) {
  .hero { animation: float 3s ease-in-out infinite; }
}`}</Code>
        <P>
          You&rsquo;ve now got every HTML and CSS skill needed to ship a
          static site. Unit 3 picks up where this ends: JavaScript, the
          DOM, talking to APIs, server-side code, databases, and the
          security mistakes that turn a working site into a disaster.
        </P>
      </Section>
    </LessonShell>
  );
}
