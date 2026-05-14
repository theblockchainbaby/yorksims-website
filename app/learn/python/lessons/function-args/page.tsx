"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function FunctionArgsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 9 min read"
      titleMain="Function arguments & return values,"
      titleAccent="going deeper than def name(x)."
      subtitle="You learned the basics of functions in Unit 1. Here's the rest — defaults, keyword arguments, *args, **kwargs, returning multiple values, and the design rules that separate a function you'll love using from one you'll regret."
      backHref="/learn/python/unit-2"
      backLabel="Unit 2 · Data & Control Flow"
      prevLesson={{
        label: "break, continue & nesting",
        href: "/learn/python/lessons/loop-control",
      }}
      nextCta={{
        label: "Take the Lists & Loops Quiz",
        href: "/tools/python-lists-loops-quiz",
      }}
    >
      <Section title="Positional vs keyword arguments — pick one per call" sectionNumber="01">
        <P>
          Same function, called four different ways:
        </P>
        <Code>{`def make_url(host, path, port=443, secure=True):
    scheme = "https" if secure else "http"
    return f"{scheme}://{host}:{port}{path}"

make_url("yorksims.com", "/learn")                          # all positional, defaults used
make_url("yorksims.com", "/learn", 8080, False)             # all positional, no defaults
make_url("yorksims.com", "/learn", port=8080)               # mix
make_url(host="yorksims.com", path="/learn", secure=False)  # all keyword`}</Code>
        <P>
          The rules:
        </P>
        <Code>{`1. Positional arguments come first, in the order defined.
2. Keyword arguments come after positionals, in any order.
3. You can't pass the same argument both positionally and by keyword.
4. Required arguments (no default) must always be supplied.`}</Code>
        <P>
          Once a function has more than two or three parameters, keyword
          arguments at the call site make the code self-documenting.
          Compare:
        </P>
        <Code>{`# What do these mean in 6 months?
send_email("ada@yorksims.com", "Welcome", body, True, False, None)

# Versus:
send_email(
    to="ada@yorksims.com",
    subject="Welcome",
    body=body,
    track_opens=True,
    track_clicks=False,
    reply_to=None,
)`}</Code>
      </Section>

      <Section title="Default values — and the mutable default trap" sectionNumber="02">
        <P>
          Defaults make arguments optional:
        </P>
        <Code>{`def fetch(url, timeout=30, retries=3):
    ...

fetch("https://...")                # timeout=30, retries=3
fetch("https://...", timeout=60)    # retries=3
fetch("https://...", retries=5)     # timeout=30`}</Code>
        <P>
          The trap, repeated from Unit 1 because it matters that much:
          never use a mutable default like <Inline>[]</Inline> or{" "}
          <Inline>{`{}`}</Inline>:
        </P>
        <Code>{`# WRONG — the list is created ONCE when the function is defined
def add_to(item, items=[]):
    items.append(item)
    return items

add_to("a")    # ["a"]
add_to("b")    # ["a", "b"]   — the SAME list across calls!

# RIGHT — use None as the sentinel and create a fresh list inside
def add_to(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items`}</Code>
        <P>
          Same rule for dict defaults: use <Inline>None</Inline> and
          initialize inside the function.
        </P>
      </Section>

      <Section title="*args — accept any number of positional arguments" sectionNumber="03">
        <P>
          Sometimes a function should accept &ldquo;some unknown number of
          things.&rdquo; <Inline>*args</Inline> collects extra positional
          arguments into a tuple:
        </P>
        <Code>{`def sum_all(*numbers):
    total = 0
    for n in numbers:
        total = total + n
    return total

sum_all(1, 2, 3)             # 6
sum_all(1, 2, 3, 4, 5)       # 15
sum_all()                    # 0`}</Code>
        <P>
          The name <Inline>args</Inline> is just convention; the asterisk
          does the work. You can mix it with regular parameters:
        </P>
        <Code>{`def log(level, *messages):
    prefix = f"[{level}]"
    for m in messages:
        print(f"{prefix} {m}")

log("INFO", "starting up", "config loaded", "ready")`}</Code>
        <P>
          The opposite move — passing a list of values into a function that
          expects separate arguments — uses the same star to unpack:
        </P>
        <Code>{`numbers = [1, 2, 3, 4, 5]
sum_all(*numbers)        # equivalent to sum_all(1, 2, 3, 4, 5)`}</Code>
      </Section>

      <Section title="**kwargs — accept any number of keyword arguments" sectionNumber="04">
        <P>
          Double-star collects extra <em>keyword</em> arguments into a
          dictionary. Useful for wrapping or forwarding configuration:
        </P>
        <Code>{`def make_request(url, **options):
    print(f"URL: {url}")
    for key, value in options.items():
        print(f"  {key} = {value}")

make_request("https://...", timeout=30, retries=3, verify=False)
# URL: https://...
#   timeout = 30
#   retries = 3
#   verify = False`}</Code>
        <P>
          The unpacking version with a double-star takes a dict and turns it
          into keyword arguments at the call site:
        </P>
        <Code>{`config = {"timeout": 30, "retries": 3, "verify": False}
make_request("https://...", **config)
# same as make_request("https://...", timeout=30, retries=3, verify=False)`}</Code>
        <P>
          <Inline>**kwargs</Inline> is what makes wrapper functions and
          decorators possible — you can accept any keyword arguments and pass
          them straight through to whatever you&rsquo;re wrapping, even if
          you don&rsquo;t know what they are.
        </P>
      </Section>

      <Section title="Returning multiple values" sectionNumber="05">
        <P>
          A function with commas in its <Inline>return</Inline> actually
          returns a tuple. You can unpack at the call site:
        </P>
        <Code>{`def stats(numbers):
    total = sum(numbers)
    avg = total / len(numbers)
    return total, avg, len(numbers)

t, a, n = stats([10, 20, 30])
print(f"total={t}, average={a}, count={n}")`}</Code>
        <P>
          When you return three or more values, consider returning a dict
          or a small dataclass instead — they self-document, and the caller
          doesn&rsquo;t have to remember the order:
        </P>
        <Code>{`def stats(numbers):
    return {
        "total": sum(numbers),
        "average": sum(numbers) / len(numbers),
        "count": len(numbers),
    }

result = stats([10, 20, 30])
print(result["average"])`}</Code>
      </Section>

      <Section title="Signature design rules" sectionNumber="06">
        <P>
          Three rules that&rsquo;ll make your functions a pleasure to call:
        </P>
        <SubHeading>1. Required things first, optional things last.</SubHeading>
        <P>
          Python forces this anyway, but it&rsquo;s also the order people
          read in. Keyword arguments come after positionals.
        </P>

        <SubHeading className="mt-6">2. Fewer parameters is better.</SubHeading>
        <P>
          If your function takes 7 arguments, it&rsquo;s probably doing too
          much. Either split it into smaller functions, or group related
          arguments into a dict or a small class.
        </P>

        <SubHeading className="mt-6">
          3. Force keyword-only for boolean flags.
        </SubHeading>
        <P>
          A bare <Inline>True</Inline> or <Inline>False</Inline> at a call
          site is meaningless to a reader. Put a <Inline>*</Inline> in the
          parameter list to force keyword arguments for everything after it:
        </P>
        <Code>{`def delete_user(user_id, *, hard=False, audit=True):
    ...

# Allowed:
delete_user(42)
delete_user(42, hard=True)
delete_user(42, hard=True, audit=False)

# NOT allowed — Python raises TypeError:
delete_user(42, True)         # what does True mean here??`}</Code>
        <P>
          This is the kind of small discipline that compounds. Three months
          in, a function someone else (or future-you) wrote with keyword-only
          booleans saves a trip to the docs every time you call it.
        </P>
      </Section>
    </LessonShell>
  );
}
