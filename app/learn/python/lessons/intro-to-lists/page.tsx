"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function IntroToListsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 10 min read"
      titleMain="Python lists,"
      titleAccent="explained for people who'll actually use them."
      subtitle="Lists are the workhorse data structure in Python. If you're going to write a hundred lines of code, you're going to touch a list. Here's what they are, how to read and change them, and the three mistakes every beginner makes."
      backHref="/learn/python/unit-2"
      backLabel="Unit 2 · Data & Control Flow"
      nextCta={{
        label: "Take the Lists & Loops Quiz",
        href: "/tools/python-lists-loops-quiz",
      }}
      nextLesson={{
        label: "List methods & slicing",
        href: "/learn/python/lessons/list-methods",
      }}
    >
      {/* What is a list */}
      <Section title="What a list actually is" sectionNumber="01">
        <P>
          A list is an ordered collection of values, held in a single variable,
          that you can change after creation. That&rsquo;s it. Three traits, in
          that order: <em>ordered</em>, <em>collection</em>,{" "}
          <em>changeable</em>.
        </P>
        <P>
          You write a list with square brackets and commas between the values:
        </P>
        <Code>{`groceries = ["bread", "eggs", "olive oil", "coffee"]
high_scores = [98, 87, 94, 71, 100]
mixed = ["York", 2025, True, 3.14]`}</Code>
        <P>
          Notice the last one — Python lists don&rsquo;t care if you mix types.
          A string, an int, a bool, and a float can sit in the same list.
          That&rsquo;s different from arrays in Java or C, where every element
          has to be the same type.
        </P>
      </Section>

      {/* Reading */}
      <Section title="Reading: indexes and slices" sectionNumber="02">
        <P>
          You read a value out of a list with{" "}
          <Inline>list_name[index]</Inline>. Indexes start at zero, not one.
          This is the single most-common source of off-by-one bugs in Python.
        </P>
        <Code>{`groceries = ["bread", "eggs", "olive oil", "coffee"]

groceries[0]    # "bread"     (first)
groceries[1]    # "eggs"
groceries[3]    # "coffee"    (last, since there are 4 items)
groceries[4]    # IndexError — there is no index 4`}</Code>
        <P>
          Negative indexes count from the end, which is useful when you
          don&rsquo;t know how long the list is:
        </P>
        <Code>{`groceries[-1]   # "coffee"     (last)
groceries[-2]   # "olive oil"  (second to last)`}</Code>
        <P>
          You can also grab a chunk of the list with slicing. The syntax is{" "}
          <Inline>list_name[start:stop]</Inline>, and{" "}
          <strong>stop is exclusive</strong> — Python gives you everything
          from <Inline>start</Inline> up to but not including{" "}
          <Inline>stop</Inline>:
        </P>
        <Code>{`groceries[1:3]   # ["eggs", "olive oil"]    (indexes 1 and 2)
groceries[:2]    # ["bread", "eggs"]        (start defaults to 0)
groceries[2:]    # ["olive oil", "coffee"]  (stop defaults to end)
groceries[:]     # a full copy of the list`}</Code>
        <P>
          That last one — <Inline>list[:]</Inline> — is the simplest way to
          get a shallow copy. Skip it and you&rsquo;re passing references
          around, which is mistake #3 below.
        </P>
      </Section>

      {/* Changing */}
      <Section title="Changing: lists are mutable" sectionNumber="03">
        <P>
          Lists are <em>mutable</em>. You can change them after they exist.
          That&rsquo;s the whole point — if data won&rsquo;t change, use a
          tuple. Five things you&rsquo;ll do constantly:
        </P>
        <Code>{`groceries = ["bread", "eggs", "olive oil"]

# 1. Replace by index
groceries[0] = "sourdough"
# ["sourdough", "eggs", "olive oil"]

# 2. Append to the end
groceries.append("coffee")
# ["sourdough", "eggs", "olive oil", "coffee"]

# 3. Insert at a specific index
groceries.insert(1, "butter")
# ["sourdough", "butter", "eggs", "olive oil", "coffee"]

# 4. Remove a known value
groceries.remove("eggs")
# ["sourdough", "butter", "olive oil", "coffee"]

# 5. Remove by index (and get the value back)
last = groceries.pop()
# last = "coffee"
# groceries = ["sourdough", "butter", "olive oil"]`}</Code>
        <P>
          <Inline>append</Inline> adds one item to the end. If you want to
          merge another list into this one, use <Inline>extend</Inline>{" "}
          instead — that&rsquo;s mistake #1 below.
        </P>
      </Section>

      {/* Three mistakes */}
      <Section title="Three mistakes everyone makes" sectionNumber="04">
        <SubHeading>1. Using `append` when you meant `extend`</SubHeading>
        <Code>{`nums = [1, 2, 3]
nums.append([4, 5])      # [1, 2, 3, [4, 5]]   — nested!
nums.extend([4, 5])      # [1, 2, 3, 4, 5]     — flat`}</Code>
        <P>
          <Inline>append(x)</Inline> adds <Inline>x</Inline> as a single
          element. If <Inline>x</Inline> is a list, you get a list inside a
          list. <Inline>extend(x)</Inline> unpacks <Inline>x</Inline> and adds
          each item individually.
        </P>

        <SubHeading className="mt-8">
          2. Assigning the result of a mutating method
        </SubHeading>
        <Code>{`# WRONG — .sort() returns None, not the sorted list
nums = [3, 1, 4, 1, 5]
nums = nums.sort()       # nums is now None

# RIGHT — sort mutates in place
nums = [3, 1, 4, 1, 5]
nums.sort()              # nums is now [1, 1, 3, 4, 5]

# OR use sorted(), which returns a new list
nums = [3, 1, 4, 1, 5]
ordered = sorted(nums)   # ordered = [1, 1, 3, 4, 5], nums unchanged`}</Code>
        <P>
          Methods that change the list in place — <Inline>.sort()</Inline>,{" "}
          <Inline>.append()</Inline>, <Inline>.reverse()</Inline>,{" "}
          <Inline>.remove()</Inline> — return <Inline>None</Inline>. If you
          assign the result to a variable, that variable becomes None and you
          lose your list. Burn this one into your brain.
        </P>

        <SubHeading className="mt-8">
          3. Copying with `=` instead of slicing
        </SubHeading>
        <Code>{`original = [1, 2, 3]
copy = original              # NOT a copy — same list, two names
copy.append(4)
# original is now [1, 2, 3, 4] — you mutated the original

# Actually copy with slicing or .copy()
copy = original[:]           # shallow copy
# or
copy = original.copy()       # same thing, clearer name`}</Code>
        <P>
          <Inline>=</Inline> in Python binds names to objects. It does not
          copy. Two names pointing at the same list will both see every
          change. For nested lists you also need to know about{" "}
          <Inline>copy.deepcopy()</Inline>, but you can save that for the day
          you actually hit the bug.
        </P>
      </Section>
    </LessonShell>
  );
}
