/**
 * Web Foundations Quiz — 20 original questions covering Unit 1 of the
 * YorkSims web development path: internet history, how the web works,
 * DNS/IP/URLs, servers and CMSes, wireframes & UX, responsive design,
 * and the dev workflow.
 *
 * Each question has 4 options, exactly one correct answer, and an
 * explanation shown after the user answers.
 */

export type WebFoundationsTopic =
  | "internet-history"
  | "how-the-web"
  | "dns-urls"
  | "servers-cms"
  | "wireframes-ux"
  | "responsive"
  | "dev-workflow";

export interface QuizQuestion {
  id: string;
  topic: WebFoundationsTopic;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const TOPIC_LABELS: Record<WebFoundationsTopic, string> = {
  "internet-history": "Internet History",
  "how-the-web": "How the Web Works",
  "dns-urls": "DNS, IP & URLs",
  "servers-cms": "Servers & CMSes",
  "wireframes-ux": "Wireframes & UX",
  responsive: "Responsive Design",
  "dev-workflow": "Dev Workflow",
};

export const TOPICS: WebFoundationsTopic[] = [
  "internet-history",
  "how-the-web",
  "dns-urls",
  "servers-cms",
  "wireframes-ux",
  "responsive",
  "dev-workflow",
];

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "q01",
    topic: "internet-history",
    question:
      "What problem was Arpanet originally designed to solve?",
    options: [
      "Letting consumers shop online without a credit card",
      "Keeping computer networks operational even after parts were destroyed",
      "Connecting universities for online courses",
      "Reducing the cost of long-distance phone calls",
    ],
    correctIndex: 1,
    explanation:
      "Arpanet was a U.S. Department of Defense research project to build a decentralized network that would keep working even if parts were damaged. Microwave transmission towers were vulnerable to single-point failures; packet-switched networks routed around damage.",
  },
  {
    id: "q02",
    topic: "internet-history",
    question:
      "Which protocol standardization, adopted in 1983, is often considered the birth of the modern internet?",
    options: [
      "HTML",
      "HTTP",
      "TCP/IP",
      "SMTP",
    ],
    correctIndex: 2,
    explanation:
      "On January 1, 1983 (\"flag day\"), Arpanet switched to TCP/IP, a common protocol that any network could speak. That's the day previously incompatible networks began to interconnect — the modern internet. HTTP and HTML came later, in 1989-91.",
  },
  {
    id: "q03",
    topic: "internet-history",
    question:
      "What is the key distinction between Web 1.0 and Web 2.0?",
    options: [
      "Web 2.0 uses HTTPS by default",
      "Web 2.0 is read-write — users contribute content, not just consume it",
      "Web 2.0 supports mobile devices",
      "Web 2.0 added JavaScript to the browser",
    ],
    correctIndex: 1,
    explanation:
      "Web 1.0 was read-only — static pages, hand-coded HTML, no user accounts. Web 2.0 turned users into contributors via blogs, forums, social media, and user-generated content. JavaScript existed in both eras; mobile and HTTPS are unrelated to the 1.0/2.0 distinction.",
  },
  {
    id: "q04",
    topic: "how-the-web",
    question:
      "Which layer of the OSI model is HTTP at?",
    options: [
      "Layer 4 (Transport)",
      "Layer 3 (Network)",
      "Layer 7 (Application)",
      "Layer 1 (Physical)",
    ],
    correctIndex: 2,
    explanation:
      "HTTP lives at Layer 7, the Application layer — that's where what-you-actually-use protocols live (HTTP, SMTP, DNS, SSH). TCP sits at Layer 4 (Transport), IP at Layer 3 (Network).",
  },
  {
    id: "q05",
    topic: "how-the-web",
    question:
      "Which HTTP method should you use to create a new resource on a server?",
    options: [
      "GET",
      "POST",
      "PUT",
      "HEAD",
    ],
    correctIndex: 1,
    explanation:
      "POST is for creating something — it isn't idempotent (sending it twice creates two records). GET fetches data and shouldn't change state. PUT replaces an existing resource (idempotent). HEAD fetches headers only.",
  },
  {
    id: "q06",
    topic: "how-the-web",
    question:
      "You get a 401 status from an API request. What does that tell you?",
    options: [
      "The resource doesn't exist",
      "You're not authenticated — the request didn't include valid credentials",
      "The server crashed",
      "You're authenticated but lack permission to do this",
    ],
    correctIndex: 1,
    explanation:
      "401 means Unauthorized — the request lacks valid authentication. 403 (Forbidden) means you're authenticated but not allowed to do this. 404 is \"not found.\" 500 means the server blew up.",
  },
  {
    id: "q07",
    topic: "dns-urls",
    question:
      "What does a DNS A record store?",
    options: [
      "The IPv4 address for a domain name",
      "The IPv6 address for a domain name",
      "An email server for the domain",
      "An alias pointing to another domain name",
    ],
    correctIndex: 0,
    explanation:
      "An A record maps a domain name to an IPv4 address. AAAA records map to IPv6. MX records point to email servers. CNAME records create aliases to other domain names.",
  },
  {
    id: "q08",
    topic: "dns-urls",
    question:
      "Which part of this URL is the path? https://blog.yorksims.com/posts/dns?ref=newsletter#chapter-2",
    options: [
      "blog.yorksims.com",
      "/posts/dns",
      "?ref=newsletter",
      "#chapter-2",
    ],
    correctIndex: 1,
    explanation:
      "The path is `/posts/dns` — it tells the server which resource to return. `blog.yorksims.com` is the host, `?ref=newsletter` is the query string, and `#chapter-2` is the fragment (never sent to the server).",
  },
  {
    id: "q09",
    topic: "dns-urls",
    question:
      "Which of these is the difference between a public and a private IP address?",
    options: [
      "Public IPs are IPv6; private IPs are IPv4",
      "Private IPs only work inside a local network; the router translates between them and a public IP",
      "Private IPs are slower",
      "Public IPs are static; private IPs are dynamic",
    ],
    correctIndex: 1,
    explanation:
      "Private IPs (like 192.168.x.x or 10.x.x.x) work only inside a local network. Your router uses NAT (Network Address Translation) to share one public IP across all the devices on your network.",
  },
  {
    id: "q10",
    topic: "servers-cms",
    question:
      "Which of these is a static-vs-dynamic distinction at the server level?",
    options: [
      "Static means HTML, dynamic means JavaScript",
      "Static means the server returns a pre-built file as-is; dynamic means the server runs code to build a response per request",
      "Static is for desktop, dynamic is for mobile",
      "Static can't have images; dynamic can",
    ],
    correctIndex: 1,
    explanation:
      "Static content is served as-is from disk — same bytes for every visitor, fast and cheap. Dynamic content is generated per request, which is necessary for personalization (cart, profile, search results) but costs more compute.",
  },
  {
    id: "q11",
    topic: "servers-cms",
    question:
      "What's the main difference between a traditional CMS (like WordPress) and a headless CMS (like Sanity)?",
    options: [
      "Headless CMSes don't have a database",
      "A headless CMS provides only the data and an editor; you build your own frontend separately",
      "Headless CMSes are only for blogs",
      "Headless CMSes cost more money",
    ],
    correctIndex: 1,
    explanation:
      "A headless CMS provides only the data layer and an editor UI — you build the frontend separately and pull content via an API. A traditional CMS like WordPress bundles the editor AND the page renderer together.",
  },
  {
    id: "q12",
    topic: "wireframes-ux",
    question:
      "What is the difference between UI and UX?",
    options: [
      "UI is for designers; UX is for developers",
      "UI is what the user sees (buttons, fonts, layout); UX is what the user feels (flow, friction, satisfaction)",
      "UI is the desktop version; UX is the mobile version",
      "They're synonyms",
    ],
    correctIndex: 1,
    explanation:
      "UI (User Interface) is the visible surface — colors, type, layout, buttons. UX (User Experience) is the felt outcome — how easy a task is, how frustrating an interaction is. A site can have great UI and terrible UX.",
  },
  {
    id: "q13",
    topic: "wireframes-ux",
    question:
      "What's a wireframe?",
    options: [
      "A debugging visualization of CSS box edges",
      "A low-fidelity sketch of a page showing what goes where, without final colors or fonts",
      "An XML representation of an HTML page",
      "The default browser rendering before CSS loads",
    ],
    correctIndex: 1,
    explanation:
      "A wireframe is a low-fidelity sketch — boxes and lines that decide structure before visual design. The point is to settle layout decisions before committing time to colors, type, and code.",
  },
  {
    id: "q14",
    topic: "responsive",
    question:
      "Which HTML tag is required for responsive layouts to work on mobile browsers?",
    options: [
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<link rel="manifest" href="/manifest.json">',
      '<meta name="format-detection" content="telephone=no">',
    ],
    correctIndex: 1,
    explanation:
      "Without the viewport meta tag, mobile browsers render at a desktop-like width (~980px) and then zoom out. The viewport tag tells the browser to render at the actual device width.",
  },
  {
    id: "q15",
    topic: "responsive",
    question:
      "What does \"mobile-first\" mean in CSS?",
    options: [
      "You write the desktop layout first and then add mobile overrides",
      "You write the mobile layout as the base and use min-width media queries to add desktop styles",
      "You only support phones, not desktops",
      "You use a separate m.example.com mobile site",
    ],
    correctIndex: 1,
    explanation:
      "Mobile-first writes the smallest-screen styles as the base (no media query), then uses min-width media queries to add styles at bigger breakpoints. It pairs naturally with CSS's additive cascade and keeps mobile performance fast.",
  },
  {
    id: "q16",
    topic: "responsive",
    question:
      "Which of these is NOT a typical ingredient of responsive design?",
    options: [
      "Fluid grids (sizes in % or rem)",
      "Flexible images that scale within their container",
      "Media queries that change layout at breakpoints",
      "A separate m.example.com mobile-only site",
    ],
    correctIndex: 3,
    explanation:
      "Separate m-dot mobile sites are a legacy pattern — they split URLs, double maintenance, and aren't responsive. Responsive design means one codebase that flexes for any screen size.",
  },
  {
    id: "q17",
    topic: "dev-workflow",
    question:
      "Which command is most commonly used to save a snapshot of your code changes in git?",
    options: [
      "git push",
      "git commit",
      "git pull",
      "git stash",
    ],
    correctIndex: 1,
    explanation:
      "`git commit` saves a checkpoint of your staged changes with a message. `git push` uploads commits to a remote. `git pull` downloads them. `git stash` temporarily shelves uncommitted work.",
  },
  {
    id: "q18",
    topic: "dev-workflow",
    question:
      "Waterfall and Agile are two project management methodologies. Which statement is most accurate?",
    options: [
      "Waterfall is faster than Agile",
      "Agile uses shorter iterations and embraces changing requirements; Waterfall plans everything up front and resists mid-project change",
      "Waterfall is only used in software; Agile is only used in hardware",
      "Agile has no documentation",
    ],
    correctIndex: 1,
    explanation:
      "Agile works in short iterations (1-2 week sprints) and expects requirements to evolve. Waterfall plans the full scope before building and is hard to change mid-project. Both are still used; Agile dominates modern web work.",
  },
  {
    id: "q19",
    topic: "dev-workflow",
    question:
      "What's the development \"inner loop\"?",
    options: [
      "A for-loop nested inside another for-loop",
      "The Write → Run → Read → Decide cycle developers repeat dozens of times an hour",
      "The CI/CD pipeline that builds and deploys your code",
      "The retrospective at the end of each sprint",
    ],
    correctIndex: 1,
    explanation:
      "The inner loop is the rapid feedback cycle every productive engineer runs: write a small change, run it, read what happened, decide the next change. The tighter and faster this loop is, the better the code that comes out of it.",
  },
  {
    id: "q20",
    topic: "internet-history",
    question:
      "Which technology, predating the web by 20 years, is responsible for the @ symbol in addresses?",
    options: [
      "FTP",
      "Email",
      "USENET",
      "Telnet",
    ],
    correctIndex: 1,
    explanation:
      "Ray Tomlinson sent the first networked email in 1971 and chose @ to separate the user from the host. That convention survived every protocol change since and outdates the World Wide Web (1989-91) by nearly two decades.",
  },
];
