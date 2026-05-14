"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function JavaScriptBasicsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="JavaScript basics,"
      titleAccent="the language that runs the web."
      subtitle="HTML structures the page, CSS styles it, JavaScript makes it do anything. JS is now the only language that runs natively in every browser — and it runs on servers, phones, and laptops too."
      backHref="/learn/web/unit-3"
      backLabel="Unit 3 · Scripting & Storage"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Typography, accessibility & responsive CSS",
        href: "/learn/web/lessons/typography-and-responsive",
      }}
      nextLesson={{
        label: "The DOM & events",
        href: "/learn/web/lessons/dom-and-events",
      }}
    >
      <Section title="Where JavaScript runs" sectionNumber="01">
        <P>
          JavaScript was created in 1995 to run in browsers. For 20 years
          that&rsquo;s where it stayed. Then in 2009 Node.js ripped the
          V8 engine out of Chrome and made it run on servers. Now JS
          runs everywhere:
        </P>
        <Code>{`Browser           — what you write goes through <script> tags into the page
Node.js           — JS on a server: web servers, build tools, scripts
React Native      — JS-powered iOS and Android apps
Edge functions    — JS running on CDNs near your users (Cloudflare, Vercel)
Embedded          — even some IoT devices`}</Code>
        <P>
          The language is the same. What differs is the available APIs —
          a browser knows about <Inline>document</Inline> and{" "}
          <Inline>window</Inline>; a Node process knows about{" "}
          <Inline>fs</Inline> (filesystem) and <Inline>process</Inline>.
          The lessons below assume browser unless noted.
        </P>
      </Section>

      <Section title="Where you put it" sectionNumber="02">
        <Code>{`<!-- Inline in HTML -->
<script>
  console.log("hi");
</script>

<!-- External file (almost always do this) -->
<script src="/app.js" defer></script>

<!-- ES module -->
<script type="module" src="/app.js"></script>`}</Code>
        <SubHeading className="mt-6"><Inline>defer</Inline> and <Inline>async</Inline></SubHeading>
        <P>
          Without either, <Inline>&lt;script&gt;</Inline> tags block HTML
          parsing while they download and run.{" "}
          <Inline>defer</Inline> downloads in parallel and runs after the
          HTML is parsed (the usual right answer).{" "}
          <Inline>async</Inline> downloads in parallel and runs as soon
          as it&rsquo;s ready, blocking the parser mid-page (use only for
          truly independent scripts like analytics).
        </P>
      </Section>

      <Section title="Variables — let, const, and (please not) var" sectionNumber="03">
        <Code>{`const PI = 3.14;        // can't be reassigned
let count = 0;          // can be reassigned
count = count + 1;

var foo = "legacy";     // pre-2015 keyword; has quirky scoping; don't use it in new code`}</Code>
        <P>
          Default to <Inline>const</Inline>. Switch to{" "}
          <Inline>let</Inline> only when you genuinely need to
          reassign. <Inline>var</Inline> is from before block scoping and
          has weird hoisting behavior — every modern style guide says
          don&rsquo;t use it.
        </P>
        <SubHeading className="mt-6">Naming</SubHeading>
        <P>
          camelCase for variables and functions, PascalCase for classes
          and React components, SCREAMING_SNAKE for constants you never
          change. Start with a letter, then letters, numbers, or
          underscores. Don&rsquo;t name a variable <Inline>l</Inline> —
          it looks like 1.
        </P>
      </Section>

      <Section title="The eight types" sectionNumber="04">
        <Code>{`Primitives:
  string       "hello"
  number       42, 3.14, NaN, Infinity
  boolean      true, false
  null         intentional "nothing"
  undefined    haven't set this yet
  bigint       9007199254740993n   (huge integers, rare)
  symbol       unique tokens, niche

Reference type:
  object       { name: "York" }    (also arrays, functions, dates, etc.)`}</Code>
        <SubHeading className="mt-6">Type coercion — the footgun</SubHeading>
        <Code>{`"5" + 3       →  "53"     (string + anything → string)
"5" - 3       →  2        (minus forces number)
"" == false   →  true     (loose ==; lies to you)
"" === false  →  false    (strict ===; truth)

ALWAYS use === and !==. Never == and !=. This solves 90% of beginner JS bugs.`}</Code>
      </Section>

      <Section title="Arrays" sectionNumber="05">
        <Code>{`const fruits = ["apple", "banana", "cherry"];

fruits[0]                  // "apple"
fruits.length              // 3
fruits.push("date")        // adds to end; length now 4
fruits.pop()               // removes from end and returns "date"
fruits.unshift("avocado")  // adds to start
fruits.shift()             // removes from start

fruits.map(f => f.toUpperCase())     // ["APPLE", "BANANA", "CHERRY"]
fruits.filter(f => f.startsWith("a"))  // ["apple"]
fruits.find(f => f.length > 5)         // "banana"
fruits.forEach(f => console.log(f))    // iterate, no return`}</Code>
        <P>
          <Inline>map</Inline>, <Inline>filter</Inline>,{" "}
          <Inline>find</Inline>, and <Inline>reduce</Inline> are the
          four array methods you&rsquo;ll write 100 times a week. They
          take a callback function and apply it to each element. Learn
          these and you&rsquo;ll skip writing 90% of for-loops.
        </P>
      </Section>

      <Section title="Functions" sectionNumber="06">
        <Code>{`// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression assigned to a variable
const subtract = function(a, b) {
  return a - b;
};

// Arrow function — the modern default
const multiply = (a, b) => a * b;

// Arrow function with a body
const greet = (name) => {
  const message = "Hi, " + name;
  return message;
};

// Default parameter values
function discount(price, percent = 10) {
  return price * (1 - percent / 100);
}

// Rest parameters — gather extra args into an array
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);  // 10`}</Code>
        <P>
          Use arrow functions for short callbacks and one-liners; use{" "}
          <Inline>function</Inline> declarations for top-level
          functions. The big difference: arrow functions don&rsquo;t have
          their own <Inline>this</Inline>, which matters when you get to
          objects and classes.
        </P>
      </Section>

      <Section title="Objects" sectionNumber="07">
        <Code>{`const user = {
  name: "York",
  age: 32,
  isAdmin: true,
  greet() {
    return "hi, " + this.name;
  },
};

user.name              // "York"
user["name"]           // same thing
user.greet()           // "hi, York"

// Destructuring — pull properties out into variables
const { name, age } = user;

// Spread — copy and merge
const updated = { ...user, age: 33 };  // new object, same fields, age changed`}</Code>
        <P>
          Objects are how JS represents anything that has named
          properties — users, products, API responses, configs. Most of
          the data you&rsquo;ll handle in JS is some shape of object or
          array of objects.
        </P>
        <P>
          Next lesson: how JS reaches into the page itself — the DOM,
          events, and the API the browser exposes for making any of this
          interactive.
        </P>
      </Section>
    </LessonShell>
  );
}
