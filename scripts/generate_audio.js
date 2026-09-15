// scripts/generate_audio.js
// Offline pre-generation script for ElevenLabs narration audio files in CubeQuest.
// Strictly follows audio pipeline specifications and PRD §10 natural speech rules.

import fs from 'fs';
import path from 'path';

function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...rest] = trimmed.split('=');
          const val = rest.join('=').replace(/^["']|["']$/g, '').trim();
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const apiKey = process.env.VITE_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.log("ℹ️ Note: VITE_ELEVENLABS_API_KEY is not defined in .env.local.");
  console.log("To pre-generate ElevenLabs audio, create a .env.local file with: VITE_ELEVENLABS_API_KEY=your_key_here\n");
}

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice — Clear, Engaging Educator
const VOICE_MODEL = 'eleven_multilingual_v2';

const VOICE_SETTINGS = {
  statement:     { stability: 0.65, similarity_boost: 0.80, style: 0.30, use_speaker_boost: true },
  instruction:   { stability: 0.65, similarity_boost: 0.80, style: 0.30, use_speaker_boost: true },
  question:      { stability: 0.55, similarity_boost: 0.75, style: 0.50, use_speaker_boost: true },
  encouragement: { stability: 0.50, similarity_boost: 0.85, style: 0.60, use_speaker_boost: true },
  emphasis:      { stability: 0.75, similarity_boost: 0.90, style: 0.20, use_speaker_boost: true },
  thinking:      { stability: 0.70, similarity_boost: 0.78, style: 0.40, use_speaker_boost: true },
  celebration:   { stability: 0.45, similarity_boost: 0.85, style: 0.80, use_speaker_boost: true },
};

const phrases = [
  // ─── INTRO & WONDER ───────────────────────────────────────────────────────
  { text: "Welcome to CubeQuest at Dev and Xin Yi's Cube Craft Company!", style: 'celebration' },
  { text: "Bo the Beaver just received a client order for custom dice, but the client only gave the total space each die takes up: its volume!", style: 'statement' },
  { text: "How do we work backward from a cube's volume to discover the length of its edge?", style: 'question' },
  { text: "Let's step into the workshop and uncover the power of cube roots!", style: 'celebration' },

  // ─── STORY PHASE: PANEL 1 ────────────────────────────────────────────────
  { text: "Dev and Xin Yi opened the workshop doors at Cube Craft Company.", style: 'statement' },
  { text: "Bo the Beaver scurried in with a rush order: a custom batch of precision gaming dice!", style: 'statement' },
  { text: "The client wants each die to have a volume of exactly two hundred and sixteen cubic centimetres, Dev said, scratching his chin.", style: 'thinking' },
  { text: "Xin Yi measured a blank block. To cut the dice, we need the exact length of just one edge!", style: 'statement' },
  { text: "Bo tapped his blueprint excitedly: Every edge of a cube is identical!", style: 'celebration' },

  // ─── STORY PHASE: PANEL 2 ────────────────────────────────────────────────
  { text: "Xin Yi laid out the geometric principles on the drafting table.", style: 'statement' },
  { text: "A cube is the most special box in geometry because length, width, and height are all equal!", style: 'statement' },
  { text: "Its volume is edge times edge times edge. If one edge is six centimetres, volume is six times six times six, which equals two hundred and sixteen cubic centimetres!", style: 'statement' },
  { text: "And each of its six faces is an identical square with area equal to edge times edge, Xin Yi explained.", style: 'thinking' },
  { text: "Because all edges are equal, knowing one edge reveals everything about the cube!", style: 'celebration' },

  // ─── STORY PHASE: PANEL 3 ────────────────────────────────────────────────
  { text: "Dev pulled down the workshop formula guide to solve reverse problems.", style: 'statement' },
  { text: "When you know the area of one face, use the square root to find the edge! For thirty-six square centimetres, the square root of thirty-six is six centimetres.", style: 'statement' },
  { text: "When you know the total volume, use the cube root! For two hundred and sixteen cubic centimetres, the cube root of two hundred and sixteen is six centimetres.", style: 'statement' },
  { text: "Square root unpacks two equal dimensions. Cube root unpacks three equal dimensions!", style: 'thinking' },
  { text: "Both roots point straight to the same six-centimetre edge! Perfect!", style: 'celebration' },

  // ─── STORY PHASE: PANEL 4 ────────────────────────────────────────────────
  { text: "For their grand opening project, the team built a magnificent cube-shaped display aquarium!", style: 'statement' },
  { text: "The glass aquarium has an edge length of thirty centimetres. Its volume is thirty times thirty times thirty, which is twenty-seven thousand cubic centimetres.", style: 'statement' },
  { text: "Xin Yi reminded the team that one litre equals one thousand cubic centimetres.", style: 'statement' },
  { text: "Twenty-seven thousand cubic centimetres divided by one thousand gives twenty-seven litres!", style: 'statement' },
  { text: "The tank was filled to perfection, and Cube Craft Company officially celebrated its grand opening!", style: 'celebration' },

  // ─── SIMULATE STATION INTROS ─────────────────────────────────────────────
  { text: "Welcome to Station A — Cube Unfold Lab!", style: 'instruction' },
  { text: "Drag or tap the slider to fold a six-square flat cardboard net into a three-dimensional cube. Then scrub the fill control to pack it with unit cubes and discover why volume equals edge times edge times edge!", style: 'instruction' },
  { text: "Welcome to Station B — Custom Cube Builder!", style: 'instruction' },
  { text: "Client orders have arrived with target volumes! Use the edge controls and plus-minus buttons to build cubes that hit the exact target volume!", style: 'instruction' },
  { text: "Welcome to Station C — Sugar Cube Packing Mission!", style: 'instruction' },
  { text: "Help the factory pack small sugar cubes into large shipping crates! Adjust both edge lengths to calculate the volumes and find how many small cubes pack tightly inside!", style: 'instruction' },
  { text: "Welcome to Station D — Delivery Note Detective!", style: 'instruction' },
  { text: "A packing slip has been flagged with a math error! Inspect the lines, tap the line with the mistake, and enter the corrected number!", style: 'instruction' },

  // ─── FEEDBACK & HINTS ────────────────────────────────────────────────────
  { text: "Spot on! That's correct! 🎉", style: 'celebration' },
  { text: "Awesome! Three in a row! Keep up the momentum! ⭐", style: 'celebration' },
  { text: "Steady hands streak! Five in a row! Outstanding precision! 🔧", style: 'celebration' },
  { text: "Master builder streak! Ten in a row! You are unstoppable! 🏗️", style: 'celebration' },
  { text: "Not quite — check the hint, remember whether you need square root or cube root, and try again! 💡", style: 'thinking' },
  { text: "Here is your first clue! Recall the key formula: Volume equals edge times edge times edge, and Face Area equals edge times edge.", style: 'encouragement' },
  { text: "Here is your second clue! Use the cube root to find the edge from volume, or the square root to find the edge from face area.", style: 'encouragement' },
  { text: "World Complete! Spectacular craftsmanship on this workshop district! 🌟", style: 'celebration' },
  { text: "The Boss Challenge begins! Answer all five cube questions correctly with your three lives to earn the World Badge! 🏆", style: 'instruction' },
  { text: "Victory! You defeated the boss and secured the contract! Wear your badge with pride! 👑", style: 'celebration' },
  { text: "Welcome to the Reflect Phase! Let's review the core rules of cube volume and roots, and inspect your mastery scorecard! 📓", style: 'statement' },
  { text: "Outstanding! You have mastered cube volume, face area, square roots, and cube roots! You are a certified Cube Craft Co. Graduate! 🏆", style: 'celebration' },
];

const outputDir = './public/assets/audio';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function cleanString(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 50);
}

async function main() {
  console.log(`\n🎙️ Starting ElevenLabs Audio Generation Pipeline for CubeQuest`);
  console.log(`Voice ID: ${VOICE_ID} | Model: ${VOICE_MODEL}`);
  console.log(`Total phrases to process: ${phrases.length}\n`);

  const mapping = {};

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const cleanText = cleanString(text);
    const fileName = `audio_${cleanText}_${i}.mp3`;
    const destPath = path.join(outputDir, fileName);

    const relativeWebPath = `/assets/audio/${fileName}`;
    mapping[text] = relativeWebPath;

    if (fs.existsSync(destPath)) {
      console.log(`[${i + 1}/${phrases.length}] ⏩ Skipped (already exists): ${fileName}`);
      continue;
    }

    if (!apiKey) {
      // Offline mode without API key: map generated path
      continue;
    }

    console.log(`[${i + 1}/${phrases.length}] 🔊 Generating: "${text.substring(0, 40)}..." -> ${fileName}`);
    const settings = VOICE_SETTINGS[style] || VOICE_SETTINGS.statement;

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: VOICE_MODEL,
          voice_settings: settings,
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errBody}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(destPath, buffer);
      console.log(`   ✅ Saved: ${destPath}`);
    } catch (e) {
      console.error(`   ❌ Failed to generate phrase "${text}":`, e.message);
    }
  }

  // Write mapping to src/utils/audioMap.js
  const mapContent = `// Auto-generated by generate_audio.js\n// Static asset mapping for offline generated narration phrases in CubeQuest\n\nexport const audioMap = ${JSON.stringify(mapping, null, 2)};\n\nexport default audioMap;\n`;
  fs.writeFileSync('./src/utils/audioMap.js', mapContent);
  console.log("\n✨ Audio mapping updated in src/utils/audioMap.js!");
}

main().catch(console.error);
