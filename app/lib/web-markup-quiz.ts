/**
 * Web Markup Quiz — 20 original questions covering Unit 2 of the
 * YorkSims web development path: markup languages, HTML document
 * structure, links and media, forms, CSS selectors, box model & layout,
 * and typography & accessibility.
 *
 * Each question has 4 options, exactly one correct answer, and an
 * explanation shown after the user answers.
 */

export type WebMarkupTopic =
  | "markup-langs"
  | "html-structure"
  | "links-media"
  | "forms"
  | "css-selectors"
  | "box-model"
  | "typography-a11y";

export interface QuizQuestion {
  id: string;
  topic: WebMarkupTopic;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TOPIC_LABELS: Record<WebMarkupTopic, string> = {
  "markup-langs": "Markup Languages",
  "html-structure": "HTML Structure",
  "links-media": "Links, Images & Media",
  forms: "Forms & Input",
  "css-selectors": "CSS Selectors",
  "box-model": "Box Model & Layout",
  "typography-a11y": "Typography & A11y",
};

export const TOPICS: WebMarkupTopic[] = [
  "markup-langs",
  "html-structure",
  "links-media",
  "forms",
  "css-selectors",
  "box-model",
  "typography-a11y",
];

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "q01",
    topic: "markup-langs",
    question:
      "Which of these is technically a data format, not a markup language, even though web developers use it daily?",
    options: [
      "HTML",
      "XML",
      "JSON",
      "SVG",
    ],
    correctIndex: 2,
    explanation:
      "JSON (JavaScript Object Notation) is a data format — it doesn't \"mark up\" text the way HTML and XML do. SVG is XML for vector graphics, so it is markup. HTML and XML are both markup languages.",
  },
  {
    id: "q02",
    topic: "markup-langs",
    question:
      "Which image format describes shapes as math rather than a grid of pixels?",
    options: [
      "JPG",
      "PNG",
      "WebP",
      "SVG",
    ],
    correctIndex: 3,
    explanation:
      "SVG is a vector format — shapes are stored as math (paths, circles, lines), so they stay sharp at any size. JPG, PNG, and WebP are raster formats that store pixels.",
  },
  {
    id: "q03",
    topic: "markup-langs",
    question:
      "What's the right reach for content that needs to be edited as plain prose but published as HTML?",
    options: [
      "XML",
      "Markdown",
      "JSON",
      "Plain text",
    ],
    correctIndex: 1,
    explanation:
      "Markdown lets you write nearly-plain text with light syntax (# for headings, ** for bold), and tools convert it to HTML on publish. Most technical writing on the web (READMEs, docs sites, blog platforms) uses Markdown as the authoring format.",
  },
  {
    id: "q04",
    topic: "html-structure",
    question:
      "Why does every modern HTML page start with <!doctype html>?",
    options: [
      "It's required for the file to parse",
      "It tells the browser to render in standards mode rather than legacy \"quirks\" mode",
      "It signals which version of HTML the file uses",
      "It's required for the page to load over HTTPS",
    ],
    correctIndex: 1,
    explanation:
      "<!doctype html> switches the browser into standards mode. Without it, browsers fall into quirks mode — a backward-compat rendering path with different box sizing, different margins, and CSS that doesn't behave like you'd expect.",
  },
  {
    id: "q05",
    topic: "html-structure",
    question:
      "Which HTML element is the right wrapper for the primary content of a page (excluding the header, nav, sidebar, and footer)?",
    options: [
      "<div id=\"content\">",
      "<section>",
      "<main>",
      "<article>",
    ],
    correctIndex: 2,
    explanation:
      "<main> represents the primary content unique to this page. There should be exactly one per page. <section> is a thematic grouping; <article> is a self-contained unit (like a blog post). A generic <div> is a last resort when no semantic element fits.",
  },
  {
    id: "q06",
    topic: "html-structure",
    question:
      "Which of these belongs in the <head> of an HTML document?",
    options: [
      "<h1>Site title</h1>",
      "<nav> with the site navigation",
      "<meta name=\"description\" content=\"...\">",
      "A footer with a copyright notice",
    ],
    correctIndex: 2,
    explanation:
      "Meta tags, title, link to stylesheets, and other non-rendered metadata go in <head>. Anything visible to users — headings, navs, footers — goes in <body>.",
  },
  {
    id: "q07",
    topic: "links-media",
    question:
      "When you use target=\"_blank\" on a link to an external site, why should you add rel=\"noopener noreferrer\"?",
    options: [
      "To improve SEO",
      "To prevent the new tab from being able to access your origin via window.opener",
      "To make the link open in a new tab on mobile",
      "To enable HTTPS for the link",
    ],
    correctIndex: 1,
    explanation:
      "Without rel=\"noopener\", the new tab can use window.opener to read parts of your origin page — a security issue. rel=\"noreferrer\" also strips the Referer header. Both are security-001 best practice on any external target=\"_blank\" link.",
  },
  {
    id: "q08",
    topic: "links-media",
    question:
      "What's the correct alt attribute for a purely decorative image (e.g., a flourish or divider)?",
    options: [
      "Omit the alt attribute",
      "alt=\"\" (empty)",
      "alt=\"decorative image\"",
      "alt=\"image\"",
    ],
    correctIndex: 1,
    explanation:
      "Empty alt=\"\" explicitly tells screen readers to skip the image. Omitting alt entirely is invalid and inconsistent across screen readers. \"image\" or \"decorative image\" pollutes the experience with noise.",
  },
  {
    id: "q09",
    topic: "links-media",
    question:
      "Which attribute lets you provide multiple image resolutions and let the browser pick the right one?",
    options: [
      "src-multi",
      "srcset",
      "data-image",
      "media-query",
    ],
    correctIndex: 1,
    explanation:
      "<img srcset=\"img-400.jpg 400w, img-800.jpg 800w\" sizes=\"...\"> tells the browser which versions exist and at what widths. The browser picks the smallest one that fits the layout and current device pixel density.",
  },
  {
    id: "q10",
    topic: "forms",
    question:
      "Which HTML method should a sign-up form use, and why?",
    options: [
      "GET, because it's faster",
      "POST, because it changes server state (creates a new account) and the data shouldn't be in the URL",
      "PUT, because it's idempotent",
      "DELETE, because the form replaces previous data",
    ],
    correctIndex: 1,
    explanation:
      "Sign-up creates server state and contains sensitive data. POST sends the body off-URL, doesn't get cached, doesn't put email/password in browser history, and warns before resubmitting on refresh. GET would expose the data in the URL bar.",
  },
  {
    id: "q11",
    topic: "forms",
    question:
      "Why is a real <label> element preferable to using placeholder text as a field label?",
    options: [
      "Labels are easier to style with CSS",
      "Labels increase the click/tap target, are read by screen readers, and don't disappear when the user types",
      "Placeholders cost extra HTTP requests",
      "Placeholders aren't supported in older browsers",
    ],
    correctIndex: 1,
    explanation:
      "Labels persist while the user types, are reliably announced by screen readers, and let users click the label to focus the input (bigger tap target). Placeholders disappear on input and are inconsistently exposed to assistive tech.",
  },
  {
    id: "q12",
    topic: "forms",
    question:
      "Which input type triggers an email-optimized keyboard on mobile devices?",
    options: [
      "input type=\"text\"",
      "input type=\"string\"",
      "input type=\"email\"",
      "input type=\"contact\"",
    ],
    correctIndex: 2,
    explanation:
      "type=\"email\" shows an @-equipped keyboard on phones and does basic format validation. Picking the right input type is a small piece of code that delivers a much better mobile experience.",
  },
  {
    id: "q13",
    topic: "css-selectors",
    question:
      "Which CSS selector has the highest specificity?",
    options: [
      ".btn.primary",
      "header nav a",
      "#hero",
      "button",
    ],
    correctIndex: 2,
    explanation:
      "ID selectors (#hero) beat any combination of classes or element selectors. Specificity is calculated as (IDs, classes, elements) and compared left-to-right. .btn.primary has 2 classes; header nav a has 3 elements; both lose to a single ID.",
  },
  {
    id: "q14",
    topic: "css-selectors",
    question:
      "When two CSS rules have identical specificity, which one wins?",
    options: [
      "The rule defined earlier in the file",
      "The rule defined later in the file",
      "The rule with !important wins regardless",
      "They cancel each other out",
    ],
    correctIndex: 1,
    explanation:
      "On ties, the later rule wins — that's the cascade. !important does override normal cascade order, but only if it's actually present. The general rule is: same specificity → source order decides.",
  },
  {
    id: "q15",
    topic: "css-selectors",
    question:
      "Which selector targets all <p> elements that are direct children of an <article>?",
    options: [
      "article p",
      "article + p",
      "article > p",
      "article ~ p",
    ],
    correctIndex: 2,
    explanation:
      "The > combinator means \"direct child.\" `article p` matches any descendant. + is the immediate next sibling. ~ is any following sibling. Only `article > p` is specifically direct children.",
  },
  {
    id: "q16",
    topic: "box-model",
    question:
      "With the default box-sizing, if you set width: 200px; padding: 20px; border: 2px solid; — how much horizontal space does the element take up?",
    options: [
      "200px",
      "240px",
      "244px",
      "204px",
    ],
    correctIndex: 2,
    explanation:
      "Default box-sizing is content-box: width applies to content only. Total = 200 + (20×2 padding) + (2×2 border) = 244px. Setting box-sizing: border-box makes width include padding and border, which is why most modern CSS resets enable it globally.",
  },
  {
    id: "q17",
    topic: "box-model",
    question:
      "Which CSS layout method is the right choice for a two-dimensional grid (rows AND columns aligned)?",
    options: [
      "Flexbox",
      "Floats",
      "CSS Grid",
      "Tables",
    ],
    correctIndex: 2,
    explanation:
      "Grid is purpose-built for two-dimensional layout — you define rows and columns simultaneously, and children can span across them. Flexbox is great for one-axis layouts (a row OR a column at a time). Floats and tables are legacy approaches.",
  },
  {
    id: "q18",
    topic: "typography-a11y",
    question:
      "Why is `rem` generally preferred over `px` for sizing on the web?",
    options: [
      "rem renders faster",
      "rem is relative to the root font-size, so layouts scale when users change their default text size",
      "px isn't supported in all browsers",
      "rem produces smaller CSS files",
    ],
    correctIndex: 1,
    explanation:
      "rem (root em) is relative to the <html> font-size. When a user with low vision bumps their browser's default text size up, rem-based layouts scale with them. px-based layouts ignore that setting — a major accessibility miss.",
  },
  {
    id: "q19",
    topic: "typography-a11y",
    question:
      "Which is the \"first rule of ARIA\"?",
    options: [
      "Always use ARIA on every interactive element",
      "Don't use ARIA if a native HTML element does the job",
      "ARIA roles override CSS",
      "Apply ARIA only to images",
    ],
    correctIndex: 1,
    explanation:
      "The first rule of ARIA is: don't use ARIA. A real <button> beats <div role=\"button\"> every time. ARIA is the escape hatch for custom widgets that have no native HTML equivalent — not the starting point for normal markup.",
  },
  {
    id: "q20",
    topic: "typography-a11y",
    question:
      "Which media query helps a user with motion sensitivity?",
    options: [
      "@media (max-width: 600px)",
      "@media (prefers-color-scheme: dark)",
      "@media (prefers-reduced-motion: reduce)",
      "@media (orientation: portrait)",
    ],
    correctIndex: 2,
    explanation:
      "`@media (prefers-reduced-motion: reduce)` reflects an OS-level setting users with motion sensitivity enable. Wrap non-essential animations in `@media (prefers-reduced-motion: no-preference)` so opted-out users see a still version. One of the easiest accessibility wins on the web.",
  },
];
