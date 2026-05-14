"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function FilesLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 10 min read"
      titleMain="File I/O,"
      titleAccent="how Python reads and writes the disk."
      subtitle="Reading a config file, writing a log line, streaming a million rows through a script. open() and the with statement are the foundation. Here are the four file modes, the right pattern for large files, and the encoding mistake every beginner hits exactly once."
      backHref="/learn/python/unit-3"
      backLabel="Unit 3 · Classes, Modules & Files"
      prevLesson={{
        label: "Modules & imports",
        href: "/learn/python/lessons/modules",
      }}
      nextCta={{
        label: "Take the Classes Quiz",
        href: "/tools/python-classes-quiz",
      }}
    >
      <Section title="open() and the four modes" sectionNumber="01">
        <P>
          <Inline>open()</Inline> returns a file object. The first argument
          is the path; the second is the mode:
        </P>
        <Code>{`open("notes.txt", "r")     # read   — fails if missing
open("notes.txt", "w")     # write  — TRUNCATES if it exists, creates if not
open("notes.txt", "a")     # append — creates if missing, never overwrites
open("notes.txt", "x")     # exclusive create — FAILS if file already exists`}</Code>
        <P>
          The big gotcha is <Inline>&quot;w&quot;</Inline>. Open a file in
          write mode and Python immediately empties it — before you write
          anything. Want to add to a file? Use <Inline>&quot;a&quot;</Inline>{" "}
          (append). Want to be sure you don&rsquo;t accidentally clobber an
          existing file? Use <Inline>&quot;x&quot;</Inline>.
        </P>
        <SubHeading className="mt-6">Text vs binary</SubHeading>
        <Code>{`open("notes.txt", "r")     # text mode (default) — returns strings
open("photo.jpg", "rb")    # binary mode — returns bytes
open("photo.jpg", "wb")    # binary write`}</Code>
        <P>
          Use text mode (the default) for anything you&rsquo;d read in an
          editor — code, config, CSV, JSON, logs. Use binary mode for
          everything else — images, archives, audio, compiled formats.
        </P>
      </Section>

      <Section title="Always use the with statement" sectionNumber="02">
        <P>
          You <em>could</em> manage the file handle yourself:
        </P>
        <Code>{`# DON'T do this:
f = open("notes.txt", "r")
text = f.read()
f.close()`}</Code>
        <P>
          The problem: if anything raises an exception between{" "}
          <Inline>open</Inline> and <Inline>close</Inline>, the file
          handle leaks. On Windows that can lock the file. On every OS, you
          can blow through the limit on open handles in a long-running
          program.
        </P>
        <P>
          The fix is the <Inline>with</Inline> statement, which guarantees
          the file is closed when the block exits — even on exception:
        </P>
        <Code>{`with open("notes.txt", "r") as f:
    text = f.read()

# At this point, f is already closed. No leak, no remembering to .close().`}</Code>
        <P>
          Always use <Inline>with</Inline> for files. Always. There&rsquo;s
          no real downside; it&rsquo;s shorter and safer.
        </P>
      </Section>

      <Section title="Three ways to read" sectionNumber="03">
        <SubHeading>1. The whole thing at once</SubHeading>
        <Code>{`with open("config.txt", "r") as f:
    content = f.read()        # one big string`}</Code>
        <P>
          Fine when the file is small (a few MB at most). For multi-GB
          files, this will eat your memory.
        </P>

        <SubHeading className="mt-6">2. Into a list of lines</SubHeading>
        <Code>{`with open("config.txt", "r") as f:
    lines = f.readlines()     # list of strings — each ends in "\\n"`}</Code>
        <P>
          Same memory issue as <Inline>read()</Inline> — all lines are
          loaded at once. Convenient for small/medium files where you want
          random access by line index.
        </P>

        <SubHeading className="mt-6">3. Stream line by line — the best default</SubHeading>
        <Code>{`with open("log.txt", "r") as f:
    for line in f:                   # one line at a time, never all in memory
        if "ERROR" in line:
            print(line.rstrip())     # rstrip strips the trailing newline`}</Code>
        <P>
          This works on a 100-byte file or a 100-GB file. Python only reads
          one line at a time. It&rsquo;s also the most Pythonic — when in
          doubt, iterate over the file.
        </P>
      </Section>

      <Section title="Writing" sectionNumber="04">
        <Code>{`# Single string
with open("output.txt", "w") as f:
    f.write("First line\\n")
    f.write("Second line\\n")

# Many lines at once — note: writelines does NOT add newlines for you
with open("output.txt", "w") as f:
    lines = ["one\\n", "two\\n", "three\\n"]
    f.writelines(lines)

# Append a single log line
with open("log.txt", "a") as f:
    f.write(f"{datetime.now().isoformat()} - request handled\\n")`}</Code>
        <P>
          Two things to remember:
        </P>
        <Code>{`1. Python doesn't add newlines automatically. If you want each call to
   .write() to land on a new line, include \\n yourself.
2. writelines() takes an iterable of strings. It doesn't add separators
   between them either — same rule.`}</Code>
      </Section>

      <Section title="JSON and CSV — the standard library has you covered" sectionNumber="05">
        <P>
          You almost never want to parse JSON or CSV by hand. Python ships
          with both.
        </P>
        <SubHeading>JSON</SubHeading>
        <Code>{`import json

# Read
with open("config.json", "r") as f:
    config = json.load(f)         # dict, list, etc. — whatever the file is

# Write
data = {"event": "login", "user_id": 42, "ok": True}
with open("event.json", "w") as f:
    json.dump(data, f, indent=2)  # indent makes it human-readable

# Or work with strings instead of files
text = json.dumps(data)           # dict -> JSON string
data = json.loads(text)           # JSON string -> dict`}</Code>

        <SubHeading className="mt-6">CSV</SubHeading>
        <Code>{`import csv

# Read — each row is a list of strings
with open("orders.csv", "r", newline="") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# Read with column names — each row is a dict
with open("orders.csv", "r", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["customer"], row["total"])

# Write
rows = [
    ["id", "customer", "total"],
    [1, "Ada", "49.99"],
    [2, "Ben", "120.00"],
]
with open("export.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)`}</Code>
        <P>
          The <Inline>newline=&quot;&quot;</Inline> argument to{" "}
          <Inline>open</Inline> when working with CSV is one of those
          little Python details — it prevents extra blank lines on Windows.
          Just include it whenever you open a file for the csv module.
        </P>
      </Section>

      <Section title="The encoding mistake that bites everyone once" sectionNumber="06">
        <P>
          Text files store characters as bytes. The mapping between the
          two — <em>encoding</em> — matters. Most files today are UTF-8;
          some legacy files are Latin-1 or Windows-1252. Open with the
          wrong one and you get a <Inline>UnicodeDecodeError</Inline> or,
          worse, silently mangled characters.
        </P>
        <Code>{`# Default — relies on the system default, which differs across machines
with open("data.txt", "r") as f:
    text = f.read()

# Better — be explicit
with open("data.txt", "r", encoding="utf-8") as f:
    text = f.read()`}</Code>
        <P>
          Always specify <Inline>encoding=&quot;utf-8&quot;</Inline> for text
          files unless you have a specific reason to use something else.
          UTF-8 handles every character in every language; it&rsquo;s the
          web&rsquo;s default for a reason.
        </P>
        <SubHeading className="mt-6">Handling missing files cleanly</SubHeading>
        <Code>{`from pathlib import Path

config_path = Path("config.json")

if not config_path.exists():
    print(f"No config at {config_path}, using defaults.")
    config = {"page_size": 25, "theme": "dark"}
else:
    with config_path.open("r", encoding="utf-8") as f:
        config = json.load(f)`}</Code>
        <P>
          <Inline>pathlib.Path</Inline> is the modern way to work with file
          paths. It handles the differences between Windows and Mac/Linux
          (backslash vs forward slash) for you, has <Inline>.exists()</Inline>,{" "}
          <Inline>.read_text()</Inline>, <Inline>.write_text()</Inline>, and
          more. Get comfortable with it early — string-based paths are a
          legacy habit.
        </P>
      </Section>
    </LessonShell>
  );
}
