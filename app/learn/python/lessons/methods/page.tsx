"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function MethodsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="Methods and self,"
      titleAccent="functions that live on an instance."
      subtitle="A method is just a function bound to an instance. Once you can write one, your classes start doing things, not just holding data. Here's how methods receive self, how to design ones that mutate vs ones that return, and the special methods that make your objects play nice with print() and ==."
      backHref="/learn/python/unit-3"
      backLabel="Unit 3 · Classes, Modules & Files"
      prevLesson={{
        label: "__init__ & attributes",
        href: "/learn/python/lessons/init-attrs",
      }}
      nextLesson={{
        label: "Inheritance",
        href: "/learn/python/lessons/inheritance",
      }}
      nextCta={{
        label: "Take the Classes Quiz",
        href: "/tools/python-classes-quiz",
      }}
    >
      <Section title="Defining a method" sectionNumber="01">
        <P>
          A method is a function defined inside a class. Its first
          parameter is always <Inline>self</Inline> — the instance the method
          is being called on:
        </P>
        <Code>{`class BankAccount:
    def __init__(self, owner, opening_balance=0):
        self.owner = owner
        self.balance = opening_balance

    def deposit(self, amount):
        self.balance = self.balance + amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds.")
        self.balance = self.balance - amount

acct = BankAccount("Ada", 100)
acct.deposit(50)        # balance is now 150
acct.withdraw(30)       # balance is now 120`}</Code>
        <P>
          When you call <Inline>acct.deposit(50)</Inline>, Python rewrites
          that as <Inline>BankAccount.deposit(acct, 50)</Inline> behind the
          scenes. You see one argument; the method sees{" "}
          <Inline>self</Inline> plus that argument. That&rsquo;s the whole
          mechanism.
        </P>
      </Section>

      <Section title="Mutating methods vs returning methods" sectionNumber="02">
        <P>
          Two flavors of method, with different design rules:
        </P>
        <SubHeading>1. Mutating methods change state.</SubHeading>
        <Code>{`def deposit(self, amount):
    self.balance = self.balance + amount   # changes self`}</Code>
        <P>
          By convention, mutating methods return <Inline>None</Inline> (or
          nothing at all). Same rule you learned for list methods —{" "}
          <Inline>.append()</Inline>, <Inline>.sort()</Inline>, etc. — and
          for the same reason: if a method&rsquo;s job is to change
          something, the caller doesn&rsquo;t need a return value to use it,
          and forcing one invites the &ldquo;<Inline>x = x.append(y)</Inline>{" "}
          erases x&rdquo; bug.
        </P>

        <SubHeading className="mt-6">2. Returning methods produce a new value.</SubHeading>
        <Code>{`def summary(self):
    return f"{self.owner}: \${self.balance:.2f}"

acct.summary()           # "Ada: $120.00"`}</Code>
        <P>
          By convention, returning methods don&rsquo;t mutate state. You can
          call them as often as you want without changing anything.
        </P>
        <P>
          Mixing the two in one method is usually a bad idea. A method that
          both mutates and returns is harder to test (calling it twice
          changes behavior) and harder to read (the name has to convey both
          things).
        </P>
      </Section>

      <Section title="Method calls can call other methods" sectionNumber="03">
        <P>
          A method can call another method on the same instance through{" "}
          <Inline>self</Inline>:
        </P>
        <Code>{`class BankAccount:
    def __init__(self, owner, opening_balance=0):
        self.owner = owner
        self.balance = opening_balance

    def deposit(self, amount):
        self._guard_positive(amount)
        self.balance = self.balance + amount

    def withdraw(self, amount):
        self._guard_positive(amount)
        if amount > self.balance:
            raise ValueError("Insufficient funds.")
        self.balance = self.balance - amount

    def _guard_positive(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive.")`}</Code>
        <P>
          Two conventions in there:
        </P>
        <Code>{`1. _guard_positive starts with an underscore. By convention, that means
   "this is internal — call it from inside the class, not from outside."
   Python doesn't enforce it, but every reviewer will.

2. The "guard" pattern: extract the validation that runs at the top of
   multiple methods into one helper. Now if the rule changes (e.g., "must
   be positive AND under $10K"), there's exactly one line to update.`}</Code>
      </Section>

      <Section title="Dunder methods — special hooks Python calls for you" sectionNumber="04">
        <P>
          Methods whose names start and end with double underscores
          (&ldquo;dunder&rdquo; methods) are called by Python automatically
          in specific situations. You already met one: <Inline>__init__</Inline>.
          Three more you&rsquo;ll use a lot:
        </P>
        <SubHeading>__str__ — what print() shows</SubHeading>
        <Code>{`class BankAccount:
    # ... __init__ etc ...

    def __str__(self):
        return f"<BankAccount owner={self.owner!r} balance=\${self.balance:.2f}>"

acct = BankAccount("Ada", 120)
print(acct)            # <BankAccount owner='Ada' balance=$120.00>
str(acct)              # same string`}</Code>
        <P>
          Without <Inline>__str__</Inline>, printing an instance gives you
          the useless default <Inline>&lt;BankAccount object at 0x...&gt;</Inline>.
          Defining one makes your objects debuggable.
        </P>

        <SubHeading className="mt-6">__eq__ — what == means</SubHeading>
        <Code>{`# Default behavior: == checks if it's the same object
a = BankAccount("Ada", 100)
b = BankAccount("Ada", 100)
a == b                 # False — different objects, even with same data

# Define __eq__ to compare by value instead:
class BankAccount:
    def __init__(self, owner, opening_balance=0):
        self.owner = owner
        self.balance = opening_balance

    def __eq__(self, other):
        if not isinstance(other, BankAccount):
            return NotImplemented
        return self.owner == other.owner and self.balance == other.balance

a = BankAccount("Ada", 100)
b = BankAccount("Ada", 100)
a == b                 # True now`}</Code>

        <SubHeading className="mt-6">__len__ — what len() returns</SubHeading>
        <Code>{`class Playlist:
    def __init__(self):
        self.tracks = []

    def add(self, track):
        self.tracks.append(track)

    def __len__(self):
        return len(self.tracks)

p = Playlist()
p.add("Track 1")
p.add("Track 2")
len(p)                 # 2`}</Code>
        <P>
          The pattern is consistent: built-in operations like{" "}
          <Inline>print()</Inline>, <Inline>==</Inline>, <Inline>len()</Inline>,
          and many more all look for a corresponding dunder method on your
          object. If it&rsquo;s there, they use it. If not, they fall back
          to a generic default. Defining the right ones is how you make a
          custom class feel like a first-class Python type instead of a
          weird foreign object.
        </P>
      </Section>

      <Section title="The full small class" sectionNumber="05">
        <P>
          Putting it together — a complete, useful class in 25 lines:
        </P>
        <Code>{`class BankAccount:
    def __init__(self, owner, opening_balance=0):
        self.owner = owner
        self.balance = opening_balance

    def deposit(self, amount):
        self._guard_positive(amount)
        self.balance = self.balance + amount

    def withdraw(self, amount):
        self._guard_positive(amount)
        if amount > self.balance:
            raise ValueError("Insufficient funds.")
        self.balance = self.balance - amount

    def summary(self):
        return f"{self.owner}: \${self.balance:.2f}"

    def _guard_positive(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive.")

    def __str__(self):
        return f"<BankAccount {self.summary()}>"`}</Code>
        <P>
          Compared to a flat dict and a pile of loose functions, this is
          much harder to misuse: balance can&rsquo;t go negative, you
          can&rsquo;t deposit -5, every account has the same shape, and
          <Inline>print(acct)</Inline> gives you something useful. The
          investment is maybe 20 minutes; the payoff is every day after.
        </P>
      </Section>
    </LessonShell>
  );
}
