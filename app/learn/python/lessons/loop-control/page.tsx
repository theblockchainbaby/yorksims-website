"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function LoopControlLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 8 min read"
      titleMain="break, continue, and nesting,"
      titleAccent="for when a plain loop isn't quite enough."
      subtitle="Three loop tools you'll reach for constantly: break to bail out early, continue to skip an iteration, and nested loops for grids and pairs. Plus the patterns that keep nested loops from turning into spaghetti."
      backHref="/learn/python/unit-2"
      backLabel="Unit 2 · Data & Control Flow"
      prevLesson={{
        label: "For loops & range",
        href: "/learn/python/lessons/for-loops",
      }}
      nextLesson={{
        label: "Arguments & return values",
        href: "/learn/python/lessons/function-args",
      }}
      nextCta={{
        label: "Take the Lists & Loops Quiz",
        href: "/tools/python-lists-loops-quiz",
      }}
    >
      <Section title="break — exit the loop immediately" sectionNumber="01">
        <P>
          <Inline>break</Inline> jumps out of the nearest enclosing loop. The
          rest of the body is skipped, the loop ends, and execution continues
          on the next line after the loop.
        </P>
        <Code>{`users = ["ada", "ben", "cal", "dee", "ed"]
target = "cal"

for name in users:
    if name == target:
        print(f"Found {name}.")
        break
    print(f"Checked {name}, not it.")

print("Done searching.")`}</Code>
        <P>
          Output:
        </P>
        <Code>{`Checked ada, not it.
Checked ben, not it.
Found cal.
Done searching.`}</Code>
        <P>
          Use <Inline>break</Inline> when you have a clear &ldquo;I&rsquo;m
          done&rdquo; condition mid-loop — finding a value, hitting a sentinel,
          short-circuiting a search. Don&rsquo;t use it to build complicated
          flow control; if you find yourself with two or three breaks in one
          loop, refactor.
        </P>
      </Section>

      <Section title="continue — skip the rest of this iteration" sectionNumber="02">
        <P>
          <Inline>continue</Inline> says &ldquo;skip the rest of this pass and
          jump straight to the next item.&rdquo; The loop keeps running:
        </P>
        <Code>{`measurements = [12.4, -1.0, 8.7, -0.5, 15.2, 9.0]

# Sum only the positive values
total = 0
for m in measurements:
    if m < 0:
        continue          # skip negatives entirely
    total = total + m

print(total)              # 45.3`}</Code>
        <P>
          You could write the same loop with an <Inline>if</Inline> instead
          of <Inline>continue</Inline>:
        </P>
        <Code>{`for m in measurements:
    if m >= 0:
        total = total + m`}</Code>
        <P>
          When the loop body is short, the <Inline>if</Inline> version is
          fine. When the body is long, <Inline>continue</Inline> with a
          guard at the top reads better — you don&rsquo;t have to indent
          the whole real-work block:
        </P>
        <Code>{`for record in records:
    if not record.is_valid:
        continue
    if record.amount == 0:
        continue
    # ... 30 lines of real work, not indented inside two ifs ...`}</Code>
        <P>
          Same trick as the &ldquo;guard clause&rdquo; pattern in functions.
          Flatten the happy path; bail out early on the cases you don&rsquo;t
          care about.
        </P>
      </Section>

      <Section title="Nested loops" sectionNumber="03">
        <P>
          A nested loop is a loop inside another loop. The inner loop runs
          all the way through for each iteration of the outer:
        </P>
        <Code>{`# Multiplication table — 3 rows × 4 columns
for row in range(1, 4):
    for col in range(1, 5):
        product = row * col
        print(f"{product:3}", end=" ")
    print()       # newline at the end of each row

#  1   2   3   4
#  2   4   6   8
#  3   6   9  12`}</Code>
        <P>
          Nested loops are the natural fit for grids, matrices, and pairing
          things across two collections:
        </P>
        <Code>{`# Find pairs that sum to 10
numbers = [1, 3, 5, 7, 9]

for i, a in enumerate(numbers):
    for b in numbers[i + 1:]:   # only items AFTER i, no duplicate pairs
        if a + b == 10:
            print(f"{a} + {b}")

# 1 + 9
# 3 + 7`}</Code>
        <P>
          Watch the cost. A loop over N items inside a loop over N items
          does N² work. Fine when N is 10. Brutal when N is 100,000. For
          the &ldquo;find pairs&rdquo; problem above, a set-based approach
          is faster than nested loops once your list gets big.
        </P>
      </Section>

      <Section title="break in nested loops — only exits one level" sectionNumber="04">
        <P>
          A <Inline>break</Inline> exits the <em>innermost</em> loop only.
          To exit out of multiple levels you need a flag or a function:
        </P>
        <Code>{`# 5x5 grid — find the first cell with value > 100
grid = [[10, 20, 30, 40, 50],
        [60, 70, 80, 90, 99],
        [101, 1, 2, 3, 4],
        [...],
        [...]]

# Approach 1: a flag variable
found = False
for r, row in enumerate(grid):
    for c, value in enumerate(row):
        if value > 100:
            print(f"Found at ({r}, {c}): {value}")
            found = True
            break
    if found:
        break`}</Code>
        <P>
          Works, but the flag adds noise. The cleaner approach in Python is
          to pull the nested loop into its own function and use{" "}
          <Inline>return</Inline> — <Inline>return</Inline> exits all loops
          at once because it exits the whole function:
        </P>
        <Code>{`def find_over(grid, threshold):
    for r, row in enumerate(grid):
        for c, value in enumerate(row):
            if value > threshold:
                return (r, c, value)
    return None

result = find_over(grid, 100)
if result:
    r, c, v = result
    print(f"Found at ({r}, {c}): {v}")`}</Code>
        <P>
          When breakout logic gets tangled, a function plus{" "}
          <Inline>return</Inline> almost always reads better than nested
          flags. That refactor is worth knowing.
        </P>
      </Section>

      <Section title="The else clause on loops" sectionNumber="05">
        <P>
          Python lets you attach an <Inline>else</Inline> to a loop. It runs
          only when the loop finishes <em>without</em> hitting{" "}
          <Inline>break</Inline>:
        </P>
        <Code>{`def find_user(users, target):
    for u in users:
        if u == target:
            print(f"{target} is registered.")
            break
    else:
        print(f"{target} not found.")    # only runs if no break`}</Code>
        <P>
          This is genuinely useful for &ldquo;searched everything,
          didn&rsquo;t find it&rdquo; cases. It&rsquo;s also one of the
          least-known features of Python, so use it sparingly — half your
          coworkers will Google it the first time they see it. If
          unfamiliarity will hurt the code review more than the elegance
          helps, a regular flag is fine.
        </P>
      </Section>
    </LessonShell>
  );
}
