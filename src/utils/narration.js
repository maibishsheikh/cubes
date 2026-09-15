// src/utils/narration.js
// Narration script builder for CubeQuest (Primary 6 Cubes)
// Strictly matches on-screen text and follows PRD §10 natural speech conventions:
// Spoken in full: "cubic centimetres", "square centimetres", "litres", "cube root of", "square root of", "edge times edge times edge"

export const say       = (text) => ({ text, style: 'statement' });
export const ask       = (text) => ({ text, style: 'question' });
export const cheer     = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think     = (text) => ({ text, style: 'thinking' });
export const instruct  = (text) => ({ text, style: 'instruction' });
export const encourage = (text) => ({ text, style: 'encouragement' });

export function wonderNarration() {
  return [
    say("Welcome to CubeQuest at Dev and Xin Yi's Cube Craft Company!"),
    say("Bo the Beaver just received a client order for custom dice, but the client only gave the total space each die takes up: its volume!"),
    ask("How do we work backward from a cube's volume to discover the length of its edge?"),
    cheer("Let's step into the workshop and uncover the power of cube roots!"),
  ];
}

export function storyNarration(panel) {
  const scripts = [
    // Panel 0: A Cube-Shaped Order
    [
      say("Dev and Xin Yi opened the workshop doors at Cube Craft Company."),
      say("Bo the Beaver scurried in with a rush order: a custom batch of precision gaming dice!"),
      think("The client wants each die to have a volume of exactly two hundred and sixteen cubic centimetres, Dev said, scratching his chin."),
      say("Xin Yi measured a blank block. To cut the dice, we need the exact length of just one edge!"),
      cheer("Bo tapped his blueprint excitedly: Every edge of a cube is identical!"),
    ],
    // Panel 1: Every Side the Same
    [
      say("Xin Yi laid out the geometric principles on the drafting table."),
      say("A cube is the most special box in geometry because length, width, and height are all equal!"),
      say("Its volume is edge times edge times edge. If one edge is six centimetres, volume is six times six times six, which equals two hundred and sixteen cubic centimetres!"),
      think("And each of its six faces is an identical square with area equal to edge times edge, Xin Yi explained."),
      cheer("Because all edges are equal, knowing one edge reveals everything about the cube!"),
    ],
    // Panel 2: Roots at the Workbench
    [
      say("Dev pulled down the workshop formula guide to solve reverse problems."),
      say("When you know the area of one face, use the square root to find the edge! For thirty-six square centimetres, the square root of thirty-six is six centimetres."),
      say("When you know the total volume, use the cube root! For two hundred and sixteen cubic centimetres, the cube root of two hundred and sixteen is six centimetres."),
      think("Square root unpacks two equal dimensions. Cube root unpacks three equal dimensions!"),
      cheer("Both roots point straight to the same six-centimetre edge! Perfect!"),
    ],
    // Panel 3: Filling the Tank
    [
      say("For their grand opening project, the team built a magnificent cube-shaped display aquarium!"),
      say("The glass aquarium has an edge length of thirty centimetres. Its volume is thirty times thirty times thirty, which is twenty-seven thousand cubic centimetres."),
      say("Xin Yi reminded the team that one litre equals one thousand cubic centimetres."),
      say("Twenty-seven thousand cubic centimetres divided by one thousand gives twenty-seven litres!"),
      cheer("The tank was filled to perfection, and Cube Craft Company officially celebrated its grand opening!"),
    ],
  ];

  return scripts[panel] || scripts[0];
}

export function simStationIntro(stationIdx) {
  const intros = [
    [
      instruct("Welcome to Station A — Cube Unfold Lab!"),
      instruct("Drag or tap the slider to fold a six-square flat cardboard net into a three-dimensional cube. Then scrub the fill control to pack it with unit cubes and discover why volume equals edge times edge times edge!"),
    ],
    [
      instruct("Welcome to Station B — Custom Cube Builder!"),
      instruct("Client orders have arrived with target volumes! Use the edge controls and plus-minus buttons to build cubes that hit the exact target volume!"),
    ],
    [
      instruct("Welcome to Station C — Sugar Cube Packing Mission!"),
      instruct("Help the factory pack small sugar cubes into large shipping crates! Adjust both edge lengths to calculate the volumes and find how many small cubes pack tightly inside!"),
    ],
    [
      instruct("Welcome to Station D — Delivery Note Detective!"),
      instruct("A packing slip has been flagged with a math error! Inspect the lines, tap the line with the mistake, and enter the corrected number!"),
    ],
  ];

  return intros[stationIdx] || intros[0];
}

export function playQuestionNarration(questionText) {
  // Convert symbols to spoken words for natural speech
  const spoken = (questionText || '')
    .replace(/cm³/g, 'cubic centimetres')
    .replace(/cm²/g, 'square centimetres')
    .replace(/∛/g, 'the cube root of ')
    .replace(/√/g, 'the square root of ')
    .replace(/\b1 ℓ\b/g, 'one litre')
    .replace(/\bℓ\b/g, 'litres')
    .replace(/\bml\b/g, 'millilitres');

  return [ask(spoken)];
}

export function playCorrectNarration(streak = 1) {
  if (streak >= 10) {
    return [cheer("Master builder streak! Ten in a row! You are unstoppable! 🏗️")];
  }
  if (streak >= 5) {
    return [cheer("Steady hands streak! Five in a row! Outstanding precision! 🔧")];
  }
  if (streak >= 3) {
    return [cheer("Awesome! Three in a row! Keep up the momentum! ⭐")];
  }
  return [cheer("Spot on! That's correct! 🎉")];
}

export function playWrongNarration() {
  return [
    think("Not quite — check the hint, remember whether you need square root or cube root, and try again! 💡")
  ];
}

export function playHint1Narration() {
  return [
    encourage("Here is your first clue! Recall the key formula: Volume equals edge times edge times edge, and Face Area equals edge times edge.")
  ];
}

export function playHint2Narration() {
  return [
    encourage("Here is your second clue! Use the cube root to find the edge from volume, or the square root to find the edge from face area.")
  ];
}

export function districtCompleteNarration() {
  return [
    cheer("World Complete! Spectacular craftsmanship on this workshop district! 🌟")
  ];
}

export function bossStartNarration() {
  return [
    instruct("The Boss Challenge begins! Answer all five cube questions correctly with your three lives to earn the World Badge! 🏆")
  ];
}

export function bossWinNarration() {
  return [
    cheer("Victory! You defeated the boss and secured the contract! Wear your badge with pride! 👑")
  ];
}

export function reflectNarration() {
  return [
    say("Welcome to the Reflect Phase! Let's review the core rules of cube volume and roots, and inspect your mastery scorecard! 📓")
  ];
}

export function reflectCompleteNarration() {
  return [
    cheer("Outstanding! You have mastered cube volume, face area, square roots, and cube roots! You are a certified Cube Craft Co. Graduate! 🏆")
  ];
}
