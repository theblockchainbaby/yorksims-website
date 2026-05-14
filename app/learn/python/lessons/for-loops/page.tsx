"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ForLoopsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 9 min read"
      titleMain="For loops & range,"
      titleAccent="the workhorse you'll write in every script."
      subtitle="Most loops you'll ever write are for loops. They walk through any iterable — a list, a string, a dict, the lines of a file — one item at a time. Here's the shape, the helpers that make them shorter, and the comprehension form for one-liners."
      backHref="/learn/python/unit-2"
      backLabel="Unit 2 · Data & Control Flow"
      prevLesson={{
        label: "While loops",
        href: "/learn/python/lessons/while-loops",
      }}
      nextLesson={{
        label: "Break, continue & nesting",
        href: "/learn/python/lessons/loop-control",
      }}
      nextCta={{
        label: "Take the Lists & Loops Quiz",
        href: "/tools/python-lists-loops-quiz",
      }}
    >
      <Section title="The basic shape" sectionNumber="01">
        <P>
          A <Inline>for</Inline> loop says &ldquo;for each item in this
          collection, run this block.&rdquo; The iteration variable takes a
          new value each time around:
        </P>
        <Code>{`orders = [42.50, 89.00, 17.95, 230.00]

for amount in orders:
    print(f"Charging \${amount:.2f}")`}</Code>
        <P>
          Same shape works on anything that&rsquo;s &ldquo;iterable&rdquo; —
          strings, tuples, sets, dicts, file handles, even custom objects you
          define yourself later:
        </P>
        <Code>{`# string: iterates characters
for ch in "Python":
    print(ch)

# dict: iterates keys
for key in {"a": 1, "b": 2}:
    print(key)

# range: iterates numbers (more on this below)
for i in range(3):
    print(i)`}</Code>
      </Section>

      <Section title="range — generate sequences of numbers" sectionNumber="02">
        <P>
          Most of the time you want &ldquo;do this N times&rdquo; or &ldquo;count
          from A to B.&rdquo; That&rsquo;s what <Inline>range</Inline> is for.
          Three forms:
        </P>
        <Code>{`range(5)           # 0, 1, 2, 3, 4         — stop only
range(2, 6)        # 2, 3, 4, 5            — start, stop
range(0, 20, 5)    # 0, 5, 10, 15          — start, stop, step
range(10, 0, -1)   # 10, 9, 8, ..., 1      — counting down (negative step)`}</Code>
        <P>
          Three things to remember about <Inline>range</Inline>:
        </P>
        <Code>{`1. The stop value is EXCLUSIVE. range(5) goes 0..4, not 0..5.
2. range() doesn't build a list — it generates numbers on demand.
   That's why range(1_000_000_000) is fast and doesn't eat your RAM.
3. To get a real list from a range, wrap it: list(range(5)) → [0, 1, 2, 3, 4]`}</Code>
      </Section>

      <Section title="enumerate — when you need the index too" sectionNumber="03">
        <P>
          Sometimes you want both the position and the value. Beginners
          write this:
        </P>
        <Code>{`# DON'T do this:
for i in range(len(orders)):
    print(f"{i}: \${orders[i]:.2f}")`}</Code>
        <P>
          It works, but it&rsquo;s un-Pythonic and slower than it looks.
          Reach for <Inline>enumerate</Inline> instead:
        </P>
        <Code>{`for i, amount in enumerate(orders):
    print(f"{i}: \${amount:.2f}")

# 0: $42.50
# 1: $89.00
# 2: $17.95
# 3: $230.00`}</Code>
        <P>
          Pass <Inline>start=1</Inline> if you want 1-based numbering for
          display:
        </P>
        <Code>{`for n, amount in enumerate(orders, start=1):
    print(f"Order #{n}: \${amount:.2f}")`}</Code>
      </Section>

      <Section title="zip — walk two collections in parallel" sectionNumber="04">
        <P>
          When you have two related lists, pair them up with{" "}
          <Inline>zip</Inline>:
        </P>
        <Code>{`names  = ["Ada", "Ben", "Cal"]
scores = [92, 71, 84]

for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Ada: 92
# Ben: 71
# Cal: 84`}</Code>
        <P>
          <Inline>zip</Inline> stops at the shortest list, so you don&rsquo;t
          have to check lengths. It also works on three or more iterables at
          once. Pair it with <Inline>dict()</Inline> to build a dict from two
          parallel lists:
        </P>
        <Code>{`scoreboard = dict(zip(names, scores))
# {"Ada": 92, "Ben": 71, "Cal": 84}`}</Code>
      </Section>

      <Section title="Looping over dicts" sectionNumber="05">
        <P>
          A bare <Inline>for x in some_dict</Inline> gives you keys. Most
          of the time you want both keys and values — that&rsquo;s{" "}
          <Inline>.items()</Inline>:
        </P>
        <Code>{`prefs = {"theme": "dark", "language": "en", "page_size": 25}

for key in prefs:                  # just keys
    print(key)

for value in prefs.values():       # just values
    print(value)

for key, value in prefs.items():   # both — the most common form
    print(f"{key} = {value}")`}</Code>
        <P>
          Unpacking the <Inline>(key, value)</Inline> tuple in the loop
          header is exactly the same move as unpacking from{" "}
          <Inline>zip</Inline> or <Inline>enumerate</Inline> — Python has
          one consistent pattern for &ldquo;give each item a name as I loop
          over it.&rdquo;
        </P>
      </Section>

      <Section title="List comprehensions — for loops in one line" sectionNumber="06">
        <P>
          Two patterns show up so often they deserve a shortcut: building a
          new list by transforming an old one, and filtering a list. Python
          gives you a one-line form for both, called a{" "}
          <em>list comprehension</em>:
        </P>
        <Code>{`# Transform: list of squares
numbers = [1, 2, 3, 4, 5]

# Long form:
squares = []
for n in numbers:
    squares.append(n * n)

# Comprehension:
squares = [n * n for n in numbers]
# [1, 4, 9, 16, 25]

# Filter: only even numbers
evens = [n for n in numbers if n % 2 == 0]
# [2, 4]

# Combined transform + filter
even_squares = [n * n for n in numbers if n % 2 == 0]
# [4, 16]`}</Code>
        <P>
          The shape is always <strong>[expression for item in iterable
          if condition]</strong>. The <Inline>if</Inline> is optional.
        </P>
        <P>
          Comprehensions are great when they stay simple. The moment they
          get nested or grow a multi-clause condition, write the boring
          for-loop version — it&rsquo;ll read better. The skill is knowing
          when each is the right call, and that comes with practice.
        </P>
        <SubHeading className="mt-6">Same idea for dicts and sets</SubHeading>
        <Code>{`# Dict comprehension
scoreboard = {name: score for name, score in zip(names, scores)}

# Set comprehension
unique_lengths = {len(word) for word in ["python", "for", "everybody"]}
# {3, 6, 9}`}</Code>
      </Section>
    </LessonShell>
  );
}
