"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function CollectionsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 10 min read"
      titleMain="Sets, tuples, and dictionaries —"
      titleAccent="lists aren't the only shape data takes."
      subtitle="A list is the right answer maybe 60% of the time. The other 40%, you actually want a dict (key/value lookups), a set (unique values, fast membership tests), or a tuple (a fixed group that shouldn't change). Here's how to tell."
      backHref="/learn/python/unit-2"
      backLabel="Unit 2 · Data & Control Flow"
      prevLesson={{
        label: "List methods & slicing",
        href: "/learn/python/lessons/list-methods",
      }}
      nextLesson={{
        label: "While loops",
        href: "/learn/python/lessons/while-loops",
      }}
      nextCta={{
        label: "Take the Lists & Loops Quiz",
        href: "/tools/python-lists-loops-quiz",
      }}
    >
      <Section title="Dictionaries — key / value lookups" sectionNumber="01">
        <P>
          A dictionary maps a unique <em>key</em> to a <em>value</em>. Use one
          whenever you want to look something up by name instead of by
          position. Built with curly braces and colons:
        </P>
        <Code>{`prefs = {
    "theme": "dark",
    "language": "en",
    "page_size": 25,
    "notify": True,
}

prefs["theme"]              # "dark"
prefs["page_size"]          # 25`}</Code>
        <P>
          The operations you&rsquo;ll use constantly:
        </P>
        <Code>{`# Read with bracket access — raises KeyError if missing
prefs["theme"]

# Read safely with .get() — returns None if missing
prefs.get("missing")              # None
prefs.get("missing", "default")   # "default"

# Add or update — same syntax
prefs["theme"] = "light"          # update existing
prefs["beta"] = True              # add new

# Remove
del prefs["beta"]

# Membership — checks KEYS, not values
"theme" in prefs                  # True
"dark"  in prefs                  # False (it's a value, not a key)

# Loop over keys, values, or both
for key in prefs:                 # keys (same as prefs.keys())
    ...
for value in prefs.values():
    ...
for key, value in prefs.items():
    ...`}</Code>
        <P>
          Keys must be unique and <em>hashable</em> — meaning immutable.
          Strings, numbers, and tuples work as keys. Lists and dicts
          don&rsquo;t. Values can be anything.
        </P>
        <SubHeading className="mt-6">When to reach for a dict</SubHeading>
        <P>
          Any time you find yourself writing &ldquo;if x == &apos;a&apos;
          return 1, elif x == &apos;b&apos; return 2&hellip;&rdquo;
          chains, that&rsquo;s a dict in disguise:
        </P>
        <Code>{`# 8-line elif chain:
def http_label(code):
    if code == 200: return "OK"
    elif code == 404: return "Not Found"
    elif code == 500: return "Server Error"
    else: return "Unknown"

# Dict — adds new codes without touching logic:
LABELS = {200: "OK", 404: "Not Found", 500: "Server Error"}

def http_label(code):
    return LABELS.get(code, "Unknown")`}</Code>
      </Section>

      <Section title="Sets — uniqueness and fast membership" sectionNumber="02">
        <P>
          A set is an unordered collection where every value is unique. Built
          with curly braces, no colons:
        </P>
        <Code>{`tags = {"python", "tutorial", "beginner"}

# Adding & removing
tags.add("python")            # no-op — already there
tags.add("free")              # {"python", "tutorial", "beginner", "free"}
tags.remove("tutorial")       # raises KeyError if missing
tags.discard("nope")          # safe — does nothing if missing

# Fast membership — much faster than \`in\` on a list for large collections
"python" in tags              # True`}</Code>
        <P>
          Two killer use cases:
        </P>
        <SubHeading className="mt-6">1. De-duplicate a list</SubHeading>
        <Code>{`logins = ["ada", "ben", "ada", "cal", "ben", "ada"]
unique = list(set(logins))        # ["ada", "ben", "cal"]  (order may vary)`}</Code>

        <SubHeading className="mt-6">2. Set math</SubHeading>
        <Code>{`paying      = {"ada", "ben", "cal", "dee"}
active_30d  = {"ben", "cal", "ed",  "fay"}

# Customers who paid AND were active — intersection
paying & active_30d                # {"ben", "cal"}

# Customers who did either — union
paying | active_30d                # {"ada", "ben", "cal", "dee", "ed", "fay"}

# Paying but inactive — difference
paying - active_30d                # {"ada", "dee"}

# In exactly one — symmetric difference
paying ^ active_30d                # {"ada", "dee", "ed", "fay"}`}</Code>
        <P>
          Reach for a set when (a) you need to throw out duplicates, (b)
          you&rsquo;ll do lots of <Inline>in</Inline> checks, or (c)
          you&rsquo;re doing set algebra. Order isn&rsquo;t preserved, so
          don&rsquo;t use a set when you care about sequence.
        </P>
      </Section>

      <Section title="Tuples — fixed, ordered, immutable" sectionNumber="03">
        <P>
          A tuple is like a list, except you can&rsquo;t change it after
          creating it. Built with parentheses (or no brackets at all):
        </P>
        <Code>{`point = (3, 7)
rgb   = (255, 99, 71)
empty = ()
single = (42,)              # the comma is required for a 1-tuple
also_a_tuple = 1, 2, 3      # parens are optional

point[0]                    # 3
point[1] = 9                # TypeError — can't change a tuple`}</Code>
        <P>
          You use tuples for three things:
        </P>
        <SubHeading className="mt-6">1. Fixed groupings</SubHeading>
        <P>
          Coordinates, RGB colors, lat/lng pairs, version numbers — any
          group of values where the count and order are baked in.
        </P>
        <Code>{`origin = (0, 0)
red    = (255, 0, 0)
python_version = (3, 11, 4)`}</Code>

        <SubHeading className="mt-6">2. Multiple return values</SubHeading>
        <P>
          When a function returns more than one thing, it returns a tuple.
          You can unpack at the call site:
        </P>
        <Code>{`def parse_full(full_name):
    first, _, last = full_name.partition(" ")
    return first, last         # actually returns a tuple

first, last = parse_full("Ada Lovelace")`}</Code>

        <SubHeading className="mt-6">3. Dictionary keys</SubHeading>
        <P>
          A list can&rsquo;t be a dict key (lists are mutable). A tuple can:
        </P>
        <Code>{`# A cache keyed by (city, day)
forecast = {}
forecast[("NYC", "2025-01-15")] = "snow"
forecast[("LA",  "2025-01-15")] = "sun"`}</Code>
      </Section>

      <Section title="Picking the right collection" sectionNumber="04">
        <P>
          A quick decision tree:
        </P>
        <Code>{`Need to look things up by name?         → dict
Need to throw out duplicates?           → set
Need to check membership a lot?         → set
Need a fixed, won't-change group?       → tuple
Need an ordered, growing collection?    → list
None of the above?                       → list (it's the default)`}</Code>
        <P>
          Beginners default to lists for everything, which works but reads
          worse and runs slower for the wrong job. Two months in, you&rsquo;ll
          start noticing &ldquo;wait, this should be a dict&rdquo; or
          &ldquo;this should be a set,&rdquo; and your code gets sharper.
        </P>
        <SubHeading className="mt-6">All four types compared</SubHeading>
        <Code>{`            | ordered | mutable | duplicates | syntax
------------+---------+---------+------------+------------
list        |   yes   |   yes   |    yes     | [1, 2, 3]
tuple       |   yes   |   NO    |    yes     | (1, 2, 3)
set         |   no    |   yes   |    NO      | {1, 2, 3}
dict        |   yes*  |   yes   |  keys NO   | {"a": 1}

* Dicts preserve insertion order in Python 3.7+, but you shouldn't rely on
  it for anything where order is meaningful. Use a list if order matters.`}</Code>
      </Section>
    </LessonShell>
  );
}
