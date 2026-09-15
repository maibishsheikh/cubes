// src/data/questionBank.js
// 100 Procedurally-Generated Questions for CubeQuest across 10 Themed Worlds
// Singapore MOE Primary 6 Mathematics — Volume of Cubes, Face Area, Roots & Word Problems

import {
  calcVolume,
  calcFaceArea,
  edgeFromVolume,
  edgeFromFaceArea,
  volumeFromFaceArea,
  cm3ToLitres,
  packCount,
  makeOptions,
} from '../utils/cubeMath.js';
import { WORLDS, DISTRICTS } from '../config/worlds.config.js';

export { DISTRICTS };

// ── WORLD 0: Ice Cube Tray Lab (volume-recall) ──────────────────────────────
function genWorld0Questions() {
  const edges = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return edges.map((e, idx) => {
    const vol = calcVolume(e);
    const area = calcFaceArea(e);
    const timesThree = e * 3;
    const correct = `${vol} cm³`;
    const options = makeOptions(correct, [
      `${timesThree} cm³`,
      `${area} cm²`,
      `${vol + 10} cm³`,
      `${vol - e} cm³`,
    ]);

    return {
      id: idx + 1,
      districtId: 0,
      category: 'VOLUME OF CUBE',
      visual: 'cube-3d',
      questionText: `An ice cube in the freezer tray has an edge of ${e} cm. What is its volume?`,
      options,
      correctAnswer: correct,
      explanation: `Volume of a cube = edge × edge × edge. Here, ${e} × ${e} × ${e} = ${vol} cm³.`,
      hint1: `Use the formula: Volume = edge × edge × edge.`,
      hint2: `Multiply: ${e} × ${e} = ${area}, then ${area} × ${e} = ${vol} cm³.`,
      visualData: { edge: e, volume: vol, unit: 'cm' },
    };
  });
}

// ── WORLD 1: Dice Workshop (face-area-and-edge-from-area) ─────────────────────
function genWorld1Questions() {
  // 5 forward (edge -> face area), 5 reverse (face area -> edge using √)
  const edges = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return edges.map((e, idx) => {
    const area = calcFaceArea(e);
    const vol = calcVolume(e);

    if (idx % 2 === 0) {
      // Forward: find face area
      const correct = `${area} cm²`;
      const options = makeOptions(correct, [
        `${e * 4} cm²`,
        `${vol} cm³`,
        `${area + 6} cm²`,
        `${area - 4} cm²`,
      ]);
      return {
        id: 10 + idx + 1,
        districtId: 1,
        category: 'FACE AREA',
        visual: 'cube-face',
        questionText: `A precision wooden die has an edge length of ${e} cm. What is the area of one of its square faces?`,
        options,
        correctAnswer: correct,
        explanation: `Each face of a cube is a square. Area = edge × edge = ${e} × ${e} = ${area} cm².`,
        hint1: `Remember that all six faces of a cube are identical squares.`,
        hint2: `Multiply the edge length by itself: ${e} × ${e} = ${area} cm².`,
        visualData: { edge: e, area, unit: 'cm' },
      };
    } else {
      // Reverse: find edge using √
      const correct = `${e} cm`;
      const options = makeOptions(correct, [
        `${Math.round(area / 4)} cm`,
        `${e * 2} cm`,
        `${Math.max(1, e - 2)} cm`,
        `${e + 3} cm`,
      ]);
      return {
        id: 10 + idx + 1,
        districtId: 1,
        category: 'EDGE FROM AREA',
        visual: 'cube-face',
        questionText: `One square face of a gaming die has an area of ${area} cm². What is the length of one edge?`,
        options,
        correctAnswer: correct,
        explanation: `To find the edge from face area, take the square root: √${area} = ${e} cm, because ${e} × ${e} = ${area}.`,
        hint1: `Find what number multiplied by itself gives ${area}.`,
        hint2: `Use the square root: √${area} = ${e} cm.`,
        visualData: { edge: e, area, unit: 'cm' },
      };
    }
  });
}

// ── WORLD 2: Sugar Cube Factory (edge-from-volume) ───────────────────────────
function genWorld2Questions() {
  const edges = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return edges.map((e, idx) => {
    const vol = calcVolume(e);
    const sqrtVal = Math.round(Math.sqrt(vol));
    const divThree = Math.round(vol / 3);
    const correct = `${e} cm`;
    const options = makeOptions(correct, [
      `${sqrtVal} cm`,
      `${divThree} cm`,
      `${e + 2} cm`,
      `${Math.max(1, e - 1)} cm`,
    ]);

    return {
      id: 20 + idx + 1,
      districtId: 2,
      category: 'CUBE ROOT (∛)',
      visual: 'cube-3d',
      questionText: `A sugar cube at the factory has a volume of ${vol} cm³. What is the length of one edge?`,
      options,
      correctAnswer: correct,
      explanation: `To find the edge from volume, take the cube root: ∛${vol} = ${e} cm, because ${e} × ${e} × ${e} = ${vol}.`,
      hint1: `Find a number that gives ${vol} when multiplied by itself three times.`,
      hint2: `Apply the cube root: ∛${vol} = ${e} cm (${e} × ${e} × ${e} = ${vol}).`,
      visualData: { edge: e, volume: vol, unit: 'cm' },
    };
  });
}

// ── WORLD 3: Gift Box Studio (compare-order-volumes) ─────────────────────────
function genWorld3Questions() {
  const pairs = [
    [5, 4], [4, 3], [6, 5], [6, 4], [5, 3],
    [7, 6], [8, 6], [7, 5], [6, 3], [8, 7],
  ];

  return pairs.map(([eA, eB], idx) => {
    const vA = calcVolume(eA);
    const vB = calcVolume(eB);
    const diff = vA - vB;
    const correct = `Box A by ${diff} cm³`;
    const options = makeOptions(correct, [
      `Box B by ${diff} cm³`,
      `Box A by ${eA - eB} cm³`,
      `Box A by ${calcVolume(eA - eB)} cm³`,
      `Box B by ${eA - eB} cm³`,
    ]);

    return {
      id: 30 + idx + 1,
      districtId: 3,
      category: 'COMPARE VOLUMES',
      visual: 'cube-3d',
      questionText: `Gift Box A is a cube with edge ${eA} cm. Gift Box B is a cube with edge ${eB} cm. Which box has greater volume, and by how much?`,
      options,
      correctAnswer: correct,
      explanation: `Volume of Box A = ${eA}³ = ${vA} cm³. Volume of Box B = ${eB}³ = ${vB} cm³. Box A is larger by ${vA} − ${vB} = ${diff} cm³.`,
      hint1: `Calculate the volume of each cube box first using edge × edge × edge.`,
      hint2: `Box A is ${vA} cm³ and Box B is ${vB} cm³. Subtract them: ${vA} − ${vB} = ${diff} cm³.`,
      visualData: { edgeA: eA, edgeB: eB, diff, unit: 'cm' },
    };
  });
}

// ── WORLD 4: Storage Cube Depot (unit-cube-stacking) ─────────────────────────
function genWorld4Questions() {
  const sizes = [2, 3, 4, 5, 6, 3, 4, 5, 2, 6];
  return sizes.map((n, idx) => {
    const total = calcVolume(n);
    const oneLayer = calcFaceArea(n);
    const correct = `${total}`;
    const options = makeOptions(correct, [
      `${n * 3}`,
      `${oneLayer}`,
      `${total - n}`,
      `${total + oneLayer}`,
    ]);

    return {
      id: 40 + idx + 1,
      districtId: 4,
      category: 'UNIT CUBES',
      visual: 'stacked-cubes',
      questionText: `Bo builds a storage cube using 1 cm unit cubes. The stack is ${n} cubes long, ${n} cubes wide, and ${n} cubes high. How many unit cubes did Bo use?`,
      options,
      correctAnswer: correct,
      explanation: `Number of unit cubes = length × width × height = ${n} × ${n} × ${n} = ${total} unit cubes.`,
      hint1: `There are ${n} layers, each containing ${n} × ${n} unit cubes.`,
      hint2: `Each layer has ${oneLayer} cubes. Total for ${n} layers = ${n} × ${oneLayer} = ${total} cubes.`,
      visualData: { n, count: total, unit: 'cm' },
    };
  });
}

// ── WORLD 5: Aquarium Cube Shop (liquid-volume-conversion) ───────────────────
function genWorld5Questions() {
  // 10, 20, 30, 40, 50 cm edges and full/half capacities
  const tankConfigs = [
    { edge: 10, litres: 1, full: true },
    { edge: 20, litres: 8, full: true },
    { edge: 30, litres: 27, full: true },
    { edge: 40, litres: 64, full: true },
    { edge: 50, litres: 125, full: true },
    { edge: 10, litres: 0.5, full: false },
    { edge: 20, litres: 4, full: false },
    { edge: 30, litres: 13.5, full: false },
    { edge: 20, litres: 8, full: true },
    { edge: 10, litres: 1, full: true },
  ];

  return tankConfigs.map((cfg, idx) => {
    const volCm3 = calcVolume(cfg.edge);
    const actualVol = cfg.full ? volCm3 : volCm3 / 2;
    const lVal = cfg.litres;
    const correct = `${lVal} litres`;
    const options = makeOptions(correct, [
      `${lVal * 10} litres`,
      `${lVal / 10} litres`,
      `${lVal + 2} litres`,
      `${Math.max(0.1, lVal - 1)} litres`,
    ]);

    const stateDesc = cfg.full ? "is filled completely" : "is filled half-full";

    return {
      id: 50 + idx + 1,
      districtId: 5,
      category: 'LIQUID CAPACITY',
      visual: 'tank-liquid',
      questionText: `A cube-shaped aquarium has an edge of ${cfg.edge} cm and ${stateDesc} with water. How many litres of water does it hold? (1 litre = 1,000 cm³)`,
      options,
      correctAnswer: correct,
      explanation: `Total tank volume = ${cfg.edge}³ = ${volCm3} cm³. Water volume = ${actualVol} cm³. Since 1 litre = 1,000 cm³, ${actualVol} ÷ 1,000 = ${lVal} litres.`,
      hint1: `First find the volume in cm³ by calculating ${cfg.edge} × ${cfg.edge} × ${cfg.edge}.`,
      hint2: `Divide the water volume (${actualVol} cm³) by 1,000 to convert to litres.`,
      visualData: { edge: cfg.edge, volumeCm3: actualVol, litres: lVal, full: cfg.full },
    };
  });
}

// ── WORLD 6: Building Blocks Site (composite-compare-combine) ────────────────
function genWorld6Questions() {
  const blockPairs = [
    [2, 3], [3, 4], [4, 5], [2, 4], [3, 5],
    [6, 8], [5, 6], [2, 5], [4, 6], [3, 6],
  ];

  return blockPairs.map(([e1, e2], idx) => {
    const v1 = calcVolume(e1);
    const v2 = calcVolume(e2);
    const total = v1 + v2;
    const correct = `${total} cm³`;
    const options = makeOptions(correct, [
      `${calcVolume(e1 + e2)} cm³`,
      `${(e1 + e2) * 3} cm³`,
      `${total + 20} cm³`,
      `${total - 16} cm³`,
    ]);

    return {
      id: 60 + idx + 1,
      districtId: 6,
      category: 'COMBINED SOLIDS',
      visual: 'stacked-cubes',
      questionText: `A construction crew tests two solid cube blocks with edges of ${e1} cm and ${e2} cm. What is their combined total volume?`,
      options,
      correctAnswer: correct,
      explanation: `First block volume = ${e1}³ = ${v1} cm³. Second block volume = ${e2}³ = ${v2} cm³. Total volume = ${v1} + ${v2} = ${total} cm³.`,
      hint1: `Calculate the volume of each cube individually, then add them together.`,
      hint2: `${e1}³ = ${v1} cm³ and ${e2}³ = ${v2} cm³. Add: ${v1} + ${v2} = ${total} cm³.`,
      visualData: { edgeA: e1, edgeB: e2, totalVolume: total, unit: 'cm' },
    };
  });
}

// ── WORLD 7: Packing & Recycling Depot (real-world-word-problems) ────────────
function genWorld7Questions() {
  const packScenarios = [
    { L: 6,  s: 2 },
    { L: 8,  s: 2 },
    { L: 9,  s: 3 },
    { L: 10, s: 2 },
    { L: 12, s: 3 },
    { L: 12, s: 4 },
    { L: 15, s: 5 },
    { L: 16, s: 4 },
    { L: 10, s: 5 },
    { L: 14, s: 2 },
  ];

  return packScenarios.map(({ L, s }, idx) => {
    const count = packCount(L, s);
    const ratio = L / s;
    const correct = `${count}`;
    const options = makeOptions(correct, [
      `${ratio}`,
      `${ratio * 3}`,
      `${ratio * ratio}`,
      `${count + 6}`,
    ]);

    return {
      id: 70 + idx + 1,
      districtId: 7,
      category: 'PACKING PROBLEMS',
      visual: 'stacked-cubes',
      questionText: `A shipping crate is a cube with edge ${L} cm. Small cube boxes with edge ${s} cm are packed inside. How many small boxes fit exactly without leaving any empty space?`,
      options,
      correctAnswer: correct,
      explanation: `Along each edge, ${L} ÷ ${s} = ${ratio} boxes fit. Total boxes = ${ratio} × ${ratio} × ${ratio} = ${count}. Or: Large volume (${calcVolume(L)} cm³) ÷ Small volume (${calcVolume(s)} cm³) = ${count}.`,
      hint1: `How many small boxes fit along the length, width, and height of the crate?`,
      hint2: `${ratio} boxes fit along each edge. Total = ${ratio} × ${ratio} × ${ratio} = ${count} boxes.`,
      visualData: { largeEdge: L, smallEdge: s, count, unit: 'cm' },
    };
  });
}

// ── WORLD 8: Rubik's Cube Puzzle Corner (multistep-applied) ──────────────────
function genWorld8Questions() {
  // Multistep chains: Face area -> edge -> volume, or Volume -> edge -> face area
  const edges = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return edges.map((e, idx) => {
    const area = calcFaceArea(e);
    const vol = calcVolume(e);

    if (idx % 2 === 0) {
      // Face area -> volume
      const correct = `${vol} cm³`;
      const options = makeOptions(correct, [
        `${area * 3} cm³`,
        `${area * area} cm³`,
        `${vol + 18} cm³`,
        `${Math.round(vol / 2)} cm³`,
      ]);

      return {
        id: 80 + idx + 1,
        districtId: 8,
        category: 'FACE AREA TO VOLUME',
        visual: 'cube-face',
        questionText: `A custom puzzle cube has a face area of ${area} cm². What is its total volume?`,
        options,
        correctAnswer: correct,
        explanation: `Step 1: Edge = √${area} = ${e} cm. Step 2: Volume = ${e} × ${e} × ${e} = ${vol} cm³.`,
        hint1: `Step 1: Use the square root on the face area to find the length of one edge.`,
        hint2: `√${area} = ${e} cm. Now find the volume: ${e}³ = ${vol} cm³.`,
        visualData: { area, edge: e, volume: vol, unit: 'cm' },
      };
    } else {
      // Volume -> face area
      const correct = `${area} cm²`;
      const options = makeOptions(correct, [
        `${Math.round(vol / 6)} cm²`,
        `${e * 4} cm²`,
        `${area + 12} cm²`,
        `${area - 8} cm²`,
      ]);

      return {
        id: 80 + idx + 1,
        districtId: 8,
        category: 'VOLUME TO FACE AREA',
        visual: 'cube-3d',
        questionText: `A solid puzzle cube has a volume of ${vol} cm³. What is the area of one of its square faces?`,
        options,
        correctAnswer: correct,
        explanation: `Step 1: Edge = ∛${vol} = ${e} cm. Step 2: Face area = ${e} × ${e} = ${area} cm².`,
        hint1: `Step 1: Take the cube root of the volume to find the edge length.`,
        hint2: `∛${vol} = ${e} cm. Now square the edge: ${e} × ${e} = ${area} cm².`,
        visualData: { volume: vol, edge: e, area, unit: 'cm' },
      };
    }
  });
}

// ── WORLD 9: Cube Craft Co. Grand Opening (mixed-review) ─────────────────────
function genWorld9Questions() {
  // Grand finale mixing all skills: 1 from each prior world + 1 composite finale
  const qs = [];

  // Q1: Volume recall
  qs.push({
    id: 91,
    districtId: 9,
    category: 'VOLUME OF CUBE',
    visual: 'cube-3d',
    questionText: `A wooden trophy block has an edge of 9 cm. What is its volume?`,
    options: makeOptions('729 cm³', ['27 cm³', '81 cm²', '243 cm³']),
    correctAnswer: '729 cm³',
    explanation: `Volume = 9 × 9 × 9 = 729 cm³.`,
    hint1: `Multiply edge × edge × edge.`,
    hint2: `9 × 9 = 81, and 81 × 9 = 729 cm³.`,
    visualData: { edge: 9, volume: 729, unit: 'cm' },
  });

  // Q2: Edge from face area (√)
  qs.push({
    id: 92,
    districtId: 9,
    category: 'EDGE FROM AREA',
    visual: 'cube-face',
    questionText: `One face of a crystal cube has an area of 144 cm². What is the length of one edge?`,
    options: makeOptions('12 cm', ['36 cm', '72 cm', '14 cm']),
    correctAnswer: '12 cm',
    explanation: `Edge = √144 = 12 cm, because 12 × 12 = 144.`,
    hint1: `Which number multiplied by itself gives 144?`,
    hint2: `√144 = 12 cm.`,
    visualData: { area: 144, edge: 12, unit: 'cm' },
  });

  // Q3: Edge from volume (∛)
  qs.push({
    id: 93,
    districtId: 9,
    category: 'CUBE ROOT (∛)',
    visual: 'cube-3d',
    questionText: `A brass paperweight has a volume of 512 cm³. What is the length of one edge?`,
    options: makeOptions('8 cm', ['16 cm', '64 cm', '24 cm']),
    correctAnswer: '8 cm',
    explanation: `Edge = ∛512 = 8 cm, because 8 × 8 × 8 = 512.`,
    hint1: `Use the cube root: find a number where e³ = 512.`,
    hint2: `8 × 8 × 8 = 512, so the edge is 8 cm.`,
    visualData: { volume: 512, edge: 8, unit: 'cm' },
  });

  // Q4: Compare volumes
  qs.push({
    id: 94,
    districtId: 9,
    category: 'COMPARE VOLUMES',
    visual: 'cube-3d',
    questionText: `Cube X has edge 5 cm and Cube Y has edge 3 cm. How much greater is the volume of Cube X than Cube Y?`,
    options: makeOptions('98 cm³', ['8 cm³', '2 cm³', '16 cm³']),
    correctAnswer: '98 cm³',
    explanation: `Cube X volume = 5³ = 125 cm³. Cube Y volume = 3³ = 27 cm³. Difference = 125 − 27 = 98 cm³.`,
    hint1: `Find the volume of each cube first: 5³ and 3³.`,
    hint2: `125 − 27 = 98 cm³.`,
    visualData: { edgeA: 5, edgeB: 3, diff: 98, unit: 'cm' },
  });

  // Q5: Liquid capacity
  qs.push({
    id: 95,
    districtId: 9,
    category: 'LIQUID CAPACITY',
    visual: 'tank-liquid',
    questionText: `A cube-shaped glass tank with edge 20 cm is completely full of water. How many litres of water are in the tank?`,
    options: makeOptions('8 litres', ['80 litres', '0.8 litres', '4 litres']),
    correctAnswer: '8 litres',
    explanation: `Volume = 20 × 20 × 20 = 8,000 cm³. Since 1,000 cm³ = 1 litre, 8,000 ÷ 1,000 = 8 litres.`,
    hint1: `Calculate the volume in cm³ first: 20³.`,
    hint2: `8,000 cm³ ÷ 1,000 = 8 litres.`,
    visualData: { edge: 20, volumeCm3: 8000, litres: 8, full: true },
  });

  // Q6: Unit cubes stacking
  qs.push({
    id: 96,
    districtId: 9,
    category: 'UNIT CUBES',
    visual: 'stacked-cubes',
    questionText: `Xin Yi builds a giant cube from 1 cm unit cubes. It is 5 cubes long, 5 cubes wide, and 5 cubes high. How many unit cubes are used?`,
    options: makeOptions('125', ['15', '25', '75']),
    correctAnswer: '125',
    explanation: `Total unit cubes = 5 × 5 × 5 = 125.`,
    hint1: `Multiply length × width × height.`,
    hint2: `5 × 5 × 5 = 125 unit cubes.`,
    visualData: { n: 5, count: 125, unit: 'cm' },
  });

  // Q7: Packing crates
  qs.push({
    id: 97,
    districtId: 9,
    category: 'PACKING PROBLEMS',
    visual: 'stacked-cubes',
    questionText: `How many small 3 cm cube boxes can pack completely inside a large 15 cm cube crate?`,
    options: makeOptions('125', ['5', '15', '25']),
    correctAnswer: '125',
    explanation: `Along each dimension, 15 ÷ 3 = 5 boxes fit. Total boxes = 5 × 5 × 5 = 125.`,
    hint1: `Find how many boxes fit along one edge: 15 ÷ 3.`,
    hint2: `5 boxes along each edge gives 5³ = 125 boxes.`,
    visualData: { largeEdge: 15, smallEdge: 3, count: 125, unit: 'cm' },
  });

  // Q8: Combined volume
  qs.push({
    id: 98,
    districtId: 9,
    category: 'COMBINED SOLIDS',
    visual: 'stacked-cubes',
    questionText: `Two metal cubes with edges 4 cm and 6 cm are melted together. What is their total combined volume?`,
    options: makeOptions('280 cm³', ['1000 cm³', '30 cm³', '216 cm³']),
    correctAnswer: '280 cm³',
    explanation: `First cube = 4³ = 64 cm³. Second cube = 6³ = 216 cm³. Combined = 64 + 216 = 280 cm³.`,
    hint1: `Calculate 4³ and 6³ separately.`,
    hint2: `64 + 216 = 280 cm³.`,
    visualData: { edgeA: 4, edgeB: 6, totalVolume: 280, unit: 'cm' },
  });

  // Q9: Face area to volume composite
  qs.push({
    id: 99,
    districtId: 9,
    category: 'FACE AREA TO VOLUME',
    visual: 'cube-face',
    questionText: `A decorative cube has a face area of 81 cm². What is its volume?`,
    options: makeOptions('729 cm³', ['243 cm³', '9 cm³', '81 cm³']),
    correctAnswer: '729 cm³',
    explanation: `Step 1: Edge = √81 = 9 cm. Step 2: Volume = 9 × 9 × 9 = 729 cm³.`,
    hint1: `Find the edge first using √81.`,
    hint2: `The edge is 9 cm. Now cube it: 9³ = 729 cm³.`,
    visualData: { area: 81, edge: 9, volume: 729, unit: 'cm' },
  });

  // Q10: Grand Master challenge
  qs.push({
    id: 100,
    districtId: 9,
    category: 'MASTER CHALLENGE',
    visual: 'cube-3d',
    questionText: `Cube A has a volume of 1,000 cm³. Cube B has a volume of 64 cm³. What is the sum of the edge lengths of Cube A and Cube B?`,
    options: makeOptions('14 cm', ['1064 cm', '10 cm', '16 cm']),
    correctAnswer: '14 cm',
    explanation: `Edge of Cube A = ∛1,000 = 10 cm. Edge of Cube B = ∛64 = 4 cm. Sum = 10 + 4 = 14 cm.`,
    hint1: `Find the edge of each cube by taking the cube root (∛) of its volume.`,
    hint2: `∛1,000 = 10 cm and ∛64 = 4 cm. 10 + 4 = 14 cm.`,
    visualData: { volumeA: 1000, volumeB: 64, edgeA: 10, edgeB: 4, unit: 'cm' },
  });

  return qs;
}

export function generateQuestionBank() {
  return [
    ...genWorld0Questions(),
    ...genWorld1Questions(),
    ...genWorld2Questions(),
    ...genWorld3Questions(),
    ...genWorld4Questions(),
    ...genWorld5Questions(),
    ...genWorld6Questions(),
    ...genWorld7Questions(),
    ...genWorld8Questions(),
    ...genWorld9Questions(),
  ];
}

const questionBank = generateQuestionBank();
export default questionBank;
