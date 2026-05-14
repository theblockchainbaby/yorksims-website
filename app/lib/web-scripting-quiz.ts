/**
 * Web Scripting & Storage Quiz — 20 original questions covering Unit 3
 * of the YorkSims web development path: JavaScript basics, DOM &
 * events, async & APIs, client vs server-side code, cookies & storage,
 * databases, and web security.
 *
 * Each question has 4 options, exactly one correct answer, and an
 * explanation shown after the user answers.
 */

export type WebScriptingTopic =
  | "js-basics"
  | "dom-events"
  | "async-apis"
  | "client-server"
  | "storage"
  | "databases"
  | "security";

export interface QuizQuestion {
  id: string;
  topic: WebScriptingTopic;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TOPIC_LABELS: Record<WebScriptingTopic, string> = {
  "js-basics": "JavaScript Basics",
  "dom-events": "DOM & Events",
  "async-apis": "Async & APIs",
  "client-server": "Client vs Server",
  storage: "Cookies & Storage",
  databases: "Databases",
  security: "Web Security",
};

export const TOPICS: WebScriptingTopic[] = [
  "js-basics",
  "dom-events",
  "async-apis",
  "client-server",
  "storage",
  "databases",
  "security",
];

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "q01",
    topic: "js-basics",
    question:
      "Which JavaScript comparison should you almost always prefer?",
    options: [
      "== (loose equality)",
      "=== (strict equality)",
      "= (assignment)",
      "Object.is()",
    ],
    correctIndex: 1,
    explanation:
      "=== checks both value AND type without coercion. == does type coercion that lies to you (\"\" == false is true). Using === avoids an entire class of beginner bugs. Object.is() exists for niche edge cases like distinguishing -0 from +0.",
  },
  {
    id: "q02",
    topic: "js-basics",
    question:
      "What does this evaluate to in JavaScript?  \"5\" + 3",
    options: [
      "8",
      "\"53\"",
      "NaN",
      "Error",
    ],
    correctIndex: 1,
    explanation:
      "The + operator with a string on either side does string concatenation, so \"5\" + 3 becomes \"53\". Subtraction (\"5\" - 3) coerces the string to a number and returns 2 — one of the well-known JS quirks.",
  },
  {
    id: "q03",
    topic: "js-basics",
    question:
      "Which keyword should you generally reach for first when declaring a variable in modern JS?",
    options: [
      "var",
      "let",
      "const",
      "function",
    ],
    correctIndex: 2,
    explanation:
      "Default to const. Use let only when you genuinely need to reassign. var has pre-ES6 hoisting/scoping quirks and isn't recommended in new code. Defaulting to const makes accidental reassignment a compile-time error and signals intent.",
  },
  {
    id: "q04",
    topic: "dom-events",
    question:
      "Why is using element.innerHTML = userInput dangerous?",
    options: [
      "It's slower than textContent",
      "It parses the string as HTML, so any <script> tags or onclick handlers in user input will execute (XSS)",
      "It crashes Internet Explorer",
      "It breaks responsive design",
    ],
    correctIndex: 1,
    explanation:
      "innerHTML parses its argument as HTML. If user-supplied text contains a <script>, it runs in your page's context — that's XSS. Use textContent for plain text. Reserve innerHTML for trusted strings or run user input through a sanitizer like DOMPurify.",
  },
  {
    id: "q05",
    topic: "dom-events",
    question:
      "How do you attach a click handler to a button element in modern JS?",
    options: [
      "btn.onClick = handler",
      "btn.addEventListener(\"click\", handler)",
      "btn.attachEvent(\"click\", handler)",
      "btn.click = handler",
    ],
    correctIndex: 1,
    explanation:
      "addEventListener is the modern API — supports multiple listeners on the same event, can be removed later, and is consistent across all events. btn.onclick = handler also works but allows only one handler. attachEvent is legacy IE.",
  },
  {
    id: "q06",
    topic: "dom-events",
    question:
      "What does event.preventDefault() do in a form submit handler?",
    options: [
      "Stops the event from bubbling up the DOM",
      "Cancels the browser's default action (in this case, the full-page form submission)",
      "Marks the form as invalid",
      "Triggers form validation",
    ],
    correctIndex: 1,
    explanation:
      "preventDefault() cancels the default browser behavior — for a form submit, that's the full-page navigation. event.stopPropagation() is the separate method for halting bubbling. They're often used together when handling forms with fetch.",
  },
  {
    id: "q07",
    topic: "async-apis",
    question:
      "What is a JavaScript Promise?",
    options: [
      "A guarantee that an async operation succeeded",
      "An object representing the eventual completion (or failure) of an async operation",
      "A built-in retry mechanism",
      "A type of event listener",
    ],
    correctIndex: 1,
    explanation:
      "A Promise is a placeholder for a future value — pending, then either fulfilled with a result or rejected with an error. You attach .then() / .catch() handlers or use async/await to read its value when it's ready.",
  },
  {
    id: "q08",
    topic: "async-apis",
    question:
      "When you fetch() and the server returns 404, what does the returned Promise do?",
    options: [
      "It throws an exception",
      "It rejects with the 404 error",
      "It resolves with a Response object whose .ok is false and .status is 404",
      "It hangs forever",
    ],
    correctIndex: 2,
    explanation:
      "fetch() resolves (does not reject) for any HTTP response, even 4xx and 5xx. You must check response.ok or response.status yourself. fetch only rejects on network errors (DNS failure, connection refused, CORS block).",
  },
  {
    id: "q09",
    topic: "async-apis",
    question:
      "You need to run three independent API calls and wait for all of them to finish. What's the right tool?",
    options: [
      "Promise.race",
      "Promise.all",
      "A nested chain of .then() calls",
      "setTimeout",
    ],
    correctIndex: 1,
    explanation:
      "Promise.all([p1, p2, p3]) fires all three immediately and resolves with an array of their results once all complete. Chained .then() calls would run them sequentially and be 3x slower. Promise.race returns the first one to finish.",
  },
  {
    id: "q10",
    topic: "client-server",
    question:
      "Where should you NEVER store a database password or API secret key?",
    options: [
      "In environment variables on the server",
      "In a server-side .env file (gitignored)",
      "In client-side JavaScript that ships to the browser",
      "In a secret-management service (Vault, AWS Secrets Manager, etc.)",
    ],
    correctIndex: 2,
    explanation:
      "Anything that ships to the browser can be read by anyone with DevTools. Minification doesn't help; it's still readable. Secrets only ever live on the server, ideally injected through environment variables or a secrets manager.",
  },
  {
    id: "q11",
    topic: "client-server",
    question:
      "Which rendering model produces HTML at build time and is therefore fastest to serve?",
    options: [
      "CSR (Client-Side Rendering)",
      "SSR (Server-Side Rendering)",
      "SSG (Static Site Generation)",
      "ISR (Incremental Static Regeneration)",
    ],
    correctIndex: 2,
    explanation:
      "SSG builds HTML at deploy time. The server (or CDN) returns prebuilt files with no per-request compute — the cheapest, fastest model. SSR renders on every request. CSR delivers an empty shell and builds the DOM in the browser. ISR is a hybrid that regenerates SSG on a schedule.",
  },
  {
    id: "q12",
    topic: "storage",
    question:
      "Which cookie flag prevents JavaScript from reading the cookie (which mitigates XSS-based session theft)?",
    options: [
      "Secure",
      "HttpOnly",
      "SameSite=Strict",
      "Max-Age",
    ],
    correctIndex: 1,
    explanation:
      "HttpOnly makes the cookie invisible to document.cookie / JS. Even if an attacker injects XSS, they can't exfiltrate an HttpOnly session cookie. Pair with Secure (HTTPS only) and SameSite (CSRF defense) for proper session cookies.",
  },
  {
    id: "q13",
    topic: "storage",
    question:
      "Where should you NOT store an auth token in the browser?",
    options: [
      "In an HttpOnly cookie",
      "In localStorage",
      "In a server-side session keyed by an HttpOnly cookie",
      "Not at all — derive identity from the cookie on every request",
    ],
    correctIndex: 1,
    explanation:
      "localStorage is readable by any JS on the page, including XSS-injected JS. Auth tokens belong in HttpOnly cookies (or server-side sessions). Putting them in localStorage is a regular cause of token theft on shipped apps.",
  },
  {
    id: "q14",
    topic: "storage",
    question:
      "What's the practical difference between localStorage and sessionStorage?",
    options: [
      "localStorage is encrypted; sessionStorage isn't",
      "localStorage persists indefinitely; sessionStorage is cleared when the tab closes",
      "sessionStorage is shared between tabs; localStorage isn't",
      "localStorage works offline; sessionStorage doesn't",
    ],
    correctIndex: 1,
    explanation:
      "Both share the same API. localStorage persists across tabs, refreshes, and browser restarts. sessionStorage is scoped to one tab and clears when that tab closes — useful for wizard state or per-tab caches.",
  },
  {
    id: "q15",
    topic: "databases",
    question:
      "Which SQL clause filters which rows are returned?",
    options: [
      "SELECT",
      "FROM",
      "WHERE",
      "ORDER BY",
    ],
    correctIndex: 2,
    explanation:
      "WHERE filters rows by condition. SELECT lists which columns to return. FROM names the table. ORDER BY sorts the results. The clause order in execution is roughly FROM → WHERE → SELECT → ORDER BY.",
  },
  {
    id: "q16",
    topic: "databases",
    question:
      "Which JOIN returns all rows from the left table, plus matching rows from the right (or NULL if no match)?",
    options: [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "CROSS JOIN",
    ],
    correctIndex: 1,
    explanation:
      "LEFT JOIN keeps every row from the left table; missing matches on the right come back as NULL. INNER JOIN drops rows that don't match in both. CROSS JOIN returns the cartesian product (every row × every row).",
  },
  {
    id: "q17",
    topic: "databases",
    question:
      "What's the role of an index in a database?",
    options: [
      "It speeds up writes but slows down reads",
      "It speeds up reads (especially WHERE filters and JOINs) at the cost of slower writes and extra disk space",
      "It encrypts data on disk",
      "It's how transactions are tracked",
    ],
    correctIndex: 1,
    explanation:
      "Indexes are sorted lookup structures that turn O(n) scans into O(log n) lookups. They make reads fast on the columns they cover. The trade-off is slower writes (the index has to be updated too) and more disk space. Index WHERE and JOIN columns; don't index everything.",
  },
  {
    id: "q18",
    topic: "security",
    question:
      "Which of these prevents SQL injection?",
    options: [
      "Renaming your database",
      "Using parameterized queries (passing user input as separate parameters, not concatenated into the SQL string)",
      "Putting your database behind a firewall only",
      "Using NoSQL",
    ],
    correctIndex: 1,
    explanation:
      "Parameterized queries send the query and the data as separate things to the database — user input can't change the query's structure. Most ORMs do this automatically. NoSQL has its own injection class. A firewall doesn't help once the request reaches your app.",
  },
  {
    id: "q19",
    topic: "security",
    question:
      "What does Cross-Site Request Forgery (CSRF) abuse?",
    options: [
      "The fact that browsers auto-send cookies for a domain on every request, including ones initiated by other sites",
      "Weak password hashing",
      "Predictable URLs",
      "JavaScript closures",
    ],
    correctIndex: 0,
    explanation:
      "CSRF tricks a logged-in user's browser into making a state-changing request to your site from another origin. The browser auto-attaches the user's cookies, so the request looks legit. SameSite=Lax on session cookies (plus CSRF tokens for sensitive forms) defeats it.",
  },
  {
    id: "q20",
    topic: "security",
    question:
      "Which is the right way to store a user's password in a database?",
    options: [
      "In plaintext, behind a firewall",
      "MD5-hashed",
      "SHA-256 hashed",
      "Hashed with a slow, salted algorithm like bcrypt or argon2",
    ],
    correctIndex: 3,
    explanation:
      "bcrypt / argon2 / scrypt are deliberately slow and salted, which makes brute-forcing leaked password hashes economically painful for attackers. Fast hashes like MD5, SHA-1, and SHA-256 can be cracked at billions/sec on a GPU. Plaintext is a breach waiting to happen.",
  },
];
