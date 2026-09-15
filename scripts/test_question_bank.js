// scripts/test_question_bank.js
// Automated QA Stress Test for CubeQuest Question Bank
// Runs 300+ randomized generations and verifies schema, uniqueness, and math integrity

import questionBank, { generateQuestionBank } from '../src/data/questionBank.js';
import { PERFECT_CUBES, PERFECT_SQUARES } from '../src/utils/cubeMath.js';

console.log("🛠️ Starting CubeQuest Question Bank QA Stress Test...");

let totalRuns = 300;
let totalQuestionsChecked = 0;
let errors = [];

for (let run = 1; run <= totalRuns; run++) {
  const bank = run === 1 ? questionBank : generateQuestionBank();

  if (!Array.isArray(bank) || bank.length !== 100) {
    errors.push(`Run ${run}: Expected 100 questions, got ${bank?.length}`);
    break;
  }

  bank.forEach((q, i) => {
    totalQuestionsChecked++;
    const prefix = `Run ${run}, Q${i + 1} (id ${q.id})`;

    // Check schema fields
    const requiredFields = ['id', 'districtId', 'category', 'visual', 'questionText', 'options', 'correctAnswer', 'explanation', 'hint1', 'hint2', 'visualData'];
    for (const field of requiredFields) {
      if (q[field] === undefined || q[field] === null || q[field] === '') {
        errors.push(`${prefix}: Missing or empty field "${field}"`);
      }
    }

    // Check options
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`${prefix}: Expected 4 options, got ${q.options?.length}`);
    } else {
      const uniqueOpts = new Set(q.options.map(o => String(o).trim()));
      if (uniqueOpts.size !== 4) {
        errors.push(`${prefix}: Duplicate options found: ${JSON.stringify(q.options)}`);
      }
      if (!uniqueOpts.has(String(q.correctAnswer).trim())) {
        errors.push(`${prefix}: Correct answer "${q.correctAnswer}" not found in options: ${JSON.stringify(q.options)}`);
      }
    }

    // Check NaN or undefined in strings
    const jsonStr = JSON.stringify(q);
    if (jsonStr.includes('NaN') || jsonStr.includes('undefined')) {
      errors.push(`${prefix}: Found NaN or undefined in question data: ${jsonStr}`);
    }

    // World-specific domain checks
    if (q.districtId === 2) {
      // Cube root
      const edge = parseInt(q.correctAnswer, 10);
      if (isNaN(edge) || edge <= 0) {
        errors.push(`${prefix}: Invalid cube root edge answer "${q.correctAnswer}"`);
      }
    }

    if (q.districtId === 5) {
      // Litres
      const litresMatch = q.correctAnswer.match(/([0-9.]+)\s*litres/);
      if (!litresMatch || isNaN(parseFloat(litresMatch[1]))) {
        errors.push(`${prefix}: Invalid litre answer format "${q.correctAnswer}"`);
      }
    }
  });

  if (errors.length > 10) break;
}

if (errors.length === 0) {
  console.log(`✅ QA Test PASSED! Checked ${totalQuestionsChecked} questions across ${totalRuns} runs with 0 errors.`);
  process.exit(0);
} else {
  console.error(`❌ QA Test FAILED with ${errors.length} errors:`);
  errors.slice(0, 10).forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}
