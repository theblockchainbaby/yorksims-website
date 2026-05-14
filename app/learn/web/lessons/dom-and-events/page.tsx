"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function DomAndEventsLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 3 · 9 min read"
      titleMain="The DOM & events,"
      titleAccent="how JavaScript actually changes a page."
      subtitle="When a browser parses HTML, it builds an in-memory tree of objects — the DOM. Every script that does anything visible reaches into that tree. Events are how the tree talks back."
      backHref="/learn/web/unit-3"
      backLabel="Unit 3 · Scripting & Storage"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "JavaScript basics",
        href: "/learn/web/lessons/javascript-basics",
      }}
      nextLesson={{
        label: "Async, fetch & APIs",
        href: "/learn/web/lessons/async-and-apis",
      }}
    >
      <Section title="What the DOM is" sectionNumber="01">
        <P>
          The <strong>DOM</strong> (Document Object Model) is the
          browser&rsquo;s internal representation of your HTML, as a
          tree of objects. Every HTML element becomes a JavaScript
          object you can read and mutate.
        </P>
        <Code>{`<body>
  <header>
    <h1>Hi</h1>
  </header>
  <main>
    <p class="lead">Welcome.</p>
  </main>
</body>

DOM tree:
  document
    └─ html
        └─ body
            ├─ header
            │   └─ h1 "Hi"
            └─ main
                └─ p.lead "Welcome."`}</Code>
        <P>
          Everything JS does to a page — show a modal, validate a form,
          load more results, animate a button — is some combination of
          finding nodes in this tree and changing them.
        </P>
      </Section>

      <Section title="Querying the DOM" sectionNumber="02">
        <Code>{`document.getElementById("hero")            // single element by ID
document.querySelector(".btn")             // first match by CSS selector
document.querySelectorAll("p")             // NodeList of all matches
document.querySelectorAll("article p.lead") // combinators work too

const main = document.querySelector("main");
main.querySelector("p")                    // scoped query inside main`}</Code>
        <P>
          You&rsquo;ll use <Inline>querySelector</Inline> and{" "}
          <Inline>querySelectorAll</Inline> for almost everything — they
          take any CSS selector and reuse the same knowledge from Unit 2
          lesson 5.
        </P>
      </Section>

      <Section title="Reading and changing elements" sectionNumber="03">
        <Code>{`const btn = document.querySelector(".btn");

// Read
btn.textContent           // the text inside (safe)
btn.innerHTML             // the HTML inside (NOT safe with user input — XSS!)
btn.value                 // form field value
btn.getAttribute("href")  // any attribute
btn.classList             // class manipulation API

// Change
btn.textContent = "Saving...";
btn.classList.add("loading");
btn.classList.remove("idle");
btn.classList.toggle("active");
btn.setAttribute("disabled", "true");
btn.style.color = "red";    // works but prefer adding a class`}</Code>
        <SubHeading className="mt-6">textContent vs innerHTML</SubHeading>
        <P>
          <Inline>innerHTML</Inline> parses the assigned string as HTML —
          so if you pass user-supplied input, you just executed any{" "}
          <Inline>&lt;script&gt;</Inline> tag they sent. That&rsquo;s
          XSS. Use <Inline>textContent</Inline> for plain text and treat{" "}
          <Inline>innerHTML</Inline> like a sharp knife. (More in the
          security lesson.)
        </P>
      </Section>

      <Section title="Creating and removing elements" sectionNumber="04">
        <Code>{`// Create
const li = document.createElement("li");
li.textContent = "New item";
li.classList.add("todo");

// Insert
const list = document.querySelector("#todos");
list.appendChild(li);              // at the end
list.prepend(li);                  // at the start
list.insertBefore(li, list.firstChild);  // before another element

// Remove
li.remove();                       // remove this element
list.innerHTML = "";               // remove all children (cheap reset)`}</Code>
      </Section>

      <Section title="Events — making the page react" sectionNumber="05">
        <Code>{`const btn = document.querySelector("#save");

btn.addEventListener("click", (event) => {
  console.log("clicked!", event);
  event.preventDefault();  // stop the default behavior (form submit, link nav)
});`}</Code>
        <SubHeading className="mt-6">The events you&rsquo;ll use 90% of the time</SubHeading>
        <Code>{`click          — mouse click or tap
input          — input/textarea value changed (every keystroke)
change         — form field committed (blur after change)
submit         — form submitted
keydown        — key pressed
keyup          — key released
focus / blur   — element gained / lost focus
load           — image/page finished loading
scroll         — user scrolled
resize         — window resized
DOMContentLoaded — HTML parsed (don't query before this)`}</Code>
      </Section>

      <Section title="The event object" sectionNumber="06">
        <P>
          Every listener gets an <Inline>event</Inline> object with
          info about what happened.
        </P>
        <Code>{`form.addEventListener("submit", (event) => {
  event.preventDefault();             // stop the page from reloading
  const formData = new FormData(event.target);
  const email = formData.get("email");
  console.log(email);
});

input.addEventListener("input", (event) => {
  console.log(event.target.value);    // the current text
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
  if (event.ctrlKey && event.key === "s") savePage();
});`}</Code>
      </Section>

      <Section title="Event delegation — one listener, many elements" sectionNumber="07">
        <P>
          Instead of attaching a listener to each item in a list, attach
          one to the parent and check what was clicked. Events bubble up
          the tree by default.
        </P>
        <Code>{`document.querySelector("#todo-list").addEventListener("click", (event) => {
  if (event.target.matches(".delete-btn")) {
    const item = event.target.closest("li");
    item.remove();
  }
});`}</Code>
        <P>
          Delegation works for elements that don&rsquo;t exist yet — you
          can add new items to the list later and they&rsquo;ll still
          fire the handler. This is why frameworks like React get away
          with re-rendering without re-binding listeners on every node.
          Next lesson: talking to the network — fetch, async, and the
          shape of APIs.
        </P>
      </Section>
    </LessonShell>
  );
}
