"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ProgrammingFundamentalsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 8 min read"
      titleMain="What programs actually do,"
      titleAccent="and how to translate an idea into Python."
      subtitle="Every program — from your phone's calculator to a 50M-line cloud platform — does the same three things. Once you see the shape, Python stops feeling magical and starts feeling like a hammer."
      backHref="/learn/python/unit-1"
      backLabel="Unit 1 · Fundamentals"
      nextCta={{
        label: "Take the Python Basics Quiz",
        href: "/tools/python-basics-quiz",
      }}
      nextLesson={{
        label: "Data types & variables",
        href: "/learn/python/lessons/data-types-variables",
      }}
    >
      <Section title="Every program does three things" sectionNumber="01">
        <P>
          A program reads something, does something with it, and produces a
          result. In that order. Input, process, output. That&rsquo;s it. Once
          you internalize this, every script you read starts to make sense in
          the first 30 seconds.
        </P>
        <Code>{`# A 5-line weather alert program

temp_str = input("Current outdoor temp (°F): ")   # 1. INPUT
temp = float(temp_str)                            # 2a. PROCESS — convert
warning = "Bundle up." if temp < 35 else "OK."    # 2b. PROCESS — decide
print(f"Reading: {temp}°F — {warning}")           # 3. OUTPUT`}</Code>
        <P>
          Five lines, three responsibilities. The first reads from the
          keyboard. The next two transform that raw string into a number and
          then a decision. The last writes a result. You can grow this into a
          weather service that polls an API every 60 seconds and texts you
          when a storm hits, but the shape never changes.
        </P>
      </Section>

      <Section title="An algorithm is the plan before the code" sectionNumber="02">
        <P>
          An <em>algorithm</em> is a fancy word for a list of steps that
          solves a problem. Algorithms aren&rsquo;t Python. They&rsquo;re
          English (or a whiteboard, or a sticky note). The mistake every
          beginner makes is starting to type before they know the steps.
        </P>
        <P>
          Here&rsquo;s the algorithm for the script above, written before any
          code:
        </P>
        <Code>{`1. Ask the user for the current temperature
2. Convert it from text to a number
3. If the number is below 35, set warning = "Bundle up"
   Otherwise, set warning = "OK"
4. Print the temperature and the warning`}</Code>
        <P>
          You can translate this line by line into Python. If you can&rsquo;t
          write the steps in English, you can&rsquo;t write them in Python.
          That&rsquo;s usually the real problem when someone says they&rsquo;re
          &ldquo;stuck.&rdquo;
        </P>
      </Section>

      <Section title="The development loop" sectionNumber="03">
        <P>
          Once you start typing, you&rsquo;re in a tight cycle for the rest of
          your career. Four steps:
        </P>
        <Code>{`1. Write a small change.
2. Run the code.
3. Read what happened — the output, or the error.
4. Decide the next change.`}</Code>
        <P>
          Beginners try to write the whole program first and run it once. It
          never works. Senior engineers write 3 lines, run it, write 3 more,
          run it. The loop gets faster the better you get, but it never
          disappears. When you hit an error, read the <em>last</em> line of
          the traceback first — that&rsquo;s usually where the actual problem
          is.
        </P>
      </Section>

      <Section title="Why Python" sectionNumber="04">
        <SubHeading>It&rsquo;s readable</SubHeading>
        <P>
          Python uses indentation instead of curly braces, English-y keywords
          (<Inline>if</Inline>, <Inline>not</Inline>, <Inline>in</Inline>), and
          fewer symbols than most languages. A Python script reads almost like
          pseudocode. That&rsquo;s a feature, not a coincidence — it was
          designed that way to be easy on humans.
        </P>

        <SubHeading className="mt-6">It&rsquo;s interpreted</SubHeading>
        <P>
          You write a <Inline>.py</Inline> file, type{" "}
          <Inline>python my_file.py</Inline>, and it runs. No compile step, no
          build pipeline, no project file. This is why Python dominates data
          science, scripting, and prototyping — the loop above (write, run,
          read, decide) is fast.
        </P>

        <SubHeading className="mt-6">Batteries included</SubHeading>
        <P>
          Python ships with a huge standard library — modules for reading
          JSON, talking to HTTP, doing math, parsing dates, working with
          files. You&rsquo;ll spend a lot of time learning what&rsquo;s
          already built rather than building it yourself. That&rsquo;s a good
          investment.
        </P>
      </Section>

      <Section title="What to do next" sectionNumber="05">
        <P>
          Three things, in order:
        </P>
        <Code>{`1. Install Python 3 from python.org (or use a free online editor).
2. Type the temperature script above into a file called alert.py.
3. Run it with: python alert.py — then change the threshold and run it again.`}</Code>
        <P>
          You learn programming by typing programs, not by reading about them.
          The next lesson digs into the data types you just used —{" "}
          <Inline>str</Inline>, <Inline>float</Inline>, <Inline>int</Inline>{" "}
          — and the rules for naming variables. After that, the rest of Unit 1
          is just filling in the toolbox.
        </P>
      </Section>
    </LessonShell>
  );
}
