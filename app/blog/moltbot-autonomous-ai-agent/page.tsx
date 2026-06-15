import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { getPostBySlug } from "../../lib/blog";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";
import BlogPostShell from "../../components/BlogPostShell";

const SLUG = "moltbot-autonomous-ai-agent";
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
          MoltBot is the AI agent that runs my back office. It handles email
          triage, lead research, outreach sequences, weekly reports, content
          scheduling, and meeting prep. I stopped touching most of this work in
          January. It handles about 85% of inbound email without me.
        </p>

        <p>
          I want to be clear about what this is and is not. It is not a
          chatbot. It is not an AGI experiment. It is a collection of 20
          focused skills that run on triggers, do a single job, and either
          finish it or escalate to me. The magic is not in any single skill. It
          is in the fact that all 20 are always on, always watching, and they
          never forget.
        </p>

        <h2>The Core Insight</h2>

        <p>
          Most people trying to build AI agents make the same mistake: they
          build one giant agent that tries to do everything. One big system
          prompt. One big loop. One giant context window. It does not work.
          The model gets confused. The context gets polluted. The cost gets
          insane. And the moment one step fails, the whole thing fails.
        </p>

        <p>
          The alternative is to build many small agents, each with one job and
          a narrow scope. Each agent has its own prompt, its own tools, and
          its own success criteria. When one fails, it fails in isolation. The
          others keep running. You debug one at a time. You improve one at a
          time.
        </p>

        <h2>The 20 Skills</h2>

        <p>
          Here is the actual list, grouped by function.
        </p>

        <h3>Email (5 skills)</h3>

        <ul>
          <li>
            <strong>Triage</strong> — reads every new email, classifies it as
            reply, ignore, escalate, or archive
          </li>
          <li>
            <strong>Autorespond</strong> — drafts and sends replies to common
            categories (pricing, scheduling, support)
          </li>
          <li>
            <strong>Escalate</strong> — flags high-priority threads and drops
            them into a Slack channel with context
          </li>
          <li>
            <strong>Follow-up</strong> — tracks threads I have not replied to
            and nudges me after 48 hours
          </li>
          <li>
            <strong>Unsubscribe</strong> — auto-unsubscribes from cold
            newsletters using their own unsubscribe links
          </li>
        </ul>

        <h3>Lead Generation (4 skills)</h3>

        <ul>
          <li>
            <strong>ICP Research</strong> — reads our target criteria and
            finds matching companies via public data
          </li>
          <li>
            <strong>Contact Enrichment</strong> — pulls LinkedIn, GitHub, and
            email for every lead
          </li>
          <li>
            <strong>Outreach Drafting</strong> — writes first-touch cold
            emails personalized from the target&rsquo;s recent work
          </li>
          <li>
            <strong>Sequence Management</strong> — schedules and sends 3-step
            sequences with the right cadence
          </li>
        </ul>

        <h3>Reporting (3 skills)</h3>

        <ul>
          <li>
            <strong>Weekly Rollup</strong> — compiles a Monday morning digest
            of every vertical
          </li>
          <li>
            <strong>Revenue Watch</strong> — monitors Stripe, alerts on churn
            or anomalies
          </li>
          <li>
            <strong>Win/Loss</strong> — summarizes closed deals and lost deals
            with pattern detection
          </li>
        </ul>

        <h3>Content (4 skills)</h3>

        <ul>
          <li>
            <strong>Calendar Manager</strong> — schedules LinkedIn, Twitter,
            and newsletter posts from a shared queue
          </li>
          <li>
            <strong>Repurposer</strong> — takes a blog post and turns it into
            10 social variants
          </li>
          <li>
            <strong>Distribution</strong> — publishes and cross-posts at
            optimal times per platform
          </li>
          <li>
            <strong>Engagement Watcher</strong> — tracks replies and drafts
            responses for review
          </li>
        </ul>

        <h3>Meetings (4 skills)</h3>

        <ul>
          <li>
            <strong>Prep</strong> — builds a one-page brief on everyone in the
            meeting 30 minutes before
          </li>
          <li>
            <strong>Transcription</strong> — records and transcribes with
            speaker diarization
          </li>
          <li>
            <strong>Action Items</strong> — extracts commitments and
            auto-creates tasks
          </li>
          <li>
            <strong>Follow-up</strong> — drafts the post-meeting thank-you
            with next steps
          </li>
        </ul>

        <h2>The Architecture</h2>

        <p>
          The glue that holds all 20 skills together is n8n. Every skill is an
          n8n workflow. Triggers fire the workflows: new email arrives, cron
          job at 7 AM, webhook from Stripe, form submission.
        </p>

        <p>
          Each workflow calls an LLM (usually Claude for reasoning, GPT-4 for
          drafting) with a narrow system prompt, gives it the context from the
          trigger, and either executes an action or flags for review.
        </p>

        <p>
          Data lives in Supabase. Every action MoltBot takes is logged with a
          skill name, timestamp, input, output, and outcome. The logs table is
          my feedback loop: I read it daily, look for mistakes, and refine
          prompts.
        </p>

        <h2>Function Calling Is the Unlock</h2>

        <p>
          The single most important pattern in MoltBot is function calling.
          Instead of asking the model to output a blob of text and parsing it,
          I define the exact shape of the expected output as a JSON schema and
          let the model fill it in.
        </p>

        <p>
          For example, the Triage skill has a function called{" "}
          <code>classifyEmail</code> that returns a JSON object with fields
          like <code>category</code>, <code>priority</code>, <code>
          suggestedAction</code>, and <code>confidence</code>. The model has
          no choice but to return that shape. Parsing becomes trivial.
        </p>

        <h2>Trust Is Earned Incrementally</h2>

        <p>
          I did not hand MoltBot the keys on day one. Every skill went through
          three stages.
        </p>

        <ol>
          <li>
            <strong>Shadow mode</strong> — MoltBot does the work but only logs
            the output. I check every log for 2 weeks.
          </li>
          <li>
            <strong>Draft mode</strong> — MoltBot actually drafts the action
            (email, post, task) but leaves it in a review queue. I approve
            everything.
          </li>
          <li>
            <strong>Autonomous mode</strong> — MoltBot executes directly, with
            a daily audit log I skim.
          </li>
        </ol>

        <p>
          The cycle for a skill is typically 2 weeks shadow, 2 weeks draft, 2
          weeks audited autonomous, then fully trusted. Six weeks feels slow
          until you realize the alternative is a runaway agent sending cold
          emails at 3 AM to the wrong people.
        </p>

        <h2>The Failure Modes You Need To Plan For</h2>

        <p>
          In order of pain: hallucinated facts in drafts, tool failures that
          the model does not detect, infinite loops on retries, prompt
          injection from inbound emails, and rate limits from upstream APIs.
        </p>

        <p>
          The defenses are not fancy. Every draft gets a fact-check pass from
          a second model. Every tool call has a timeout. Every loop has a max
          iteration count. Every inbound text gets a sanitization pass. Every
          API call has a circuit breaker.
        </p>

        <p>
          Each one of those is five lines of code. Together they are the
          difference between MoltBot running for 6 months and MoltBot sending
          your whole contact list a poem about quantum computing.
        </p>

        <h2>What It Costs</h2>

        <p>
          Token spend: about $180 per month across all 20 skills. n8n cloud:
          $50. Supabase: free tier. Total operating cost: under $250 per
          month. For a full-time CMO/CEO replacement across repetitive work,
          that is a rounding error.
        </p>

        <p>
          If you are building your own version of this, start with one skill.
          Email triage is the best first one — highest frequency, clearest
          success metric, lowest risk. Get it working in shadow mode. Iterate
          on the prompt until you trust it. Then add the next skill.
        </p>
      </BlogPostShell>
    </>
  );
}
