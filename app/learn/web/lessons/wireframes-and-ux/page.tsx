"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function WireframesAndUxLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 8 min read"
      titleMain="Wireframes & UX,"
      titleAccent="why the sketch matters more than the code."
      subtitle="Most sites fail because somebody opened a code editor before they opened a notebook. The cheapest way to fix a bad layout is on paper. The most expensive is in production."
      backHref="/learn/web/unit-1"
      backLabel="Unit 1 · Web Foundations"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Web servers & CMSes",
        href: "/learn/web/lessons/servers-and-cms",
      }}
      nextLesson={{
        label: "Responsive design",
        href: "/learn/web/lessons/responsive-design",
      }}
    >
      <Section title="UI vs UX — they're different things" sectionNumber="01">
        <P>
          <strong>UI</strong> (User Interface) is what the user sees:
          buttons, fonts, colors, spacing.{" "}
          <strong>UX</strong> (User Experience) is what the user feels:
          flow, friction, time-to-task, frustration. UI lives on a screen.
          UX lives in your visitor&rsquo;s head.
        </P>
        <P>
          You can have great UI and terrible UX (gorgeous landing page,
          can&rsquo;t find the &ldquo;Cancel Subscription&rdquo; button).
          You can have plain UI and great UX (Craigslist; Hacker News). The
          goal is both, but if you have to pick one, UX wins — users put up
          with ugly far more readily than they put up with confused.
        </P>
      </Section>

      <Section title="Wireframes — drawing before coding" sectionNumber="02">
        <P>
          A <strong>wireframe</strong> is a low-fidelity sketch of a page.
          Boxes, lines, placeholder text. No colors. No fonts. The only
          thing it&rsquo;s trying to answer is: what goes where, and what
          does it do?
        </P>
        <Code>{`┌─────────────────────────────────┐
│  [logo]      [nav nav nav nav]  │
├─────────────────────────────────┤
│                                 │
│   [HEADLINE GOES HERE]          │
│   [supporting sentence]         │
│   [primary CTA] [secondary]     │
│                                 │
├─────────────────────────────────┤
│  [feature]  [feature]  [feature]│
│                                 │
└─────────────────────────────────┘`}</Code>
        <P>
          You build this on paper, on a whiteboard, or in Figma. The point
          is to settle the <em>structure</em> before you settle the look.
          You will throw away three or four wireframes before you find one
          that works. That&rsquo;s the whole reason to do it on paper —
          throwing away paper is cheap. Throwing away built pages is not.
        </P>
      </Section>

      <Section title="Storyboarding — wireframes that move" sectionNumber="03">
        <P>
          A <strong>storyboard</strong> is a sequence of wireframes that
          shows how a user moves through your site. The cinema analogy is
          deliberate — you&rsquo;re mapping a flow, scene by scene.
        </P>
        <Code>{`Scene 1: Land on homepage         →  see headline + CTA
Scene 2: Click "Start free trial" →  signup form, 3 fields
Scene 3: Submit form              →  email verify screen
Scene 4: Verify email             →  onboarding tour begins
Scene 5: Complete tour            →  main dashboard`}</Code>
        <P>
          Most landing pages fail not because the homepage is bad, but
          because scene 2 has 14 fields and scene 4 sends to a 404.
          Storyboards make those gaps visible before you build them.
        </P>
      </Section>

      <Section title="The fold — still real, just different" sectionNumber="04">
        <P>
          &ldquo;The fold&rdquo; comes from newspapers — the headline above
          the literal fold of the paper had to grab you on the newsstand.
          On the web it means: the part of the page a visitor sees before
          they scroll.
        </P>
        <P>
          Old advice was &ldquo;put everything important above the
          fold.&rdquo; That&rsquo;s outdated. Users scroll. But the fold
          still matters for one thing:{" "}
          <strong>does the user understand what this is</strong> within
          three seconds? If yes, they&rsquo;ll scroll. If no, they&rsquo;ll
          leave.
        </P>
        <Code>{`Above the fold, you need:

1. What is this thing?        (a clear product name + 1-sentence description)
2. Who is it for?              (so I know whether to keep reading)
3. What's the next action?     (one CTA, not five)`}</Code>
      </Section>

      <Section title="Typography — picked once, lived with forever" sectionNumber="05">
        <P>
          Typography choices look small and last decades. Pick two fonts
          (one for headings, one for body), pick a base size, and stop.
        </P>
        <Code>{`Sane defaults:

Body:     16px, line-height 1.5-1.6
Headings: 1.5x-2.5x body size, tighter line-height
Font:     system-ui or a single web font; never more than two`}</Code>
        <SubHeading className="mt-6">Why fonts matter</SubHeading>
        <P>
          A poorly-chosen font does two things: it makes content harder to
          read (literal accessibility hit), and it sets the wrong tone for
          your brand. Comic Sans for a law firm; Times New Roman for a
          children&rsquo;s app. The font is doing rhetorical work whether
          you&rsquo;re paying attention or not.
        </P>
        <P>
          Pair fonts cautiously: pick one serif and one sans-serif, never
          two of the same family. Google Fonts has good defaults if
          you&rsquo;re unsure: Inter (sans), Source Serif Pro (serif),
          JetBrains Mono (code).
        </P>
      </Section>

      <Section title="SEO & analytics — design for being found" sectionNumber="06">
        <P>
          <strong>SEO</strong> (Search Engine Optimization) is the practice
          of structuring a site so search engines understand what it&rsquo;s
          about. Good SEO starts in the wireframe: clear headings, real
          content, useful URLs. You can&rsquo;t bolt it on later without
          rewriting half the site.
        </P>
        <P>
          <strong>Analytics</strong> is the other side: did anyone show up,
          and what did they do? Decide before launch what events matter
          (signups, purchases, time on page) and instrument them. Without
          analytics you&rsquo;re flying blind and you&rsquo;ll &ldquo;feel
          like&rdquo; the site is working when it isn&rsquo;t.
        </P>
        <P>
          Whatever you collect, write a privacy policy that says so. Most
          jurisdictions require it. The next lesson is about making any of
          this work on a phone — which is where 60-80% of your visitors
          will actually be.
        </P>
      </Section>
    </LessonShell>
  );
}
