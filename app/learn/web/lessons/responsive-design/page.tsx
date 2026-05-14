"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ResponsiveDesignLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 7 min read"
      titleMain="Responsive design,"
      titleAccent="because 70% of your visitors are on a phone."
      subtitle="A responsive site adapts to whatever screen it's loaded on — phone, tablet, laptop, 4K monitor. Mobile-first is the methodology that gets you there without a second mobile codebase to maintain."
      backHref="/learn/web/unit-1"
      backLabel="Unit 1 · Web Foundations"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Wireframes & UX",
        href: "/learn/web/lessons/wireframes-and-ux",
      }}
      nextLesson={{
        label: "Dev workflow & the IDE",
        href: "/learn/web/lessons/dev-workflow",
      }}
    >
      <Section title="Why responsive, and why mobile-first" sectionNumber="01">
        <P>
          Around 2010 the web stopped being a desktop medium. By 2024 most
          sites get more traffic from phones than laptops. Google ranks the
          mobile version of your site by default —{" "}
          <em>mobile-first indexing</em> — so if your mobile experience is
          worse, your SEO is worse. There&rsquo;s no &ldquo;real&rdquo;
          desktop version anymore. They&rsquo;re both real.
        </P>
        <P>
          <strong>Responsive design</strong> means one codebase that adapts
          its layout to any screen size.{" "}
          <strong>Mobile-first</strong> means you design and build for the
          smallest screen first, then progressively enhance for bigger
          ones.
        </P>
      </Section>

      <Section title="The three ingredients of a responsive site" sectionNumber="02">
        <P>
          Ethan Marcotte&rsquo;s original definition (2010) had three
          parts. They still hold up.
        </P>
        <Code>{`1. Fluid grids        — sizes in % or rem, not fixed px
2. Flexible images    — images that scale down inside their container
3. Media queries      — CSS rules that change at different widths`}</Code>
        <P>
          Modern CSS adds a fourth: <strong>flex and grid layout</strong>,
          which collapse and rearrange content automatically without you
          writing a media query at all. But the underlying mental model is
          the same — your layout flexes.
        </P>
      </Section>

      <Section title="Breakpoints" sectionNumber="03">
        <P>
          A <strong>breakpoint</strong> is a screen width where the layout
          changes shape. Don&rsquo;t pick breakpoints based on devices —
          devices change every year. Pick them based on{" "}
          <em>where your content starts to look bad</em>.
        </P>
        <Code>{`A sensible default set (you'll see these in Tailwind too):

sm   ≥ 640px   small phones in landscape, large phones in portrait
md   ≥ 768px   tablets
lg   ≥ 1024px  small laptops
xl   ≥ 1280px  desktops
2xl  ≥ 1536px  large desktops`}</Code>
        <P>
          Most sites need 2-3 breakpoints, not 8. Try the design at 360px
          width (the smallest realistic phone), then resize the window and
          watch where things break. Add a breakpoint there.
        </P>
      </Section>

      <Section title="Mobile-first CSS" sectionNumber="04">
        <P>
          Write your base styles for the smallest screen. Then{" "}
          <em>add</em> styles for bigger screens using{" "}
          <Inline>min-width</Inline> media queries.
        </P>
        <Code>{`/* Mobile (base — no media query) */
.card {
  width: 100%;
  padding: 16px;
  font-size: 14px;
}

/* Tablet up */
@media (min-width: 768px) {
  .card {
    width: 50%;
    padding: 24px;
    font-size: 16px;
  }
}

/* Desktop up */
@media (min-width: 1024px) {
  .card {
    width: 33%;
  }
}`}</Code>
        <P>
          Why mobile-first and not desktop-first? Two reasons. First, phones
          have the most constraints (small screen, slow CPU, flaky network)
          and starting there forces you to keep things light. Second, it
          plays nicely with CSS cascading — additive overrides are easier to
          reason about than subtractive ones.
        </P>
      </Section>

      <Section title="Flexible images and the viewport meta tag" sectionNumber="05">
        <SubHeading>The one HTML tag you cannot forget</SubHeading>
        <Code>{`<meta name="viewport" content="width=device-width, initial-scale=1">`}</Code>
        <P>
          Without this in the <Inline>&lt;head&gt;</Inline>, phones will
          render your page at desktop width and then zoom out. Everything
          will look tiny. Every responsive design starts with this line.
        </P>
        <SubHeading className="mt-6">Flexible images</SubHeading>
        <Code>{`img {
  max-width: 100%;
  height: auto;
}`}</Code>
        <P>
          Two lines. Now every image will shrink to fit its container
          without distortion. For high-DPI displays and bandwidth-aware
          loading, modern HTML adds <Inline>srcset</Inline> and{" "}
          <Inline>sizes</Inline> — you&rsquo;ll see those in Unit 2.
        </P>
      </Section>

      <Section title="Responsive vs adaptive vs a separate mobile site" sectionNumber="06">
        <P>
          You&rsquo;ll hear three terms. They&rsquo;re different.
        </P>
        <Code>{`Responsive   — one codebase, fluid layout, adapts continuously
Adaptive     — one codebase, but loads a different layout per device
Mobile site  — separate site at m.example.com (legacy, don't build this)`}</Code>
        <P>
          The old m-dot pattern (m.example.com) was a workaround when CSS
          couldn&rsquo;t do real responsive layouts. It split your URLs
          (bad for SEO), doubled your maintenance, and inevitably one
          version got behind. There is no reason to build one in 2026.
        </P>
        <P>
          You now have the design and the surface area covered. Next
          lesson: the dev workflow — IDEs, version control, methodologies,
          and the loop you&rsquo;ll run thousands of times a year.
        </P>
      </Section>
    </LessonShell>
  );
}
