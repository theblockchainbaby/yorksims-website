"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function CssSelectorsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 8 min read"
      titleMain="CSS selectors & the cascade,"
      titleAccent="how rules actually take effect."
      subtitle="CSS is a list of rules. The selector picks which elements to style, the cascade decides who wins when two rules fight. Get this part wrong and you'll spend hours debugging styles that 'just won't apply'."
      backHref="/learn/web/unit-2"
      backLabel="Unit 2 · Document Markup"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Forms & input",
        href: "/learn/web/lessons/forms-and-input",
      }}
      nextLesson={{
        label: "The box model & layout",
        href: "/learn/web/lessons/box-model-and-layout",
      }}
    >
      <Section title="Anatomy of a CSS rule" sectionNumber="01">
        <Code>{`a:hover {       /* selector — which elements this applies to */
  color: red;   /* declaration: property + value */
}`}</Code>
        <P>
          One file of CSS is a long list of these rules. The browser
          walks every element, finds every rule whose selector matches,
          combines them, and paints. The whole game is writing selectors
          that match what you want without matching what you don&rsquo;t.
        </P>
      </Section>

      <Section title="The five basic selector types" sectionNumber="02">
        <Code>{`/* Element — match all <p> */
p { color: gray; }

/* Class — match elements with class="btn" */
.btn { background: red; }

/* ID — match the single element with id="hero" */
#hero { padding: 40px; }

/* Attribute — match elements with a given attribute (value optional) */
input[type="email"] { border-color: green; }
a[target="_blank"]  { color: orange; }

/* Universal — match every element */
* { box-sizing: border-box; }`}</Code>
        <P>
          The right tool depends on scope. Element selectors are broad —
          they hit every <Inline>&lt;p&gt;</Inline> on the page. Classes
          are reusable — multiple elements can share one. IDs are unique
          — only one element should have a given ID per page. In modern
          codebases you&rsquo;ll mostly use classes.
        </P>
      </Section>

      <Section title="Combinators — relationships between elements" sectionNumber="03">
        <Code>{`/* Descendant (space) — any nav inside a header */
header nav { padding: 8px; }

/* Child (>) — only direct children */
ul > li { color: red; }

/* Adjacent sibling (+) — the next sibling that immediately follows */
h2 + p { font-weight: bold; }

/* General sibling (~) — any following sibling */
h2 ~ p { color: gray; }`}</Code>
        <P>
          You&rsquo;ll use descendant (just a space) more than the others
          combined. The rest exist for specific cases — like styling the
          paragraph immediately after a heading without giving it a
          class.
        </P>
      </Section>

      <Section title="Pseudo-classes — state and structure" sectionNumber="04">
        <P>
          Pseudo-classes start with a colon. They match elements{" "}
          <em>in a particular state or position</em>.
        </P>
        <Code>{`a:hover            — when the mouse is over the link
a:focus            — when keyboard-focused
button:disabled    — when disabled
input:checked      — when a checkbox/radio is checked
li:first-child     — the first <li> in its parent
li:last-child      — the last
li:nth-child(2n)   — every even <li> (1n+1 = every, 2n = even, etc.)
:not(.special)     — anything that doesn't have the .special class`}</Code>
        <P>
          These are how you style hover effects, focus states, even-row
          striping, and form validation feedback — all without writing
          JavaScript.
        </P>
      </Section>

      <Section title="Specificity — why your style isn't applying" sectionNumber="05">
        <P>
          When two rules target the same element, the more specific one
          wins. Specificity is calculated as three numbers (IDs, classes,
          elements):
        </P>
        <Code>{`Selector                            IDs  Classes  Elements
*                                    0      0        0
p                                    0      0        1
p.btn                                0      1        1
.btn                                 0      1        0
.btn.large                           0      2        0
#hero                                1      0        0
header nav a.active                  0      1        3`}</Code>
        <P>
          Compare from left to right. Any rule with an ID beats every
          rule without one. Among class-based rules, more classes win.
          Inline styles (<Inline>style=&quot;...&quot;</Inline> attribute) beat
          stylesheet rules. <Inline>!important</Inline> beats all of
          them — and is a code smell. If you find yourself reaching for
          it, your selectors are wrong.
        </P>
      </Section>

      <Section title="The cascade — when specificity ties" sectionNumber="06">
        <P>
          When two rules have equal specificity, the one that comes{" "}
          <em>later</em> in the CSS wins. That&rsquo;s the C in CSS.
        </P>
        <Code>{`.btn { background: red; }
.btn { background: blue; }    /* wins — same specificity, later */`}</Code>
        <P>
          Source order matters at the file level too. If you load{" "}
          <Inline>vendor.css</Inline> before <Inline>app.css</Inline>,
          your app styles can override the vendor styles. Flip the order
          and you can&rsquo;t.
        </P>
        <SubHeading className="mt-6">Inheritance</SubHeading>
        <P>
          Some properties cascade through children automatically.{" "}
          <Inline>color</Inline>, <Inline>font-family</Inline>, and{" "}
          <Inline>line-height</Inline> inherit. <Inline>border</Inline>,{" "}
          <Inline>padding</Inline>, <Inline>margin</Inline> do{" "}
          <em>not</em>. That&rsquo;s why setting font on the body
          &ldquo;just works&rdquo; for the whole page.
        </P>
      </Section>

      <Section title="Debugging selectors" sectionNumber="07">
        <P>
          Three steps that fix 95% of &ldquo;why isn&rsquo;t my CSS
          working&rdquo; problems:
        </P>
        <Code>{`1. Open DevTools (right-click → Inspect)
2. Click the element. Look at the Styles panel.
3. The browser shows you which rules matched, in order of specificity,
   with crossed-out properties where something later overrode them.`}</Code>
        <P>
          If you see your rule crossed out, something else won — either
          higher specificity or later in the file. If you don&rsquo;t see
          your rule at all, your selector doesn&rsquo;t match. Fix the
          selector, then re-check.
        </P>
        <P>
          Next lesson: the box model and how layout actually works once
          you can target the right elements.
        </P>
      </Section>
    </LessonShell>
  );
}
