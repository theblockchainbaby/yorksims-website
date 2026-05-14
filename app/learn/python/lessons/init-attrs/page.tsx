"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function InitAttrsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="__init__ and attributes,"
      titleAccent="how instances get their state."
      subtitle="Every time you create an instance, Python runs __init__ to set up its starting state. Here's how that works, the difference between instance and class attributes, and the trap that puts shared data where you didn't expect it."
      backHref="/learn/python/unit-3"
      backLabel="Unit 3 · Classes, Modules & Files"
      prevLesson={{
        label: "Classes",
        href: "/learn/python/lessons/classes",
      }}
      nextLesson={{
        label: "Methods & self",
        href: "/learn/python/lessons/methods",
      }}
      nextCta={{
        label: "Take the Classes Quiz",
        href: "/tools/python-classes-quiz",
      }}
    >
      <Section title="__init__ runs once per instance" sectionNumber="01">
        <P>
          <Inline>__init__</Inline> is a special method (those double
          underscores mean &ldquo;Python calls this for you&rdquo;) that runs
          automatically whenever you create an instance. Its job is to set up
          the instance&rsquo;s starting state.
        </P>
        <Code>{`class BankAccount:
    def __init__(self, owner, opening_balance=0):
        self.owner = owner
        self.balance = opening_balance

# Calling the class triggers __init__
acct = BankAccount("Ada", 100)

print(acct.owner)        # "Ada"
print(acct.balance)      # 100`}</Code>
        <P>
          When you write <Inline>BankAccount(&quot;Ada&quot;, 100)</Inline>:
        </P>
        <Code>{`1. Python creates a new, empty BankAccount object.
2. It calls __init__ on that object, passing it in as self.
3. __init__ assigns attributes onto self.
4. The fully-constructed object is what BankAccount(...) returns.`}</Code>
        <P>
          You never call <Inline>__init__</Inline> directly. You call the
          class — <Inline>BankAccount(...)</Inline> — and Python wires up
          the rest.
        </P>
      </Section>

      <Section title="self is the instance" sectionNumber="02">
        <P>
          The first parameter of <Inline>__init__</Inline> (and every
          regular method) is <Inline>self</Inline>. It&rsquo;s a reference to
          the specific instance the method is being called on. Inside the
          method, <Inline>self.something = value</Inline> attaches an
          attribute to <em>this</em> instance.
        </P>
        <Code>{`class BankAccount:
    def __init__(self, owner, opening_balance=0):
        self.owner = owner             # attach owner to this instance
        self.balance = opening_balance # attach balance to this instance

a = BankAccount("Ada", 100)
b = BankAccount("Ben", 250)

a.owner          # "Ada"
b.owner          # "Ben"

a.balance = 999  # only changes a, not b
b.balance        # still 250`}</Code>
        <P>
          The name <Inline>self</Inline> is just convention. Python passes
          the instance in as the first argument no matter what you call it.
          Everyone uses <Inline>self</Inline>. Use <Inline>self</Inline>.
        </P>
      </Section>

      <Section title="Instance attributes vs class attributes" sectionNumber="03">
        <P>
          You can also put attributes directly on the class — outside any
          method. Those are <em>class attributes</em>. They&rsquo;re shared
          across every instance.
        </P>
        <Code>{`class BankAccount:
    # Class attribute — shared
    interest_rate = 0.045

    def __init__(self, owner, opening_balance=0):
        # Instance attributes — per-object
        self.owner = owner
        self.balance = opening_balance

a = BankAccount("Ada", 100)
b = BankAccount("Ben", 250)

a.interest_rate          # 0.045 (looked up on the class)
b.interest_rate          # 0.045 (same one)

# Change it on the CLASS — affects all instances
BankAccount.interest_rate = 0.05
a.interest_rate          # 0.05
b.interest_rate          # 0.05`}</Code>
        <P>
          When to use which:
        </P>
        <Code>{`Instance attribute — different for each instance (owner, balance)
Class attribute     — same for all instances (a tax rate, a config value,
                      a default constant)`}</Code>
        <P>
          A common gotcha: assigning to a class attribute via an instance
          actually creates an instance attribute that shadows the class one.
          This trips up people who think they&rsquo;re updating a shared
          value:
        </P>
        <Code>{`a.interest_rate = 0.10        # creates an INSTANCE attribute on a
a.interest_rate               # 0.10
b.interest_rate               # 0.05 — unchanged, still using the class one
BankAccount.interest_rate     # 0.05 — class attribute also unchanged`}</Code>
      </Section>

      <Section title="The mutable class-attribute trap" sectionNumber="04">
        <P>
          We hit a version of this in Unit 1 (mutable default arguments).
          The class-attribute version is sneakier:
        </P>
        <Code>{`class Inbox:
    messages = []        # WRONG — shared across all instances!

    def add(self, msg):
        self.messages.append(msg)

a = Inbox()
b = Inbox()

a.add("hello")
print(b.messages)         # ["hello"]   — surprise!`}</Code>
        <P>
          Both <Inline>a</Inline> and <Inline>b</Inline> point at the same
          list, because <Inline>messages</Inline> lives on the class, not
          the instance. Fix: initialize the mutable in{" "}
          <Inline>__init__</Inline> so each instance gets its own:
        </P>
        <Code>{`class Inbox:
    def __init__(self):
        self.messages = []      # fresh list per instance

a = Inbox()
b = Inbox()

a.messages.append("hello")
b.messages         # []`}</Code>
        <P>
          Rule of thumb: class attributes are fine for immutable defaults
          (numbers, strings, tuples, booleans). For lists, dicts, sets, and
          any custom object — initialize in <Inline>__init__</Inline>.
        </P>
      </Section>

      <Section title="Adding attributes from outside" sectionNumber="05">
        <P>
          Python doesn&rsquo;t lock down what attributes an instance can
          have. You can add new ones from outside the class:
        </P>
        <Code>{`acct = BankAccount("Ada", 100)
acct.nickname = "Main checking"     # totally legal — new attribute

print(acct.nickname)`}</Code>
        <P>
          This is technically allowed, but it&rsquo;s a smell. If
          <Inline>nickname</Inline> is a meaningful piece of an account, it
          should be in <Inline>__init__</Inline> alongside owner and balance.
          Otherwise you have accounts in two shapes (some with nickname, some
          without), and every downstream function has to check.
        </P>
        <P>
          The discipline: declare every attribute in <Inline>__init__</Inline>{" "}
          — even if you set it to <Inline>None</Inline> initially. That way,
          a reader who lands in your class has one place to look to know
          what each instance carries:
        </P>
        <Code>{`class BankAccount:
    def __init__(self, owner, opening_balance=0):
        self.owner = owner
        self.balance = opening_balance
        self.nickname = None           # explicit "not set yet"
        self.last_login = None`}</Code>
        <P>
          Future you in six months will thank you. Future <em>them</em>{" "}
          who has to debug it definitely will.
        </P>
      </Section>
    </LessonShell>
  );
}
