import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { getPostBySlug } from "../../lib/blog";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";
import BlogPostShell from "../../components/BlogPostShell";

const SLUG = "llc-operating-agreement";
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
          I structured Caipher AI LLC as a holding company that owns multiple
          operating subsidiaries. I used a standard manager-managed operating
          agreement with some custom terms I regret and a few I am proud of.
          Here is exactly how I set it up, what I would change, and why this
          matters more than people think.
        </p>

        <p>
          This is not legal advice. I am not a lawyer. Hire one. What this
          post is: a real-world walkthrough of the choices I made, the
          tradeoffs I hit, and the questions I wish I had asked my attorney
          earlier.
        </p>

        <h2>Why A Holding Company At All</h2>

        <p>
          If you are building one product, you do not need a holding company.
          A single LLC is fine. I built Caipher as a holding company because
          I am running 10 different verticals and I wanted separation between
          them. Separation matters for three reasons.
        </p>

        <ol>
          <li>
            <strong>Liability isolation.</strong> If the land development
            vertical gets sued, it does not touch the SaaS business.
          </li>
          <li>
            <strong>Sale-ability.</strong> I can sell one subsidiary without
            unwinding the whole company.
          </li>
          <li>
            <strong>Clean accounting.</strong> Each subsidiary has its own
            P&amp;L. When I look at the numbers I can tell which verticals
            earn money and which cost money.
          </li>
        </ol>

        <h2>The Structure</h2>

        <p>
          Caipher AI LLC is a Wyoming holding company. Wyoming because of
          the charging order protection and the low franchise fees. The
          holding company owns 100% of each operating subsidiary. Each
          subsidiary is a Delaware LLC (or Wyoming for the non-tech ones —
          details matter less than people think).
        </p>

        <p>
          I am the sole member of the holding company. The holding company
          is the sole member of each subsidiary. Two-level structure. Simple.
          My attorney talked me out of a more complex series LLC structure
          because the case law is weak and the cost savings did not matter at
          my stage.
        </p>

        <h2>Operating Agreement: What Actually Matters</h2>

        <p>
          An operating agreement is the constitution of your LLC. Most
          founders grab a template, sign it, and never read it again. This
          is a mistake. The clauses that matter most are the ones nobody
          wants to negotiate because they only apply when things go wrong.
        </p>

        <h3>Manager vs member managed</h3>

        <p>
          I went manager-managed with myself as the sole manager. Member
          managed is the default and it works fine if you have one or two
          members and no outside passive investors. Manager managed is
          cleaner when you want to separate ownership from day-to-day
          decision-making.
        </p>

        <h3>Capital contributions</h3>

        <p>
          My first draft said I contributed $1,000 to the LLC at formation.
          My attorney flagged this: if you contribute too little, you cannot
          claim adequate capitalization, which weakens your liability shield.
          I upped it to $10,000 and logged a transfer from my personal
          account to the LLC bank account on formation day.
        </p>

        <h3>Distributions</h3>

        <p>
          This is the one I spent the most time on. The operating agreement
          specifies when and how profits get distributed. Default templates
          say &ldquo;at the discretion of the manager.&rdquo; That sounds
          flexible but it creates tax ambiguity. I put in a minimum annual
          distribution rule: at year-end, the LLC must distribute enough to
          cover each member&rsquo;s estimated tax liability on their share
          of profits.
        </p>

        <p>
          This matters because LLCs are pass-through entities. Even if you
          keep the money in the business, you owe taxes on the profits as if
          you took them home. The minimum distribution rule protects you
          from accidentally owing the IRS more than you can pay.
        </p>

        <h3>Buy-sell provisions</h3>

        <p>
          What happens if I die, become disabled, get divorced, or want to
          sell? The buy-sell section covers it. I kept mine simple: on any
          triggering event, the remaining members (or the company) get a
          right of first refusal at a fair-market valuation set by an
          independent appraiser. This is overkill for a single-member LLC
          but I know it will matter later.
        </p>

        <h2>Equity Splits (When You Have Partners)</h2>

        <p>
          Caipher is single-member. But three of the operating subsidiaries
          have co-founders with equity. The splits we did:
        </p>

        <ul>
          <li>
            Founder equity: vests over 4 years with a 1-year cliff. Same as
            standard Silicon Valley vesting.
          </li>
          <li>
            Accelerated vesting on acquisition: double-trigger. Requires
            both an acquisition and a termination without cause within 12
            months.
          </li>
          <li>
            Pro-rata right on future capital raises: every founder gets the
            right to maintain their percentage.
          </li>
          <li>
            Drag-along and tag-along rights: if the majority wants to sell,
            the minority has to sell (drag), and if the majority sells, the
            minority gets to sell too at the same terms (tag).
          </li>
        </ul>

        <p>
          These are standard clauses. They exist because they prevent the
          most common partnership disasters. Having them in writing from day
          one is much cheaper than trying to add them after a conflict.
        </p>

        <h2>What I Would Do Differently</h2>

        <p>
          Three mistakes I made:
        </p>

        <ol>
          <li>
            <strong>I formed too fast.</strong> I spent $800 on formation
            services before I had a clear sense of the structure. I later
            had to pay another $1,200 to restructure. Slow down. Get the
            structure right before you file anything.
          </li>
          <li>
            <strong>I used an online operating agreement template for the
            first draft.</strong> The template was fine but missing the
            distribution and buy-sell provisions I actually needed. Spend
            the $800 for an attorney to draft it properly. It is cheap
            insurance.
          </li>
          <li>
            <strong>I co-mingled for the first two months.</strong> I paid
            LLC expenses from my personal card because I had not set up the
            business bank account yet. That is a liability shield risk. Do
            not do this. Open the business bank account the week you form
            the LLC.
          </li>
        </ol>

        <h2>Exit Strategy Even If You Are Not Exiting</h2>

        <p>
          Think about the exit when you form. Not because you are planning
          to sell, but because the structure you pick determines how easy
          selling is. If you ever want to sell a subsidiary, the holding
          company structure makes it a clean transaction. If you want to
          take outside investment, the holding company structure lets you
          raise at the subsidiary level without diluting the other
          businesses.
        </p>

        <p>
          Most founders wait until they have an acquisition offer before
          they think about this. By then, it is too late to restructure
          without tax consequences. Start the way you want to end.
        </p>

        <h2>The Receipts</h2>

        <p>
          Caipher AI LLC was formed in May 2025. Holding company plus three
          operating subs at formation. Added two more subs over the next 6
          months. All five run on clean accounting, proper bank separation,
          and the operating agreement pattern above.
        </p>

        <p>
          The full operating agreement template (with my attorney&rsquo;s
          amendments highlighted), the formation checklist, and the bank
          account separation playbook are in the Pro vault. This is the
          single piece of content I wish I had access to when I started.
        </p>
      </BlogPostShell>
    </>
  );
}
