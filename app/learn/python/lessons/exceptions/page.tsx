"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ExceptionsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 8 min read"
      titleMain="Errors and exceptions,"
      titleAccent="why crashes are useful information."
      subtitle="When Python crashes, it doesn't fail silently — it tells you exactly where things went wrong. Once you know how to read a traceback and when to catch errors instead of preventing them, your debug loop gets a lot shorter."
      backHref="/learn/python/unit-1"
      backLabel="Unit 1 · Fundamentals"
      prevLesson={{
        label: "Functions",
        href: "/learn/python/lessons/functions",
      }}
      nextCta={{
        label: "Take the Python Basics Quiz",
        href: "/tools/python-basics-quiz",
      }}
    >
      <Section title="Two kinds of errors" sectionNumber="01">
        <P>
          Python errors come in two flavors, and the difference matters:
        </P>
        <Code>{`# SYNTAX ERROR — your code isn't valid Python. The program won't even start.
if x > 5
    print("big")
#                  ^
# SyntaxError: expected ':'

# EXCEPTION — your code is valid but something goes wrong at runtime.
x = int("hello")
#               ^
# ValueError: invalid literal for int() with base 10: 'hello'`}</Code>
        <P>
          Syntax errors mean &ldquo;Python can&rsquo;t even read your
          code.&rdquo; Fix them and the program will at least start. You
          cannot catch a syntax error with <Inline>try/except</Inline>{" "}
          because the file never runs in the first place.
        </P>
        <P>
          Exceptions are runtime events. The program ran a while, then
          something went wrong — a file was missing, a number wasn&rsquo;t
          actually a number, a key didn&rsquo;t exist in a dict. These you
          can catch.
        </P>
      </Section>

      <Section title="Reading a traceback" sectionNumber="02">
        <P>
          When an exception is raised and you don&rsquo;t catch it, Python
          prints a <em>traceback</em> — a stack of where the error came from
          — and exits. Read it bottom-up:
        </P>
        <Code>{`Traceback (most recent call last):
  File "checkout.py", line 23, in <module>
    apply_discount(cart, "VIP")
  File "checkout.py", line 14, in apply_discount
    rate = DISCOUNTS[code]
KeyError: 'VIP'`}</Code>
        <P>
          The <strong>last line</strong> tells you what went wrong:{" "}
          <Inline>KeyError: &apos;VIP&apos;</Inline> means &ldquo;you asked
          for the key &apos;VIP&apos; in a dictionary and it wasn&rsquo;t
          there.&rdquo; The lines above show how Python got there — the
          deepest call is at the bottom. Most beginners panic and scroll up;
          read from the bottom and you&rsquo;ll save yourself ten minutes per
          error.
        </P>
      </Section>

      <Section title="The five exceptions you'll see most" sectionNumber="03">
        <Code>{`ValueError       — wrong type of value
    int("hello")             # 'hello' isn't an int-string

TypeError        — wrong type entirely
    "abc" + 5                # can't add a string and an int

KeyError         — missing dictionary key
    prices["missing-item"]

IndexError       — list index out of range
    items[99]                # only 5 items in the list

FileNotFoundError — open() can't find the file
    open("nope.txt")`}</Code>
        <P>
          The names are self-documenting. When you see one, the fix is
          almost always: validate the input, or use a safer accessor like{" "}
          <Inline>dict.get(key, default)</Inline>.
        </P>
      </Section>

      <Section title="Catching exceptions with try / except" sectionNumber="04">
        <P>
          When you can&rsquo;t prevent an error — say, the user typed
          something weird, or a file might not exist — you{" "}
          <Inline>try</Inline> the risky code and <Inline>except</Inline> the
          specific failure:
        </P>
        <Code>{`while True:
    raw = input("Enter your age: ")
    try:
        age = int(raw)
        break                          # success — exit the loop
    except ValueError:
        print("That's not a number. Try again.")`}</Code>
        <P>
          You can name multiple exception types, and you can capture the
          exception object for logging:
        </P>
        <Code>{`try:
    data = open(filename).read()
    config = parse(data)
except FileNotFoundError:
    print(f"No config at {filename}, using defaults.")
    config = DEFAULT_CONFIG
except ValueError as err:
    print(f"Config is malformed: {err}")
    sys.exit(1)`}</Code>
        <SubHeading className="mt-6">else and finally</SubHeading>
        <Code>{`try:
    result = risky_call()
except SomeError:
    handle()
else:
    # runs only if the try block didn't raise
    save(result)
finally:
    # always runs, even if an exception escaped
    cleanup()`}</Code>
        <P>
          You&rsquo;ll use <Inline>finally</Inline> for &ldquo;always do this
          regardless&rdquo; — close a file, release a lock, log a metric.
          Most of the time you don&rsquo;t need <Inline>else</Inline>, but
          when you do, it&rsquo;s clearer than putting code at the bottom of
          the <Inline>try</Inline>.
        </P>
      </Section>

      <Section title="When to catch and when to let it crash" sectionNumber="05">
        <P>
          Two rules that&rsquo;ll save you weeks of confusion:
        </P>
        <SubHeading>1. Only catch what you know how to handle.</SubHeading>
        <P>
          A bare <Inline>except:</Inline> that swallows every exception is
          how bugs become silent and undebuggable. Catch the specific class
          you&rsquo;re actually prepared to deal with.
        </P>
        <Code>{`# WRONG — silently eats everything, including bugs in your own code
try:
    save_record(data)
except:
    pass

# RIGHT — catch only the failure you actually expect
try:
    save_record(data)
except IOError as err:
    logger.warning(f"save failed, will retry: {err}")
    queue_for_retry(data)`}</Code>

        <SubHeading className="mt-6">2. Let it crash early in development.</SubHeading>
        <P>
          The wrong reflex is to wrap every line in <Inline>try/except</Inline>{" "}
          so your program &ldquo;keeps running.&rdquo; In development, a loud
          crash is a gift — it tells you exactly what to fix. Add exception
          handling at the <em>boundaries</em> of your program (where user
          input arrives, where external services are called), not throughout
          your business logic.
        </P>
        <P>
          You&rsquo;ll know you&rsquo;ve hit the right level of exception
          handling when your code reads top-to-bottom for the happy path and
          recovers cleanly at clearly-marked seams. Until then, less is more.
        </P>
      </Section>
    </LessonShell>
  );
}
