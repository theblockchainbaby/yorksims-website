"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ListMethodsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 9 min read"
      titleMain="List methods & slicing,"
      titleAccent="the operations you'll run a hundred times a day."
      subtitle="Once you have a list, you'll spend most of your time adding to it, removing from it, sorting it, or grabbing pieces of it. Here are the methods that matter, the ones you can mostly ignore, and the slicing tricks worth knowing."
      backHref="/learn/python/unit-2"
      backLabel="Unit 2 · Data & Control Flow"
      prevLesson={{
        label: "Intro to lists",
        href: "/learn/python/lessons/intro-to-lists",
      }}
      nextLesson={{
        label: "Sets, tuples & dictionaries",
        href: "/learn/python/lessons/collections",
      }}
      nextCta={{
        label: "Take the Lists & Loops Quiz",
        href: "/tools/python-lists-loops-quiz",
      }}
    >
      <Section title="Adding things to a list" sectionNumber="01">
        <P>
          Three methods. The one you reach for depends on{" "}
          <em>what</em> you&rsquo;re adding and <em>where</em>:
        </P>
        <Code>{`queue = ["alpha", "bravo"]

# append — one item at the end
queue.append("charlie")
# ["alpha", "bravo", "charlie"]

# insert — at a specific index (slow on big lists; rare in practice)
queue.insert(0, "first")
# ["first", "alpha", "bravo", "charlie"]

# extend — merge another iterable in
queue.extend(["delta", "echo"])
# ["first", "alpha", "bravo", "charlie", "delta", "echo"]`}</Code>
        <P>
          The classic mistake: using <Inline>append</Inline> when you wanted{" "}
          <Inline>extend</Inline>:
        </P>
        <Code>{`tasks = ["wake up", "coffee"]
batch = ["check email", "stand-up"]

tasks.append(batch)
# ["wake up", "coffee", ["check email", "stand-up"]]   — nested!

tasks.extend(batch)
# ["wake up", "coffee", "check email", "stand-up"]    — flat`}</Code>
        <P>
          Rule of thumb: <Inline>append</Inline> adds the thing you pass as a
          single item. <Inline>extend</Inline> unpacks the thing and adds each
          element. Strings count as iterables, so{" "}
          <Inline>list.extend(&quot;abc&quot;)</Inline> adds three characters
          to your list. That&rsquo;s usually not what you want.
        </P>
      </Section>

      <Section title="Removing things" sectionNumber="02">
        <P>
          Four ways, each useful in a different situation:
        </P>
        <Code>{`items = ["pen", "pencil", "eraser", "ruler", "pencil"]

# pop — remove by index, returns the value
last = items.pop()           # "pencil" (the last one)
# items: ["pen", "pencil", "eraser", "ruler"]

first = items.pop(0)         # "pen"
# items: ["pencil", "eraser", "ruler"]

# remove — remove by value (first match only)
items.remove("eraser")
# items: ["pencil", "ruler"]

# del — remove by index without returning anything
del items[0]
# items: ["ruler"]

# clear — wipe everything
items.clear()
# items: []`}</Code>
        <P>
          <Inline>remove()</Inline> raises <Inline>ValueError</Inline> if the
          value isn&rsquo;t in the list. <Inline>pop()</Inline> raises{" "}
          <Inline>IndexError</Inline> if the index is out of range. If you
          want safe versions, check membership first or wrap in{" "}
          <Inline>try / except</Inline>.
        </P>
      </Section>

      <Section title="Sorting" sectionNumber="03">
        <P>
          Two ways. Pick based on whether you want to keep the original
          order:
        </P>
        <Code>{`scores = [88, 71, 95, 60, 82]

# sorted() — returns a NEW list, original unchanged
ranked = sorted(scores)
# ranked = [60, 71, 82, 88, 95]
# scores = [88, 71, 95, 60, 82]    (unchanged)

# .sort() — sorts IN PLACE, returns None
scores.sort()
# scores = [60, 71, 82, 88, 95]    (changed)`}</Code>
        <P>
          Both accept <Inline>reverse=True</Inline> and a{" "}
          <Inline>key</Inline> function:
        </P>
        <Code>{`# Descending
sorted(scores, reverse=True)
# [95, 88, 82, 71, 60]

# Sort by a derived value — here, length of each string
words = ["the", "quickest", "brown", "fox"]
sorted(words, key=len)
# ["the", "fox", "brown", "quickest"]

# Sort dicts by a field
players = [
    {"name": "Ada", "score": 92},
    {"name": "Ben", "score": 71},
    {"name": "Cal", "score": 84},
]
sorted(players, key=lambda p: p["score"], reverse=True)
# [{"name": "Ada", ...}, {"name": "Cal", ...}, {"name": "Ben", ...}]`}</Code>
        <SubHeading className="mt-6">
          The single most common sorting bug
        </SubHeading>
        <Code>{`# WRONG — .sort() returns None
ranked = scores.sort()
print(ranked)        # None — your scores are sorted but ranked is useless

# RIGHT — use sorted() if you want a return value
ranked = sorted(scores)`}</Code>
        <P>
          If a method&rsquo;s job is to change something, it usually returns{" "}
          <Inline>None</Inline> in Python. That includes{" "}
          <Inline>.sort()</Inline>, <Inline>.append()</Inline>,{" "}
          <Inline>.reverse()</Inline>, <Inline>.remove()</Inline>, and{" "}
          <Inline>.clear()</Inline>. Don&rsquo;t assign their results.
        </P>
      </Section>

      <Section title="Slicing — the underrated tool" sectionNumber="04">
        <P>
          You met slicing in the intro lesson. The full form has a step:
        </P>
        <Code>{`numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

numbers[2:7]          # [2, 3, 4, 5, 6]       — start:stop
numbers[::2]          # [0, 2, 4, 6, 8]       — every 2nd item
numbers[1::2]         # [1, 3, 5, 7, 9]       — every 2nd starting at 1
numbers[::-1]         # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]   — reversed!
numbers[::-2]         # [9, 7, 5, 3, 1]`}</Code>
        <P>
          <Inline>numbers[::-1]</Inline> is the Pythonic way to reverse a
          list (or string) without mutating it.
        </P>
        <SubHeading className="mt-6">Slice assignment</SubHeading>
        <Code>{`# Replace a chunk in place
numbers = [0, 1, 2, 3, 4]
numbers[1:3] = ["a", "b", "c"]
# [0, "a", "b", "c", 3, 4]   — the replacement can be a different length!

# Insert without replacing
numbers[2:2] = ["X", "Y"]
# [0, "a", "X", "Y", "b", "c", 3, 4]

# Clear a chunk
numbers[1:5] = []
# [0, "c", 3, 4]`}</Code>
        <P>
          Slice assignment is powerful but easy to abuse — you can usually
          accomplish the same thing more readably with{" "}
          <Inline>append</Inline>, <Inline>extend</Inline>, or{" "}
          <Inline>insert</Inline>.
        </P>
      </Section>

      <Section title="The reference vs copy trap" sectionNumber="05">
        <P>
          This one bites every beginner exactly once:
        </P>
        <Code>{`original = [1, 2, 3]
also = original              # NOT a copy — same list, two names

also.append(4)
print(original)              # [1, 2, 3, 4]   — surprise!`}</Code>
        <P>
          Three ways to actually copy:
        </P>
        <Code>{`copy1 = original[:]          # slice copy
copy2 = original.copy()      # .copy() method (clearest)
copy3 = list(original)       # list() constructor`}</Code>
        <P>
          All three give you a <em>shallow</em> copy — a new outer list, but
          the elements inside are still shared references. That only matters
          when the elements are themselves mutable (lists of lists, dicts of
          dicts). For those cases, reach for{" "}
          <Inline>copy.deepcopy()</Inline> from the standard library:
        </P>
        <Code>{`from copy import deepcopy

grid = [[0, 0], [0, 0]]
twin = deepcopy(grid)

twin[0][0] = 9
print(grid)     # [[0, 0], [0, 0]]   — untouched`}</Code>
        <P>
          You probably won&rsquo;t need <Inline>deepcopy</Inline> on day
          one. Just remember: if changing your &ldquo;copy&rdquo; also
          changes the original, you didn&rsquo;t actually copy it.
        </P>
      </Section>
    </LessonShell>
  );
}
