"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function ModulesLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="Modules & imports,"
      titleAccent="how Python code spreads across more than one file."
      subtitle="Anything bigger than a script lives in multiple files. A module is just a .py file you import. Here are the three import forms, the standard library you get for free, and the import habits that keep namespaces clean."
      backHref="/learn/python/unit-3"
      backLabel="Unit 3 · Classes, Modules & Files"
      prevLesson={{
        label: "Variable scope",
        href: "/learn/python/lessons/scope",
      }}
      nextLesson={{
        label: "File I/O",
        href: "/learn/python/lessons/files",
      }}
      nextCta={{
        label: "Take the Classes Quiz",
        href: "/tools/python-classes-quiz",
      }}
    >
      <Section title="A module is a file" sectionNumber="01">
        <P>
          Anything you save as a <Inline>.py</Inline> file is a module. The
          file <Inline>utils.py</Inline> defines a module named{" "}
          <Inline>utils</Inline>. To use its contents from another file,
          import it.
        </P>
        <Code>{`# utils.py
def slugify(text):
    return text.lower().replace(" ", "-")

def truncate(text, length=80):
    if len(text) <= length:
        return text
    return text[:length - 1] + "…"

TITLE_PREFIX = "YorkSims · "`}</Code>
        <Code>{`# main.py — in the same folder
import utils

print(utils.slugify("Hello World"))         # "hello-world"
print(utils.truncate("a very long...", 5))  # "a ve…"
print(utils.TITLE_PREFIX)                   # "YorkSims · "`}</Code>
        <P>
          That&rsquo;s the entire mechanism. Functions, classes, variables
          defined at the top of a module are accessible from outside once
          someone imports the module.
        </P>
      </Section>

      <Section title="The three import forms" sectionNumber="02">
        <P>
          Same module, three syntaxes:
        </P>
        <SubHeading>1. import module</SubHeading>
        <Code>{`import utils

utils.slugify("Hello World")`}</Code>
        <P>
          Brings the whole module in under its own name. You access things
          as <Inline>utils.something</Inline>. Safest default — no name
          collisions, and a reader can see exactly where each name came
          from.
        </P>

        <SubHeading className="mt-6">2. from module import name</SubHeading>
        <Code>{`from utils import slugify

slugify("Hello World")        # no prefix needed`}</Code>
        <P>
          Pulls a specific name into the current namespace. Shorter at the
          call site, but you lose the &ldquo;where did this come from&rdquo;
          context. Use when you call something often and the source is
          obvious from context.
        </P>

        <SubHeading className="mt-6">3. import module as alias</SubHeading>
        <Code>{`import numpy as np
import pandas as pd

arr = np.array([1, 2, 3])
df = pd.DataFrame(...)`}</Code>
        <P>
          Useful for long module names. The community has standard aliases
          for big libraries (<Inline>np</Inline> for numpy,{" "}
          <Inline>pd</Inline> for pandas, <Inline>plt</Inline> for
          matplotlib). Use the conventional alias when one exists; don&rsquo;t
          invent new ones for your own modules unless they&rsquo;re truly
          long.
        </P>

        <SubHeading className="mt-6">The fourth form you should NOT use</SubHeading>
        <Code>{`from utils import *         # DON'T`}</Code>
        <P>
          Star-imports dump every name from the module into your namespace.
          Three problems with that:
        </P>
        <Code>{`1. If utils.py adds a new function tomorrow that happens to share a name
   with one of YOUR variables, the import silently overwrites yours.
2. A reader looking at your file can't tell where any name came from.
3. Linters can't catch unused imports, since they can't see what was imported.`}</Code>
        <P>
          The only place you&rsquo;ll legitimately see star-imports is in
          <Inline>__init__.py</Inline> files re-exporting a package&rsquo;s
          public API. Even there, modern style avoids it.
        </P>
      </Section>

      <Section title="What the standard library gives you" sectionNumber="03">
        <P>
          Python ships with a huge collection of modules — the{" "}
          <em>standard library</em> — for free. You don&rsquo;t install
          anything; just import. A handful you&rsquo;ll meet first:
        </P>
        <Code>{`import math                # sqrt, pi, log, sin, ...
import random              # randint, choice, shuffle, ...
import datetime            # date, datetime, timedelta
import json                # dumps, loads — turn data into JSON and back
import os                  # filesystem and environment
import sys                 # the interpreter itself (argv, exit, ...)
import re                  # regular expressions
import pathlib             # modern path manipulation
import collections         # Counter, defaultdict, deque, OrderedDict
import itertools           # chain, combinations, cycle, ...`}</Code>
        <P>
          Before you write something from scratch, check the standard
          library. Want to count occurrences of items in a list?{" "}
          <Inline>collections.Counter</Inline> already does it. Want to
          parse a date string? <Inline>datetime.strptime</Inline> already
          does it. Knowing what&rsquo;s there is half the skill of writing
          Python.
        </P>
        <SubHeading className="mt-6">Small example</SubHeading>
        <Code>{`import json
from datetime import datetime

payload = {
    "event": "checkout",
    "amount_cents": 4995,
    "occurred_at": datetime.now().isoformat(),
}

print(json.dumps(payload, indent=2))`}</Code>
      </Section>

      <Section title="Third-party packages — pip and virtualenv" sectionNumber="04">
        <P>
          Everything beyond the standard library lives on PyPI (Python
          Package Index) and is installed with <Inline>pip</Inline>:
        </P>
        <Code>{`pip install requests`}</Code>
        <P>
          Then in your code:
        </P>
        <Code>{`import requests

response = requests.get("https://api.yorksims.com/health")
print(response.status_code)
print(response.json())`}</Code>
        <P>
          One critical habit: use a <em>virtual environment</em> per
          project. A virtual environment is a sandboxed Python install with
          its own packages, so installing one project&rsquo;s dependencies
          doesn&rsquo;t break another&rsquo;s.
        </P>
        <Code>{`# Create a virtualenv in the current folder
python -m venv .venv

# Activate it (Mac / Linux)
source .venv/bin/activate

# Activate it (Windows)
.venv\\Scripts\\activate

# Now pip installs only into this project
pip install requests`}</Code>
        <P>
          Modern alternatives — <Inline>uv</Inline>, <Inline>poetry</Inline>,{" "}
          <Inline>pipenv</Inline> — handle this for you. Pick one and stick
          with it. The one thing you must not do is install third-party
          packages into the system Python; that&rsquo;s how you bork your
          OS.
        </P>
      </Section>

      <Section title="When (and how) to split your code into modules" sectionNumber="05">
        <P>
          A single <Inline>main.py</Inline> is fine until it hits ~300 lines
          and you start having a hard time finding things. The split is
          driven by purpose, not size:
        </P>
        <Code>{`my_project/
├── main.py            # entry point: glues everything together
├── models.py          # the data classes
├── services.py        # business logic — what your program DOES
├── storage.py         # database / file persistence
├── notifications.py   # email / SMS / whatever
└── utils.py           # small, generic helpers used everywhere`}</Code>
        <P>
          The rule of thumb: each module should have one job that you can
          describe in a sentence. If you can&rsquo;t — &ldquo;models.py has
          the data classes AND the database access AND a date helper&rdquo;
          — split it. Coherent modules are easier to read, easier to test
          in isolation, and easier to throw away when the requirements
          change.
        </P>
        <SubHeading className="mt-6">The if __name__ == "__main__" guard</SubHeading>
        <Code>{`# greet.py
def greet(name):
    print(f"Hi, {name}.")

if __name__ == "__main__":
    greet("Ada")               # only runs when you do: python greet.py
                               # NOT when another file imports this module`}</Code>
        <P>
          This pattern lets a file be both an importable module AND a
          runnable script. The code under the guard runs only when the
          file is executed directly, not when it&rsquo;s imported. Use it
          to put quick test calls or demos at the bottom of a module
          without polluting other code that imports it.
        </P>
      </Section>
    </LessonShell>
  );
}
