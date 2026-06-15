import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { getPostBySlug } from "../../lib/blog";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";
import BlogPostShell from "../../components/BlogPostShell";

const SLUG = "dualpay-xrp-ledger";
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
          DualPay is the payment system I built to move money the way the
          internet should move money: fast, cheap, and without caring whether
          the source is dollars or crypto. It runs on the XRP Ledger for
          settlement, plugs into Stripe for fiat rails, and supports
          stablecoins for cross-border transfers. Let me walk through how it
          actually works.
        </p>

        <h2>Why XRPL</h2>

        <p>
          I did not start with a religious attachment to XRPL. I started with
          a requirement: settle a payment in under 5 seconds, with fees under
          a penny, and with a path to fiat on both ends. That requirement
          killed Bitcoin (too slow, too expensive), killed Ethereum L1 (gas
          fees alone destroy the economics), and left me with either an L2
          like Base or an L1 designed for payments. XRPL is designed for
          payments.
        </p>

        <p>
          Settlement on XRPL is typically 3 to 5 seconds. Fees are
          fractional pennies. It has native decentralized exchange
          functionality, which I use to swap between currencies during a
          transfer. And it has a well-documented API that does not require
          running a node.
        </p>

        <h2>The Three Rails</h2>

        <p>
          DualPay runs three parallel rails for the same transfer. The
          frontend does not care which one fires.
        </p>

        <ol>
          <li>
            <strong>XRPL native</strong> — for users who already hold XRP or
            issued tokens on XRPL. The fastest path.
          </li>
          <li>
            <strong>Stablecoin</strong> — RLUSD and issued USD tokens on
            XRPL. Most users want this because they do not want exposure to
            XRP price volatility during the 5-second transfer.
          </li>
          <li>
            <strong>Fiat</strong> — Stripe ACH or card in, Stripe payout out.
            This rail exists because some users still want a &ldquo;looks
            like a bank&rdquo; experience.
          </li>
        </ol>

        <p>
          The routing decision is made at checkout based on what the sender
          has and what the receiver wants. If both sides are XRPL-native, the
          transfer is a single transaction. If the sender is fiat and the
          receiver wants stablecoin, DualPay bridges through Stripe for fiat
          in, a market-making account on XRPL to acquire the stablecoin, and
          a direct transfer to the receiver.
        </p>

        <h2>Handling the Volatility Window</h2>

        <p>
          The most dangerous 5 seconds in any crypto-backed payment is
          between &ldquo;fiat received&rdquo; and &ldquo;crypto delivered.&rdquo;
          In that window, prices can move. If I quote a user $100 for 100
          USDC and by the time I settle I only get 99.5 USDC, somebody eats
          the difference.
        </p>

        <p>
          DualPay handles this two ways. For small transfers (under $500),
          I keep a warm inventory of stablecoins and settle against it. The
          inventory rebalances in the background every hour. For large
          transfers, the quote includes a 0.3% slippage buffer and any unused
          buffer goes back to the user at settlement.
        </p>

        <p>
          The inventory approach has risk: I am holding stablecoins I have
          not sold yet. The reconciliation process runs every 15 minutes,
          matches incoming fiat to inventory used, and rebalances
          automatically via a market order on the XRPL DEX.
        </p>

        <h2>The XRPL Integration Layer</h2>

        <p>
          I use the <code>xrpl.js</code> library with a set of wrapper
          functions that enforce idempotency. Every payment gets a unique
          internal ID that is stored in the transaction memo field. Before
          submitting, I check the ledger for an existing transaction with
          that memo. If found, I return success. If not, I submit and wait
          for validation.
        </p>

        <p>
          Idempotency matters because network retries are a fact of life. If
          the user&rsquo;s browser disconnects mid-submit, I cannot
          double-charge them. The memo check is the safety net.
        </p>

        <h2>Reconciliation Is Most Of The Work</h2>

        <p>
          When you build a payment system, you think the hard part is the
          happy path. It is not. The hard part is: a transfer was initiated,
          status is pending, what really happened?
        </p>

        <p>
          DualPay has a reconciliation service that runs every 30 seconds. It
          takes every pending transfer, queries both sides (Stripe for fiat
          legs, XRPL for crypto legs), and updates the status based on
          observed ground truth. It handles partial failures, double-submits,
          stuck transactions, and network reorgs.
        </p>

        <p>
          About 1 in 400 transfers needs manual intervention from this
          service. The alternative is 1 in 400 transfers silently going into
          a bad state forever. I&rsquo;ll take the operational cost.
        </p>

        <h2>Compliance Surface</h2>

        <p>
          I am not going to pretend I can ignore compliance. DualPay only
          onboards businesses through a vetted KYB flow via Persona. Senders
          are screened against OFAC lists using a third-party provider.
          Every transfer over $3,000 triggers a holding period until manual
          review.
        </p>

        <p>
          This is not flashy work. It is the work that lets you actually
          operate. Skip it at your peril.
        </p>

        <h2>What I Would Build Differently</h2>

        <p>
          If I started over today, I would put the compliance layer before
          the routing layer. Right now routing decides the rail, then
          compliance checks. That means I sometimes quote a transfer that
          compliance later blocks. If compliance runs first, the UX gets
          cleaner.
        </p>

        <p>
          I would also spend more time on the DEX integration upfront.
          Pulling market liquidity from XRPL DEX is not free — you can get
          filled at worse rates than expected if the book is thin. A
          better-integrated quote engine would protect margin.
        </p>

        <h2>The Numbers</h2>

        <p>
          Median settlement time: 4.2 seconds. Median fee: 3 cents. Failure
          rate: 0.25% of transfers fall into the manual queue. Volume today:
          mid-five-figures per day. Not massive. But growing, and every
          transaction has settled correctly so far.
        </p>

        <p>
          The repo, the reconciliation service code, the idempotency pattern,
          and the compliance integration notes are in the Pro vault. If you
          are building a payment system on XRPL, start with the
          reconciliation service. It is the one component nobody writes
          about until they need it.
        </p>
      </BlogPostShell>
    </>
  );
}
