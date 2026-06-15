import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { getPostBySlug } from "../../lib/blog";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";
import BlogPostShell from "../../components/BlogPostShell";

const SLUG = "d1-to-entrepreneur";
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
          I played D1 basketball. I went pro overseas in Ankara, Turkey. I
          came back and started building technology companies. People ask me
          how the transition worked and the answer is always the same: the
          discipline you built as an athlete is the biggest unfair advantage
          you have as a founder, and it is not the one you think it is.
        </p>

        <h2>It Is Not About Grit</h2>

        <p>
          Every former athlete I know talks about grit. Grit is real, grit
          matters, grit is a piece of it. But grit is not the thing. The
          thing is something more boring and more valuable: repetition under
          supervision.
        </p>

        <p>
          For most of my life I did the same drills 500 times a week with
          someone watching and correcting me. My shooting form, my footwork,
          my defensive slides, my conditioning. Every single one was
          deliberate practice with feedback. That is what I brought to
          entrepreneurship. Not the willingness to suffer. The willingness to
          do the same thing every day, measure it, and change one thing.
        </p>

        <p>
          Most founders cannot do this. They pivot every week. They chase
          the new shiny thing. They never see any single experiment through.
          They confuse activity with progress. Athletes know the difference.
        </p>

        <h2>Ankara Taught Me Adaptation</h2>

        <p>
          I signed a contract to play for a club in Ankara. Different
          country, different language, different food, different style of
          basketball. I had a week to figure it out.
        </p>

        <p>
          The first month was miserable. I could not communicate with my
          teammates on offense. The refs called things I had never seen
          called in college. The coach wanted me to play a role that was
          not my role. I thought I had made a mistake.
        </p>

        <p>
          The second month I stopped trying to force my old game and
          started learning their game. I watched film of the other European
          leagues every night. I asked the coach what he wanted in
          situations I would have read differently. I learned 20 words of
          Turkish that covered all the on-court communication. I started
          playing well.
        </p>

        <p>
          That whole experience is what building a business feels like every
          day. You land in an environment where you do not know the rules.
          You have a week to figure out enough to survive. Then you have a
          month to start winning. You do not get to bring your old playbook.
          You learn the new one or you go home.
        </p>

        <h2>What Transfers Directly</h2>

        <ol>
          <li>
            <strong>Morning routines.</strong> Waking up at 5:30 and doing
            the same routine for 6 years in college built a nervous system
            that does hard things before my brain wakes up. I write code at
            6 AM without checking my feelings about it.
          </li>
          <li>
            <strong>Ignoring noise.</strong> Athletes get coached to ignore
            the crowd. Founders need to ignore Twitter, the news, the
            chatter, the opinions. Same muscle.
          </li>
          <li>
            <strong>Film sessions.</strong> Watching film is just code
            review for basketball. The discipline of reviewing your own
            work unflinchingly, in front of coaches who will call out every
            mistake, is how you get better. I still do this with my code
            every Friday. I call it a film session.
          </li>
          <li>
            <strong>Conditioning through the pain wall.</strong> Preseason
            conditioning teaches you that the pain wall is a signal, not a
            stop sign. When you hit the wall in a startup — when funding is
            low or the launch flopped — the body knows it has been in
            harder situations and keeps going.
          </li>
          <li>
            <strong>Playing through injuries.</strong> In basketball, you
            rarely play at 100%. You play at 85% because your ankle is
            taped and your knee is sore. Founders who wait to feel 100%
            never ship.
          </li>
        </ol>

        <h2>What Does Not Transfer</h2>

        <p>
          I am going to be honest about this because most athlete-to-founder
          posts lie. Several things do not transfer.
        </p>

        <ul>
          <li>
            <strong>The physical validation loop.</strong> In basketball,
            you know within 40 minutes whether you played well. In a
            startup, the feedback loop is months or years. Athletes crave
            fast feedback and building a business is slow. Learning to
            tolerate slow feedback is the hardest transition.
          </li>
          <li>
            <strong>The binary scoreboard.</strong> Games end. Startups do
            not. There is no final whistle. You have to define your own
            success criteria and live with the ambiguity of never having an
            official scorekeeper.
          </li>
          <li>
            <strong>The team locker room.</strong> Startups are lonely.
            Basketball teams are together 12 hours a day. The camaraderie of
            a locker room is something I miss every day, and most founders
            who played team sports feel the same.
          </li>
        </ul>

        <h2>The Mistake Most Athletes Make</h2>

        <p>
          Most former athletes I see transitioning into business make the
          same mistake: they treat business like a game with clear rules.
          Business does not have clear rules. The refs are market forces,
          customer behavior, and competitors. They do not blow whistles.
          They just shut down your company one day and you realize the game
          was over.
        </p>

        <p>
          The adjustment is to stop looking for rules and start looking for
          principles. Rules tell you what to do in a known situation.
          Principles tell you how to act in an unknown one. Athletes are
          great at executing known plays. Founders need to build principles
          and apply them to situations nobody has seen before.
        </p>

        <h2>The Unfair Advantage</h2>

        <p>
          Here is the actual unfair advantage. It is not grit. It is not
          discipline. It is not routine. It is this: athletes know what it
          feels like to get better at something because they repeated it
          for 10,000 hours under someone who knew what they were doing.
          Most people have never experienced deliberate improvement at that
          scale. They think they have. They have not.
        </p>

        <p>
          When an athlete starts working on a business skill — writing,
          coding, sales, marketing — they apply the same model. They find a
          coach. They practice daily. They get feedback. They measure
          progress. They do not pivot. They do not quit. And in 18 months
          they are better at that skill than 95% of the people who have
          been doing it for 10 years.
        </p>

        <p>
          That is the advantage. If you are an athlete thinking about
          building a company, stop reading founder Twitter. Stop looking for
          the hack. Pick one skill you need. Find a coach. Practice it
          daily. Watch the film. In 18 months you will look up and realize
          you are dangerous.
        </p>

        <h2>The Bridge</h2>

        <p>
          The Athlete vertical on YorkSims is a direct bridge. If you played
          college ball, pro overseas, or high school at a serious level and
          you are transitioning into tech, business, or investing, the
          playbook is there. The mental models, the tactical playbooks, and
          the network of other athletes doing the same transition.
        </p>

        <p>
          The discipline got you to D1. It will get you further than you
          think in the business world. The difference is you have to pick
          the right thing to be disciplined about.
        </p>
      </BlogPostShell>
    </>
  );
}
