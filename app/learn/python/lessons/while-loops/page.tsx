"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function WhileLoopsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 8 min read"
      titleMain="While loops,"
      titleAccent="when you don't know how many times you'll loop."
      subtitle="A while loop runs until a condition becomes false. Use one when the number of iterations depends on what happens inside the loop — retries, polling, user prompts. Here's the syntax and the patterns that actually show up in real code."
      backHref="/learn/python/unit-2"
      backLabel="Unit 2 · Data & Control Flow"
      prevLesson={{
        label: "Sets, tuples & dictionaries",
        href: "/learn/python/lessons/collections",
      }}
      nextLesson={{
        label: "For loops & range",
        href: "/learn/python/lessons/for-loops",
      }}
      nextCta={{
        label: "Take the Lists & Loops Quiz",
        href: "/tools/python-lists-loops-quiz",
      }}
    >
      <Section title="The basic shape" sectionNumber="01">
        <P>
          <Inline>while</Inline> takes a condition. As long as it&rsquo;s
          true, the indented body runs. After each pass, the condition is
          checked again:
        </P>
        <Code>{`countdown = 5

while countdown > 0:
    print(countdown)
    countdown = countdown - 1

print("Liftoff.")`}</Code>
        <P>
          Prints 5, 4, 3, 2, 1, then Liftoff. Three things to notice:
        </P>
        <Code>{`1. The loop variable (countdown) is set BEFORE the loop.
2. Something inside the loop CHANGES the loop variable.
3. The condition eventually becomes false — otherwise we'd loop forever.`}</Code>
        <P>
          Miss any one of those and you have a bug. The third is the famous
          one — the infinite loop.
        </P>
      </Section>

      <Section title="When to use while vs for" sectionNumber="02">
        <P>
          Most loops should be <Inline>for</Inline> loops, which you&rsquo;ll
          see next lesson. Reach for <Inline>while</Inline> only when:
        </P>
        <Code>{`1. You don't know how many times you'll loop in advance.
2. The exit condition depends on something computed inside the loop.
3. You're waiting on an external event.`}</Code>
        <P>
          If you know the number of iterations up front — &ldquo;do this 10
          times,&rdquo; &ldquo;process every line in the file&rdquo; — use{" "}
          <Inline>for</Inline>. <Inline>while</Inline> is for genuinely
          open-ended loops.
        </P>
      </Section>

      <Section title="Pattern 1: input validation" sectionNumber="03">
        <P>
          A classic use: keep asking until the user gives you something
          usable.
        </P>
        <Code>{`age = None
while age is None:
    raw = input("Your age: ")
    try:
        age = int(raw)
    except ValueError:
        print("Please enter a whole number.")

print(f"Got it — age {age}.")`}</Code>
        <P>
          The loop variable here is <Inline>age</Inline>. It starts as{" "}
          <Inline>None</Inline> (a stand-in for &ldquo;not set yet&rdquo;).
          Each pass either keeps it None (try again) or assigns a number
          (exit). You could write this with a <Inline>while True:</Inline>{" "}
          and a <Inline>break</Inline>, which we&rsquo;ll cover next lesson —
          both are common.
        </P>
      </Section>

      <Section title="Pattern 2: retry with backoff" sectionNumber="04">
        <P>
          Calling an unreliable thing — an API, a flaky database, a remote
          file. You want to try a few times before giving up:
        </P>
        <Code>{`import time

attempt = 0
max_attempts = 5
wait_seconds = 1

while attempt < max_attempts:
    success = try_to_send_request()
    if success:
        break
    attempt = attempt + 1
    print(f"Attempt {attempt} failed. Waiting {wait_seconds}s...")
    time.sleep(wait_seconds)
    wait_seconds = wait_seconds * 2     # exponential backoff
else:
    raise RuntimeError("Gave up after 5 attempts.")`}</Code>
        <P>
          Two Python-specific things in there. The <Inline>break</Inline>{" "}
          exits the loop early on success. The <Inline>else:</Inline> on a
          loop is unusual — it runs only if the loop exits naturally (i.e.,
          the condition became false, no <Inline>break</Inline>). Handy for
          &ldquo;we got through all the retries without success.&rdquo; You
          don&rsquo;t see it often; it&rsquo;s worth knowing.
        </P>
      </Section>

      <Section title="Pattern 3: polling for a condition" sectionNumber="05">
        <P>
          Wait for something to change — a job to finish, a file to appear,
          a connection to come up:
        </P>
        <Code>{`import time

job_status = "queued"

while job_status != "done":
    job_status = check_job_status()
    if job_status == "failed":
        raise RuntimeError("Job failed.")
    if job_status == "done":
        break
    time.sleep(5)

print("Job complete.")`}</Code>
        <P>
          In real systems you&rsquo;d add a timeout (don&rsquo;t poll
          forever) and probably some jitter to the sleep. But the structure
          is the same: keep checking until the world changes the way you
          need it to.
        </P>
      </Section>

      <Section title="The infinite loop trap" sectionNumber="06">
        <P>
          The #1 while loop bug:
        </P>
        <Code>{`# WRONG — n is never updated, loop runs forever
n = 10
while n > 0:
    print(n)
# (you'll need to Ctrl-C to stop)`}</Code>
        <P>
          The condition <Inline>n &gt; 0</Inline> is true forever because
          nothing inside the loop changes <Inline>n</Inline>. The fix:
        </P>
        <Code>{`n = 10
while n > 0:
    print(n)
    n = n - 1       # <-- the missing line`}</Code>
        <P>
          Every <Inline>while</Inline> loop should have one of these in its
          body:
        </P>
        <Code>{`1. A statement that moves toward making the condition false.
2. A break statement triggered by something inside the loop.
3. A return / raise that exits the function entirely.`}</Code>
        <P>
          When you write a while loop, find the line that ends it{" "}
          <em>before</em> you finish typing the body. If you can&rsquo;t
          point to it, you have a bug waiting to happen.
        </P>
      </Section>
    </LessonShell>
  );
}
