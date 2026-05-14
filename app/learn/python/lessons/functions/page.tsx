"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function FunctionsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 9 min read"
      titleMain="Functions,"
      titleAccent="how you stop repeating yourself."
      subtitle="A function is a named, reusable piece of code. Once you can write one, you stop copy-pasting the same five lines around your file. Here's the syntax, the parameter rules, and the scoping behavior that catches every beginner."
      backHref="/learn/python/unit-1"
      backLabel="Unit 1 · Fundamentals"
      prevLesson={{
        label: "Conditionals & booleans",
        href: "/learn/python/lessons/conditionals",
      }}
      nextLesson={{
        label: "Errors & exceptions",
        href: "/learn/python/lessons/exceptions",
      }}
      nextCta={{
        label: "Take the Python Basics Quiz",
        href: "/tools/python-basics-quiz",
      }}
    >
      <Section title="Defining and calling" sectionNumber="01">
        <P>
          You define a function with <Inline>def</Inline>, give it a name,
          list its parameters in parentheses, and indent the body:
        </P>
        <Code>{`def greet(name):
    print(f"Hi, {name}.")`}</Code>
        <P>
          Defining doesn&rsquo;t run anything. To run it, you{" "}
          <em>call</em> the function with parentheses:
        </P>
        <Code>{`greet("Ada")            # Hi, Ada.
greet("Lovelace")       # Hi, Lovelace.`}</Code>
        <P>
          Three reasons to write a function:
        </P>
        <Code>{`1. The same code shows up in more than one place.
2. A chunk of code has a clear, nameable job.
3. You want to test it in isolation.`}</Code>
        <P>
          Don&rsquo;t pre-emptively wrap every line in a function. Extract one
          when you find yourself copying code or when a block deserves a name.
        </P>
      </Section>

      <Section title="Parameters and arguments" sectionNumber="02">
        <P>
          People mix these terms up constantly:
        </P>
        <Code>{`def discount_price(price, percent):    # 'price' and 'percent' are PARAMETERS
    return price - (price * percent)

final = discount_price(49.99, 0.20)    # 49.99 and 0.20 are ARGUMENTS`}</Code>
        <P>
          <strong>Parameters</strong> are the placeholder names in the
          definition. <strong>Arguments</strong> are the actual values you
          pass when calling. You&rsquo;ll see both words used loosely, but
          knowing the distinction makes error messages easier to read.
        </P>
        <SubHeading className="mt-6">Positional vs keyword arguments</SubHeading>
        <Code>{`def book(name, room, hour):
    print(f"Booking {name} into room {room} at {hour}.")

# Positional — order matters
book("Ada", 3, 14)

# Keyword — order doesn't matter, names do
book(hour=14, name="Ada", room=3)

# Mixed — positional first, then keyword
book("Ada", room=3, hour=14)`}</Code>
        <P>
          For functions with 4+ arguments, keyword arguments are gold:
          they document themselves at the call site. Future-you reading{" "}
          <Inline>book(&quot;Ada&quot;, 3, 14)</Inline> in 6 months will have
          no idea what 3 and 14 mean.
        </P>
        <SubHeading className="mt-6">Default values</SubHeading>
        <Code>{`def fetch(url, timeout=30, retries=3):
    ...

fetch("https://...")                  # timeout=30, retries=3
fetch("https://...", timeout=60)      # retries still 3
fetch("https://...", retries=5)       # timeout still 30`}</Code>
        <P>
          One trap: never use a mutable default like <Inline>[]</Inline> or{" "}
          <Inline>{`{}`}</Inline>. They&rsquo;re created once when the
          function is defined, and reused across every call:
        </P>
        <Code>{`# WRONG — the list is shared across all calls
def add_item(item, cart=[]):
    cart.append(item)
    return cart

add_item("apple")    # ["apple"]
add_item("bread")    # ["apple", "bread"]  — surprise!

# RIGHT — create a new list per call
def add_item(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart`}</Code>
      </Section>

      <Section title="Return values" sectionNumber="03">
        <P>
          A function does one of two things: it has a side effect (prints,
          writes a file, sends an email), or it returns a value. Most useful
          functions return.
        </P>
        <Code>{`def total_with_tax(subtotal, rate):
    return subtotal + (subtotal * rate)

# The return value can be used like any other expression:
checkout_total = total_with_tax(100, 0.08)   # 108.0
print(total_with_tax(50, 0.08))              # 54.0
if total_with_tax(99, 0.08) > 100:
    print("Pricey.")`}</Code>
        <P>
          A function without a <Inline>return</Inline> statement returns{" "}
          <Inline>None</Inline> automatically. This trips people up when they
          mean to print and forget to return:
        </P>
        <Code>{`def double(x):
    print(x * 2)             # this PRINTS but doesn't RETURN

result = double(5)           # prints "10"
print(result)                # None — there's nothing to use later`}</Code>
        <P>
          A function can return multiple values by separating them with
          commas. Python packs them into a tuple; you can unpack at the call
          site:
        </P>
        <Code>{`def split_name(full):
    parts = full.split(" ", 1)
    return parts[0], parts[1]    # returns a tuple

first, last = split_name("Ada Lovelace")
print(first)   # "Ada"
print(last)    # "Lovelace"`}</Code>
      </Section>

      <Section title="Local scope — the rule everyone misses" sectionNumber="04">
        <P>
          Variables you create inside a function only exist inside that
          function. They&rsquo;re destroyed when the function returns. This
          is called <em>local scope</em>.
        </P>
        <Code>{`def compute():
    result = 42
    return result

compute()
print(result)        # NameError — 'result' doesn't exist out here`}</Code>
        <P>
          The opposite is also true: assigning to a name inside a function
          creates a new local, even if there&rsquo;s a variable with the same
          name outside.
        </P>
        <Code>{`total = 0

def add_one():
    total = total + 1     # UnboundLocalError — total is local but never set

# If you actually want to modify the outer total, declare it global:
def add_one():
    global total
    total = total + 1`}</Code>
        <P>
          Reaching for <Inline>global</Inline> is almost always a sign you
          should refactor: return a value and let the caller decide what to
          do with it.
        </P>
        <Code>{`# Cleaner — no globals, returns a new value
def add_one(total):
    return total + 1

total = 0
total = add_one(total)
total = add_one(total)
print(total)    # 2`}</Code>
        <P>
          The principle: a function takes inputs, returns outputs, and
          minds its own business. The fewer outside things it reaches
          for, the easier it is to test, reuse, and read six months later.
        </P>
      </Section>

      <Section title="A real refactor" sectionNumber="05">
        <P>
          Here&rsquo;s a script with duplication. Watch it shrink:
        </P>
        <Code>{`# BEFORE: same calculation repeated three times
laptop_price = 1200
laptop_tax = laptop_price * 0.0725
laptop_total = laptop_price + laptop_tax

phone_price = 800
phone_tax = phone_price * 0.0725
phone_total = phone_price + phone_tax

tablet_price = 600
tablet_tax = tablet_price * 0.0725
tablet_total = tablet_price + tablet_tax`}</Code>
        <Code>{`# AFTER: one function, three calls
def with_tax(price, rate=0.0725):
    return price + (price * rate)

laptop_total = with_tax(1200)
phone_total  = with_tax(800)
tablet_total = with_tax(600)`}</Code>
        <P>
          One change to the tax rate? Edit one line instead of three. New
          item? One line, not three. Test the function once and you know all
          three calls work. That&rsquo;s what functions are for.
        </P>
      </Section>
    </LessonShell>
  );
}
