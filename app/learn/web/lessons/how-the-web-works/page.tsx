"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function HowTheWebWorksLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 1 · 9 min read"
      titleMain="How the web actually works,"
      titleAccent="from keystroke to rendered pixel."
      subtitle="Every web request takes a tour through seven layers of networking, hits at least three servers, and gets translated four times — in about 200 milliseconds. Here's the shape of that tour."
      backHref="/learn/web/unit-1"
      backLabel="Unit 1 · Web Foundations"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "A brief history of the internet",
        href: "/learn/web/lessons/internet-history",
      }}
      nextLesson={{
        label: "DNS, IP addresses & URLs",
        href: "/learn/web/lessons/dns-ip-urls",
      }}
    >
      <Section title="The request/response model" sectionNumber="01">
        <P>
          The web works because of one repeated transaction: a{" "}
          <strong>client</strong> (your browser) sends a{" "}
          <strong>request</strong> to a <strong>server</strong>, and the
          server sends back a <strong>response</strong>. That&rsquo;s it.
          Loading a webpage is hundreds of these round-trips happening in
          parallel — one for the HTML, one for each image, one for each
          stylesheet, one for each script.
        </P>
        <Code>{`Client                                Server
  | --------- GET /index.html --------> |
  |                                     |  (looks up the file,
  |                                     |   runs any code,
  |                                     |   builds a response)
  | <-------- 200 OK + HTML ----------- |`}</Code>
        <P>
          That request and response travel as little packets of bytes across
          a network of routers, fibre, and (occasionally) literal copper
          wire. The next sections are about what the bytes look like and how
          they find their way.
        </P>
      </Section>

      <Section title="The OSI model — in plain English" sectionNumber="02">
        <P>
          The OSI model splits a network into seven{" "}
          <em>layers</em>. Each layer is responsible for one job and trusts
          the layer below it to handle the rest. You will be asked about
          this in interviews. You will also use it to debug things at 2 a.m.
        </P>
        <Code>{`7. Application   — what you actually use (HTTP, SMTP, DNS, SSH)
6. Presentation  — encoding, compression, encryption (TLS lives here-ish)
5. Session       — opening and closing conversations
4. Transport     — chunking data into packets (TCP, UDP)
3. Network       — routing packets across networks (IP)
2. Data Link     — packet → frame for one hop (Ethernet, Wi-Fi)
1. Physical      — actual bits over wire, fibre, or radio`}</Code>
        <P>
          When you write web code, you live almost entirely at{" "}
          <strong>Layer 7</strong>. But every time you hit a CORS error,
          a connection timeout, or a &ldquo;port already in use&rdquo;, you
          just dropped into a lower layer.
        </P>
      </Section>

      <Section title="TCP vs UDP" sectionNumber="03">
        <P>
          At Layer 4 you choose between two protocols.{" "}
          <strong>TCP</strong> is reliable — it numbers packets, confirms
          delivery, and re-sends ones that get lost.{" "}
          <strong>UDP</strong> is fast — it fires packets off and
          doesn&rsquo;t care if they arrive.
        </P>
        <Code>{`TCP  →  HTTP, HTTPS, SSH, SMTP, FTP   (correctness matters)
UDP  →  DNS, video calls, gaming, VoIP (speed matters more)`}</Code>
        <P>
          Web traffic is almost all TCP, because a missing chunk of HTML
          would be unrecoverable. A missing frame in a video call is fine —
          you&rsquo;d rather skip it than wait.
        </P>
      </Section>

      <Section title="HTTP — the language of the web" sectionNumber="04">
        <P>
          At the top of the stack lives <strong>HTTP</strong>, the protocol
          your browser actually speaks. An HTTP request is mostly just
          text — you could literally type one out by hand:
        </P>
        <Code>{`GET /about HTTP/1.1
Host: yorksims.com
User-Agent: Mozilla/5.0 ...
Accept: text/html

`}</Code>
        <P>
          The server responds with a status line, headers, and (usually) a
          body:
        </P>
        <Code>{`HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 4823

<!doctype html>
<html> ...`}</Code>

        <SubHeading className="mt-6">The verbs</SubHeading>
        <Code>{`GET     → fetch a resource          (safe, idempotent)
POST    → create something          (not idempotent — twice = two records)
PUT     → replace a resource        (idempotent)
PATCH   → partially update          (not idempotent)
DELETE  → remove a resource         (idempotent)`}</Code>
        <P>
          REST APIs map these verbs to operations on data. A login form
          POSTs. A delete button DELETEs. Most pages you load are GETs.
        </P>
      </Section>

      <Section title="Status codes" sectionNumber="05">
        <P>
          Every response carries a 3-digit status code. Memorize the
          families and a few specific ones — you&rsquo;ll see them in
          DevTools every day.
        </P>
        <Code>{`1xx  Informational    (rare — keep going)
2xx  Success          (200 OK, 201 Created, 204 No Content)
3xx  Redirect         (301 Moved Permanently, 302 Found, 304 Not Modified)
4xx  Client error     (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many)
5xx  Server error     (500 Internal Server Error, 502 Bad Gateway, 503 Unavailable)`}</Code>
        <P>
          Rule of thumb: <strong>4xx is your fault</strong> (you sent
          something wrong); <strong>5xx is their fault</strong> (the server
          blew up). 401 vs 403 trips up beginners: 401 means &ldquo;you
          aren&rsquo;t logged in&rdquo;, 403 means &ldquo;you are, but you
          can&rsquo;t do this.&rdquo;
        </P>
      </Section>

      <Section title="HTTPS — HTTP with a lock on it" sectionNumber="06">
        <P>
          HTTPS is HTTP wrapped in TLS encryption. When you visit{" "}
          <Inline>https://yorksims.com</Inline>, your browser and the server
          do a quick handshake — exchange certificates, agree on an
          encryption key — and then run normal HTTP <em>inside</em> the
          encrypted tunnel.
        </P>
        <P>
          You should never ship a public site without HTTPS in 2026. Most
          browsers flag plain HTTP as &ldquo;Not Secure.&rdquo; Search
          engines penalize it. And without TLS, anyone on the same Wi-Fi
          can read everything your users send and receive, including their
          passwords. Free certs from Let&rsquo;s Encrypt, automated by
          almost every host. Just turn it on.
        </P>
      </Section>

      <Section title="Ports" sectionNumber="07">
        <P>
          An IP address gets you to a machine. A <strong>port</strong> gets
          you to the right program <em>on</em> that machine. A web server
          listens on port 80 (HTTP) and 443 (HTTPS) by default.
        </P>
        <Code>{`http://yorksims.com         → port 80
https://yorksims.com        → port 443
ssh user@server             → port 22
http://localhost:3000       → port 3000  (dev servers)
http://localhost:5432       → port 5432  (postgres)`}</Code>
        <P>
          When you start a Next.js dev server and it says{" "}
          <Inline>localhost:3000</Inline>, that&rsquo;s the port it picked
          to listen on. If it&rsquo;s already taken (you forgot to kill the
          last one), it&rsquo;ll grab the next free one.
        </P>
        <P>
          The next lesson is about how your browser turns a name like{" "}
          <Inline>yorksims.com</Inline> into the numeric IP address it
          actually needs to open a connection to.
        </P>
      </Section>
    </LessonShell>
  );
}
