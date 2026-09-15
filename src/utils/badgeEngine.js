// src/utils/badgeEngine.js
// Badge definitions and unlock triggers for CubeQuest (Primary 6 Cubes)

export const BADGES = [
  {
    id: 'first_delivery',
    trigger: 'first_correct',
    name: 'First Delivery Made',
    label: 'First Delivery Made',
    emoji: '📦',
    icon: '📦',
    description: 'Answered your very first cube question correctly!'
  },
  {
    id: 'steady_hands',
    trigger: 'streak_5',
    name: 'Steady Hands Streak',
    label: 'Steady Hands Streak',
    emoji: '🔧',
    icon: '🔧',
    description: 'Achieved a streak of 5 correct answers!'
  },
  {
    id: 'master_builder',
    trigger: 'streak_10',
    name: 'Master Builder Streak',
    label: 'Master Builder Streak',
    emoji: '🏗️',
    icon: '🏗️',
    description: 'Achieved a 10-question winning streak!'
  },
  {
    id: 'workshop_certified',
    trigger: 'all_sim_complete',
    name: 'Workshop Certified',
    label: 'Workshop Certified',
    emoji: '🛠️',
    icon: '🛠️',
    description: 'Completed all 4 interactive simulation stations!'
  },
  {
    id: 'gold_blueprint',
    trigger: 'any_world_3star',
    name: 'Gold Blueprint Award',
    label: 'Gold Blueprint Award',
    emoji: '🥇',
    icon: '🥇',
    description: 'Scored 3 stars in a Practice World!'
  },
  {
    id: 'boss_contract',
    trigger: 'any_boss_defeated',
    name: 'Boss Contract Won',
    label: 'Boss Contract Won',
    emoji: '🏆',
    icon: '🏆',
    description: 'Defeated a World Boss in battle!'
  },
  {
    id: 'warehouse_champ',
    trigger: '20plus_answered',
    name: 'Warehouse Champion',
    label: 'Warehouse Champion',
    emoji: '📐',
    icon: '📐',
    description: 'Answered over 20 questions in Practice!'
  },
  {
    id: 'cube_craft_grad',
    trigger: 'full_journey',
    name: 'Cube Craft Co. Graduate',
    label: 'Cube Craft Co. Graduate',
    emoji: '🎓',
    icon: '🎓',
    description: 'Completed the full 5-phase CubeQuest journey!'
  },
];

export function checkBadges(state) {
  const unlocked = [];

  // First correct answer
  const totalCorrect = state.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  if (totalCorrect >= 1) unlocked.push('first_delivery');

  // Streak checks
  if (state.maxStreak >= 5) unlocked.push('steady_hands');
  if (state.maxStreak >= 10) unlocked.push('master_builder');

  // Simulation completion
  if (state.simStationsComplete && state.simStationsComplete.every(Boolean)) {
    unlocked.push('workshop_certified');
  }

  // 3-star world check (9 or 10 correct = 3 stars)
  if (state.districtScores && state.districtScores.some(score => score !== null && score >= 9)) {
    unlocked.push('gold_blueprint');
  }

  // Warehouse Champion (20+ answered or correct)
  if (state.currentQuestion >= 20 || totalCorrect >= 20) {
    unlocked.push('warehouse_champ');
  }

  // Boss defeated
  if (state.bossDefeated || state.bossesDefeated?.length > 0) {
    unlocked.push('boss_contract');
  }

  // Full journey
  if (state.phaseComplete && Object.values(state.phaseComplete).every(Boolean)) {
    unlocked.push('cube_craft_grad');
  }

  return unlocked;
}
