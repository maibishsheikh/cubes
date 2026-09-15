# CubeQuest — Product Requirements Document
**Grade 6 — Cubes**

*Generated from `Intellia_Module_Blueprint_PRD.md`. Reference architecture: `G2-Money-Money-main` (MoneyQuest). Target repo: `cube-main`.*

*Revision note: this replaces the earlier draft scoped to "Cube & Cuboid: Real-Life Applications." The topic has been narrowed to **cubes only** — all cuboid-specific content (unequal-dimension reverse problems, height-from-base-area, face-area-from-one-dimension) has been removed. See §3 and §14 for what changed and why.*

---

## 1. Overview

CubeQuest teaches Primary 6 students to find and apply the volume of a **cube** in real, concrete contexts — dice, sugar cubes, gift boxes, storage cubes, ice cubes, building blocks, and cube-shaped tanks — through Intellia Global's established five-phase Wonder → Story → Simulate → Practice → Reflect architecture. Because every edge of a cube is equal, the module's signature skill is genuinely two-sided: working *forward* from an edge to a volume or a face area, and working *backward* from a volume (via cube root) or a face area (via square root) to the single unknown edge length — exactly the "use of the symbols √ and ∛" skill the P6 syllabus calls out explicitly for this strand.

## 2. Background

Intellia Global's module library already spans money, division, ratios, metric conversions, speed/rate, word problems, and circles across Grades 1–6. This module continues that library into Primary 6 Measurement, drawing on the same syllabus strand as a cuboid-inclusive volume module would, but **deliberately narrowed to the cube special case** — a cleaner, more tightly-scoped topic where every question can be built around a single unknown (the edge) rather than juggling three independent dimensions.

## 3. Standards Alignment

**Source:** Singapore MOE Primary Mathematics Syllabus, Primary 6 (Standard), Strand 5 — Measurement, "Volume of cube and cuboid." This module draws only the **cube-applicable** subset of that strand.

**In-scope skills (directly tested in syllabus, cube-only):**
- Volume of a cube = edge × edge × edge (recap/bridge from P5, where volume in cm³/m³ and building solids with unit cubes was first introduced).
- Finding **the length of one edge of a cube given its volume** (cube root, ∛) — the syllabus's headline reverse-operation skill for this topic.
- Finding **the area of one face of a cube** (edge × edge) — a direct forward application, since a cube's six faces are identical.
- Finding **the length of one edge of a cube given the area of one face** (square root, √) — this is what the syllabus's explicit "use of the symbols √ and ∛" line is read as calling for in a cube-only build: √ recovers the edge from a face area, ∛ recovers it from the volume.
- A composite skill combining the two: finding a cube's **volume given only the area of one face** (√ to get the edge, then cube it).
- Solving word problems involving the volume of a cube in real-life contexts (packing, stacking, comparing, liquid capacity).

**Explicitly out of scope for this build (this is the topic-narrowing decision):**
- Anything requiring **three independent, unequal dimensions** — a cuboid's "find one dimension given the volume and the other two," or "find the height given the volume and base area," do not apply once every edge is equal, and are not part of this module. A future cuboid-focused module could reintroduce them.
- **Total surface area** (summing all six faces) remains excluded — it's a Secondary 1 topic, outside MOE Primary scope. Only the single-face-area skill above is tested.

**Scoping decision (adjacent skill treated as narrative bridge, not a bank question):**
- **Nets of a cube** (2-D representation, identifying a cube's net, folding it into a 3-D solid) is P6 syllabus content under a separate strand ("Nets"), tightened here to cube nets specifically. It is used only as a *conceptual bridge* in Story and the first Simulate station, mirroring how CircleQuest treated circumference as a bridge into circle area — it is **not** part of the 100-question bank.

**Domain conventions:**
- Calculator use is permitted at P6, but CubeQuest follows the product's standing "clean number" convention (see §9) rather than assuming calculator-driven arbitrary decimals. **Flagged in §14 for confirmation**, as before.
- 1 litre (ℓ) = 1000 cm³ = 1000 ml, used wherever a world involves the liquid capacity of a cube-shaped tank.

## 4. Learning Objectives

By the end of this module, a student should be able to:
1. Recall and apply Volume = edge × edge × edge to find the volume of a cube in a real-life object (a die, an ice cube, a storage box).
2. Find the area of one face of a cube, given its edge length.
3. Find the length of one edge of a cube given the area of one of its faces, using the square root.
4. Find the length of one edge of a cube given its volume, using the cube root.
5. Find the volume of a cube given only the area of one face — a composite skill combining objectives 3 and 1.
6. Compare and order the volumes of several cubes of different sizes.
7. Convert between litres, millilitres, and cubic centimetres when solving problems involving the volume of liquid in a cube-shaped tank.
8. Solve multi-step, real-life word problems that combine two or more of the above skills — how many small cubes pack into a larger cube, or the combined volume of several cube-shaped blocks.
9. Connect a cube's flat, foldable net to its 3-D volume, as an intuition-building bridge (conceptual only — not bank-tested; see §3).

## 5. Inherited Standards (Section A — fixed, copied as-is)

### 5.1 Five-Phase Learning Architecture
Wonder → Story → Simulate → Play (labelled "Practice" in-UI) → Reflect, exactly as specified in the reference architecture:
- **Wonder:** single hook screen posing a concrete question requiring the topic's core skill.
- **Story:** 4-panel narrative teaching the concept through two named characters and a mascot (see §7).
- **Simulate:** 4 hands-on interactive stations (see §8).
- **Play/Practice:** 100-question bank across 10 worlds, 4 selectable modes (Guided Practice, Independent Practice, Timed Challenge, Boss Battle).
- **Reflect:** 3-question conceptual recap quiz, results/scorecard summary, optional reflection prompt.

### 5.2 Gamification (unchanged mechanics)
XP per question (attempt count, hints used, streak); Stars 0–3 per world (9–10 correct = 3★, 7–8 = 2★, 5–6 = 1★, below = 0★); continuous streak tracking; 8 fixed badge triggers (relabelled, §9); Boss Battles (5 questions, 3 lives, one per world, 10 total).

### 5.3 Practice Modes (unchanged)
| Mode | Questions | Hints | Timed | Lives |
|---|---|---|---|---|
| Guided Practice | 5 | Yes | No | No |
| Independent Practice | 10 | No | No | No |
| Timed Challenge | 8 | No | Yes (60s) | No |
| Boss Battle | 5 | No | No | Yes (3) |

### 5.4 Audio & Narration Pipeline
ElevenLabs-only, per the standing `audio_generation_pipeline.md` spec: Alice voice (`Xb7hH8MSUJpSbSDYk0k2`), model `eleven_multilingual_v2`, 6 emotional presets; pre-generated static `.mp3`s via `scripts/generate_audio.js` → `audioMap.js`, dynamic generation only for procedurally-varying question text; **no browser Web Speech API fallback, ever**; strict 1:1 spoken/on-screen text parity; universal rule — all symbols/abbreviations/notation spoken as full natural language (topic-specific term list in §10).

### 5.5 Question Bank Shape
10 themed worlds × 10 questions = 100 total, procedurally generated from templates (≥300 randomized QA generations, zero malformed outputs). Schema: `id`, `districtId`/`worldId`, `category`, `visual`, `questionText`, `options` (4, one correct), `correctAnswer`, `explanation`, `hint1`, `hint2`, `visualData`. World 9 (10th/last) is always the mixed-review/grand-finale world.

### 5.6 Enforced Product Standards
React/Vite/Tailwind/Framer Motion; pixel-faithful reuse of `design-tokens.css`, Fredoka/Nunito fonts, dark glass-morphism system; enlarged fonts/touch targets in Simulate and Practice, calibrated for P6 age (more restrained than lower grades, still accessible); surgical reuse of every non-topic-specific reference file; delivery as a downloadable zip excluding `node_modules`/`dist`, with placeholder story images at the reference's shipped dimensions plus an art-brief README.

**No `{{SPECIAL_INSTRUCTIONS}}` were supplied for this build** — all defaults apply, including the Singaporean-multicultural naming convention (§7). The narrowing from "cube and cuboid" to "cubes only" was supplied as the module's topic itself, not as a special instruction layered on top of it, and is treated as such throughout §3–§9.

## 6. Enhancement Requests

None specified beyond the topic narrowing itself (§3). All other Section A defaults apply as-is.

## 7. Module Identity

- **Module name:** **CubeQuest** (unchanged — the name already fit better once the topic narrowed to cubes only).
- **Story theme:** *"Dev & Xin Yi's Cube Craft Co."* — renamed from the earlier "Box & Build Co." draft to reflect the cube-only focus. The two characters run a small design-and-build studio that takes real cube-shaped orders (a dice maker, a sugar-cube factory, an aquarium shop, a storage company).
- **Characters:** **Dev** and **Xin Yi** (Singaporean-multicultural naming convention — default, unchanged from the prior draft).
- **Mascot:** **Bo the Beaver 🦫** — unchanged override of the shared default (Tally the Owl 🦉). Rationale carried over: beavers are real-world natural builders, reinforcing a "build things" identity that still fits a cube-only build.

## 8. Five-Phase Journey Detail

### 8.1 Wonder
Hook screen: *"Bo's Cube Craft Co. just got an order for a batch of dice — the client only told us how much space each one takes up. How do we figure out the length of one edge?"*

### 8.2 Story (4 panels — default panel count retained)
| # | Title | Concept delivered | Narrative beat |
|---|---|---|---|
| 1 | "A Cube-Shaped Order" | Concrete hook — volume of a cube in a real business context | Dev & Xin Yi receive the dice order at Cube Craft Co.; Bo the Beaver introduces the workshop. |
| 2 | "Every Side the Same" | Recap Volume = edge × edge × edge; establish that a cube has only *one* unknown, unlike other boxes | Xin Yi explains why a cube is special — knowing one edge tells you everything about it. |
| 3 | "Roots at the Workbench" | Formal rule/formula: edge from face area (√), edge from volume (∛) | Dev works through the dice order step by step, introducing both root symbols side by side. |
| 4 | "Filling the Tank" | Extension/complex case + celebration: liquid volume in a cube-shaped aquarium, l/ml/cm³ conversion | The team finishes a cube-shaped aquarium order, calculates how many litres it holds, and celebrates opening day. |

*Build note for the TRD:* panel count is unchanged from the reference (4), so no generalization of the reference's `storyPanel >= 3` reducer check is required — still worth verifying against the actual clone-source repo per TRD §1.2.

### 8.3 Simulate — Four Stations (archetype heuristic)

| Archetype | Station name | Premise | Student manipulates | Live feedback | Completion gate |
|---|---|---|---|---|---|
| Concept Discovery Lab | **Cube Unfold Lab** | A flat cardboard net of six identical squares folds up into a cube, which then fills with unit cubes, visually revealing why Volume = edge³ | Taps/drags to fold the net; scrubs a "fill" slider | Live unit-cube count filling the cube; running edge × edge × edge readout | Full fold + fill interaction explored, plus 1 confirmation question ("How many unit cubes fit along one edge?") |
| Build-to-Target Challenge | **Custom Cube Builder** | A client order specifies a target volume; the student must build a cube that matches | A single edge-length slider/dial, with +/− keyboard controls (only one control needed — a cube has one free dimension) | Live 3-D cube visual + running Volume = edge³ readout | Hits the target volume within a tolerance band; "try another round" loop before markable complete |
| Multi-Step/Composite Construction Challenge | **Sugar Cube Packing Mission** | A factory packs small sugar cubes into a larger cube-shaped crate | Sets the small cube's edge and the large crate's edge on two dials | Live packing-grid animation; running "small cubes needed" readout (large volume ÷ small volume) | Correctly computes both volumes and the resulting whole-number pack count |
| Error-Detective | **Delivery Note Detective** | A completed packing slip shows a solved cube-volume problem with one seeded mistake (e.g., using √ where ∛ was needed, or a unit-conversion slip using 1 ℓ = 100 cm³) | Taps the erroneous line, then corrects the value | Highlights the flagged line; shows corrected working once fixed | Correctly identifies and fixes the seeded error |

All four are genuinely interactive (live-updating visuals, not static reveal-and-answer screens) and visually distinct, per the fixed heuristic.

### 8.4 Play / Practice — World & Question Bank

World 9 (10th/last) is the mixed-review/grand-finale world. Progression moves foundational → applied, mirroring §4's learning-objective order.

| World (id) | Theme / emoji | conceptFocus | Description | Boss (reward) |
|---|---|---|---|---|
| 0 | Ice Cube Tray Lab 🧊 | `volume-recall` | Find the volume of an ice cube given its edge length | Frosty the Freeze Boss (❄️ "Steady Hands" badge) |
| 1 | Dice Workshop 🎲 | `face-area-and-edge-from-area` | Find a die's face area from its edge, and its edge from a given face area (√) | The Dice Master (🎲 "Root Finder" badge) |
| 2 | Sugar Cube Factory 🍬 | `edge-from-volume` | Find the edge length of a sugar cube given its volume (∛) | The Sugar Sorter (🍬 "Cube Cracker" badge) |
| 3 | Gift Box Studio 🎁 | `compare-order-volumes` | Compare and order the volumes of several cube-shaped gift boxes | Ribbon & Wrap Master (🎀 "Wrap Star" badge) |
| 4 | Storage Cube Depot 🗄️ | `unit-cube-stacking` | Build a storage cube from stacked unit cubes; count total volume | The Stack Inspector (📦 "Stacker's Eye" badge) |
| 5 | Aquarium Cube Shop 🐠 | `liquid-volume-conversion` | Find how many litres a cube-shaped tank holds, converting cm³ ↔ ℓ ↔ ml | The Tide Guardian (🌊 "Tank Master" badge) |
| 6 | Building Blocks Site 🧱 | `composite-compare-combine` | Combine the volumes of two or more cube-shaped building blocks | Site Supervisor Titan (🚧 "Builder's Badge") |
| 7 | Packing & Recycling Depot ♻️ | `real-world-word-problems` | How many small cubes pack exactly into a larger cube box | The Compactor (🔩 "Depot Champion" badge) |
| 8 | Rubik's Cube Puzzle Corner 🧩 | `multistep-applied` | Combined chains — face area → edge → volume, and back | The Puzzle Champion (🧩 "Deep End" badge) |
| 9 | Cube Craft Co. Grand Opening 🏆 | `mixed-review` | Every question type from Worlds 0–8, hardest boss, grand finale | The Grand Inspector (👑 "Cube Craft Co. Graduate" badge) |

**Sample questions (illustrative, 1–2 per world; full bank is 10 procedurally-generated questions per world):**

- **World 0:** *"An ice cube has an edge of 4 cm. What is its volume?"* → 64 cm³.
- **World 1:** *"A die has a face area of 36 cm². What is the length of one edge?"* → 6 cm.
- **World 2:** *"A sugar cube has a volume of 27 cm³. What is the length of one edge?"* → 3 cm.
- **World 3:** *"Box A is a cube with edge 5 cm. Box B is a cube with edge 4 cm. Which has the greater volume, and by how much?"* → Box A, by 61 cm³.
- **World 4:** *"Bo stacks 1 cm unit cubes into a storage cube that is 3 cubes long, 3 wide, and 3 tall. How many unit cubes are used?"* → 27.
- **World 5:** *"A cube-shaped aquarium has an edge of 30 cm and is completely filled with water. How many litres does it hold?"* → 27 litres.
- **World 6:** *"Two cube-shaped building blocks have edges of 6 cm and 8 cm. What is their total combined volume?"* → 728 cm³.
- **World 7:** *"A large cube-shaped crate has an edge of 12 cm. Small cube boxes with edge 4 cm are packed inside. How many small boxes fit exactly?"* → 27.
- **World 8:** *"A Rubik's cube has a face area of 81 cm². What is its volume?"* → 729 cm³ (edge 9 cm, then cubed).
- **World 9:** mixed — one question drawn from each of the above types, plus at least one multi-step combination question.

**Clean-number convention (hard constraint carried into the TRD's generation logic, §3.3):** cube volumes are always drawn from a curated perfect-cube pool (8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2744, 3375 cm³, edges 2–15) so volume-to-edge answers are always whole numbers; face areas are always drawn from a matching perfect-square pool (4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225 cm², the same edge range) so face-area-to-edge answers are always whole numbers; liquid-volume problems use edges whose cube is a multiple of 1000 cm³ wherever a litre answer is expected, so conversions resolve to clean values.

## 9. Gamification Naming

| Trigger (fixed) | Badge name |
|---|---|
| First correct answer | First Delivery Made 📦 |
| 5-answer streak | Steady Hands Streak 🔧 |
| 10-answer streak | Master Builder Streak 🏗️ |
| All 4 Simulate stations complete | Workshop Certified 🛠️ |
| Any world scores 3 stars | Gold Blueprint Award 🥇 |
| Any Boss Battle won | Boss Contract Won 🏆 |
| 20+ questions answered in Practice | Warehouse Champion 📐 |
| Full 5-phase journey complete | Cube Craft Co. Graduate 🎓 |

## 10. Audio & Narration Content Rules

Topic-specific terms that must always be spoken in full — never as symbols, abbreviations, or digits-only:
- "cubic centimetres" — never "cm³"
- "square centimetres" — never "cm²"
- "litres" — never "l" or "ℓ"
- "millilitres" — never "ml"
- "cube root of" — never "∛"
- "square root of" — never "√"
- "edge times edge times edge" — never "e × e × e" or an exponent shorthand
- Full phrases spoken naturally, e.g. "an edge of six centimetres," never an abbreviated string
- Large volume figures spoken in full, e.g. "seven hundred and twenty-nine cubic centimetres," never "729cm³"

## 11. Accessibility

Enlarged fonts and touch targets in Simulate and Practice phases, calibrated for P6's age band (more restrained than lower-grade modules, but still generously sized). Custom Cube Builder's single slider and Sugar Cube Packing Mission's two dials both expose explicit +/− keyboard-operable buttons, not drag-only. Visual aids (cube diagrams, tank fill levels) carry text labels, not color-only cues.

## 12. Assets Required

4 story images (matching the 4-panel Story phase), delivered as placeholders at the reference's actual shipped dimensions/aspect ratio, accompanied by an art-brief README describing each panel's required scene, characters, and mood (per §8.2's panel table).

## 13. Success Metrics / Acceptance Criteria

Fixed (every module): question-bank stress test (≥300 randomized generations, zero malformed outputs), audio parity (every narrated string has a matching `audioMap.js` entry or is intentionally dynamic), clean production build, full 5-phase journey walkthrough with zero console errors.

Module-specific:
- Every volume-to-edge (cube root) question resolves to an exact whole-number edge length.
- Every face-area-to-edge (square root) question resolves to an exact whole-number edge length.
- Every liquid-volume question's litre conversion resolves to a clean (non-repeating) value.
- All 4 Simulate stations (§8.3) are genuinely interactive, not static reveal-and-answer screens.
- No question in the bank requires a cuboid with three unequal dimensions, or total surface area — confirming the §3 scoping boundary is respected end-to-end in the generator.

## 14. Assumptions & Open Questions

1. **Topic-narrowing confirmation.** This build removes all cuboid-specific content (unequal-dimension reverse problems, height-from-base-area, face-area-from-one-dimension) that appeared in the earlier "Cube & Cuboid" draft, in favor of a tighter cube-only scope built around the √/∛ pairing. **Please confirm this is the intended scope** — if cuboid content should be reintroduced later, it's likely cleanest as a separate sibling module (e.g. a future "CuboidQuest") rather than folded back into this one.
2. **Liquid-conversion scope:** l/ml/cm³ conversion for the cube-tank problem (World 5) is textually a P6 *Foundation* Mathematics syllabus point rather than Standard, included here as a real-life extension since it matches standard PSLE-word-problem practice. **Needs stakeholder confirmation**, as in the prior draft.
3. **Clean-number vs. calculator-realistic numbers:** unchanged from the prior draft — this module defaults to curated "clean number" pools (now including perfect squares alongside perfect cubes) rather than calculator-realistic decimals. **Needs confirmation.**
4. **Characters/mascot:** Dev, Xin Yi, and Bo the Beaver 🦫 carry over unchanged from the prior draft; still pending approval.
5. **Nets as a future module:** the Nets topic (2-D representations, identifying/folding a cube's net) remains scoped out of the tested question bank, used only as a Story/Simulate conceptual bridge (Cube Unfold Lab).
6. **Surface area boundary:** confirmed excluded per MOE P6 scope (§3), same as before.

---

*Pairs with `CubeQuest_TRD.md`, produced from `Intellia_Module_Blueprint_TRD.md` using this PRD's content decisions as direct inputs.*
