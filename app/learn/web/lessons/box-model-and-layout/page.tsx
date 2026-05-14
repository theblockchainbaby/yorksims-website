"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function BoxModelLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 9 min read"
      titleMain="The box model & layout,"
      titleAccent="how every pixel on the page got there."
      subtitle="Every element on a page is a rectangle wearing four layers of clothing — content, padding, border, margin. Once you see them, CSS layout stops being magic."
      backHref="/learn/web/unit-2"
      backLabel="Unit 2 · Document Markup"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "CSS selectors & the cascade",
        href: "/learn/web/lessons/css-selectors",
      }}
      nextLesson={{
        label: "Typography, accessibility & responsive CSS",
        href: "/learn/web/lessons/typography-and-responsive",
      }}
    >
      <Section title="The box model" sectionNumber="01">
        <P>
          Every element on a webpage is a rectangle. Around its content
          are three layers, each with its own size:
        </P>
        <Code>{`┌─────────── margin ─────────────┐
│ ┌───────── border ───────────┐ │
│ │ ┌─────── padding ────────┐ │ │
│ │ │      CONTENT           │ │ │
│ │ └────────────────────────┘ │ │
│ └────────────────────────────┘ │
└────────────────────────────────┘

content   — the text or image itself
padding   — space inside the border
border    — the line around the element
margin    — space outside the border (between elements)`}</Code>
        <P>
          You can set each side independently:{" "}
          <Inline>padding-top</Inline>, <Inline>margin-left</Inline>,{" "}
          <Inline>border-bottom</Inline>, etc. Or the shorthand:{" "}
          <Inline>margin: 10px 20px</Inline> (top/bottom 10, left/right
          20).
        </P>
      </Section>

      <Section title="box-sizing: the one CSS line you should always write" sectionNumber="02">
        <P>
          By default, <Inline>width</Inline> means the width of the{" "}
          <em>content</em> — padding and border are added on top. So a
          200px wide element with 20px padding actually occupies 240px.
          This trips up everyone.
        </P>
        <Code>{`* {
  box-sizing: border-box;
}

/* Now width includes padding + border.
   200px wide stays 200px wide no matter the padding. */`}</Code>
        <P>
          This is on the first line of essentially every modern CSS
          reset. Tailwind, Bootstrap, every framework you&rsquo;ll touch
          turns this on. You should too.
        </P>
      </Section>

      <Section title="Display — block, inline, inline-block, none" sectionNumber="03">
        <P>
          From Unit 2 lesson 2: HTML elements come in block (full
          width, stack vertically) and inline (flow with text) flavors.
          You can change this in CSS:
        </P>
        <Code>{`display: block         — full width, stacks
display: inline        — flows with text, ignores width/height
display: inline-block  — flows with text BUT respects width/height
display: none          — removed from the layout entirely
display: flex          — flexbox container (see below)
display: grid          — grid container (see below)`}</Code>
        <P>
          <Inline>display: none</Inline> doesn&rsquo;t hide visually
          while keeping space — it removes the element. To hide while
          keeping space, use <Inline>visibility: hidden</Inline> or{" "}
          <Inline>opacity: 0</Inline>.
        </P>
      </Section>

      <Section title="Position — taking elements out of flow" sectionNumber="04">
        <Code>{`position: static     — default; element flows normally
position: relative   — flows normally, but you can nudge it with top/left/etc.
position: absolute   — removed from flow, positioned vs nearest positioned ancestor
position: fixed      — removed from flow, positioned vs the viewport (stays on scroll)
position: sticky     — flows normally, then sticks at a threshold`}</Code>
        <SubHeading className="mt-6">When you need each</SubHeading>
        <Code>{`relative  — wrapper for an absolute child
absolute  — tooltips, dropdowns, badges on top of another element
fixed     — site-wide nav bar, modal overlays, back-to-top buttons
sticky    — table headers that stay visible while scrolling`}</Code>
        <P>
          Don&rsquo;t use position for general layout. It exists for
          overlays and pinned things. For actual layout, use flex or
          grid.
        </P>
      </Section>

      <Section title="Flexbox — one dimension at a time" sectionNumber="05">
        <P>
          Flexbox lays elements out along one axis — a row or a column.
          Set <Inline>display: flex</Inline> on a parent, and its
          children become flex items you can space, align, and reorder.
        </P>
        <Code>{`.row {
  display: flex;
  gap: 16px;                    /* spacing between children */
  justify-content: space-between; /* horizontal distribution */
  align-items: center;          /* vertical alignment */
}

/* Children */
.row > .grow { flex: 1; }       /* take up all available space */
.row > .fixed { flex: 0 0 200px; } /* exactly 200px, never grow or shrink */`}</Code>
        <SubHeading className="mt-6">The four flex properties you&rsquo;ll use</SubHeading>
        <Code>{`flex-direction: row | column          — which axis (default row)
justify-content                       — alignment along the main axis
align-items                           — alignment across the cross axis
gap                                   — space between children`}</Code>
        <P>
          Flexbox replaced floats for almost everything. Centering used
          to be a meme — &ldquo;how do you center a div&rdquo; — now
          it&rsquo;s three lines:{" "}
          <Inline>display: flex; justify-content: center; align-items: center</Inline>.
        </P>
      </Section>

      <Section title="Grid — two dimensions at once" sectionNumber="06">
        <P>
          Grid lays elements out in rows <em>and</em> columns at the same
          time. Use it for actual grids: page layouts, dashboards, image
          galleries.
        </P>
        <Code>{`.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;     /* sidebar + content */
  grid-template-rows: 60px 1fr;         /* header + body */
  gap: 16px;
  height: 100vh;
}

.header  { grid-column: 1 / -1; }       /* span all columns */
.sidebar { grid-row: 2; grid-column: 1; }
.main    { grid-row: 2; grid-column: 2; }`}</Code>
        <P>
          <Inline>1fr</Inline> means &ldquo;one fraction of remaining
          space.&rdquo; Two columns of <Inline>1fr 2fr</Inline> means
          the second is twice as wide as the first.{" "}
          <Inline>repeat(3, 1fr)</Inline> is shorthand for three equal
          columns.
        </P>
      </Section>

      <Section title="Flex vs grid — when to pick which" sectionNumber="07">
        <Code>{`Use flex when:
  - laying out items in a single row or column
  - aligning a small group of elements (nav bar, button cluster, card footer)

Use grid when:
  - you need both rows AND columns
  - the children need to align across rows and columns simultaneously
  - you have a clear "page layout" shape with named regions`}</Code>
        <P>
          You can (and will) nest them — a grid layout where one of the
          cells uses flex for its internal arrangement. There&rsquo;s no
          conflict. The next lesson finishes Unit 2 with typography,
          accessibility, and the responsive CSS that ties the box model
          to the screen sizes you learned in Unit 1.
        </P>
      </Section>
    </LessonShell>
  );
}
