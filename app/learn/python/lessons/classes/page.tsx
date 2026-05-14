"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ClassesLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="Classes,"
      titleAccent="how you define your own types."
      subtitle="A class lets you bundle related data and behavior into a single type. Once you can write one, your code stops being loose functions and dicts thrown into a file and starts looking like a system. Here's the syntax, the mental model, and when not to bother."
      backHref="/learn/python/unit-3"
      backLabel="Unit 3 · Classes, Modules & Files"
      nextLesson={{
        label: "__init__ & attributes",
        href: "/learn/python/lessons/init-attrs",
      }}
      nextCta={{
        label: "Take the Classes Quiz",
        href: "/tools/python-classes-quiz",
      }}
    >
      <Section title="What a class actually is" sectionNumber="01">
        <P>
          A class is a template you define. Instances are the actual objects
          you create from that template. Same idea as &ldquo;a recipe&rdquo;
          vs &ldquo;a meal cooked from that recipe&rdquo; — one shape, many
          servings, each with its own state.
        </P>
        <Code>{`# Define the class once...
class Stopwatch:
    pass

# ...then create as many instances as you want
sw1 = Stopwatch()
sw2 = Stopwatch()
sw3 = Stopwatch()

print(type(sw1))         # <class '__main__.Stopwatch'>
print(sw1 is sw2)        # False — different objects`}</Code>
        <P>
          That class is useless right now (the body is just{" "}
          <Inline>pass</Inline>, which means &ldquo;no content&rdquo;), but
          the shape is real. Three things to notice:
        </P>
        <Code>{`1. The class keyword introduces a definition. Class names use CapWords.
2. Calling the class — Stopwatch() — creates an instance.
3. Each instance is a distinct object, even if they look identical.`}</Code>
      </Section>

      <Section title="A class with state and behavior" sectionNumber="02">
        <P>
          Real classes have <em>attributes</em> (data on each instance) and{" "}
          <em>methods</em> (functions that work on an instance). Here&rsquo;s
          a small but actually useful one:
        </P>
        <Code>{`class Counter:
    def __init__(self, start=0):
        self.value = start            # an attribute on this instance

    def increment(self, by=1):        # a method
        self.value = self.value + by

    def reset(self):
        self.value = 0

# Use it
page_views = Counter()
page_views.increment()
page_views.increment()
page_views.increment(by=5)
print(page_views.value)               # 7

# A second counter is completely independent
errors = Counter(start=100)
print(errors.value)                   # 100`}</Code>
        <P>
          We&rsquo;ll break down <Inline>__init__</Inline>,{" "}
          <Inline>self</Inline>, and the rest in the next two lessons. The
          point here is the <em>shape</em>: a class defines what data each
          instance carries and what each instance can do. The instances are
          where the actual work happens.
        </P>
      </Section>

      <Section title="When (not) to use a class" sectionNumber="03">
        <P>
          Classes are a tool, not a default. Plenty of Python programs are
          better as a flat module of functions plus a few dicts. Reach for a
          class when one of these is true:
        </P>
        <SubHeading>1. The same data and behavior travel together.</SubHeading>
        <P>
          A shopping cart has items, a total, and a checkout method. Pulling
          those apart across loose functions and a dict gets ugly fast. A{" "}
          <Inline>Cart</Inline> class keeps them bound.
        </P>

        <SubHeading className="mt-6">2. You need many instances of the same shape.</SubHeading>
        <P>
          One user object is a dict. Ten thousand user objects with the same
          fields and the same methods are a class.
        </P>

        <SubHeading className="mt-6">3. There's invariant you want to enforce.</SubHeading>
        <P>
          Your account balance should never go negative. A dict can&rsquo;t
          enforce that — anyone can write{" "}
          <Inline>account[&quot;balance&quot;] = -500</Inline>. A class with a{" "}
          <Inline>withdraw()</Inline> method can reject the operation.
        </P>

        <SubHeading className="mt-6">When NOT to bother</SubHeading>
        <Code>{`# Don't write a class for this:
class Greeter:
    def greet(self, name):
        print(f"Hi, {name}.")

# Just write a function:
def greet(name):
    print(f"Hi, {name}.")`}</Code>
        <P>
          If a &ldquo;class&rdquo; only ever holds one method and no state,
          it&rsquo;s a function pretending to be something more. Don&rsquo;t
          pretend.
        </P>
      </Section>

      <Section title="Class vs dict — and why classes win at scale" sectionNumber="04">
        <P>
          You could model an order as a dict:
        </P>
        <Code>{`order = {
    "id": "A-1042",
    "items": [...],
    "subtotal": 89.50,
    "discount": 0.10,
}

# To do anything with it, you write a function that takes the dict:
def apply_discount(order):
    return order["subtotal"] * (1 - order["discount"])

apply_discount(order)`}</Code>
        <P>
          Now scale that up. You have 12 order-related functions floating in
          a file. Every one starts with &ldquo;is this dict shaped right?&rdquo;
          You have to remember which fields are required, which are optional,
          what the keys are named. Renaming a key means hunting through every
          function. A typo in <Inline>order[&quot;subbtotal&quot;]</Inline>{" "}
          fails at runtime, not at write time.
        </P>
        <P>
          Same idea as a class:
        </P>
        <Code>{`class Order:
    def __init__(self, id, items, subtotal, discount=0.0):
        self.id = id
        self.items = items
        self.subtotal = subtotal
        self.discount = discount

    def discounted_total(self):
        return self.subtotal * (1 - self.discount)

order = Order(id="A-1042", items=[...], subtotal=89.50, discount=0.10)
order.discounted_total()`}</Code>
        <P>
          The shape is declared once, in one place. Typos are caught earlier
          (most editors will autocomplete <Inline>order.discount</Inline> but
          not <Inline>order.discoumt</Inline>). The behavior lives next to
          the data it operates on. You traded a small amount of upfront
          structure for a big drop in maintenance pain.
        </P>
        <P>
          The next two lessons go deeper: <Inline>__init__</Inline> and
          attributes, then methods and <Inline>self</Inline>.
        </P>
      </Section>
    </LessonShell>
  );
}
