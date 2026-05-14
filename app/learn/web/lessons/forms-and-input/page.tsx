"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function FormsAndInputLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 9 min read"
      titleMain="Forms & input,"
      titleAccent="where users actually talk to your server."
      subtitle="A form is the one place on a page where bytes flow back from the user to you. Logins, checkouts, sign-ups, search — it's all forms. Get the basics right and you'll skip 80% of the bugs."
      backHref="/learn/web/unit-2"
      backLabel="Unit 2 · Document Markup"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "Links, images & media",
        href: "/learn/web/lessons/links-images-media",
      }}
      nextLesson={{
        label: "CSS selectors & the cascade",
        href: "/learn/web/lessons/css-selectors",
      }}
    >
      <Section title="The minimum viable form" sectionNumber="01">
        <Code>{`<form action="/api/signup" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required minlength="8" />

  <button type="submit">Sign up</button>
</form>`}</Code>
        <P>
          Four pieces: a <Inline>&lt;form&gt;</Inline> wrapper, labels,
          inputs with names, and a submit button. The browser handles the
          submission automatically — you don&rsquo;t need JavaScript for
          a form to work.
        </P>
      </Section>

      <Section title="Input types" sectionNumber="02">
        <P>
          The <Inline>type</Inline> attribute changes what kind of input
          you get and what validation comes for free.
        </P>
        <Code>{`text       — plain text (default)
email      — email keyboard on mobile, validates format
password   — masks characters
number     — number-only keyboard, min/max/step attributes
tel        — phone number keyboard on mobile
url        — URL keyboard, validates format
search     — search keyboard with magnifier icon
date       — native date picker
time       — native time picker
checkbox   — single boolean
radio      — pick one of several
file       — file picker
hidden     — invisible value submitted with the form
range      — slider
color      — color picker`}</Code>
        <P>
          Picking the right type is the difference between a mobile user
          getting an email-friendly keyboard with @ and a regular keyboard
          they have to switch. Worth getting right.
        </P>
      </Section>

      <Section title="Labels and why they matter" sectionNumber="03">
        <P>
          Every input needs a <Inline>&lt;label&gt;</Inline>. Pair them
          with matching <Inline>for</Inline> and <Inline>id</Inline>
          attributes, OR wrap the input inside the label:
        </P>
        <Code>{`<!-- Linked -->
<label for="email">Email</label>
<input id="email" name="email" type="email" />

<!-- Wrapped -->
<label>
  Email
  <input name="email" type="email" />
</label>`}</Code>
        <P>
          Labels do three things: they tell sighted users what the field
          is, they make clicking the label focus the input (bigger tap
          target), and they tell screen readers how to announce the
          field. Placeholder text is <em>not</em> a substitute — it
          disappears as soon as the user types, and screen readers handle
          it inconsistently.
        </P>
      </Section>

      <Section title="GET vs POST" sectionNumber="04">
        <Code>{`<form method="get">    →  data goes in the URL as ?name=value
<form method="post">   →  data goes in the request body`}</Code>
        <SubHeading className="mt-6">When to use GET</SubHeading>
        <P>
          When the form is a query and the result should be shareable or
          bookmarkable. Search forms, filters, pagination. The URL changes
          to reflect the query, so refreshing reruns it and copying the
          URL gives someone the same view.
        </P>
        <SubHeading className="mt-6">When to use POST</SubHeading>
        <P>
          When the form changes server state. Sign-up, log-in, post a
          comment, place an order. POST has no URL-length limit, the data
          isn&rsquo;t visible in the address bar, and the browser warns
          before resubmitting on refresh.
        </P>
      </Section>

      <Section title="Native validation" sectionNumber="05">
        <P>
          The browser will validate inputs for free if you tell it the
          rules:
        </P>
        <Code>{`<input type="email" required />
<input type="text" required minlength="3" maxlength="20" />
<input type="number" min="1" max="100" />
<input type="text" pattern="[A-Z]{3}-\\d{4}" title="Format: ABC-1234" />`}</Code>
        <P>
          When a user tries to submit an invalid form, the browser stops
          the submission and shows a tooltip on the offending field. No
          JavaScript needed. You&rsquo;ll add JS validation on top of this
          for nicer UX and to validate on the server (always validate on
          the server too — client-side validation is for UX, not
          security).
        </P>
      </Section>

      <Section title="The other input elements" sectionNumber="06">
        <P>
          Beyond <Inline>&lt;input&gt;</Inline>, three more elements
          handle text and choices:
        </P>
        <Code>{`<!-- Multi-line text -->
<textarea name="bio" rows="4">Default text</textarea>

<!-- Dropdown -->
<select name="country">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="mx">Mexico</option>
</select>

<!-- Group related inputs -->
<fieldset>
  <legend>Shipping address</legend>
  <input name="street" />
  <input name="city" />
</fieldset>`}</Code>
        <P>
          <Inline>&lt;fieldset&gt;</Inline> + <Inline>&lt;legend&gt;</Inline>{" "}
          is the right way to group related form fields. Screen readers
          announce the legend when reading any input inside the fieldset,
          so users always know which group of fields they&rsquo;re in.
        </P>
      </Section>

      <Section title="Accessibility checklist" sectionNumber="07">
        <P>
          Five things that turn a hostile form into a usable one:
        </P>
        <Code>{`1. Every input has a real <label>.
2. Required fields are marked required (visually AND with the required attribute).
3. Error messages appear near the field, not in a popup.
4. Inputs have autocomplete attributes (autocomplete="email", "current-password", etc.).
5. The submit button says what it does ("Create account", not "Submit").`}</Code>
        <P>
          Bonus: don&rsquo;t disable the submit button while users are
          typing. It feels broken. Validate when they leave the field
          (the <Inline>blur</Inline> event) or when they hit submit.
        </P>
        <P>
          Next lesson: how CSS targets and styles all the HTML you just
          wrote.
        </P>
      </Section>
    </LessonShell>
  );
}
