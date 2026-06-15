import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { getPostBySlug } from "../../lib/blog";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";
import BlogPostShell from "../../components/BlogPostShell";

const SLUG = "animation-engine-fal-ai";
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
          Apple ships a launch page every year for a new product and every
          year it looks like a $2 million project. It is not. It is a
          scroll-driven animation where each frame is a pre-rendered image
          triggered by scroll position. The technique is 10 years old. The
          expensive part has always been the frames: you had to shoot a
          product, render thousands of variations, and stitch them into a
          sequence. I built an automated pipeline that does the whole thing
          from a single product photo. I call it the Animation Engine. Here
          is how it works.
        </p>

        <h2>The Stack</h2>

        <ul>
          <li>
            <strong>fal.ai Nano Banana 2</strong> — fast image-to-image model
            for generating variations from a single source image
          </li>
          <li>
            <strong>Kling 3.0</strong> — state-of-the-art image-to-video
            model that generates smooth motion between keyframes
          </li>
          <li>
            <strong>ffmpeg</strong> — the Swiss army knife for slicing,
            reframing, and extracting frames
          </li>
          <li>
            <strong>Python</strong> — the glue (<code>engine.py</code>,
            about 600 lines)
          </li>
          <li>
            <strong>Scroll animation harness</strong> — a small React +
            Framer Motion component on the frontend
          </li>
        </ul>

        <h2>The Pipeline</h2>

        <p>
          The engine takes a single product photo and a creative brief. It
          outputs a folder of 240 numbered frames at 2560×1440, ready to
          drop into a scroll-driven component. The pipeline has seven
          stages.
        </p>

        <ol>
          <li>
            <strong>Source prep.</strong> Strip the background from the
            input photo, upscale to 2K, normalize the lighting.
          </li>
          <li>
            <strong>Keyframe generation.</strong> Generate 8 keyframes using
            Nano Banana 2. Each keyframe shows the product in a different
            angle or state (rotated, exploded, components highlighted).
          </li>
          <li>
            <strong>Motion interpolation.</strong> Feed each consecutive pair
            of keyframes into Kling 3.0 to generate a 30-frame transition
            video between them.
          </li>
          <li>
            <strong>Video stitching.</strong> Concatenate the 7 transition
            videos into one long video with ffmpeg.
          </li>
          <li>
            <strong>Frame extraction.</strong> Extract every frame of the
            final video as a PNG. ffmpeg again.
          </li>
          <li>
            <strong>Frame cleanup.</strong> Run every frame through a
            consistency pass that fixes color drift (Kling sometimes
            shifts color over long sequences).
          </li>
          <li>
            <strong>Packaging.</strong> Generate a manifest JSON that maps
            scroll position to frame number.
          </li>
        </ol>

        <h2>Why This Works</h2>

        <p>
          The reason traditional scroll-driven animations are expensive is
          that you need physically accurate renders of a real product. You
          need a 3D model of the product, a renderer, and an artist to pose
          it. The Animation Engine replaces all of that with image-to-video
          AI.
        </p>

        <p>
          The tradeoff is that the result is not physically accurate. It is
          perceptually accurate. The viewer sees a product rotating smoothly
          with believable lighting, and their brain fills in the rest. For
          90% of product launches this is good enough.
        </p>

        <p>
          The 10% where this does not work: precision hardware (watches,
          cameras, medical devices) where every physical detail matters. For
          that you still need traditional rendering.
        </p>

        <h2>The Color Drift Problem</h2>

        <p>
          Kling is amazing but it has a bug: over a long sequence, colors
          drift. The product starts red and by frame 200 it is rust-orange.
          For a scroll animation this is unacceptable.
        </p>

        <p>
          The fix is a two-step process. First, I sample the product color
          from the first frame and store it. Then every frame goes through
          a color-correction pass that clamps the dominant hue within a
          tolerance. This is not fancy image processing — it is a 20-line
          NumPy function. It works because the product is the dominant
          object in each frame and the background is already transparent.
        </p>

        <h2>The Frontend Component</h2>

        <p>
          The frontend is surprisingly simple. A scroll listener, a frame
          index, an image element. On scroll, calculate the scroll progress,
          map it to a frame number, update the image source. Browser
          caches the images after the first scroll-through.
        </p>

        <p>
          Key detail: preload the first 60 frames on page load so the
          initial scroll feels snappy. Lazy-load the rest as the user
          scrolls past them. A 240-frame sequence at 150KB per frame is
          36MB total. Way too much to ship on page load. Progressive
          preload makes it feel instant.
        </p>

        <h2>The Math on Cost</h2>

        <p>
          For a 240-frame sequence:
        </p>

        <ul>
          <li>8 keyframes from Nano Banana 2: $0.40</li>
          <li>7 transition videos from Kling 3.0: $14.00</li>
          <li>Frame extraction and cleanup: free (local)</li>
          <li>Total per animation: about $14.50</li>
        </ul>

        <p>
          The same animation done traditionally with a 3D artist would cost
          $3,000 to $8,000 and take a week. The engine ships it in 90
          minutes for $14.50. The economics are not close.
        </p>

        <h2>Where It Breaks</h2>

        <p>
          The engine breaks on four kinds of products.
        </p>

        <ol>
          <li>
            <strong>Text-heavy products.</strong> Kling will scramble small
            text over a long sequence. Not fixable. I exclude any product
            where text is part of the visual story.
          </li>
          <li>
            <strong>Translucent or refractive materials.</strong> Glass,
            ice, water. The AI models do not understand refraction well and
            the frames end up dreamy in a bad way.
          </li>
          <li>
            <strong>Human faces.</strong> Nano Banana is good with faces but
            the video model introduces subtle identity drift over 200
            frames. People in the product become uncanny. I exclude faces.
          </li>
          <li>
            <strong>Very simple products with symmetric geometry.</strong>{" "}
            Spheres, simple cylinders. The AI has trouble distinguishing
            keyframes and the transitions collapse into visual mush.
          </li>
        </ol>

        <h2>What I Would Build Next</h2>

        <p>
          Two things are on the roadmap.
        </p>

        <p>
          First: a web-based version of the engine that non-engineers can
          use. Upload a product photo, type a brief, wait 90 minutes, get
          a scroll animation. I am building this on Next.js with a queue
          worker and a progress UI.
        </p>

        <p>
          Second: an interpolation layer that uses optical flow between AI
          keyframes instead of Kling for the transitions. Kling is expensive
          and sometimes inconsistent. Classical optical flow is free and
          deterministic. For small motions it should work beautifully.
        </p>

        <h2>Receipts</h2>

        <p>
          I have shipped 7 product launch pages with the Animation Engine.
          Total cost across all of them: under $120. Total traditional cost
          I avoided: probably $30,000. One of the pages has been featured
          on design showcase sites. None of the viewers have clocked that
          the animation is AI-generated.
        </p>

        <p>
          The full <code>engine.py</code>, the React scroll component, the
          color correction code, and a sample animation output are in the
          Pro vault. If you are building a product launch page in the next
          six months, this pipeline will save you more than the Pro
          membership cost 100 times over.
        </p>
      </BlogPostShell>
    </>
  );
}
