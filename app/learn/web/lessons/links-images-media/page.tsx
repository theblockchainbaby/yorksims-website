"use client";

import LessonShell, {
  Section,
  P,
  Code,
  Inline,
  SubHeading,
} from "../../../../components/LessonShell";

export default function LinksImagesMediaLessonPage() {
  return (
    <LessonShell
      kicker="Lesson · Unit 2 · 8 min read"
      titleMain="Links, images & media,"
      titleAccent="the things that make HTML hypertext."
      subtitle="HyperText Markup Language gets the 'Hyper' from one tag: the anchor. Combine that with images, video, and audio and you've got 95% of what users see on any page."
      backHref="/learn/web/unit-2"
      backLabel="Unit 2 · Document Markup"
      learnHref="/learn/web"
      attribution={null}
      prevLesson={{
        label: "HTML document structure",
        href: "/learn/web/lessons/html-structure",
      }}
      nextLesson={{
        label: "Forms & input",
        href: "/learn/web/lessons/forms-and-input",
      }}
    >
      <Section title="The anchor tag" sectionNumber="01">
        <P>
          Hyperlinks — the thing that makes the web a web — are one tag:{" "}
          <Inline>&lt;a&gt;</Inline> (anchor). The required attribute is{" "}
          <Inline>href</Inline> (the destination).
        </P>
        <Code>{`<a href="https://yorksims.com">YorkSims</a>
<a href="/about">About</a>
<a href="contact.html">Contact</a>
<a href="#section-2">Jump to section 2</a>
<a href="mailto:hi@example.com">Email me</a>
<a href="tel:+15555551234">Call me</a>`}</Code>
      </Section>

      <Section title="Absolute vs relative URLs" sectionNumber="02">
        <P>
          <strong>Absolute</strong> URLs include the whole thing —
          scheme, domain, path.{" "}
          <strong>Relative</strong> URLs are interpreted relative to the
          current page.
        </P>
        <Code>{`Absolute:    https://yorksims.com/about
Root-relative: /about              → start at the site root
Page-relative: about.html          → relative to the current file
Page-up:       ../about.html       → up one folder
Anchor:        #pricing            → same page, scroll to id="pricing"`}</Code>
        <P>
          Rule of thumb: use root-relative (<Inline>/about</Inline>) for
          internal links and absolute (<Inline>https://...</Inline>) for
          external. Page-relative gets weird as soon as your URL structure
          changes.
        </P>
      </Section>

      <Section title="Useful anchor attributes" sectionNumber="03">
        <Code>{`<a href="https://twitter.com/yorksims"
   target="_blank"
   rel="noopener noreferrer">
  Twitter
</a>`}</Code>
        <SubHeading className="mt-6"><Inline>target=&quot;_blank&quot;</Inline></SubHeading>
        <P>
          Opens the link in a new tab. Use sparingly — research shows
          users actually hate this for normal navigation. Use it for
          external links where you want users to stay on your site, or
          for tools where they need both windows.
        </P>
        <SubHeading className="mt-6"><Inline>rel=&quot;noopener noreferrer&quot;</Inline></SubHeading>
        <P>
          Always pair this with <Inline>target=&quot;_blank&quot;</Inline>{" "}
          on external links. Without it, the new tab can use a JavaScript
          back-channel to read parts of your origin page. Security 101.
        </P>
        <SubHeading className="mt-6"><Inline>download</Inline></SubHeading>
        <P>
          Tells the browser to download the file rather than navigate to
          it. Useful for PDFs, ZIPs, anything that&rsquo;s an artifact
          rather than a page.
        </P>
      </Section>

      <Section title="Images — the basics" sectionNumber="04">
        <P>
          One tag, two required attributes:
        </P>
        <Code>{`<img src="/photos/desk.jpg" alt="A clean desk with a laptop and coffee" />`}</Code>
        <SubHeading className="mt-6">The alt attribute</SubHeading>
        <P>
          <Inline>alt</Inline> is the text alternative for the image. It
          shows up when the image fails to load, and is read aloud by
          screen readers. Don&rsquo;t skip it. Don&rsquo;t write{" "}
          <Inline>alt=&quot;image&quot;</Inline> — that&rsquo;s useless. Write
          what the image conveys.
        </P>
        <Code>{`Bad:    <img src="logo.png" alt="logo" />
Good:   <img src="logo.png" alt="YorkSims logo" />

Decorative image (purely visual, no info):  <img src="line.svg" alt="" />`}</Code>
        <P>
          Yes, empty <Inline>alt=&quot;&quot;</Inline> is correct for
          decorative images — it tells the screen reader to skip it
          entirely. Missing alt vs empty alt aren&rsquo;t the same thing.
        </P>
      </Section>

      <Section title="Raster vs vector — pick the right format" sectionNumber="05">
        <Code>{`Raster (pixel grids):
  JPG    — photos, lots of color, lossy compression
  PNG    — anything with transparency or sharp edges, lossless
  WebP   — modern, smaller than JPG/PNG, excellent support
  AVIF   — even newer, even smaller, 2026 support is solid
  GIF    — legacy, animated; use video instead

Vector (math):
  SVG    — logos, icons, simple illustrations — scales infinitely`}</Code>
        <P>
          Default to WebP for photos and SVG for icons. JPG is fine as a
          fallback but it&rsquo;s a 1990s format. PNG only when you need
          transparency.
        </P>
      </Section>

      <Section title="Responsive images — srcset and sizes" sectionNumber="06">
        <P>
          Sending a 4000px-wide image to a phone is a waste. The
          browser&rsquo;s <Inline>srcset</Inline> attribute lets you offer
          multiple resolutions and let the browser pick.
        </P>
        <Code>{`<img
  src="desk-800.jpg"
  srcset="desk-400.jpg 400w, desk-800.jpg 800w, desk-1600.jpg 1600w"
  sizes="(min-width: 768px) 800px, 100vw"
  alt="A clean desk with a laptop and coffee"
/>`}</Code>
        <P>
          That says: I have three sizes of this image, here are their
          widths; at screens 768px and wider I&rsquo;ll display this at
          800px wide, otherwise full viewport. The browser fetches the one
          it needs and ignores the others.
        </P>
        <P>
          Most modern frameworks (Next.js, Astro) have an{" "}
          <Inline>&lt;Image&gt;</Inline> component that generates all of
          this for you. Use it.
        </P>
      </Section>

      <Section title="Video and audio" sectionNumber="07">
        <Code>{`<video controls width="640">
  <source src="trailer.webm" type="video/webm" />
  <source src="trailer.mp4"  type="video/mp4"  />
  Your browser doesn't support video.
</video>

<audio controls>
  <source src="song.mp3" type="audio/mpeg" />
</audio>`}</Code>
        <P>
          You provide multiple <Inline>&lt;source&gt;</Inline> tags so the
          browser can pick the format it can play. Common attributes:{" "}
          <Inline>controls</Inline> (show play/pause UI),{" "}
          <Inline>autoplay muted playsinline</Inline> (for background
          videos — muted is required by most browsers to autoplay),{" "}
          <Inline>loop</Inline>, <Inline>poster=&quot;thumb.jpg&quot;</Inline>{" "}
          (placeholder frame).
        </P>
        <P>
          For anything beyond &ldquo;play this file,&rdquo; reach for a
          hosted service (YouTube, Vimeo, Mux, Cloudflare Stream) rather
          than self-hosting. Streaming, adaptive bitrate, and analytics
          are not problems you want to solve from scratch.
        </P>
      </Section>
    </LessonShell>
  );
}
