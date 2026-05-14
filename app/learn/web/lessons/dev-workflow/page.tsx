"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function DevWorkflowLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 8 min read"
      titleMain="Dev workflow & the IDE,"
      titleAccent="the loop you'll spend your career in."
      subtitle="Tools matter less than the loop. Senior engineers run a four-step cycle thousands of times a year. The faster and tighter that loop, the better the code that comes out of it."
      backHref="/learn/web/unit-1"
      backLabel="Unit 1 · Web Foundations"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Responsive design",
        href: "/learn/web/lessons/responsive-design",
      }}
      nextLesson={{
        label: "Markup languages overview",
        href: "/learn/web/lessons/markup-languages",
      }}
    >
      <Section title="Project management — Waterfall vs Agile" sectionNumber="01">
        <P>
          You will work in one of two project methodologies, or some
          mutant hybrid. Know what each is so you can roll with whichever
          shop you end up in.
        </P>
        <Code>{`Waterfall  →  Plan everything → design everything → build → test → ship.
              Linear. Long cycles. Hard to change mid-flight.
              (Good for: regulated industries, hardware, fixed-scope contracts.)

Agile      →  Plan a little, build a slice, ship, learn, repeat in 1-2 week sprints.
              Iterative. Embraces change. Most modern software.
              (Good for: web, SaaS, anything where requirements evolve.)`}</Code>
        <P>
          The real distinction isn&rsquo;t the labels — it&rsquo;s
          batch size. Waterfall ships in months; agile ships in weeks or
          days. Smaller batches mean faster feedback, fewer bugs piled up,
          and shorter distance between &ldquo;we should change this&rdquo;
          and &ldquo;we changed it.&rdquo;
        </P>
      </Section>

      <Section title="Structure patterns" sectionNumber="02">
        <P>
          Most websites use the same three patterns at different layers:
        </P>
        <Code>{`MVC          — Model · View · Controller  (Rails, Laravel, classic web frameworks)
Component    — UI built from reusable components (React, Vue, Svelte)
Layered      — Presentation → Business logic → Data (any backend with a service layer)`}</Code>
        <P>
          Don&rsquo;t memorize these. Notice them in whatever codebase you
          touch and ask &ldquo;where does this kind of code live?&rdquo;
          The answer is usually predictable from the pattern.
        </P>
      </Section>

      <Section title="Version control — git in one paragraph" sectionNumber="03">
        <P>
          <strong>Git</strong> is a tool that tracks every change to your
          code as a sequence of <em>commits</em>. You can rewind, branch
          off to try something, merge changes from teammates, and never
          lose work. <strong>GitHub</strong> is a website that hosts git
          repositories. You will use both, every day, forever.
        </P>
        <Code>{`The five commands you'll use 99% of the time:

git status                         # what's changed
git add .                          # stage changes
git commit -m "fix: nav overflow"  # save a checkpoint with a message
git push                           # send checkpoints to GitHub
git pull                           # pull teammates' changes`}</Code>
        <P>
          The other 1% — rebasing, cherry-picking, bisecting — you learn
          when you need it. Don&rsquo;t front-load it.
        </P>
      </Section>

      <Section title="The IDE you should actually pick" sectionNumber="04">
        <P>
          An <strong>IDE</strong> (Integrated Development Environment) is
          a text editor with a debugger, terminal, linter, and git client
          glued on. The state of the industry as of 2026:
        </P>
        <Code>{`VS Code     — Free. Most popular. The default unless you know better.
Cursor      — VS Code with AI built in. Very popular among working devs.
JetBrains   — IntelliJ/WebStorm. Paid. Heavy. Beloved by some, hated by others.
Neovim      — Terminal-based. For people who write a lot of YAML about their config.
Sublime     — Fast and minimal. Niche but loyal users.`}</Code>
        <P>
          Pick one and learn its keybindings. Don&rsquo;t spend three
          months tweaking themes. The IDE is for moving fast in the inner
          loop (see below), not for being your hobby.
        </P>
      </Section>

      <Section title="The development inner loop" sectionNumber="05">
        <P>
          Every productive engineer runs the same four-step loop, dozens
          of times an hour:
        </P>
        <Code>{`1. Write a small change.
2. Run it (or refresh the page).
3. Read what happened — the output, error, screenshot, log.
4. Decide the next change.`}</Code>
        <P>
          The number-one predictor of how fast you ship is how tight this
          loop is. Hot module reload, instant tests, fast type errors, a
          good debugger — these all matter because they shorten the cycle.
          A 1-second loop and a 30-second loop produce vastly different
          codebases over a year.
        </P>
        <SubHeading className="mt-6">Read errors, don&rsquo;t skim them</SubHeading>
        <P>
          The single biggest skill gap between juniors and seniors is{" "}
          <em>reading errors carefully</em>. The traceback usually tells
          you exactly what&rsquo;s wrong and exactly which line. Beginners
          panic and start guessing. Slow down, read the bottom line of the
          error, search the exact text, then act.
        </P>
      </Section>

      <Section title="Best practices that compound" sectionNumber="06">
        <P>
          Five habits that pay off forever:
        </P>
        <Code>{`1. Write small, focused commits. Future-you needs to read them.
2. Use real names. "data" and "stuff" are not names. "userOrders" is.
3. Delete dead code aggressively. Comments, unused imports, the lot.
4. Don't optimize before measuring. Most "slow" code is not the slow code.
5. Read other people's code. Skim a popular open-source project monthly.`}</Code>
        <P>
          You now have everything you need to start touching code. Unit 2
          is HTML and CSS — the markup that everything else builds on.
          Onward.
        </P>
      </Section>
    </LessonShell>
  );
}
