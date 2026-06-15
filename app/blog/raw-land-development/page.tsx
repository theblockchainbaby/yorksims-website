import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { getPostBySlug } from "../../lib/blog";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";
import BlogPostShell from "../../components/BlogPostShell";

const SLUG = "raw-land-development";
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
          Nobody teaches this. You can find a thousand YouTube videos on
          flipping houses and zero on developing raw land. Raw land is the
          wild west of real estate and the people who know how to do it are
          too busy doing it to make content about it. I bought a piece of
          raw land, fought the county, dug a well, installed a septic,
          trenched in power, and lived to tell the tale. Here is what that
          actually looks like.
        </p>

        <h2>Why Raw Land At All</h2>

        <p>
          Raw land is cheap. I paid $38,000 for 10 acres with road access and
          no utilities. Comparable finished lots in the same county were
          going for $180,000. The difference is the work, the permits, and
          the risk. If you can do the work (or afford it), the margin is
          real.
        </p>

        <p>
          Second reason: raw land teaches you how the physical world works.
          If you build SaaS for a living, you forget that gravity exists.
          Buying land and turning it into something usable is a crash course
          in reality.
        </p>

        <h2>Before You Buy: The Checklist</h2>

        <p>
          Do not buy raw land without confirming every item below. If you
          skip any one of them, you can end up with a piece of land you
          cannot build on, cannot resell, and cannot walk away from.
        </p>

        <ol>
          <li>
            <strong>Zoning.</strong> Is it zoned for what you want to do?
            Call the county planning office, do not trust the listing.
          </li>
          <li>
            <strong>Access.</strong> Can you legally drive to it? Deeded
            access, recorded easement, or a public road. No handshake access.
          </li>
          <li>
            <strong>Water.</strong> Is the aquifer viable for a well? Talk
            to a local well driller, ask how deep wells go and what the
            flow rates look like nearby.
          </li>
          <li>
            <strong>Soil.</strong> Will it perc for septic? A perc test is
            cheap ($500–$1,500) and tells you whether septic is even legal.
          </li>
          <li>
            <strong>Power.</strong> How far is the nearest utility pole? The
            utility company charges per foot to trench in. 500 feet is
            affordable. 5,000 feet is a mortgage.
          </li>
          <li>
            <strong>Flood zone.</strong> FEMA maps. If it is in a flood zone,
            your insurance and permit requirements explode.
          </li>
          <li>
            <strong>Wetlands.</strong> Army Corps of Engineers. Wetlands
            designation can kill a build permanently.
          </li>
          <li>
            <strong>Survey.</strong> Get a boundary survey before closing.
            Do not trust the plat map.
          </li>
        </ol>

        <p>
          I did all 8 on my parcel. It took 6 weeks of due diligence before I
          closed. People who skip this step are the people you read about
          losing their life savings to a piece of unbuildable dirt.
        </p>

        <h2>The Well</h2>

        <p>
          My well ended up at 320 feet. Total cost: $14,200. That includes
          drilling, casing, pump, pressure tank, and the water test. The
          driller hit good water on the first try, which was luck.
        </p>

        <p>
          Three things nobody tells you about wells:
        </p>

        <ul>
          <li>
            You have to pay for the drilling whether they hit water or not.
            I knew a guy who paid $22,000 for a dry hole and had to drill a
            second one.
          </li>
          <li>
            Water tests are required before occupancy and they test for a
            long list of contaminants. Mine came back clean. A neighbor
            tested positive for arsenic and had to install a filtration
            system.
          </li>
          <li>
            The well house has to be heated in winter or the pump freezes.
            I installed a small electric heater on a thermostat. $80 of
            parts to prevent a $3,000 repair.
          </li>
        </ul>

        <h2>The Septic</h2>

        <p>
          Septic was the hardest single piece of the project. The perc test
          came back &ldquo;marginal,&rdquo; which meant the county required
          a mound system instead of a conventional drain field. Cost
          difference: $12,000 vs $30,000.
        </p>

        <p>
          A mound system is exactly what it sounds like: you build a big
          mound of engineered sand above ground and run the leach field
          through it. It works well on clay soil but it is expensive and it
          is ugly. The alternative was an aerobic treatment unit (ATU),
          which is basically a mini wastewater treatment plant. ATU was
          $22,000 and required annual maintenance, so I went with the mound.
        </p>

        <p>
          The permit process took 11 weeks. I submitted the engineering
          drawings in April and got the permit in late June. The county
          inspector came out twice during construction, signed off on the
          final, and that was it.
        </p>

        <h2>The Power</h2>

        <p>
          The nearest utility pole was 340 feet from the build site. The
          utility quoted me $12 per foot to trench, install, and set a new
          meter. That came out to $4,080. I negotiated them down to $3,600
          by running the trench myself with a rented trencher. If I had
          needed a new transformer, the cost would have doubled.
        </p>

        <p>
          The trench has to be 24 inches deep minimum, code in my county. I
          rented the trencher for a weekend ($400), dug the trench myself,
          laid the conduit, and the utility came out to pull the wire and
          set the meter.
        </p>

        <p>
          Alternative: go off-grid with solar and battery. I priced it.
          $35,000 for a system big enough to run a small house year-round.
          Grid was cheaper for my situation. Off-grid is the right call if
          your trench cost would be over $15,000.
        </p>

        <h2>The Permits I Did Not Expect</h2>

        <p>
          I planned for the building permit. I did not plan for:
        </p>

        <ul>
          <li>Driveway permit ($250, required by county because the driveway meets a public road)</li>
          <li>Culvert permit ($180, required because the driveway crosses a drainage ditch)</li>
          <li>Land clearing permit ($0 but required inspection before I could start)</li>
          <li>Erosion control plan (required engineered drawings, $1,800 for a civil engineer)</li>
          <li>Well permit ($120)</li>
          <li>Septic permit ($560)</li>
          <li>Electrical permit ($240)</li>
        </ul>

        <p>
          Every single one of these required a separate inspection. Every
          inspection took 2 to 4 weeks to schedule. The permit process alone
          took 5 months before I could start building.
        </p>

        <h2>The Math</h2>

        <p>
          Here is the full cost breakdown on the improvements, before any
          structure goes up:
        </p>

        <ul>
          <li>Land: $38,000</li>
          <li>Survey: $1,400</li>
          <li>Perc test: $650</li>
          <li>Well: $14,200</li>
          <li>Septic (mound system): $29,800</li>
          <li>Power trench + meter: $3,600</li>
          <li>Driveway (gravel, 400 ft): $4,200</li>
          <li>Engineering + permits: $5,400</li>
          <li>Culvert: $900</li>
        </ul>

        <p>
          Total improvement cost: $60,150. Total with land: $98,150. The
          appraisal on the improved lot with utilities and building permits
          came in at $175,000. That is a $76,850 equity gain for 7 months of
          work.
        </p>

        <h2>The Lesson</h2>

        <p>
          Raw land is not a get-rich-quick play. It is a get-real-slowly
          play. The returns are real if you do the work, but the work is
          physical, bureaucratic, and takes longer than any proforma will
          tell you. The people who get hurt on raw land are the ones who
          think it looks like flipping a house. It does not. It is its own
          domain with its own rules.
        </p>

        <p>
          The full due diligence checklist, my actual perc test and permit
          drawings, the well driller contract, and the utility trenching
          quotes are in the Pro vault. If you are thinking about buying
          your first piece of raw land, use the checklist above before you
          sign anything.
        </p>
      </BlogPostShell>
    </>
  );
}
