# CubeQuest — Primary 6 Mathematics (Volume of Cubes)

CubeQuest is an interactive educational module aligned with the **Singapore MOE Primary Mathematics Syllabus (Primary 6 Standard, Strand 5 — Measurement: Volume of Cube)**.

Developed by Intellia Global, CubeQuest teaches students to work **forward** (finding volume $e^3$ and square face area $e^2$) and **backward** (finding edge length using cube root $\sqrt[3]{\phantom{x}}$ from volume and square root $\sqrt{\phantom{x}}$ from face area) through a signature 5-phase learning architecture.

---

## 🌟 5-Phase Learning Architecture

1. **Wonder (Hook Phase)**:
   - "The Cube Craft Mystery!" poses a real-world client order for custom dice where only the volume ($216\text{ cm}^3$) is specified, inspiring students to investigate how to reverse-engineer the unknown edge.
2. **Story (Narrative Phase)**:
   - 4 widescreen illustrated panels following **Dev** (young builder) and **Xin Yi** (designer) alongside their workshop mascot, **Bo the Beaver 🦫**, at *Dev & Xin Yi's Cube Craft Co.*
3. **Simulate (Hands-On Labs Phase)**:
   - 4 interactive stations:
     - **Station A: Cube Unfold Lab**: Fold a flat 2D net into a 3D solid cube, then scrub a slider to fill it with unit cubes ($3 \times 3 \times 3 = 27$).
     - **Station B: Custom Cube Builder**: Single edge slider with +/− buttons to build cubes matching target volumes ($64$, $125$, $216\text{ cm}^3$).
     - **Station C: Sugar Cube Packing Mission**: Compute small cube volume and crate volume to pack factory orders without empty space.
     - **Station D: Delivery Note Detective**: Inspect client delivery slips, tap mathematical calculation errors (e.g. dividing by 4 instead of $\sqrt{\phantom{x}}$, or confusing $\sqrt{\phantom{x}}$ with $\sqrt[3]{\phantom{x}}$), and select corrected working.
4. **Practice (Play / Practice Phase)**:
   - 10 themed worlds with 100 procedurally generated questions built from `cubeMath.js`.
   - 4 gameplay modes: Guided Practice, Independent Practice, Timed Challenge, Boss Battles (3 lives, 5 questions).
   - Real-time XP, streaks, and 8 achievement badges.
5. **Reflect (Scorecard & Journal Phase)**:
   - 3-question conceptual verification check, student takeaway journal, star breakdown, and graduation trophy.

---

## 🎨 Art Brief for Story Panels

| Panel | Title | Characters | Scene & Mood |
|---|---|---|---|
| 1 | *A Cube-Shaped Order* | Dev, Xin Yi, Bo the Beaver | Sunlit woodworking workshop ("Cube Craft Co.") with workbenches, tools, wooden blocks, blueprints, and custom gaming dice. Curious and industrious mood. |
| 2 | *Every Side the Same* | Xin Yi, Bo the Beaver | High-tech drafting table showing a glowing 3D cube hologram illustrating 12 equal edges and 6 equal square faces. Scientific and discovery mood. |
| 3 | *Roots at the Workbench* | Dev, Bo the Beaver | Dev carefully measuring a wooden cube with golden calipers. Glowing holographic symbols for $\sqrt{16}=4$ and $\sqrt[3]{27}=3$. Focused and educational mood. |
| 4 | *Filling the Tank* | Dev, Xin Yi, Bo the Beaver | Grand opening celebration beside an illuminated cube-shaped glass aquarium filled with turquoise water and tropical fish. Confetti, banners, and triumphant mood. |

---

## 🛠️ Technical Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS + TailwindCSS utility tokens + Dark Glass-Morphism Design System
- **Animation**: Framer Motion
- **Icons**: Lucide-React + Unicode Colour Emojis
- **Audio Pipeline**: ElevenLabs TTS (Alice voice `Xb7hH8MSUJpSbSDYk0k2`, model `eleven_multilingual_v2`) with offline pre-generation and fallback memory cache.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run automated QA stress test (300 runs, 30,000 questions)
npm run test:qa

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
