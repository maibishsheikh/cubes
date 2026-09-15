// src/config/worlds.config.js
// 10 Thematic Worlds for CubeQuest (Primary 6 Cubes — Volume, Face Area, Roots & Word Problems)

export const WORLDS = [
  {
    id: 0,
    name: "Ice Cube Tray Lab",
    emoji: "🧊",
    accent: "var(--world-0)",
    description: "Find the volume of an ice cube given its edge length.",
    conceptFocus: "volume-recall",
    boss: { name: "Frosty the Freeze Boss", emoji: "❄️", reward: "Steady Hands Badge ❄️" }
  },
  {
    id: 1,
    name: "Dice Workshop",
    emoji: "🎲",
    accent: "var(--world-1)",
    description: "Find a die's face area from its edge, and its edge from a face area.",
    conceptFocus: "face-area-and-edge-from-area",
    boss: { name: "The Dice Master", emoji: "🎲", reward: "Root Finder Badge 🎲" }
  },
  {
    id: 2,
    name: "Sugar Cube Factory",
    emoji: "🍬",
    accent: "var(--world-2)",
    description: "Find the edge length of a sugar cube given its volume.",
    conceptFocus: "edge-from-volume",
    boss: { name: "The Sugar Sorter", emoji: "🍬", reward: "Cube Cracker Badge 🍬" }
  },
  {
    id: 3,
    name: "Gift Box Studio",
    emoji: "🎁",
    accent: "var(--world-3)",
    description: "Compare and order the volumes of several cube-shaped gift boxes.",
    conceptFocus: "compare-order-volumes",
    boss: { name: "Ribbon & Wrap Master", emoji: "🎀", reward: "Wrap Star Badge 🎀" }
  },
  {
    id: 4,
    name: "Storage Cube Depot",
    emoji: "🗄️",
    accent: "var(--world-4)",
    description: "Build a storage cube from stacked unit cubes; count total volume.",
    conceptFocus: "unit-cube-stacking",
    boss: { name: "The Stack Inspector", emoji: "📦", reward: "Stacker's Eye Badge 📦" }
  },
  {
    id: 5,
    name: "Aquarium Cube Shop",
    emoji: "🐠",
    accent: "var(--world-5)",
    description: "Find how many litres a cube-shaped tank holds.",
    conceptFocus: "liquid-volume-conversion",
    boss: { name: "The Tide Guardian", emoji: "🌊", reward: "Tank Master Badge 🌊" }
  },
  {
    id: 6,
    name: "Building Blocks Site",
    emoji: "🧱",
    accent: "var(--world-6)",
    description: "Combine the volumes of two or more cube-shaped building blocks.",
    conceptFocus: "composite-compare-combine",
    boss: { name: "Site Supervisor Titan", emoji: "🚧", reward: "Builder's Badge 🚧" }
  },
  {
    id: 7,
    name: "Packing & Recycling Depot",
    emoji: "♻️",
    accent: "var(--world-7)",
    description: "How many small cubes pack exactly into a larger cube box.",
    conceptFocus: "real-world-word-problems",
    boss: { name: "The Compactor", emoji: "🔩", reward: "Depot Champion Badge 🔩" }
  },
  {
    id: 8,
    name: "Rubik's Cube Puzzle Corner",
    emoji: "🧩",
    accent: "var(--world-8)",
    description: "Combined chains — face area to edge to volume, and back.",
    conceptFocus: "multistep-applied",
    boss: { name: "The Puzzle Champion", emoji: "🧩", reward: "Deep End Badge 🧩" }
  },
  {
    id: 9,
    name: "Cube Craft Co. Grand Opening",
    emoji: "🏆",
    accent: "var(--world-9)",
    description: "Every question type from Worlds 0–8 — the hardest boss, grand finale.",
    conceptFocus: "mixed-review",
    boss: { name: "The Grand Inspector", emoji: "👑", reward: "Cube Craft Co. Graduate 👑" }
  },
];

export const DISTRICTS = WORLDS.map(w => ({
  id: w.id,
  name: w.name,
  icon: w.emoji,
  boss: w.boss
}));
