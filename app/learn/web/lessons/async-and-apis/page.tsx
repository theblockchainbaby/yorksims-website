"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function AsyncAndApisLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="Async, fetch & APIs,"
      titleAccent="how JavaScript talks to the network."
      subtitle="JavaScript runs on one thread. If a network call blocked, your whole page would freeze. The async machinery is how JS does long operations without locking up — and it's how every modern app talks to a server."
      backHref="/learn/web/unit-3"
      backLabel="Unit 3 · Scripting & Storage"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "The DOM & events",
        href: "/learn/web/lessons/dom-and-events",
      }}
      nextLesson={{
        label: "Client vs server-side code",
        href: "/learn/web/lessons/client-vs-server",
      }}
    >
      <Section title="Why async exists" sectionNumber="01">
        <P>
          JavaScript is{" "}
          <strong>single-threaded</strong>. There&rsquo;s one thread of
          execution per page. If you ran a 5-second database query
          synchronously, the page would be completely frozen for 5
          seconds — no clicks, no animations, no scrolls. Unacceptable.
        </P>
        <P>
          The fix: anything that takes meaningful time (network
          requests, file I/O, timers) is{" "}
          <strong>asynchronous</strong>. You ask for the result, you get
          a placeholder, you carry on. When the result arrives, your
          code resumes from where it left off.
        </P>
      </Section>

      <Section title="Callbacks — the old way" sectionNumber="02">
        <Code>{`setTimeout(() => {
  console.log("3 seconds later");
}, 3000);

// Old-school API request style — looks like this even in 2024 in some libraries
loadUser(123, function(err, user) {
  if (err) return console.error(err);
  loadOrders(user.id, function(err, orders) {
    if (err) return console.error(err);
    renderOrders(orders);
  });
});`}</Code>
        <P>
          Callbacks work but they nest fast. Three or four levels deep
          and you&rsquo;re in &ldquo;callback hell.&rdquo; ES2015
          introduced <strong>promises</strong> to fix this.
        </P>
      </Section>

      <Section title="Promises — the modern way" sectionNumber="03">
        <P>
          A <strong>Promise</strong> is an object that represents
          eventual completion of an async operation. It&rsquo;s a
          placeholder for a future value.
        </P>
        <Code>{`fetch("/api/user/123")
  .then((response) => response.json())
  .then((user) => {
    console.log(user.name);
  })
  .catch((err) => {
    console.error(err);
  });`}</Code>
        <P>
          Each <Inline>.then()</Inline> takes a function that runs when
          the previous step resolves. <Inline>.catch()</Inline> runs if
          anything in the chain threw. No nesting.
        </P>
      </Section>

      <Section title="async / await — promises that look synchronous" sectionNumber="04">
        <P>
          The <Inline>async</Inline> keyword on a function lets you use{" "}
          <Inline>await</Inline> inside it.{" "}
          <Inline>await</Inline> pauses until a promise resolves and
          gives you the result. The code reads top-down even though
          it&rsquo;s async.
        </P>
        <Code>{`async function loadUser(id) {
  try {
    const response = await fetch(\`/api/user/\${id}\`);
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    const user = await response.json();
    console.log(user.name);
    return user;
  } catch (err) {
    console.error("Failed to load user:", err);
  }
}

loadUser(123);`}</Code>
        <P>
          Same behavior as the <Inline>.then()</Inline> chain, way
          easier to read. <Inline>try/catch</Inline> handles errors like
          it would in synchronous code. This is the modern default.
        </P>
      </Section>

      <Section title="fetch — the browser's HTTP client" sectionNumber="05">
        <Code>{`// GET (default)
const res = await fetch("/api/posts");
const posts = await res.json();

// POST with JSON body
const res = await fetch("/api/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hi", body: "First post" }),
});
const created = await res.json();

// Send a form's data
const formData = new FormData(formElement);
const res = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});`}</Code>
        <SubHeading className="mt-6">Checking for errors</SubHeading>
        <P>
          A 404 or 500 isn&rsquo;t a thrown exception in{" "}
          <Inline>fetch</Inline> — it&rsquo;s a successful response
          with a bad status. Always check <Inline>res.ok</Inline> or{" "}
          <Inline>res.status</Inline>:
        </P>
        <Code>{`const res = await fetch("/api/posts");
if (!res.ok) {
  throw new Error(\`Request failed: \${res.status}\`);
}
const data = await res.json();`}</Code>
      </Section>

      <Section title="What an API actually is" sectionNumber="06">
        <P>
          An <strong>API</strong> (Application Programming Interface) is
          a way for one program to ask another to do something. On the
          web, almost all APIs are <strong>HTTP APIs</strong>: you make
          an HTTP request, you get a (usually) JSON response.
        </P>
        <Code>{`Common patterns you'll see:

GET    /api/posts            → list of posts
GET    /api/posts/42         → post with id 42
POST   /api/posts            → create a new post (body has the data)
PATCH  /api/posts/42         → update fields on post 42
DELETE /api/posts/42         → delete post 42`}</Code>
        <P>
          This is the <strong>REST</strong> pattern (Representational
          State Transfer). Other patterns exist —{" "}
          <strong>GraphQL</strong> (one endpoint, query language),{" "}
          <strong>tRPC</strong>{" "}
          (typed RPC for full-stack TypeScript apps),{" "}
          <strong>gRPC</strong> (protobuf, server-to-server). REST is
          the dominant one for public APIs.
        </P>
      </Section>

      <Section title="Promise.all — run things in parallel" sectionNumber="07">
        <Code>{`// Wrong — sequential, slow
const user = await loadUser(123);
const orders = await loadOrders(123);
const reviews = await loadReviews(123);

// Right — parallel, fast
const [user, orders, reviews] = await Promise.all([
  loadUser(123),
  loadOrders(123),
  loadReviews(123),
]);`}</Code>
        <P>
          <Inline>Promise.all</Inline> fires every promise immediately
          and waits for all of them. If any one rejects, the whole thing
          rejects (use <Inline>Promise.allSettled</Inline> if you want
          to wait for all regardless).
        </P>
        <P>
          You now know how to talk to a server. The next lesson covers
          what&rsquo;s actually on the other side — server-side code,
          where it runs, and why secrets never live in browser
          JavaScript.
        </P>
      </Section>
    </LessonShell>
  );
}
