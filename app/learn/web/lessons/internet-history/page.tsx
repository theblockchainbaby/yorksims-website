"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function InternetHistoryLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 7 min read"
      titleMain="A brief history of the internet,"
      titleAccent="and why every web dev should know it."
      subtitle="The internet wasn't built to sell ads. It was built so two computers could keep talking after one of them got nuked. Once you know that, the weird parts make sense."
      backHref="/learn/web/unit-1"
      backLabel="Unit 1 · Web Foundations"
      learnHref="/learn/web"
      attribution={null}
      nextLesson={{
        label: "How the web actually works",
        href: "/learn/web/lessons/how-the-web-works",
      }}
    >
      <Section title="Before the internet was the internet" sectionNumber="01">
        <P>
          In the 1960s the U.S. military used microwave transmission towers to
          relay communications. They worked well enough on a clear day, but
          they had two problems. Weather killed them. And if you took out one
          tower in the middle of a chain, the whole line went dark. After
          Sputnik launched in 1957 and the Cold War started looking like a
          real war, the Department of Defense decided it needed a network
          that <em>kept working</em> when parts of it got blown up.
        </P>
        <P>
          Around the same time, university researchers were trying to share
          data between campuses and running into the same problem from the
          opposite direction — their connections kept dropping in the middle
          of long file transfers. The two groups met at a conference and
          decided to collaborate.
        </P>
      </Section>

      <Section title="Arpanet — the first network" sectionNumber="02">
        <P>
          The Defense Department&rsquo;s research wing (ARPA) built a
          decentralized network they called <em>Arpanet</em>. The key idea
          was packet switching: instead of one big continuous connection
          between two computers, break the data into small numbered chunks
          (<Inline>packets</Inline>), send each one through whatever route
          was available, and reassemble them on the other side. If one route
          died, the packets just took a different one.
        </P>
        <P>
          The first message sent over Arpanet, in 1969, was the word{" "}
          <Inline>login</Inline>. The system crashed after the{" "}
          <Inline>lo</Inline>. That&rsquo;s the entire history of software in
          one sentence.
        </P>
      </Section>

      <Section title="TCP/IP — the standard everything runs on" sectionNumber="03">
        <P>
          Arpanet was a single network. By the 1970s lots of networks
          existed, and they couldn&rsquo;t talk to each other. Vint Cerf and
          Bob Kahn proposed a common protocol any network could use:{" "}
          <strong>TCP/IP</strong> (Transmission Control Protocol / Internet
          Protocol). The idea was that each network kept doing its own thing
          internally, but spoke a shared language at the boundaries.
        </P>
        <P>
          On January 1, 1983 — &ldquo;flag day&rdquo; — Arpanet switched to
          TCP/IP overnight. That&rsquo;s the day the modern internet was
          born. Everything you do online today still moves over TCP/IP. The
          fact that your laptop, a Linux server in Frankfurt, and an iPhone
          all just <em>work</em> on the same network is because of this one
          protocol.
        </P>
      </Section>

      <Section title="Web 1.0 — read-only" sectionNumber="04">
        <P>
          The internet existed for 20 years before most people had heard of
          it. What changed that was Tim Berners-Lee inventing the{" "}
          <strong>World Wide Web</strong> at CERN in 1989. He wrote three
          things: HTML (the markup), HTTP (the protocol for moving HTML
          around), and a browser to view it.
        </P>
        <P>
          The first website, info.cern.ch, went live in 1991. Through most
          of the 1990s the web was{" "}
          <em>Web 1.0</em>
          : static pages, hand-coded HTML, no user accounts, no comments, no
          dynamic content. You read what someone published. You couldn&rsquo;t
          write back.
        </P>
        <SubHeading className="mt-6">Email — older than the web</SubHeading>
        <P>
          Email predates the web by 20 years. Ray Tomlinson sent the first
          networked email in 1971 and picked the <Inline>@</Inline> symbol to
          separate the user from the host. That little decision survived
          every protocol change since.
        </P>
      </Section>

      <Section title="Web 2.0 — read-write" sectionNumber="05">
        <P>
          By the mid-2000s the web became <em>interactive</em>. Users
          stopped being readers and started being contributors. The shift
          had three triggers:
        </P>
        <Code>{`1. Cheap servers + faster connections (you could run a forum without a sysadmin team)
2. JavaScript got good enough to update part of a page without reloading
3. Companies figured out that user-generated content scales for free`}</Code>
        <P>
          Web 2.0 is Facebook, YouTube, Wikipedia, Reddit, Twitter — sites
          where the users <em>are</em> the content. The technology underneath
          (HTTP, TCP/IP, HTML) didn&rsquo;t change much. What changed was the
          culture and the business model.
        </P>
      </Section>

      <Section title="Web 3.0 — semantic, decentralized, and AI" sectionNumber="06">
        <P>
          &ldquo;Web 3.0&rdquo; is a fuzzy term with three competing
          definitions, and you&rsquo;ll hear all of them:
        </P>
        <Code>{`Semantic Web   — machines understand content, not just display it
Decentralized  — blockchain, crypto, ownership without platforms
AI-native      — agents that browse and act on the web for you`}</Code>
        <P>
          What it actually means in 2026 is some mix of all three. The
          practical version: APIs are first-class citizens, content is
          structured for machines (schema.org, JSON-LD), and AI assistants
          increasingly sit between you and the raw web.
        </P>
      </Section>

      <Section title="Why the history matters" sectionNumber="07">
        <P>
          You can build a website without knowing any of this, but you
          can&rsquo;t debug one. When DNS fails, when CORS breaks, when
          a port is blocked, when an SSL cert expires — every weird thing
          you&rsquo;ll hit has a reason rooted in some 1970s design decision
          made by a guy with a beard at a university. The next lesson digs
          into how a single page load actually moves through that
          decades-old plumbing.
        </P>
      </Section>
    </LessonShell>
  );
}
