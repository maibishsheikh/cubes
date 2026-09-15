# CubeQuest — Technical Requirements Document
**Grade 6 — Cubes**

*Generated from `Intellia_Module_Blueprint_TRD.md`, using `CubeQuest_PRD.md`'s content decisions as direct inputs. Target repo: `cube-main`. Clone source: `G2-Money-Money-main` (default reference).*

*Revision note: this replaces the earlier draft scoped to "Cube & Cuboid: Real-Life Applications" (target repo `cube-cuboid-main`). The repo name, `cubeMath.js` helpers, worlds, and station specs below reflect the cube-only scope — see the PRD's §3 and §14 for what changed.*

---

## 1. Reference Analysis Notes — Gotcha Check

To be re-verified against the actual `G2-Money-Money-main` checkout at build time:

1. **Dead/duplicate `src/features/*` folder.** Confirm which folder `App.jsx` actually imports from before copying anything; do not replicate an unused duplicate into `cube-main`.
2. **Hardcoded story-panel count.** CubeQuest's Story phase uses **4 panels** — the same count as the reference — so `App.jsx`'s `storyPanel >= 3` reducer check does **not** need generalizing for this build. Still worth a quick grep to confirm the reference's actual hardcoded value.
3. **Static vs. procedural question bank.** `data/questionBank.js` must be built procedurally from `utils/cubeMath.js` template functions (§3.3), regardless of what the clone source ships.
4. **Viewport-clipping bug.** Proactively fix the `top: 70px` + `100vh` header-offset bug in `globals.css` (use `100dvh` + a measured header height via `ResizeObserver`).
5. **Leftover branding strings.** Check `index.html`'s `<title>` and `README.md` for stale MoneyQuest/"Singapore MOE-aligned" wording before delivery; replace with CubeQuest-specific copy.

---

## 2. Tech Stack (fixed — clone verbatim)

```json
{
  "dependencies": {
    "framer-motion": "^12.42.0",
    "lucide-react": "^1.22.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.2",
    "autoprefixer": "^10.5.2",
    "dotenv": "^17.4.2",
    "node-fetch": "^3.3.2",
    "oxlint": "^1.69.0",
    "postcss": "^8.5.16",
    "tailwindcss": "^3.4.4",
    "vite": "^8.1.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "generate-audio": "node scripts/generate_audio.js",
    "clean-audio": "node scripts/clean_audio.js",
    "lint": "oxlint",
    "preview": "vite preview"
  }
}
```
`vite.config.js` (`base: '/'`), `tailwind.config.js`, `postcss.config.js`, `vercel.json` (SPA rewrite rules) — reused as-is.

## 3. Folder Structure

```
cube-main/
├── public/assets/{audio/, story/}
├── scripts/
│   ├── generate_audio.js         # MODIFY: new `phrases` array (§8)
│   └── clean_audio.js            # reuse as-is
├── src/
│   ├── assets/story/             # story_1.png ... story_4.png
│   ├── components/
│   │   ├── IntroScreen.jsx/.css  # MODIFY: "CubeQuest" title/copy only
│   │   ├── ProgressMap.jsx/.css  # reuse as-is
│   │   ├── shared/
│   │   │   ├── Mascot.jsx/.css              # reuse as-is (renders Bo the Beaver 🦫 via config)
│   │   │   ├── FeedbackOverlay.jsx/.css     # reuse as-is
│   │   │   ├── FloatingNumbers.jsx/.css     # reuse as-is
│   │   │   └── CubeVisual.jsx               # NEW: replaces MoneyVisual.jsx
│   │   ├── gamification/
│   │   │   ├── KingdomMap.jsx/.css  # reuse as-is
│   │   │   └── StarRating.jsx       # reuse as-is
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx/.css  # MODIFY: swap in CubeVisual import
│   │   │   └── BossBattleModal.jsx/.css   # reuse as-is
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx/.css    # MODIFY: content only (§4.1)
│   │   │   ├── StoryPhase.jsx/.css     # MODIFY: content only — panel-count logic unchanged (4 panels)
│   │   │   ├── SimulatePhase.jsx/.css  # MODIFY: 4 new station imports/labels
│   │   │   ├── PlayPhase.jsx/.css      # reuse as-is (logic unchanged)
│   │   │   └── ReflectPhase.jsx/.css   # MODIFY: new recap questions + copy (§3.7)
│   │   └── simulations/
│   │       ├── CubeUnfoldLab.jsx           # NEW — Concept Discovery Lab archetype
│   │       ├── CustomCubeBuilder.jsx       # NEW — Build-to-Target Challenge archetype
│   │       ├── SugarCubePackingMission.jsx # NEW — Multi-Step/Composite Construction archetype
│   │       ├── DeliveryNoteDetective.jsx   # NEW — Error-Detective archetype
│   │       └── Stations.css                # MODIFY: extend with new visual classes
│   ├── config/
│   │   ├── worlds.config.js       # MODIFY: 10 CubeQuest worlds (§3.1)
│   │   ├── characters.config.js   # MODIFY: Dev / Xin Yi / Bo the Beaver (§3.2)
│   │   └── audio.config.js        # reuse as-is
│   ├── core/hooks/useViewport.js  # reuse as-is
│   ├── hooks/useAudio.js          # reuse as-is
│   ├── data/
│   │   ├── storyContent.js        # MODIFY: 4 story panels (§3.4)
│   │   └── questionBank.js        # MODIFY: procedurally-generated 100 Qs (§3.3)
│   ├── utils/
│   │   ├── audio.js               # reuse as-is
│   │   ├── audioMap.js            # auto-generated — do not hand-edit
│   │   ├── narration.js           # MODIFY: CubeQuest phase scripts (§8)
│   │   ├── badgeEngine.js         # MODIFY: relabelled badges (§9), same trigger logic
│   │   ├── scoring.js             # reuse as-is
│   │   ├── shuffle.js             # reuse as-is
│   │   └── cubeMath.js            # NEW: domain calculation helpers (§3.3)
│   ├── styles/
│   │   ├── design-tokens.css      # MODIFY: 10 new --world-N accent colors only (§10)
│   │   └── globals.css            # reuse as-is (apply the viewport fix from §1.4 proactively)
│   ├── App.jsx                    # MODIFY: no panel-count generalization needed (4 panels, matches reference)
│   ├── App.css / main.jsx / index.css   # reuse as-is
├── index.html / package.json / vite.config.js / tailwind.config.js / postcss.config.js / vercel.json / .oxlintrc.json / .gitignore
└── README.md                      # MODIFY: CubeQuest-specific + art-brief for the 4 story images
```

## 4. State Management (`App.jsx`)

Reuse the full `useReducer` action set verbatim: `SET_PHASE`, `NEXT_STORY_PANEL`, `PREV_STORY_PANEL`, `ADVANCE_SIM_STATION`, `PREV_SIM_STATION`, `COMPLETE_SIM_STATION`, `LOAD_QUESTIONS`, `ANSWER_CORRECT`, `ANSWER_INCORRECT`, `USE_HINT`, `CLEAR_FEEDBACK`, `PREV_QUESTION`, `NEXT_QUESTION`, `UNLOCK_BADGE`, `COMPLETE_PHASE`, `TOGGLE_AUDIO`, `RESET_SESSION`. The 10-world/10-question-per-world math (`Math.floor(nextQ / 10)`) is unchanged. Story-panel count matches the reference (4), so §1.2's generalization is **not** required for this build.

## 5. Component Specs (per-module work)

### 5.1 `config/worlds.config.js`
Ten entries in the fixed shape `{ id, name, emoji, accent, description, conceptFocus, boss: { name, emoji, reward } }`, populated from PRD §8.4:

```js
export const WORLDS = [
  { id: 0, name: "Ice Cube Tray Lab", emoji: "🧊", accent: "var(--world-0)",
    description: "Find the volume of an ice cube given its edge length.",
    conceptFocus: "volume-recall",
    boss: { name: "Frosty the Freeze Boss", emoji: "❄️", reward: "Steady Hands" } },
  { id: 1, name: "Dice Workshop", emoji: "🎲", accent: "var(--world-1)",
    description: "Find a die's face area from its edge, and its edge from a face area.",
    conceptFocus: "face-area-and-edge-from-area",
    boss: { name: "The Dice Master", emoji: "🎲", reward: "Root Finder" } },
  { id: 2, name: "Sugar Cube Factory", emoji: "🍬", accent: "var(--world-2)",
    description: "Find the edge length of a sugar cube given its volume.",
    conceptFocus: "edge-from-volume",
    boss: { name: "The Sugar Sorter", emoji: "🍬", reward: "Cube Cracker" } },
  { id: 3, name: "Gift Box Studio", emoji: "🎁", accent: "var(--world-3)",
    description: "Compare and order the volumes of several cube-shaped gift boxes.",
    conceptFocus: "compare-order-volumes",
    boss: { name: "Ribbon & Wrap Master", emoji: "🎀", reward: "Wrap Star" } },
  { id: 4, name: "Storage Cube Depot", emoji: "🗄️", accent: "var(--world-4)",
    description: "Build a storage cube from stacked unit cubes; count total volume.",
    conceptFocus: "unit-cube-stacking",
    boss: { name: "The Stack Inspector", emoji: "📦", reward: "Stacker's Eye" } },
  { id: 5, name: "Aquarium Cube Shop", emoji: "🐠", accent: "var(--world-5)",
    description: "Find how many litres a cube-shaped tank holds.",
    conceptFocus: "liquid-volume-conversion",
    boss: { name: "The Tide Guardian", emoji: "🌊", reward: "Tank Master" } },
  { id: 6, name: "Building Blocks Site", emoji: "🧱", accent: "var(--world-6)",
    description: "Combine the volumes of two or more cube-shaped building blocks.",
    conceptFocus: "composite-compare-combine",
    boss: { name: "Site Supervisor Titan", emoji: "🚧", reward: "Builder's Badge" } },
  { id: 7, name: "Packing & Recycling Depot", emoji: "♻️", accent: "var(--world-7)",
    description: "How many small cubes pack exactly into a larger cube box.",
    conceptFocus: "real-world-word-problems",
    boss: { name: "The Compactor", emoji: "🔩", reward: "Depot Champion" } },
  { id: 8, name: "Rubik's Cube Puzzle Corner", emoji: "🧩", accent: "var(--world-8)",
    description: "Combined chains — face area to edge to volume, and back.",
    conceptFocus: "multistep-applied",
    boss: { name: "The Puzzle Champion", emoji: "🧩", reward: "Deep End" } },
  { id: 9, name: "Cube Craft Co. Grand Opening", emoji: "🏆", accent: "var(--world-9)",
    description: "Every question type from Worlds 0–8 — the hardest boss, grand finale.",
    conceptFocus: "mixed-review",
    boss: { name: "The Grand Inspector", emoji: "👑", reward: "Cube Craft Co. Graduate" } },
];

export const DISTRICTS = WORLDS.map(w => ({ id: w.id, name: w.name, icon: w.emoji, boss: w.boss }));
```

### 5.2 `config/characters.config.js`
Unchanged from the prior draft:
```js
export const CHARACTERS = {
  dev:   { name: "Dev",    role: "Builder & Co-Founder", emoji: "🧑🏽‍🔧", colour: "var(--char-dev)",   mascotEmoji: "🦫" },
  xinyi: { name: "Xin Yi",  role: "Designer & Co-Founder", emoji: "👧🏻‍🔧", colour: "var(--char-xinyi)", mascotEmoji: "🦫" },
  bo:    { name: "Bo",      role: "Workshop Mascot",       emoji: "🦫",       colour: "var(--char-bo)",    mascotEmoji: "🦫" },
};
export const MASCOT = { name: "Bo the Beaver", emoji: "🦫" };
```

### 5.3 `CubeVisual.jsx`
Replaces `MoneyVisual.jsx`. Takes `{ type, data, compact }` and renders an SVG/illustrative aid for each `visual` type used by the question bank:
- `"cube-3d"` — a labelled cube (single edge-length label, volume readout optional)
- `"cube-net"` — a 2-D folding net of a cube (used mainly in Cube Unfold Lab, and a small number of World-9 mixed-review conceptual items)
- `"cube-face"` — a single highlighted face of a cube with its area labelled, for face-area questions (Worlds 1, 8)
- `"tank-liquid"` — a cube-shaped tank cross-section with a fill line, for World 5's liquid-volume questions
- `"stacked-cubes"` — a grid of small cubes packed inside a larger cube outline, for Worlds 4, 6, 7

All colors reference `design-tokens.css` CSS variables — never hardcoded hex values. `compact` prop shrinks the SVG for inline rendering inside `QuestionRenderer.jsx`'s Play-phase card. Reused directly inside the Simulate stations wherever a live shape/diagram is needed.

## 6. Data Layer

### 6.1 `utils/cubeMath.js` — Domain Calculation Helpers
Pure functions shared by the question generator and the Simulate stations:

```js
export const PERFECT_CUBES  = [8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2744, 3375]; // edges 2-15
export const PERFECT_SQUARES = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225];       // edges 2-15

export function calcVolume(edge) { /* edge ** 3 */ }
export function calcFaceArea(edge) { /* edge ** 2 */ }
export function edgeFromVolume(volume) { /* Math.cbrt(volume), asserted against PERFECT_CUBES */ }
export function edgeFromFaceArea(faceArea) { /* Math.sqrt(faceArea), asserted against PERFECT_SQUARES */ }
export function volumeFromFaceArea(faceArea) { /* calcVolume(edgeFromFaceArea(faceArea)) — composite skill */ }
export function cm3ToLitres(cm3) { /* cm3 / 1000 */ }
export function litresToCm3(litres) { /* litres * 1000 */ }
export function packCount(largeEdge, smallEdge) { /* calcVolume(largeEdge) / calcVolume(smallEdge) */ }
export function pickCleanEdge() { /* draws an edge (2-15) shared by both PERFECT_CUBES and PERFECT_SQUARES pools */ }
```

The clean-number rule (PRD §8.4) is implemented here explicitly, never as an inline magic number — `PERFECT_CUBES` guarantees every volume-to-edge question has a whole-number answer, `PERFECT_SQUARES` guarantees the same for every face-area-to-edge question, and both pools share the same 2–15 edge range so composite questions (face area → volume, or pack-count problems) stay internally consistent.

### 6.2 `data/questionBank.js` — Procedural Generation
One template function per `conceptFocus` (10 concept focuses, matching the 10 worlds 1:1), each of which:
1. Draws inputs from `PERFECT_CUBES` / `PERFECT_SQUARES` via `cubeMath.js` — never an unconstrained random range.
2. Produces 4 options: 1 correct + 3 distractors reflecting real cube-specific misconceptions — e.g. using √ where ∛ was needed (or vice versa), computing edge × 3 instead of edge³, confusing a face's area with the cube's volume, or a 1 ℓ = 100 cm³ conversion slip.
3. Fills `explanation`, `hint1` (names the first step/formula), `hint2` (walks the arithmetic), and `visualData` (the shape/fill-level data `CubeVisual.jsx` needs).

Output schema (fixed):
```js
{
  id: Number, districtId: Number, category: String, visual: String,
  questionText: String, options: [String], correctAnswer: String,
  explanation: String, hint1: String, hint2: String, visualData: Object,
}
```
Also exports `DISTRICTS` (derived from `WORLDS`, §5.1) so `PlayPhase.jsx`'s existing import continues to work unmodified.

**QA requirement (fixed):** stress-test across ≥300 randomized runs (30,000 questions); assert no duplicate options, no invalid/out-of-range inputs, no malformed/`NaN`/`undefined` fields, and — module-specific — that every cube-root and square-root answer is an exact integer and every litre-conversion answer is clean.

### 6.3 `data/storyContent.js`
`STORY_PANELS` array, length 4 (matches PRD §8.2), fixed shape `{ panel, title, text, highlight, character, characterEmoji, imageBg, imageEmoji }` — one entry per row of the PRD's panel table ("A Cube-Shaped Order," "Every Side the Same," "Roots at the Workbench," "Filling the Tank").

## 7. Simulate Station Specs

Each of the 4 components follows the fixed per-station contract:
```jsx
<StationComponent onComplete={fn} audioEnabled={bool} />
```
- Self-contained internal state (no dependency on the global reducer beyond `onComplete`).
- Live, SVG-based visuals themed with `design-tokens.css` CSS variables.
- A `station-success` panel with a "Complete Station ✓" CTA calling `onComplete`.
- Every slider/drag interaction also exposes explicit +/− keyboard-operable buttons.

| Component | Archetype | Core interaction | State it owns |
|---|---|---|---|
| `CubeUnfoldLab.jsx` | Concept Discovery Lab | Fold a 2-D six-square net into a 3-D cube; scrub a "fill with unit cubes" slider | `foldProgress`, `cubesFilled`, `confirmAnswer` |
| `CustomCubeBuilder.jsx` | Build-to-Target Challenge | A single edge-length slider with +/− buttons; hit a target volume within tolerance | `edge`, `targetVolume`, `attemptsThisRound` |
| `SugarCubePackingMission.jsx` | Multi-Step/Composite | Two dials (small cube edge, large crate edge); compute both volumes and the pack count | `smallEdge`, `largeEdge`, `packCountComputed`, `targetPackCount` |
| `DeliveryNoteDetective.jsx` | Error-Detective | Tap the erroneous line on a packing slip, enter the corrected value | `selectedLineId`, `correctedValue`, `errorFound` |

Wire all 4 into `SimulatePhase.jsx`'s `STATIONS` array and station-index render switch; tab bar, footer navigation, progress dots, and `COMPLETE_SIM_STATION`/`ADVANCE_SIM_STATION` gating logic are reused verbatim.

## 8. Audio Pipeline

`config/audio.config.js`, `utils/audio.js`, `hooks/useAudio.js`, `utils/audioMap.js` (auto-generated) — reused mechanics as-is (cache-check → dynamic ElevenLabs fetch → HTML5 `Audio` playback → i+1 preloading, no browser TTS fallback). Only `utils/narration.js`'s function *bodies* and `scripts/generate_audio.js`'s `phrases` array are rewritten, keeping the same exported function names (`wonderNarration`, `storyNarration(panel)`, `simStationIntro(stationIdx)`, `playQuestionNarration`, `playCorrectNarration`, `playWrongNarration`, `playHint1Narration`, `playHint2Narration`, `districtCompleteNarration`, `bossStartNarration`, `bossWinNarration`, `reflectNarration`, `reflectCompleteNarration`).

Content rewrite applies PRD §10's term list: "cubic centimetres" / "square centimetres" / "litres" / "millilitres" / "cube root of" / "square root of" always spoken in full, dimension phrases spoken naturally (e.g. "an edge of six centimetres"). After content lock: `npm run generate-audio` then `npm run clean-audio`.

## 9. Gamification Logic

`utils/scoring.js` (`calcXP`, `calcStars`) — reused formulas as-is. `utils/badgeEngine.js` — reused `checkBadges(state)` trigger logic as-is; only the `BADGES` array's display strings change, per PRD §9:

```js
export const BADGES = [
  { trigger: "first_correct",      name: "First Delivery Made",      emoji: "📦" },
  { trigger: "streak_5",           name: "Steady Hands Streak",      emoji: "🔧" },
  { trigger: "streak_10",          name: "Master Builder Streak",    emoji: "🏗️" },
  { trigger: "all_sim_complete",   name: "Workshop Certified",       emoji: "🛠️" },
  { trigger: "any_world_3star",    name: "Gold Blueprint Award",     emoji: "🥇" },
  { trigger: "any_boss_defeated",  name: "Boss Contract Won",        emoji: "🏆" },
  { trigger: "20plus_answered",    name: "Warehouse Champion",       emoji: "📐" },
  { trigger: "full_journey",       name: "Cube Craft Co. Graduate",  emoji: "🎓" },
];
```

## 10. Design Tokens

`styles/design-tokens.css` — reuse core palette, font stack, radii, shadows, transitions as-is; regenerate only the `--world-0` through `--world-9` accent-color block (10 distinct workshop/craft-themed hues — icy blue for Ice Cube Tray Lab, warm candy tones for Sugar Cube Factory, cooler aquatic tones for Aquarium Cube Shop, celebratory gold for World 9) and add `--char-dev`, `--char-xinyi`, `--char-bo` character-accent variables consumed by `characters.config.js`.

## 11. Build & Deploy

Standard `vite.config.js` (`base: '/'`), `vercel.json` SPA rewrite rules — reused as-is. No new environment variables beyond the standard `VITE_ELEVENLABS_API_KEY`.

## 12. QA Plan (fixed checklist)

1. **Question bank stress test** — ≥300 randomized generations; assert schema completeness, no duplicate options, and correctness of the perfect-cube / perfect-square / clean-litre rules.
2. **Audio parity check** — every string passed to a narration helper has an exact `audioMap.js` match, or is intentionally dynamic.
3. **Full user-journey walkthrough** — Wonder → Story (all 4 panels navigate correctly) → Simulate (all 4 stations completable, tab-gating correct) → Practice (World Map, all 4 modes reachable, Boss Battle winnable, badges unlock) → Reflect (new recap renders, scorecard accurate) — zero console/page errors.
4. **Production build check** — `npm install && npm run build` succeeds from a clean extract.
5. **Accessibility spot-check** — enlarged Simulate/Play fonts and touch targets present; visual aids carry text labels (not color-only); both slider/dial-based stations have keyboard equivalents.
6. **Module-specific checks** — no generated question involves three unequal dimensions or total surface area; every √/∛ answer is a whole number; every litre-conversion answer is clean.

## 13. Delivery Checklist

- Zip excludes `node_modules/`/`dist/`.
- 4 story images delivered as placeholders at the reference's exact shipped dimensions, with an art-brief README (per PRD §12).
- `README.md` updated to CubeQuest-specific copy (module name, topic, grade, setup instructions); no leftover MoneyQuest or "Singapore MOE-aligned" stale wording (§1.5).
- `.env.local.example` documents `VITE_ELEVENLABS_API_KEY` with no real key committed.

## 14. Risks

- **√ vs. ∛ confusion is the central risk, not a side one.** Because this module puts both root symbols side by side (face area → √, volume → ∛), distractor design across nearly every world needs to specifically test whether a student applies the *right* root to the *right* given quantity — this is a bigger design surface than in the earlier cuboid-inclusive draft, where only ∛ appeared.
- **Liquid-conversion scope risk.** If PRD §14 assumption 2 (l/ml/cm³ conversion) is not confirmed as in-scope, World 5 (and the removed Aquarium element of Story panel 4) would need re-templating around a non-liquid real-life context instead.
- **Net-folding station complexity.** `CubeUnfoldLab.jsx`'s fold + fill animation is more visually complex than a typical Concept Discovery Lab; budget extra implementation/QA time for the fold interaction specifically.
- **Viewport bug regression.** Since this is flagged as a recurring issue (§1.4), a regression check against multiple screen sizes should be added to QA step 5, not just a single desktop check.

---

*Pairs with `CubeQuest_PRD.md`. Both should be reviewed together before implementation begins, particularly the open items in PRD §14.*
