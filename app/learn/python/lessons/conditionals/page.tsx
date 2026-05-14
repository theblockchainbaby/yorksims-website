"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ConditionalsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 8 min read"
      titleMain="Conditionals,"
      titleAccent="how programs actually make decisions."
      subtitle="A program without conditionals is a recipe that only knows how to do one thing. With if, elif, and else, it starts to react to its inputs. Here's the syntax, the operators, and the patterns that keep your conditional chains readable as they grow."
      backHref="/learn/python/unit-1"
      backLabel="Unit 1 · Fundamentals"
      prevLesson={{
        label: "Strings",
        href: "/learn/python/lessons/strings",
      }}
      nextLesson={{
        label: "Functions & methods",
        href: "/learn/python/lessons/functions",
      }}
      nextCta={{
        label: "Take the Python Basics Quiz",
        href: "/tools/python-basics-quiz",
      }}
    >
      <Section title="The basic shape" sectionNumber="01">
        <P>
          Three keywords: <Inline>if</Inline>, <Inline>elif</Inline>,{" "}
          <Inline>else</Inline>. Each line that introduces a block ends in a
          colon. The block itself is indented (4 spaces is the convention):
        </P>
        <Code>{`balance = 240.00

if balance < 0:
    print("Overdraft.")
elif balance < 100:
    print("Low balance.")
else:
    print("You're fine.")`}</Code>
        <P>
          Python runs the first branch whose condition is True and skips the
          rest. <Inline>elif</Inline> is short for &ldquo;else if&rdquo; — you
          can chain as many as you need. <Inline>else</Inline> is optional and
          catches everything you didn&rsquo;t match.
        </P>
        <P>
          Whitespace is not decorative in Python. The indented lines are{" "}
          <em>part of</em> the if block. If you forget to indent, Python
          throws a syntax error. If you indent inconsistently (mixing tabs and
          spaces), Python throws a more confusing syntax error. Pick spaces,
          pick four, never look back.
        </P>
      </Section>

      <Section title="Comparison operators" sectionNumber="02">
        <P>
          The expressions inside <Inline>if</Inline> conditions almost always
          use comparison operators. Six of them:
        </P>
        <Code>{`x == y    # equal
x != y    # not equal
x <  y    # less than
x <= y    # less than or equal
x >  y    # greater than
x >= y    # greater than or equal`}</Code>
        <P>
          The double <Inline>==</Inline> is the most common mistake at first.{" "}
          Single <Inline>=</Inline> is assignment (&ldquo;set x to y&rdquo;).
          Double <Inline>==</Inline> is a question (&ldquo;is x equal to
          y?&rdquo;). Python won&rsquo;t let you assign inside an{" "}
          <Inline>if</Inline>, so the mistake fails loudly — but it still
          happens.
        </P>
        <P>
          One useful Python-ism: you can chain comparisons:
        </P>
        <Code>{`age = 24
if 18 <= age < 65:        # works exactly like math
    print("Working age.")

# Equivalent to:
if age >= 18 and age < 65:
    print("Working age.")`}</Code>
      </Section>

      <Section title="Combining conditions: and, or, not" sectionNumber="03">
        <P>
          Three boolean operators. They&rsquo;re words in Python, not symbols
          like in other languages:
        </P>
        <Code>{`a and b      # True only if both are True
a or b       # True if at least one is True
not a        # flips True to False and vice versa`}</Code>
        <P>
          Combine them to build the conditions you actually need:
        </P>
        <Code>{`# Access control: must be logged in AND either admin OR account owner
if is_logged_in and (is_admin or is_account_owner):
    show_settings()

# Form validation: must have a name AND a valid email
if name and "@" in email:
    submit()

# Negation: bail out if the file is missing
if not file_exists:
    return`}</Code>
        <P>
          Use parentheses around <Inline>or</Inline> groups inside an{" "}
          <Inline>and</Inline> expression. Even if Python&rsquo;s precedence
          rules would give you the right answer, the parentheses save your
          reviewer from having to think.
        </P>
        <SubHeading className="mt-6">Short-circuit evaluation</SubHeading>
        <P>
          Python evaluates left to right and stops as soon as the answer is
          known. <Inline>False and anything</Inline> is False, so Python
          doesn&rsquo;t bother evaluating &ldquo;anything.&rdquo; This is
          useful for guarding against errors:
        </P>
        <Code>{`# This is safe even if user is None — Python never evaluates user.is_admin
if user and user.is_admin:
    show_admin_panel()`}</Code>
      </Section>

      <Section title="Truthiness — values that act like True or False" sectionNumber="04">
        <P>
          Python lets you use almost any value as a condition, not just{" "}
          <Inline>True</Inline> and <Inline>False</Inline>. The rule is
          simple: empty things are falsy, everything else is truthy.
        </P>
        <Code>{`# These are all FALSY (treated like False):
None
False
0           0.0
""          # empty string
[]          # empty list
{}          # empty dict
set()       # empty set

# Everything else is TRUTHY.`}</Code>
        <P>
          This makes some checks very compact:
        </P>
        <Code>{`# Verbose:
if len(cart) > 0:
    checkout(cart)

# Pythonic — empty list is falsy:
if cart:
    checkout(cart)

# Same for strings — empty string is falsy:
if name:
    greet(name)`}</Code>
        <P>
          Use this. It reads better and matches what experienced Python
          programmers expect. The one gotcha: it doesn&rsquo;t distinguish
          between <Inline>None</Inline> and other falsy values. If you
          specifically need to know whether something is <Inline>None</Inline>{" "}
          (e.g., &ldquo;was this argument provided?&rdquo;), use{" "}
          <Inline>is None</Inline>:
        </P>
        <Code>{`def fetch(timeout=None):
    if timeout is None:           # specifically "not provided"
        timeout = 30
    ...`}</Code>
      </Section>

      <Section title="Cleaning up long conditional chains" sectionNumber="05">
        <P>
          If you find yourself writing an if/elif chain that&rsquo;s 8 levels
          deep, the conditional isn&rsquo;t the problem — the design is. Two
          quick refactors:
        </P>
        <SubHeading>Early return (the guard clause)</SubHeading>
        <Code>{`# Nested — hard to follow:
def process(order):
    if order.is_valid:
        if order.is_paid:
            if not order.is_shipped:
                ship(order)

# Flat — read top to bottom:
def process(order):
    if not order.is_valid:
        return
    if not order.is_paid:
        return
    if order.is_shipped:
        return
    ship(order)`}</Code>

        <SubHeading className="mt-6">Lookup tables for many branches</SubHeading>
        <Code>{`# Long elif chain:
def discount_for(plan):
    if plan == "free":
        return 0
    elif plan == "starter":
        return 0.10
    elif plan == "pro":
        return 0.25
    elif plan == "enterprise":
        return 0.40
    else:
        return 0

# Dictionary lookup — adds new plans without changing logic:
DISCOUNTS = {"free": 0, "starter": 0.10, "pro": 0.25, "enterprise": 0.40}

def discount_for(plan):
    return DISCOUNTS.get(plan, 0)`}</Code>
        <P>
          When you start seeing the same conditional structure repeat,
          that&rsquo;s a sign the data should drive the logic, not the other
          way around.
        </P>
      </Section>
    </LessonShell>
  );
}
