import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { getPostBySlug } from "../../lib/blog";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";
import BlogPostShell from "../../components/BlogPostShell";

const SLUG = "capability-is-not-instruction";
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
        <p>You already live this problem.</p>

        <p>
          The first time an app asked for your camera so you could take a profile
          photo, you tapped allow. From that moment the app had the camera. Not
          the camera for a profile photo. The camera. What it does with it after
          that runs on the honor system. The phone enforced a promise, not a
          boundary.
        </p>

        <p>
          Most of the time nothing bad happens. But the gap is real and you can
          feel it. You granted one thing and handed over everything. The
          permission was coarse. The use was unbounded. The only thing standing
          between &ldquo;take my photo&rdquo; and &ldquo;watch me scroll&rdquo;
          is the app choosing to behave.
        </p>

        <p>Now point that same gap at an AI agent.</p>

        <p>
          We are about to hand software agents the keys to real things. Your
          email. Your calendar. Your files. Your payments. Soon your camera and
          your microphone. And almost everyone is doing it with that same coarse
          grant, dressed up. You give the agent a pile of tools, and you tell it
          the rules in a prompt. Do not send email without asking. Never touch
          production. Only look when I say so.
        </p>

        <p>A prompt is a request. It is not a guarantee.</p>

        <p>
          I watched an agent on a team I know send three promotional emails to
          150,000 inboxes that nobody asked it to send. No one wrote
          &ldquo;send these&rdquo; anywhere. The agent read a to do list,
          decided the list was a plan, and the send email tool was sitting right
          there on its key ring. So it sent. The instruction not to was never the
          thing holding the line. There was no line.
        </p>

        <p>
          That is the whole idea behind Nia, and it fits in one sentence.{" "}
          <strong>Capability is not instruction.</strong> Telling an agent not to
          do something, and not handing it the key to do that something, are not
          the same. The first is a sentence the model is free to misread under
          pressure. The second is a fact about the world the agent lives in.
        </p>

        <h2>What a fence looks like</h2>

        <p>
          Nia is a small local runtime. A worker is a manifest that lists the
          actions it may take. The runtime refuses anything not on the list. An
          action that is not declared does not exist for that worker. When a
          worker needs judgment, it marks that step and gates it behind a
          condition the prior steps have to make true. Most workers never invoke
          a model at all.
        </p>

        <p>
          To make the point in the place people actually fear it, I built a
          worker called <code>presence-glance</code>. The camera is a declared,
          gated capability. A cheap deterministic motion read decides whether the
          camera is even considered. The camera step runs only when its condition
          is true. Never on a schedule. Never by default.
        </p>

        <p>Here is the worker, in full:</p>

        <pre>
          <code>{`permissions:
  - sensor:read
  - camera:read

actions:
  - id: check-motion
    kind: deterministic
    impl: builtin:sensor.motion_event
    inputs:
      detected: "{{ config.simulate_motion }}"

  - id: glance
    kind: judgment
    condition: "actions.check-motion.results.detected == true"
    impl: builtin:vision.describe_frame
    inputs:
      reason: confirm a person is at the door`}</code>
        </pre>

        <p>
          By default there is no motion, so the gate stays shut and the camera is
          never touched:
        </p>

        <pre>
          <code>{`check-motion  det  success  source=front-door, detected=False
glance        jud  skipped  condition false, camera not invoked`}</code>
        </pre>

        <p>
          Flip the motion on and ask for a dry run. The gate opens, and the
          camera still does not. A dry run opens no camera, ever. That is a hard
          rule, not a setting:
        </p>

        <pre>
          <code>{`check-motion  det  success  detected=True
glance        jud  success  captured=False, (dry-run preview; camera not opened)`}</code>
        </pre>

        <p>
          Take three things away from a worker and the runtime stops it before it
          runs. Remove <code>camera:read</code> from the permissions and it
          refuses to load. Remove the condition on the camera step and it refuses
          to load, because an ungated camera is the thing we are here to prevent.
          Leave the condition false and the step is skipped and the camera is
          never reached. The fence is checked at the door, not asked for politely
          once you are inside.
        </p>

        <h2>What this is, and what it is not</h2>

        <p>
          I am not going to oversell it. Nia today is laptop automation. It runs
          your morning brief, syncs your inbox, watches a few services. It does
          not stop an app on your phone from abusing the camera you already
          granted it. That is an operating system sandbox problem, and a laptop
          runtime does not fix it.
        </p>

        <p>
          And <code>presence-glance</code> has no real lens wired yet. On a real
          run it reaches the capture point and honestly tells you there is no
          adapter, rather than pretending it saw something. The lens is the easy
          part. The fence is the point. The camera step cannot run unless the
          manifest granted the camera and the condition was true, and a preview
          never opens it. That part is real, it is tested, and it is the part
          that matters.
        </p>

        <p>
          You learned to distrust a coarse permission the day your phone asked
          for your camera. We are about to give that same coarse permission to
          things far more capable than an app. The answer is not a better
          promise. It is a fence.
        </p>

        <p>
          The runtime is open source.{" "}
          <a href="https://github.com/theblockchainbaby/nia">
            github.com/theblockchainbaby/nia
          </a>
        </p>
      </BlogPostShell>
    </>
  );
}
