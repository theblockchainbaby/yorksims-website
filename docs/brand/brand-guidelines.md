# YorkSims.com — Brand Guidelines

> Visual & verbal system. Lock this in so nothing drifts. If it doesn't match this doc, reject it.

---

## 1. Brand essence

**One-liner:** *Teaching Execution, Not Theory.*
**Longer:** A premium education and execution platform built by a builder who ships across 10 industries. Real code, real contracts, real results — not theory.
**Personality in 3 words:** Disciplined. Unvarnished. Builder-first.

## 2. Logo

- Primary mark: `/public/york-state-logo.png`
- Always on dark background (#0a0a0a or darker)
- Minimum height: 40px on screen
- Clear space: 1× logo height on all sides
- Never: recolor, stretch, rotate, add drop shadows, place on busy images

## 3. Color system

### Core palette (dark-first, no light mode)

| Token | Hex | Usage |
|---|---|---|
| `dark-bg` | `#0a0a0a` | Primary background. Whole site. |
| `dark-surface` | `#111111` | Section backgrounds, slight elevation |
| `dark-card` | `#161616` | Card backgrounds |
| `dark-border` | `#1e1e1e` | Solid borders (rare — prefer white/[0.06]) |
| `foreground` | `#ffffff` | Primary text |
| `muted` | `#666666` | Secondary text |
| `muted-light` | `#999999` | Tertiary text |

### Accent — the single brand red

| Token | Hex | Usage |
|---|---|---|
| `accent` | `#e63946` | Brand red. Buttons, CTAs, 1px edge accents, hover states. |
| `accent-hover` | `#ff4d5a` | Hover state only. |

**Red usage rules:**
- Red is earned, not decorative. Reserve for CTAs, interactive accent strokes, and "emphasis bars" on hover.
- Never use red for body text.
- Red glow allowed on primary CTAs: `shadow-[0_0_30px_rgba(230,57,70,0.3)]`.
- Hover intensifies to `rgba(230,57,70,0.5)`.

### Transparency layer (the real text colors)

Most "text colors" on the site are `rgba(255,255,255, X)`:

| Role | Value | Use |
|---|---|---|
| Headlines (primary) | `#ffffff` | H1, hero headlines |
| Body (primary) | `rgba(255,255,255,0.5)` | Article body |
| Body (lede) | `rgba(255,255,255,0.3)` | Lede paragraphs, subheads |
| Labels / metadata | `rgba(255,255,255,0.2)` | Dates, tags, small meta |
| Separators / whisper | `rgba(255,255,255,0.1)` | Dividers, bullet points |
| Border (ambient) | `rgba(255,255,255,0.06)` | Card borders (rest state) |
| Border (hover) | `rgba(255,255,255,0.12)` | Card borders (hover state) |

### Vertical color system (semantic only)

Each of the 10 verticals has a dedicated color. **These are ONLY for vertical tags, vertical page accents, and blog post category chips.** They are not part of the main brand palette.

| Vertical | Hex | Name |
|---|---|---|
| Software | `#60a5fa` | Blue |
| AI Agents | `#c084fc` | Purple |
| Hardware | `#eab308` | Yellow |
| Blockchain | `#4ade80` | Green |
| Business | `#fb923c` | Orange |
| Land | `#f59e0b` | Amber |
| Finance | `#06b6d4` | Cyan |
| Athlete | `#22d3ee` | Cyan-light |
| Creative Tech | `#f472b6` | Pink |
| Partnerships | `#a78bfa` | Violet |

Rule: vertical colors appear as 10px uppercase tracking-[0.2em] chips, never as page backgrounds or button fills.

## 4. Typography

**Fonts** (both from Google Fonts, already loaded):
- **Sans:** `Geist` — all headlines, body, UI
- **Mono:** `Geist Mono` — metadata, dates, tags, code

### Type scale

| Use | Size | Weight | Tracking | Example |
|---|---|---|---|---|
| Display (hero) | `text-6xl md:text-7xl` (60–72px) | `font-black` (900) | `tracking-tight` | "Stop Learning." |
| H1 (article) | `text-4xl md:text-5xl` (36–48px) | `font-black` (900) | `tracking-tight` | Blog post titles |
| H2 (section) | `text-2xl` (28px) | `font-extrabold` (800) | `-0.02em` | Section headers |
| H3 | `text-xl` (22px) | `font-bold` (700) | `-0.01em` | Subsection |
| Body | `text-[17px]` | `font-normal` (400) | default | Article body |
| Body (card) | `text-sm` (14px) | `font-normal` (400) | default | Card copy |
| Label / tag | `text-[10px]` | `font-bold` (700) | `tracking-[0.2em]` uppercase | "AI AGENTS" |
| Meta / mono | `text-xs` or `text-[11px]` | `font-mono` | default | Dates, read time |

### Type rules

- **Never use serifs.** Geist only.
- **Headlines always `font-black`.** Never 700 or below.
- **Body leading:** `1.85` for article prose, `1.6` for UI copy.
- **Letter spacing:** `tracking-tight` (-0.02em) for headlines; default for body.
- **Maximum measure:** 780px for article bodies. Never full-width paragraphs on desktop.

## 5. Layout & spacing

### Page widths

| Context | Max width |
|---|---|
| Article body | 780px |
| Blog listing | 1000px |
| Landing sections | 1200px (content inside) |
| Hero full-bleed | full viewport |

### Vertical rhythm

- Section padding: `py-[120px]` desktop, `py-[80px]` mobile
- Hero min-height: `40vh` (for short heroes like /blog) or `100vh` (for home)
- Card padding: `36px 40px`
- Between cards: `gap-4` (16px) vertical

### Border radius

- Buttons: `rounded-full` (pill)
- Cards: `24px`
- Feature boxes: `32px`
- Images: `12px` unless full-bleed
- Input fields: `8px`

## 6. Components

### Primary CTA button

```jsx
<Link
  href="/..."
  className="inline-block text-sm font-bold uppercase tracking-widest px-10 py-4 bg-[#e63946] text-white rounded-full hover:bg-[#ff4d5a] transition-all hover:scale-105 shadow-[0_0_30px_rgba(230,57,70,0.3)]"
>
  Start Building
</Link>
```

Rules: all-caps, widest tracking, pill, glow. Only ONE primary CTA per view.

### Secondary CTA

```jsx
<Link className="text-xs font-mono text-white/30 hover:text-[#e63946] transition-colors">
  ← Back to Blog
</Link>
```

Mono, low-opacity, hover to red.

### Card (the YorkSims signature)

```jsx
<div
  className="relative border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
  style={{ borderRadius: "24px", padding: "36px 40px" }}
>
  {/* Red line on hover */}
  <motion.div
    className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#e63946] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
  />
  {/* content */}
</div>
```

The hover-activated red left-edge bar is the **signature interaction**. Use it everywhere cards are clickable.

### Grid background (ambient)

```jsx
<div className="absolute inset-0 pointer-events-none" style={{
  backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
  backgroundSize: "80px 80px",
}} />
```

Used on heroes. Never content sections.

### Red radial glow

```jsx
<motion.div
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] pointer-events-none"
  animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.07) 0%, transparent 70%)" }}
/>
```

Subtle ambient brand presence behind headlines.

## 7. Motion & animation

**Library:** Framer Motion (primary), GSAP (complex sequences), Lenis (scroll smoothing).

### Standard entrance

```js
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```

**The ease `[0.16, 1, 0.3, 1]` is the brand easing curve.** Use it on every entrance.

### Stagger

- Card lists: `delay: index * 0.05`
- Nav items: `delay: index * 0.08`

### Hover

- Scale: 1.05 max. Never more.
- Color change: 200–500ms
- Red bar reveal: 500ms `duration`

### Don'ts

- No bounces, no spring physics (other than Framer's default)
- No parallax on hero text
- No glow pulsing >2s cycles
- No rotating elements on scroll
- No auto-advancing carousels

## 8. Imagery

- **Photography:** dark, high-contrast, grainy. Real work, not stock.
- **Screenshots:** yes, always with a subtle 1px `rgba(255,255,255,0.06)` border
- **No stock illustrations.** Ever.
- **No gradient blobs.** Ever.
- **3D:** Three.js hero scenes only, never decorative

## 9. Voice & copy

### Principles (from `product-context.md`)
- Direct, confident, no-bullshit
- Grounded in evidence (repos, numbers, contracts)
- Short, punchy sentences
- Athlete energy — disciplined, not rah-rah

### Word rules

**Never use:** *unleash, game-changing, revolutionary, 10x, secret, hack, insane, crazy, magical, transform, leverage (as verb), mindblowing, one weird trick.*

**Always prefer:** *ship, build, real, receipts, actual, the code, here's how.*

### Headline formulas

- **"[Verb]. [Verb]."** — "Stop learning. Start building."
- **"Show the work. All of it."**
- **"How I [specific build] in [timeframe]"**
- **"[Outcome] — and what I'd do differently"**

### Section heading rules

- Sentence case, not title case
- No periods at end of H1/H2
- Max 6 words when possible

## 10. Accessibility

- Minimum contrast: WCAG AA on all text (white/0.3 on #0a0a0a ≈ 4.5:1 — careful)
- All interactive elements have hover AND focus states
- Focus outline: 2px `#e63946` offset 2px
- Motion respects `prefers-reduced-motion` (add this audit to the todo list)
- Alt text on every image (the `{/* eslint-disable */}` pattern is wrong — fix in engineering hygiene pass)

## 11. Anti-patterns (things that have crept in — remove if found)

- Multiple primary CTAs per view
- Headlines under `font-black`
- Rainbow gradients
- Stock icon sets (Font Awesome, Material Icons)
- Serif fonts anywhere
- Light-mode artifacts
- Emojis in headlines (okay in section dividers on casual content like /blog posts)
