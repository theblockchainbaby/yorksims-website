"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ScopeLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 8 min read"
      titleMain="Variable scope,"
      titleAccent="where a name is visible and where it isn't."
      subtitle="Scope is the rule that decides which variable Python sees when you write its name. Get scope wrong and you'll spend hours wondering why a function keeps reading stale values. Get it right once and a whole class of bugs disappears."
      backHref="/learn/python/unit-3"
      backLabel="Unit 3 · Classes, Modules & Files"
      prevLesson={{
        label: "Inheritance",
        href: "/learn/python/lessons/inheritance",
      }}
      nextLesson={{
        label: "Modules & imports",
        href: "/learn/python/lessons/modules",
      }}
      nextCta={{
        label: "Take the Classes Quiz",
        href: "/tools/python-classes-quiz",
      }}
    >
      <Section title="The four scopes Python looks in" sectionNumber="01">
        <P>
          When you reference a name, Python searches four places in this
          order — the &ldquo;LEGB&rdquo; rule:
        </P>
        <Code>{`L — Local        : names defined inside the current function
E — Enclosing    : names in the function that wraps this one (if any)
G — Global       : names at the top level of the module
B — Built-in     : names that come with Python itself (len, print, range, ...)`}</Code>
        <P>
          Python uses the first match it finds. Hit the end of the four
          without a match? <Inline>NameError</Inline>.
        </P>
        <Code>{`page_size = 25                     # GLOBAL

def show_page(items, n):
    cutoff = n * page_size         # LOCAL n, LOCAL cutoff, GLOBAL page_size
    for item in items[:cutoff]:    # BUILT-IN range/print via for; LOCAL items
        print(item)`}</Code>
      </Section>

      <Section title="Local scope: assignment makes a new variable" sectionNumber="02">
        <P>
          The rule that surprises everyone at least once: assigning to a
          name inside a function creates a local variable, even if the same
          name exists at module scope.
        </P>
        <Code>{`count = 0                  # global

def increment():
    count = count + 1      # FAILS — UnboundLocalError

increment()`}</Code>
        <P>
          The error says <Inline>local variable &apos;count&apos; referenced
          before assignment</Inline>. Python saw <Inline>count = ...</Inline>{" "}
          somewhere in the function and decided <Inline>count</Inline> is
          local. Then on the right-hand side it tried to use that local
          variable <em>before</em> it had a value.
        </P>
        <P>
          Two clean ways to fix it. Pick the second one almost every time:
        </P>
        <Code>{`# Option A — declare it global (works, but smelly)
count = 0

def increment():
    global count
    count = count + 1

# Option B — pass it in, return the new value (preferred)
def increment(count):
    return count + 1

count = 0
count = increment(count)`}</Code>
        <P>
          Option B is testable in isolation, has no hidden dependencies, and
          works the same way every time. Option A binds the function to a
          specific global, so you can&rsquo;t reuse it, can&rsquo;t test it
          without setting up the global first, and any other function
          touching <Inline>count</Inline> can break it.
        </P>
      </Section>

      <Section title="Enclosing scope and nonlocal" sectionNumber="03">
        <P>
          A function inside another function can <em>read</em> the outer
          function&rsquo;s variables. To <em>write</em> them, you need{" "}
          <Inline>nonlocal</Inline>:
        </P>
        <Code>{`def make_counter():
    count = 0                  # in the ENCLOSING scope

    def tick():
        nonlocal count         # I want to write the outer 'count'
        count = count + 1
        return count

    return tick

counter = make_counter()
counter()        # 1
counter()        # 2
counter()        # 3`}</Code>
        <P>
          This pattern — a function that returns another function which
          remembers state — is called a <em>closure</em>. You don&rsquo;t
          need to write one on day one. Recognize the pattern when you see
          it; reach for a class once it gets more complicated than this.
        </P>
        <P>
          <Inline>global</Inline> and <Inline>nonlocal</Inline> are
          different: <Inline>global</Inline> means &ldquo;the module-level
          name,&rdquo; <Inline>nonlocal</Inline> means &ldquo;the enclosing
          function&rsquo;s name.&rdquo; Both are uncommon. If you&rsquo;re
          using either weekly, your design probably wants a class.
        </P>
      </Section>

      <Section title="Module scope (a.k.a. global)" sectionNumber="04">
        <P>
          Variables defined at the top of a <Inline>.py</Inline> file —
          outside any function or class — live in <em>module</em> (global)
          scope. They&rsquo;re visible to everything inside the file.
        </P>
        <Code>{`# config.py

API_URL = "https://api.yorksims.com"        # global to this module
TIMEOUT = 30
DEBUG = False

def fetch():
    print(f"GET {API_URL} (timeout={TIMEOUT})")    # both are visible`}</Code>
        <P>
          One thing to keep in mind: &ldquo;global&rdquo; in Python means
          &ldquo;module-level,&rdquo; not &ldquo;visible to the whole
          program.&rdquo; Each module has its own globals. If you want
          something from another module, you <Inline>import</Inline> it
          (next lesson).
        </P>
        <SubHeading className="mt-6">
          The narrow case where globals are fine
        </SubHeading>
        <P>
          True constants — values that never change at runtime — are
          fine at module scope. Convention says SCREAMING_SNAKE_CASE so
          readers can tell:
        </P>
        <Code>{`MAX_RETRIES = 5
DEFAULT_PAGE_SIZE = 25
SECONDS_IN_DAY = 60 * 60 * 24`}</Code>
        <P>
          Mutable globals that change over time — counters, caches, &ldquo;the
          current user&rdquo; — are where bugs live. Pass state through
          function arguments, or wrap it in a class. Don&rsquo;t scatter
          it across the module.
        </P>
      </Section>

      <Section title="Why globals are almost always a smell" sectionNumber="05">
        <P>
          Two short examples to make the case:
        </P>
        <Code>{`# 1. UNTESTABLE
ACTIVE_USER = None

def get_dashboard():
    return f"Hi, {ACTIVE_USER.name}."        # depends on hidden state

# To test get_dashboard, you have to set ACTIVE_USER first. Forget to
# reset it between tests and you'll get bizarre failures. The function
# CAN'T be reasoned about in isolation — its behavior depends on whatever
# happened to set ACTIVE_USER somewhere else.`}</Code>
        <Code>{`# 2. RACE-PRONE
counter = 0

def handle_request():
    global counter
    counter = counter + 1

# Two threads / async tasks calling handle_request at once can step on
# each other — both read counter, both add 1, both write the same value.
# You "incremented twice" but the number only went up by one.`}</Code>
        <P>
          The fix in both cases is the same: take the data as an argument,
          return the new value, or wrap the state in an object the caller
          owns. Once you stop hiding state behind globals, your functions
          become small, testable, and obviously correct. Same code, fewer
          surprises.
        </P>
      </Section>
    </LessonShell>
  );
}
