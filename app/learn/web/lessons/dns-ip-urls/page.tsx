"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function DnsIpUrlsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 8 min read"
      titleMain="DNS, IP addresses & URLs,"
      titleAccent="or how a name becomes a number."
      subtitle="Computers don't know names. They know numbers. DNS is the giant distributed phonebook that translates one to the other — and it runs before any byte of your HTML moves."
      backHref="/learn/web/unit-1"
      backLabel="Unit 1 · Web Foundations"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "How the web actually works",
        href: "/learn/web/lessons/how-the-web-works",
      }}
      nextLesson={{
        label: "Web servers & CMSes",
        href: "/learn/web/lessons/servers-and-cms",
      }}
    >
      <Section title="IP addresses — the numbers under the names" sectionNumber="01">
        <P>
          Every device on the internet has an <strong>IP address</strong>:
          a unique number that says where to send packets. There are two
          versions in active use.
        </P>
        <Code>{`IPv4   →  204.79.197.200            (32-bit, ~4 billion addresses, mostly exhausted)
IPv6   →  2606:4700:4700::1111      (128-bit, effectively infinite)`}</Code>
        <P>
          IPv4 ran out of free addresses around 2011. IPv6 has been the
          replacement &ldquo;coming soon&rdquo; for 25 years and is now
          deployed on more than half the internet. For most of what
          you&rsquo;ll do as a web dev, you can stay with IPv4 in your head
          and never get confused. The protocols below them (TCP, HTTP) work
          the same way on either.
        </P>
        <SubHeading className="mt-6">Local vs public IPs</SubHeading>
        <P>
          The IP your home router shows under{" "}
          <Inline>192.168.x.x</Inline> or <Inline>10.x.x.x</Inline> is{" "}
          <em>private</em> — it works only inside your house. Your router
          translates between that and a single <em>public</em> IP that the
          internet sees. That trick is called NAT (Network Address
          Translation) and it&rsquo;s why your laptop, phone, and toaster
          all look like one device from outside.
        </P>
      </Section>

      <Section title="Why we need DNS" sectionNumber="02">
        <P>
          If we only had IPs, every link would look like{" "}
          <Inline>https://204.79.197.200</Inline>. Nobody would remember
          anything. Worse: every time a company moved its servers, every
          link to them would break.
        </P>
        <P>
          <strong>DNS</strong> (Domain Name System) is the layer that maps
          memorable names — <Inline>yorksims.com</Inline> — to IP addresses
          that can change behind the scenes. It&rsquo;s a giant
          distributed database that no single entity owns.
        </P>
      </Section>

      <Section title="The DNS resolution dance" sectionNumber="03">
        <P>
          When you type <Inline>yorksims.com</Inline> into your browser,
          this happens in roughly 10-50 milliseconds:
        </P>
        <Code>{`1. Browser cache?           Has yorksims.com been looked up recently?
2. OS cache?                Same question, OS level.
3. Resolver (your ISP)      A server that's seen the answer for someone else.
4. Root server              "I don't know, but ask the .com server."
5. TLD server (.com)        "Ask yorksims.com's name servers — here's where."
6. Authoritative server     "yorksims.com lives at 76.76.21.21." ← the real answer`}</Code>
        <P>
          Whichever layer answers first wins. The answer gets cached at
          every layer above it for a duration set by the{" "}
          <strong>TTL</strong> (time to live). That&rsquo;s why DNS changes
          can take hours to propagate — old caches haven&rsquo;t expired
          yet.
        </P>
      </Section>

      <Section title="DNS record types you'll see" sectionNumber="04">
        <P>
          A domain&rsquo;s DNS settings are a list of <em>records</em>. The
          ones you&rsquo;ll touch:
        </P>
        <Code>{`A      → IPv4 address              yorksims.com → 76.76.21.21
AAAA   → IPv6 address              yorksims.com → 2606:4700::...
CNAME  → alias to another name     www.yorksims.com → yorksims.com
MX     → mail server               yorksims.com → mail.google.com (priority 10)
TXT    → arbitrary text            (used for verification, SPF, DKIM)
NS     → name servers              yorksims.com is managed by ns1.vercel.com`}</Code>
        <P>
          When you point a new domain at a hosting provider, you&rsquo;re
          editing these records — usually an A record (for IP) or a CNAME
          (for a hostname). Email problems? MX or TXT. Domain ownership
          verification? TXT.
        </P>
      </Section>

      <Section title="Anatomy of a URL" sectionNumber="05">
        <P>
          A URL (Uniform Resource Locator) is the address bar of your
          browser broken into parts. Each part has a job.
        </P>
        <Code>{`https://blog.yorksims.com:443/posts/dns?ref=newsletter#chapter-2

scheme     →  https
subdomain  →  blog
domain     →  yorksims.com
TLD        →  .com
port       →  443                 (usually implied; 80 for http, 443 for https)
path       →  /posts/dns          (which resource on the server)
query      →  ref=newsletter      (extra parameters, after the ?)
fragment   →  chapter-2           (in-page anchor, after the #; never sent to server)`}</Code>
        <P>
          One quirk worth knowing: the <em>fragment</em> (after the{" "}
          <Inline>#</Inline>) never gets sent to the server. It&rsquo;s
          purely a client-side thing. Single-page apps used to abuse this
          to route inside one page without triggering a full reload.
        </P>

        <SubHeading className="mt-6">URL vs URI vs URN</SubHeading>
        <P>
          Pedantically: a <strong>URI</strong> is the umbrella;{" "}
          <strong>URL</strong> is the kind of URI that tells you where
          something is; <strong>URN</strong> is the kind that tells you{" "}
          <em>what</em> it is without a location. In practice everyone says
          URL and you can too.
        </P>
      </Section>

      <Section title="The whole picture, one diagram" sectionNumber="06">
        <P>
          Put together, here&rsquo;s the full path from typing a URL to
          seeing pixels:
        </P>
        <Code>{`You type:        https://yorksims.com
DNS resolves:    yorksims.com → 76.76.21.21
TCP handshake:   your laptop ↔ 76.76.21.21:443
TLS handshake:   encrypt the channel
HTTP request:    GET / HTTP/1.1, Host: yorksims.com
Server runs:     route, query DB, render HTML
HTTP response:   200 OK, Content-Type: text/html, body...
Browser parses:  HTML → DOM, CSS → styles, JS → run
More requests:   for every image, font, script, stylesheet
Render:          paint pixels`}</Code>
        <P>
          You can do all of this in less than 500ms on a good connection.
          When a page feels slow, one of those steps is too slow — and
          knowing the steps tells you where to look. Next lesson: what
          actually lives at the other end of that connection.
        </P>
      </Section>
    </LessonShell>
  );
}
