import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { getPostBySlug } from "../../lib/blog";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";
import BlogPostShell from "../../components/BlogPostShell";

const SLUG = "building-vitros-saas";
const post = getPostBySlug(SLUG)!;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${post.title} — YorkSims.com`,
    description: post.excerpt,
    path: `/blog/${SLUG}`,
    type: "article",
    publishedTime: post.isoDate,
    authors: [post.author],
    tags: post.tags,
  }),
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${SLUG}` },
          ]),
        ]}
      />
      <BlogPostShell post={post}>
        <p>
          Thirty days. Zero to production SaaS. Not a landing page. Not a
          Figma mockup. A real multi-tenant app with auth, payments, role-based
          access, offline PWA capability, and a database you can stress-test. I
          am going to walk you through exactly how I built VitrOS and what I
          would change if I started over.
        </p>

        <p>
          Before the code: VitrOS is a visual ops system for small teams. Think
          Linear meets Notion but cheaper and focused on shipping. The market
          is saturated, which is fine, because my goal was not to win the
          market. My goal was to prove I could go from an empty repo to a
          paying customer in thirty days.
        </p>

        <h2>The Stack Decision</h2>

        <p>
          People love to debate this forever. I did not have time. Here is the
          stack I shipped with, and why.
        </p>

        <ul>
          <li>
            <strong>Next.js 16</strong> with the App Router. React Server
            Components give you the best of both worlds: fast page loads and
            dynamic data without hydration nightmares.
          </li>
          <li>
            <strong>PostgreSQL</strong> hosted on Neon. Branching databases
            means I can spin up a staging copy in seconds.
          </li>
          <li>
            <strong>Prisma</strong> as the ORM. Yes there are faster options.
            No I do not care. Prisma has the best developer experience and the
            migration story is solved.
          </li>
          <li>
            <strong>NextAuth v5</strong> for auth. Handles email, OAuth, and
            sessions without me touching a cookie.
          </li>
          <li>
            <strong>Stripe</strong> for payments. Stripe Checkout for the first
            paying customer, then migrated to a custom flow in week three.
          </li>
          <li>
            <strong>Tailwind 4</strong> for styling. Design tokens as CSS
            variables. No CSS-in-JS.
          </li>
          <li>
            <strong>Vercel</strong> for deployment. Git push and it is live in
            90 seconds.
          </li>
        </ul>

        <p>
          The whole stack is boring and battle-tested. That is the point. When
          you are racing a deadline, boring infrastructure lets you spend your
          energy on the parts that actually matter: the product.
        </p>

        <h2>Week 1 — Schema and Auth</h2>

        <p>
          The temptation on day one is to start wireframing. Do not. Start with
          the database schema. Everything else downstream depends on it. If you
          get the schema wrong, you will refactor for weeks.
        </p>

        <p>
          VitrOS has five core tables: <code>User</code>, <code>Workspace</code>,{" "}
          <code>Membership</code>, <code>Project</code>, and <code>Task</code>.
          The Membership table is the key to multi-tenancy. Every query in the
          app joins through Membership to filter by workspace. If you skip this
          step you will build a single-tenant app by accident and regret it
          later.
        </p>

        <p>
          I spent the first three days on Prisma schema design. I threw away
          two drafts. Day four I was writing seed scripts and day five I had
          NextAuth v5 wired to Google and email. By the end of week one I had
          signup, login, workspace creation, invite flows, and role-based
          access control. Zero UI. Just database and middleware.
        </p>

        <h3>The multi-tenant pattern that saved me</h3>

        <p>
          Every query in the app runs through a helper called{" "}
          <code>getScopedPrisma(userId, workspaceId)</code> that checks
          Membership before returning a Prisma client. It is not the fastest
          approach but it is impossible to accidentally leak data across
          workspaces. I slept better because of it.
        </p>

        <h2>Week 2 — The Product UI</h2>

        <p>
          With the backend locked, week two was pure UI. I built the shell
          first: sidebar, top nav, workspace switcher. Then the core workflow:
          create project, add tasks, drag to reorder, mark complete. I used
          Framer Motion for the animations and shadcn/ui for the base
          components.
        </p>

        <p>
          Here is the rule I follow in UI work: if it takes more than two hours
          to build a component, stop and find a library. Your job is to ship.
          It is not to reimplement a drag-and-drop library for the fifth time
          in your career.
        </p>

        <h2>Week 3 — Payments and Edge Cases</h2>

        <p>
          Payments are where most indie SaaS projects die. Not because Stripe
          is hard — Stripe is actually great — but because you have to think
          about so many edge cases. Upgrades. Downgrades. Cancellations. Failed
          charges. Prorations. Refunds. Trial expirations.
        </p>

        <p>
          My shortcut: launch with monthly billing only, no trials, no coupons,
          no proration. One price. One plan. It is not optimal for revenue. It
          is optimal for shipping in 30 days. You can always add complexity
          later.
        </p>

        <p>
          The Stripe webhook handler is the most important piece of code in a
          SaaS app and the one people always skip. Your database state must
          follow Stripe, not the other way around. When a webhook comes in, you
          update your local subscription state. When a user clicks cancel, you
          call Stripe and wait for the webhook to confirm. Do not trust the UI
          response.
        </p>

        <h2>Week 4 — PWA, Polish, and Shipping</h2>

        <p>
          Week four was the scary week. This is where most projects pile on
          last-minute features and end up with a broken launch. I forced myself
          to do the opposite: feature freeze on day 22, then only polish and
          PWA work.
        </p>

        <p>
          The PWA piece was the most fun. Next.js 16 has first-class PWA
          support with a service worker that handles offline caching for the
          core routes. I cached the app shell, the user profile, and the most
          recent projects. If the user loses connection, they can still see
          their workspace and queue writes that sync when they reconnect.
        </p>

        <p>
          The queue is a simple IndexedDB store. Every mutation goes into the
          queue first, then fires off to the server. If the server fails, the
          mutation stays in the queue and retries. If it succeeds, the queue
          entry is cleared. This gives VitrOS the feel of a native app without
          any of the native app overhead.
        </p>

        <h2>What I Would Do Differently</h2>

        <p>
          A few things I got wrong.
        </p>

        <ol>
          <li>
            <strong>I used Prisma migrations in production too early.</strong>{" "}
            I should have used raw SQL for the first 30 days. Prisma migrations
            are great until you need to do a zero-downtime schema change at 2
            AM. Use raw SQL until you are confident the schema is stable.
          </li>
          <li>
            <strong>I skipped observability.</strong> No logging. No error
            tracking. When the first bug hit production I had to reproduce it
            locally from memory. Add Sentry or OpenTelemetry on day one, not
            day thirty.
          </li>
          <li>
            <strong>I built the admin panel last.</strong> I should have built
            it first. Every SaaS needs a way for the founder to manually fix
            data, grant access, and debug users. Having to SSH into production
            to run queries on day 15 was not fun.
          </li>
          <li>
            <strong>I underpriced the first plan.</strong> I launched at $12
            per seat because I was scared to charge more. The first ten
            customers would have paid $40 per seat without blinking. Price
            reflects perceived value. Do not underprice out of fear.
          </li>
        </ol>

        <h2>The Receipts</h2>

        <p>
          30 days from empty repo to production. First paying customer on day
          18. First $1k MRR on day 27. As of this post: $4,200 MRR and
          climbing. The full repo is public on GitHub along with the
          Prisma schema, the Stripe webhook handlers, and the NextAuth v5
          config.
        </p>

        <p>
          The real lesson is not the tech stack. The real lesson is that 30
          days is plenty of time to ship something real if you stop treating
          infrastructure decisions as identity-defining. Pick boring tools.
          Ship. Iterate.
        </p>
      </BlogPostShell>
    </>
  );
}
