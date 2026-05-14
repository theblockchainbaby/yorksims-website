"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function InheritanceLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="Inheritance,"
      titleAccent="and the case for using less of it than you think."
      subtitle="Inheritance lets you share behavior between related classes without copy-paste. The syntax is small, the temptation to overuse it is large. Here's the right syntax, the right times to reach for it, and the cleaner alternative most code should use instead."
      backHref="/learn/python/unit-3"
      backLabel="Unit 3 · Classes, Modules & Files"
      prevLesson={{
        label: "Methods & self",
        href: "/learn/python/lessons/methods",
      }}
      nextLesson={{
        label: "Variable scope",
        href: "/learn/python/lessons/scope",
      }}
      nextCta={{
        label: "Take the Classes Quiz",
        href: "/tools/python-classes-quiz",
      }}
    >
      <Section title="The basic shape" sectionNumber="01">
        <P>
          To make a class inherit from another, put the parent in parens
          after the class name:
        </P>
        <Code>{`class Notifier:
    def __init__(self, recipient):
        self.recipient = recipient

    def send(self, message):
        raise NotImplementedError("Subclasses must implement send().")


class EmailNotifier(Notifier):
    def send(self, message):
        print(f"[email -> {self.recipient}] {message}")


class SMSNotifier(Notifier):
    def send(self, message):
        print(f"[sms -> {self.recipient}] {message}")


# Each subclass inherits __init__ from the parent automatically
e = EmailNotifier("ada@yorksims.com")
s = SMSNotifier("+15555550123")

e.send("Welcome.")    # [email -> ada@yorksims.com] Welcome.
s.send("Welcome.")    # [sms -> +15555550123] Welcome.`}</Code>
        <P>
          Three things happened there:
        </P>
        <Code>{`1. Notifier defined the SHAPE — every subclass has a recipient and a send().
2. Each subclass FILLED IN send() with its own implementation.
3. The shared __init__ wasn't repeated — subclasses inherited it for free.`}</Code>
      </Section>

      <Section title="Overriding methods" sectionNumber="02">
        <P>
          A subclass can replace any method it inherits. We did that with{" "}
          <Inline>send()</Inline> above. The rule: Python looks up methods on
          the most-specific class first, then walks up the chain.
        </P>
        <Code>{`class Notifier:
    def label(self):
        return "generic"

    def announce(self):
        print(f"Sending via {self.label()} channel.")


class EmailNotifier(Notifier):
    def label(self):
        return "email"


e = EmailNotifier()
e.announce()       # "Sending via email channel."`}</Code>
        <P>
          Notice <Inline>announce()</Inline> was defined on the parent, but
          when it calls <Inline>self.label()</Inline>, Python uses the
          subclass&rsquo;s version. That&rsquo;s polymorphism — same method
          name, different behavior depending on the actual object type.
        </P>
      </Section>

      <Section title="super() — calling the parent on purpose" sectionNumber="03">
        <P>
          Sometimes you don&rsquo;t want to replace a parent method —
          you want to <em>extend</em> it. <Inline>super()</Inline> gives
          you access to the parent&rsquo;s version:
        </P>
        <Code>{`class Notifier:
    def __init__(self, recipient):
        self.recipient = recipient
        self.sent_count = 0

    def send(self, message):
        self.sent_count = self.sent_count + 1


class LoggingNotifier(Notifier):
    def __init__(self, recipient, log_file):
        super().__init__(recipient)        # run the parent's __init__ first
        self.log_file = log_file           # then add subclass-specific state

    def send(self, message):
        super().send(message)              # increment the counter
        with open(self.log_file, "a") as f:
            f.write(f"{self.recipient}: {message}\\n")`}</Code>
        <P>
          The most common use of <Inline>super()</Inline> is inside an
          overriding <Inline>__init__</Inline>. If the parent has setup work
          (assigning attributes, opening connections, registering itself
          somewhere), you almost always want that to run before your
          subclass adds its own state on top.
        </P>
        <P>
          Forget the <Inline>super().__init__()</Inline> call and you get an
          instance with half its attributes missing — a classic bug.
        </P>
      </Section>

      <Section title="When NOT to use inheritance" sectionNumber="04">
        <P>
          Inheritance is a strong relationship. A subclass &ldquo;is
          a&rdquo; instance of its parent — an <Inline>EmailNotifier</Inline>{" "}
          really is a <Inline>Notifier</Inline>. If that &ldquo;is a&rdquo;
          statement doesn&rsquo;t feel true, inheritance is the wrong tool.
        </P>
        <P>
          Two common red flags:
        </P>
        <SubHeading>1. You're using inheritance just to reuse code.</SubHeading>
        <Code>{`# WRONG — Cart doesn't "is a" Database. They share NO conceptual identity.
class Cart(Database):
    def add_item(self, item):
        self.execute("INSERT ...")    # using DB methods via inheritance`}</Code>
        <P>
          When the only reason to inherit is &ldquo;the parent has methods I
          want,&rdquo; use <em>composition</em> instead — hold the helper as
          an attribute:
        </P>
        <Code>{`# RIGHT — composition. Cart has a db, it isn't one.
class Cart:
    def __init__(self, db):
        self.db = db
        self.items = []

    def add_item(self, item):
        self.items.append(item)
        self.db.execute("INSERT ...")`}</Code>

        <SubHeading className="mt-6">2. Your hierarchy is more than 2 levels deep.</SubHeading>
        <P>
          <Inline>Notifier &lt;- EmailNotifier &lt;- HtmlEmailNotifier &lt;- TrackedHtmlEmailNotifier</Inline>{" "}
          is a maintenance nightmare. Every change to <Inline>Notifier</Inline>{" "}
          ripples through four layers. By the third subclass, find another
          model: composition, mixins, or splitting into smaller independent
          classes.
        </P>
        <P>
          A practical rule: prefer composition for &ldquo;has a&rdquo;
          relationships. Use inheritance only when there&rsquo;s a real
          &ldquo;is a&rdquo; relationship AND multiple classes genuinely
          share the same shape and behavior. Most real codebases get along
          fine with one or two carefully-designed base classes and a lot of
          composition.
        </P>
      </Section>

      <Section title="isinstance — checking type at runtime" sectionNumber="05">
        <P>
          You can ask whether an object is an instance of a class (or any of
          its parents) with <Inline>isinstance</Inline>:
        </P>
        <Code>{`e = EmailNotifier("ada@yorksims.com")

isinstance(e, EmailNotifier)    # True
isinstance(e, Notifier)         # True — inherited
isinstance(e, SMSNotifier)      # False`}</Code>
        <P>
          Use this for sanity checks at module boundaries, not as a regular
          control-flow tool. If you&rsquo;re writing{" "}
          <Inline>if isinstance(x, Foo): ... elif isinstance(x, Bar): ...</Inline>{" "}
          inside a function, that&rsquo;s usually a sign you should be
          calling a method on <Inline>x</Inline> and letting polymorphism do
          the dispatch — the whole point of inheritance.
        </P>
      </Section>
    </LessonShell>
  );
}
