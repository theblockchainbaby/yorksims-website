"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function NumbersOperatorsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 8 min read"
      titleMain="Numbers and operators,"
      titleAccent="plus the floating-point trap that bites everyone once."
      subtitle="Python is good at math. But the moment you start mixing ints and floats, or using division on integers, weird things start happening. Here's what's going on and how to write arithmetic that doesn't surprise you."
      backHref="/learn/python/unit-1"
      backLabel="Unit 1 · Fundamentals"
      prevLesson={{
        label: "Data types & variables",
        href: "/learn/python/lessons/data-types-variables",
      }}
      nextLesson={{
        label: "Strings",
        href: "/learn/python/lessons/strings",
      }}
      nextCta={{
        label: "Take the Python Basics Quiz",
        href: "/tools/python-basics-quiz",
      }}
    >
      <Section title="The operators you'll use" sectionNumber="01">
        <P>
          Python has seven arithmetic operators. You&rsquo;ve probably seen
          five of them since middle school:
        </P>
        <Code>{`3 + 2     # 5    — addition
3 - 2     # 1    — subtraction
3 * 2     # 6    — multiplication
3 / 2     # 1.5  — division (always returns a float)
3 ** 2    # 9    — exponent (3 squared)`}</Code>
        <P>
          And two that confuse newcomers:
        </P>
        <Code>{`7 // 2    # 3    — floor division (drops the decimal)
7 % 2     # 1    — modulo (the remainder)`}</Code>
        <P>
          <Inline>//</Inline> is &ldquo;divide and throw away the
          decimal.&rdquo; <Inline>%</Inline> is &ldquo;what&rsquo;s left
          over.&rdquo; They&rsquo;re cousins:{" "}
          <Inline>{`7 // 2 == 3`}</Inline> and <Inline>{`7 % 2 == 1`}</Inline>{" "}
          because 7 = 3 × 2 + 1. You&rsquo;ll use both surprisingly often.
        </P>
      </Section>

      <Section title="Order of operations (PEMDAS, but Python)" sectionNumber="02">
        <P>
          Python uses the same rules you learned in algebra:
          parentheses first, then exponents, then multiply/divide, then
          add/subtract. Left to right within a tier.
        </P>
        <Code>{`2 + 3 * 4         # 14   — multiplication first
(2 + 3) * 4       # 20   — parentheses change the order
2 ** 3 * 2        # 16   — exponent first: 8 * 2
10 - 4 + 1        # 7    — left to right: (10 - 4) + 1`}</Code>
        <P>
          Use parentheses even when you don&rsquo;t need them, if it makes the
          intent clearer:
        </P>
        <Code>{`# Both produce the same result; the second one reads in one pass:
subtotal + subtotal * tax_rate
subtotal + (subtotal * tax_rate)`}</Code>
        <P>
          Three minutes of extra parentheses can save your reviewer twenty
          minutes of double-checking.
        </P>
      </Section>

      <Section title="Where modulo earns its keep" sectionNumber="03">
        <P>
          <Inline>%</Inline> looks niche at first but solves a surprising
          number of real problems. Four examples worth remembering:
        </P>
        <SubHeading>1. &ldquo;Is this number divisible by N?&rdquo;</SubHeading>
        <Code>{`# Run cleanup every 10th request
if request_count % 10 == 0:
    run_cleanup()`}</Code>

        <SubHeading className="mt-6">
          2. &ldquo;Is it even or odd?&rdquo;
        </SubHeading>
        <Code>{`if year % 2 == 0:
    print("even year")
else:
    print("odd year")`}</Code>

        <SubHeading className="mt-6">
          3. Time math (seconds → minutes and seconds)
        </SubHeading>
        <Code>{`total_seconds = 197
minutes = total_seconds // 60   # 3
seconds = total_seconds % 60    # 17
print(f"{minutes}:{seconds:02d}")  # "3:17"`}</Code>

        <SubHeading className="mt-6">4. Wrapping around a list</SubHeading>
        <Code>{`# Cycle through 5 colors for a chart
colors = ["red", "blue", "green", "purple", "orange"]
for i in range(12):
    color = colors[i % 5]   # 0,1,2,3,4,0,1,2,3,4,0,1
    draw_bar(color)`}</Code>
        <P>
          That last pattern shows up everywhere: rotating UI states, dealing
          cards, scheduling. Modulo is the answer to &ldquo;wrap around when
          you hit the end.&rdquo;
        </P>
      </Section>

      <Section title="The floating-point trap" sectionNumber="04">
        <P>
          Try this in any Python prompt:
        </P>
        <Code>{`>>> 0.1 + 0.2
0.30000000000000004`}</Code>
        <P>
          That&rsquo;s not a Python bug. It&rsquo;s how floats are stored in
          hardware on every modern computer. Some decimal numbers can&rsquo;t
          be represented exactly in binary — same way{" "}
          <Inline>1/3</Inline> can&rsquo;t be written exactly in decimal
          (0.333...). For 90% of your code it won&rsquo;t matter. For the
          other 10% — money, scientific measurements, anything where exact
          equality matters — you need a different tool.
        </P>
        <SubHeading className="mt-6">For displaying floats: round()</SubHeading>
        <Code>{`>>> round(0.1 + 0.2, 2)
0.3`}</Code>

        <SubHeading className="mt-6">For money: use Decimal or integer cents</SubHeading>
        <Code>{`# Bad: storing dollars as floats
total = 0.0
for item in cart:
    total += item.price       # rounding errors accumulate

# Better: store everything in cents (integers)
total_cents = 0
for item in cart:
    total_cents += item.price_cents
dollars = total_cents / 100   # only convert at the end

# Or use Decimal for full precision
from decimal import Decimal
total = Decimal("0.00")
for item in cart:
    total += Decimal(item.price_str)`}</Code>
        <P>
          Don&rsquo;t use <Inline>{`==`}</Inline> on floats. Use{" "}
          <Inline>{`abs(a - b) < 0.0001`}</Inline> if you need to ask
          &ldquo;close enough?&rdquo; instead.
        </P>
      </Section>
    </LessonShell>
  );
}
