import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { getPostBySlug } from "../../lib/blog";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "../../components/JsonLd";
import BlogPostShell from "../../components/BlogPostShell";

const SLUG = "hbm-memory-systemverilog";
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
          Most of the people building serious memory subsystems work inside
          Samsung, SK Hynix, Micron, or NVIDIA. I built one at home, in
          SystemVerilog, by myself, because I wanted to understand what
          actually happens between a processor and the DRAM it depends on. I
          am going to walk you through what I built, what I learned, and what
          nobody writes in the textbooks.
        </p>

        <p>
          This is not a tutorial. If you want Chapter One of a VLSI book, go
          get one. This is the field report.
        </p>

        <h2>What HBM Actually Is</h2>

        <p>
          High Bandwidth Memory is a stack of DRAM dies connected to a
          processor through a silicon interposer, using thousands of wires in
          parallel. The point is bandwidth — plural terabytes per second per
          stack. The reason you cannot just do that with DDR is that DDR uses
          maybe 64 wires per channel, at speeds that are fast but not that
          fast, and routing 1000 wires to a DIMM slot is physically
          impossible.
        </p>

        <p>
          HBM solves the routing problem by putting the memory right next to
          the compute, connected through the interposer. The tradeoff: you
          cannot upgrade memory, it is expensive as hell to manufacture, and
          your thermal envelope is now a nightmare.
        </p>

        <h2>What I Built</h2>

        <p>
          I did not build an actual HBM stack (I do not have a fab in my
          garage). I built an HBM-style controller in SystemVerilog that
          models the important parts: multiple pseudo-channels, a request
          queue, an address-to-bank mapper, a command scheduler, and a refresh
          engine. Then I added ECC, power states, and a simple reliability
          simulator.
        </p>

        <p>
          The whole thing is about 4,500 lines of SystemVerilog. It runs in
          Verilator. It passes a suite of directed tests and a random
          stimulus harness. It is not silicon-ready. It is educational-grade
          RTL that behaves correctly enough for me to reason about the real
          tradeoffs.
        </p>

        <h2>The Architecture</h2>

        <p>
          Top-level modules, in data flow order:
        </p>

        <ol>
          <li>
            <strong>Host interface</strong> — takes read/write requests from a
            simple AXI-ish master
          </li>
          <li>
            <strong>Request queue</strong> — parameterized FIFO with
            priority slots for reads
          </li>
          <li>
            <strong>Address mapper</strong> — decodes the physical address
            into channel, bank group, bank, row, and column
          </li>
          <li>
            <strong>Command scheduler</strong> — issues DRAM commands
            (ACT, RD, WR, PRE) respecting timing constraints
          </li>
          <li>
            <strong>Bank state machines</strong> — one per bank, tracks
            open/closed state and enforces tRCD, tRP, tRAS, tRRD
          </li>
          <li>
            <strong>Data path</strong> — handles the burst read/write data
            with ECC encode/decode
          </li>
          <li>
            <strong>Refresh engine</strong> — schedules auto-refresh and
            refreshes per bank on a rolling basis
          </li>
          <li>
            <strong>Power manager</strong> — handles power-down,
            self-refresh, and activate-bank power gating
          </li>
        </ol>

        <h2>Interleaving Is Where It Gets Fun</h2>

        <p>
          The naive address mapping goes row → column → bank. That is awful
          because sequential accesses all hit the same bank and you stall on
          every single request waiting for tRC.
        </p>

        <p>
          The better mapping is bank → bank group → column → row. Now
          sequential accesses land on different banks, each with its own
          state machine, and you can pipeline them. The command scheduler
          sees all requests at once, reorders them to maximize bank
          parallelism, and throws them at the data path in the order that
          minimizes total stalls.
        </p>

        <p>
          This reordering is where the 10x bandwidth difference between a
          lazy controller and a good controller lives. Most of my time was
          spent tuning the scheduler.
        </p>

        <h2>ECC Is Non-Negotiable</h2>

        <p>
          At HBM speeds and densities, bit errors are not theoretical. They
          are daily. The ECC I implemented is a standard SECDED Hamming code
          over 64-bit data words, extended to correct single-bit and detect
          double-bit errors.
        </p>

        <p>
          The tricky part is where you put the ECC. If you put it at the bank
          level you pay a cost on every access. If you put it at the
          interface level you waste storage. I put it at the bank level and
          used a shared parity store, which is a compromise that works for
          education but you would not ship.
        </p>

        <p>
          When a correctable error happens, the controller fixes it
          transparently and logs it. When an uncorrectable error happens, the
          controller raises an interrupt and marks the page. Real HBM does
          all of this with dedicated hardware I did not have the time to
          replicate.
        </p>

        <h2>Power States Matter More Than You Think</h2>

        <p>
          DRAM draws power whether you use it or not. Refresh alone is
          significant. Active banks are expensive. The power manager I built
          has three states: active, precharge power-down, and self-refresh.
        </p>

        <p>
          Active is the fast state. Precharge power-down closes all banks and
          drops power 60%. Self-refresh drops it another 80% but takes
          hundreds of nanoseconds to exit. The controller tracks request
          inactivity and moves through the states on timers.
        </p>

        <p>
          The interesting part is that power gating interacts badly with
          refresh scheduling. If you enter self-refresh too aggressively, you
          miss refresh slots and have to do a burst on wakeup, which causes
          a latency spike. Getting this tuning right took me a week.
        </p>

        <h2>What I Learned</h2>

        <p>
          Five things I did not know when I started.
        </p>

        <ol>
          <li>
            <strong>Timing constraints are the hard part.</strong> The data
            path is easy. The state machine is easy. Tracking 20 different
            timing parameters (tRCD, tRP, tRAS, tRC, tWR, tRTP, tCCD, tFAW,
            tRRD, tREFI, tRFC, etc.) and not violating any of them while
            reordering requests is the actual challenge.
          </li>
          <li>
            <strong>Simulation is slower than you expect.</strong> A 1ms
            simulation of my controller takes minutes in Verilator. A
            full-system test with realistic traffic takes hours. I started
            running overnight simulations on day three.
          </li>
          <li>
            <strong>Random testing finds bugs directed tests never will.</strong>{" "}
            I had a directed test suite that passed cleanly for two weeks,
            then I added a simple random stimulus generator and it found
            three bugs in the first hour.
          </li>
          <li>
            <strong>Refresh timing is the silent killer.</strong> Miss one
            refresh and the DRAM loses data. There is no error code. There is
            no warning. The row just goes bad. You have to test the refresh
            engine under every possible traffic pattern.
          </li>
          <li>
            <strong>You cannot validate what you cannot observe.</strong> I
            spent a week adding assertion statements and a scoreboard that
            compares simulated state against expected state. Without that,
            debugging timing violations is guesswork.
          </li>
        </ol>

        <h2>Why Build This At All</h2>

        <p>
          I get asked this a lot. The short answer is that the world is moving
          toward specialized silicon and nobody knows who will design the
          chips of the next decade. The long answer is that the discipline of
          writing synchronous logic that has to be correct at the bit level
          every single clock cycle is different from writing software. It
          makes you a better engineer in every domain, not just hardware.
        </p>

        <p>
          Also: understanding memory hierarchies at this level changes how you
          write software. When you know what is happening between your CPU
          and DRAM, cache-aware programming stops being advice and becomes
          intuition.
        </p>

        <p>
          If you want the repo with the full SystemVerilog source, the
          Verilator testbench, and the scheduler tuning notes, it is in the
          Pro vault along with reading recommendations for serious RTL work.
        </p>
      </BlogPostShell>
    </>
  );
}
