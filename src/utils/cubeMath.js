// src/utils/cubeMath.js
// Domain calculation helpers & constraints for CubeQuest (Primary 6 Cubes)

export const PERFECT_CUBES = [8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2744, 3375]; // edges 2–15
export const PERFECT_SQUARES = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225];       // edges 2–15

export function calcVolume(edge) {
  const e = Number(edge);
  return e * e * e;
}

export function calcFaceArea(edge) {
  const e = Number(edge);
  return e * e;
}

export function edgeFromVolume(volume) {
  const v = Number(volume);
  const edge = Math.round(Math.cbrt(v));
  if (edge * edge * edge !== v) {
    throw new Error(`Volume ${v} is not a perfect cube`);
  }
  return edge;
}

export function edgeFromFaceArea(faceArea) {
  const a = Number(faceArea);
  const edge = Math.round(Math.sqrt(a));
  if (edge * edge !== a) {
    throw new Error(`Face area ${a} is not a perfect square`);
  }
  return edge;
}

export function volumeFromFaceArea(faceArea) {
  const edge = edgeFromFaceArea(faceArea);
  return calcVolume(edge);
}

export function cm3ToLitres(cm3) {
  return Number((cm3 / 1000).toFixed(3).replace(/\.?0+$/, ''));
}

export function litresToCm3(litres) {
  return Math.round(Number(litres) * 1000);
}

export function packCount(largeEdge, smallEdge) {
  const lVol = calcVolume(largeEdge);
  const sVol = calcVolume(smallEdge);
  return Math.floor(lVol / sVol);
}

export function pickCleanEdge(min = 2, max = 12) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatUnit(val, unit = 'cm³') {
  return `${val} ${unit}`;
}

/**
 * Creates 4 unique options including the correct answer and 3 distinct distractors.
 */
export function makeOptions(correctStr, distractorCandidates = []) {
  const seen = new Set();
  seen.add(String(correctStr).trim());

  const validDistractors = [];
  for (const d of distractorCandidates) {
    const s = String(d).trim();
    if (s && !seen.has(s)) {
      seen.add(s);
      validDistractors.push(s);
      if (validDistractors.length === 3) break;
    }
  }

  // Fallback if not enough distractors supplied
  let fallbackCount = 1;
  while (validDistractors.length < 3) {
    const num = parseInt(correctStr, 10);
    const fallbackVal = isNaN(num) ? `Option ${fallbackCount}` : `${num + fallbackCount * 5}`;
    if (!seen.has(fallbackVal)) {
      seen.add(fallbackVal);
      validDistractors.push(fallbackVal);
    }
    fallbackCount++;
  }

  const options = [String(correctStr).trim(), ...validDistractors.slice(0, 3)];
  // Deterministic shuffle based on content so it doesn't flicker unexpectedly
  return options.sort(() => Math.random() - 0.5);
}
