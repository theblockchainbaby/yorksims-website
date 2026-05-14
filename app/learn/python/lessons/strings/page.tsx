"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function StringsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 9 min read"
      titleMain="Strings,"
      titleAccent="quotes, f-strings, and the 8 methods you'll actually use."
      subtitle="If you write a hundred Python programs, you'll touch a string in every single one. Here's how strings actually work, the modern way to format them, and the small set of methods that handle 95% of real text work."
      backHref="/learn/python/unit-1"
      backLabel="Unit 1 · Fundamentals"
      prevLesson={{
        label: "Numbers & operators",
        href: "/learn/python/lessons/numbers-operators",
      }}
      nextLesson={{
        label: "Conditionals & booleans",
        href: "/learn/python/lessons/conditionals",
      }}
      nextCta={{
        label: "Take the Python Basics Quiz",
        href: "/tools/python-basics-quiz",
      }}
    >
      <Section title="Three ways to write a string" sectionNumber="01">
        <P>
          Strings hold text. Three legal ways to write them:
        </P>
        <Code>{`single = 'York'
double = "York"
triple = """York
spans
multiple lines"""`}</Code>
        <P>
          Single and double quotes do the same thing. Pick double quotes by
          default; switch to single quotes when your string contains a double
          quote (or vice versa) so you don&rsquo;t have to escape:
        </P>
        <Code>{`message = "Don't quote me on that."     # easy
message = 'Don\\'t quote me on that.'    # works but ugly
message = 'She said "hello".'            # easy
message = "She said \\"hello\\"."          # works but ugly`}</Code>
        <P>
          Triple-quoted strings are for multi-line text — usually for
          docstrings (the documentation at the top of a function) or templated
          chunks of HTML/SQL/JSON.
        </P>
        <SubHeading className="mt-6">Escape sequences</SubHeading>
        <P>
          A backslash starts an &ldquo;escape sequence&rdquo; inside a string.
          Three you&rsquo;ll see constantly:
        </P>
        <Code>{`"line one\\nline two"     # \\n is a newline
"col1\\tcol2"            # \\t is a tab
"path: C:\\\\Users\\\\York"   # \\\\ is a literal backslash`}</Code>
        <P>
          If you have a string with lots of backslashes (Windows paths,
          regular expressions), prefix with <Inline>r</Inline> for &ldquo;raw
          string&rdquo; and Python will leave the backslashes alone:
        </P>
        <Code>{`path = r"C:\\Users\\York\\Documents"   # no escaping needed`}</Code>
      </Section>

      <Section title="Combining and formatting" sectionNumber="02">
        <P>
          You can glue strings together with <Inline>+</Inline>:
        </P>
        <Code>{`first = "Ada"
last = "Lovelace"
full = first + " " + last          # "Ada Lovelace"`}</Code>
        <P>
          This works but reads badly the moment you need to insert numbers or
          more than two pieces. The modern Python answer is the{" "}
          <strong>f-string</strong> — prefix a string with <Inline>f</Inline>{" "}
          and put expressions in curly braces:
        </P>
        <Code>{`name = "Ada"
balance = 1287.45
print(f"Hi {name}, your balance is \${balance:.2f}.")
# "Hi Ada, your balance is $1287.45."`}</Code>
        <P>
          The format spec after the colon controls how the value is
          displayed:
        </P>
        <Code>{`f"{1287.5:.2f}"          # "1287.50"   — 2 decimal places
f"{1287:,}"              # "1,287"     — thousands separator
f"{42:>6}"               # "    42"    — right-align in 6 chars
f"{42:0>4}"              # "0042"      — pad with zeros
f"{0.873:.1%}"           # "87.3%"     — percent`}</Code>
        <P>
          The older way (<Inline>.format()</Inline> and <Inline>%</Inline>{" "}
          formatting) still works but you should default to f-strings. They
          read top-to-bottom, they handle expressions, and they&rsquo;re
          faster.
        </P>
      </Section>

      <Section title="Indexing and slicing — same as lists" sectionNumber="03">
        <P>
          A string is technically a sequence of characters, which means
          you can index into it like a list. Indexes start at zero:
        </P>
        <Code>{`name = "Lovelace"
name[0]      # "L"
name[1]      # "o"
name[-1]     # "e"   — last
name[0:4]    # "Love"
name[-4:]    # "lace"
len(name)    # 8`}</Code>
        <P>
          One important thing: strings are <strong>immutable</strong>. You
          cannot change a character in place:
        </P>
        <Code>{`name = "lovelace"
name[0] = "L"        # TypeError — 'str' object does not support item assignment

# Build a new string instead:
name = "L" + name[1:]    # "Lovelace"`}</Code>
        <P>
          Immutability sounds annoying but it&rsquo;s the reason strings can
          be used as dictionary keys, can be safely passed between functions
          without surprises, and are blazingly fast for comparison.
        </P>
      </Section>

      <Section title="The 8 methods you'll actually use" sectionNumber="04">
        <P>
          Strings have ~40 methods. You&rsquo;ll use the same eight 95% of
          the time. Memorize these:
        </P>
        <Code>{`text = "  Hello, World!  "

text.strip()              # "Hello, World!"  — trims whitespace from both ends
text.lower()              # "  hello, world!  "
text.upper()              # "  HELLO, WORLD!  "
text.replace("World", "York")   # "  Hello, York!  "

"Hello, World!".split(",")      # ["Hello", " World!"]
",".join(["a", "b", "c"])       # "a,b,c"

"hello.txt".startswith("hello") # True
"hello.txt".endswith(".txt")    # True`}</Code>
        <P>
          Worth knowing: every method returns a <em>new</em> string. The
          original is unchanged (because strings are immutable). This trips
          people up:
        </P>
        <Code>{`# WRONG — .strip() returns a new string; the original is unchanged
name = "  ada  "
name.strip()
print(name)        # "  ada  "   — still has spaces!

# RIGHT — capture the return value
name = name.strip()
print(name)        # "ada"`}</Code>
        <SubHeading className="mt-6">Real-world example: clean a user signup</SubHeading>
        <Code>{`raw_email = input("Email: ").strip().lower()

if not raw_email.endswith("@yorksims.com"):
    print("Sorry — yorksims.com emails only.")
elif "+" in raw_email:
    print("No plus-aliases please.")
else:
    username = raw_email.split("@")[0]
    print(f"Welcome, {username}.")`}</Code>
        <P>
          Six lines, four string methods, no regular expressions. That covers
          a huge percentage of real text-handling work. Reach for fancier
          tools (regex, parsers) only when these stop being enough.
        </P>
      </Section>
    </LessonShell>
  );
}
