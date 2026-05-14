"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function DataTypesVariablesLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 8 min read"
      titleMain="Data types and variables,"
      titleAccent="the four types you'll use 95% of the time."
      subtitle="Every value in Python has a type, and Python is strict about which types do what. Get this lesson right and most type-related bugs disappear from your code forever."
      backHref="/learn/python/unit-1"
      backLabel="Unit 1 · Fundamentals"
      prevLesson={{
        label: "What programs actually do",
        href: "/learn/python/lessons/programming-fundamentals",
      }}
      nextLesson={{
        label: "Numbers & operators",
        href: "/learn/python/lessons/numbers-operators",
      }}
      nextCta={{
        label: "Take the Python Basics Quiz",
        href: "/tools/python-basics-quiz",
      }}
    >
      <Section title="The four types you'll actually use" sectionNumber="01">
        <P>
          Python has more types than this, but four cover almost every line
          of code you&rsquo;ll write in the first year:
        </P>
        <Code>{`name = "Ada Lovelace"        # str   — text
age = 36                     # int   — whole number
balance = 1287.45            # float — number with a decimal
is_active = True             # bool  — True or False`}</Code>
        <P>
          Plus a fifth that means &ldquo;no value yet&rdquo;:
        </P>
        <Code>{`last_login = None            # NoneType — used as a placeholder`}</Code>
        <P>
          Check what type something is with the <Inline>type()</Inline>{" "}
          function. This is useful when a value isn&rsquo;t doing what you
          expected:
        </P>
        <Code>{`type(name)        # <class 'str'>
type(age)         # <class 'int'>
type(balance)     # <class 'float'>
type("36")        # <class 'str'>  — quotes win, even if it looks like a number
type(36)          # <class 'int'>`}</Code>
        <P>
          That second-to-last one is the trap. <Inline>{`"36"`}</Inline> and{" "}
          <Inline>36</Inline> look identical to you but are completely
          different to Python — one is text, one is a number. You can&rsquo;t
          do math on text.
        </P>
      </Section>

      <Section title="Variables are just names for values" sectionNumber="02">
        <P>
          A variable is a label pointing at a value. You bind one with{" "}
          <Inline>=</Inline>:
        </P>
        <Code>{`subtotal = 49.99
tax_rate = 0.0725
total = subtotal + (subtotal * tax_rate)
print(total)    # 53.61...`}</Code>
        <P>
          Two things to know about <Inline>=</Inline>:
        </P>
        <P>
          <strong>1. It&rsquo;s not equality.</strong> The single{" "}
          <Inline>=</Inline> is assignment — &ldquo;point the name on the left
          at the value on the right.&rdquo; The double <Inline>==</Inline> is
          equality — &ldquo;are these two things equal?&rdquo; Mixing them up
          is a daily occurrence at first.
        </P>
        <P>
          <strong>2. The right side runs first.</strong> Python evaluates
          everything to the right of <Inline>=</Inline>, then assigns the
          result. That&rsquo;s why <Inline>{`x = x + 1`}</Inline> works — the
          right side becomes &ldquo;old x plus one&rdquo;, then the result is
          bound to <Inline>x</Inline>.
        </P>
      </Section>

      <Section title="The rules for naming" sectionNumber="03">
        <P>
          Python is strict about what counts as a valid name. Three hard
          rules:
        </P>
        <Code>{`user_id = 1          # OK — letters, digits, underscores
_internal = "..."    # OK — leading underscore is fine
score2 = 100         # OK — digits anywhere except the start

2score = 100         # SYNTAX ERROR — can't start with a digit
user-id = 1          # SYNTAX ERROR — hyphens are not allowed (that's minus)
class = "Math 101"   # SYNTAX ERROR — 'class' is a reserved word`}</Code>
        <P>
          And one rule that isn&rsquo;t enforced by Python but is enforced by
          every other Python developer who&rsquo;ll read your code:
        </P>
        <Code>{`# Use snake_case for variables and functions
user_age = 32              # ✓
first_login_at = "..."     # ✓

# NOT camelCase or PascalCase for ordinary variables
userAge = 32               # technically works, but everyone will hate it
FirstLoginAt = "..."       # looks like a class, will confuse readers`}</Code>
        <P>
          Capitalization matters: <Inline>userId</Inline>,{" "}
          <Inline>UserId</Inline>, and <Inline>USERID</Inline> are three
          different variables. This causes bugs you&rsquo;ll spend 20 minutes
          looking for before you spot the typo. Be consistent.
        </P>
      </Section>

      <Section title="Converting between types" sectionNumber="04">
        <P>
          When data comes in from outside your program — a form, a file, a
          web request — it almost always arrives as a string. Your job is to
          convert it to the right type before doing anything with it:
        </P>
        <Code>{`age_str = input("Your age? ")       # always a string
age = int(age_str)                  # str → int

price_str = "19.99"
price = float(price_str)            # str → float

count = 7
label = str(count)                  # int → str, for printing/concatenation`}</Code>
        <P>
          Each conversion can fail. <Inline>int(&quot;hello&quot;)</Inline>{" "}
          raises a <Inline>ValueError</Inline>. <Inline>float(&quot;19.99&quot;)</Inline>{" "}
          works; <Inline>int(&quot;19.99&quot;)</Inline> does not (you can&rsquo;t
          go directly from a decimal string to an int — convert to float
          first, then int).
        </P>
        <SubHeading className="mt-6">The classic beginner bug</SubHeading>
        <Code>{`# This looks fine but produces "55" instead of 10:
five_str = input("First number: ")    # user types "5", gets "5"
also_five = input("Second number: ")  # user types "5", gets "5"
print(five_str + also_five)           # "55"  — string concatenation!

# Convert first:
n1 = int(input("First number: "))     # int
n2 = int(input("Second number: "))    # int
print(n1 + n2)                        # 10   — numeric addition`}</Code>
        <P>
          <Inline>+</Inline> means different things depending on the types on
          either side. Two strings? Concatenation. Two numbers? Addition. A
          string and a number? <Inline>TypeError</Inline>. Python won&rsquo;t
          guess what you meant.
        </P>
      </Section>
    </LessonShell>
  );
}
