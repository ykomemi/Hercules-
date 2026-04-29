/* ===== STORAGE ===== */
const KEYS = {
  PLANS: 'hercules_plans',
  PROFILE: 'hercules_profile',
  HISTORY: 'hercules_history'
};

const LEVELS = [
  { name: 'Trainee',  min: 0 },
  { name: 'Warrior',  min: 500 },
  { name: 'Champion', min: 1500 },
  { name: 'Hero',     min: 3000 },
  { name: 'Legend',   min: 6000 },
  { name: 'Hercules', min: 10000 }
];

const BADGES = [
  { id: 'first_blood',   icon: '⚡', name: 'First Blood',    desc: 'Complete first workout',         check: (p, h) => h.length >= 1 },
  { id: 'iron_will',     icon: '🛡️', name: 'Iron Will',      desc: 'Complete 5 workouts',             check: (p, h) => h.length >= 5 },
  { id: 'fire_starter',  icon: '🔥', name: 'Fire Starter',   desc: '3-day streak',                   check: (p) => p.streak >= 3 },
  { id: 'warrior_week',  icon: '⚔️', name: 'Warrior Week',   desc: '7-day streak',                   check: (p) => p.streak >= 7 },
  { id: 'centurion',     icon: '💯', name: 'Centurion',      desc: '100 workouts total',              check: (p, h) => h.length >= 100 },
  { id: 'push_king',     icon: '👑', name: 'Push-Up King',   desc: '100+ total push-ups',             check: (p) => (p.repsByExercise?.pushup || 0) >= 100 },
  { id: 'squat_master',  icon: '🦵', name: 'Squat Master',   desc: '100+ total squats',               check: (p) => (p.repsByExercise?.squat || 0) >= 100 },
  { id: 'boxer',         icon: '🥊', name: 'Boxer',          desc: 'Complete a boxing workout',       check: (p) => (p.boxingWorkouts || 0) >= 1 },
  { id: 'titan',         icon: '⚡', name: 'Titan',          desc: '1000 total reps',                 check: (p) => (p.totalReps || 0) >= 1000 },
  { id: 'level5',        icon: '🌟', name: 'Legend Status',  desc: 'Reach Legend level',              check: (p) => p.totalXp >= 6000 }
];

function uuid() {
  return 'h-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function loadPlans() {
  try {
    const raw = localStorage.getItem(KEYS.PLANS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getDefaultPlans();
}

function savePlans(plans) {
  localStorage.setItem(KEYS.PLANS, JSON.stringify(plans));
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getDefaultProfile();
}

function saveProfile(profile) {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(KEYS.HISTORY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveHistory(history) {
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
}

function getDefaultProfile() {
  return {
    name: 'Champion',
    totalXp: 0,
    streak: 0,
    lastWorkoutDate: null,
    totalWorkouts: 0,
    totalReps: 0,
    totalSets: 0,
    repsByExercise: {},
    boxingWorkouts: 0,
    badges: []
  };
}

function getDefaultPlans() {
  return [{
    id: uuid(),
    name: 'Daily Strength',
    color: 'grad-strength',
    daysPerWeek: [1, 3, 5],
    restBetweenExercises: 90,
    exercises: [
      { exerciseId: 'pushup', sets: 3, reps: 10, rest: 60 },
      { exerciseId: 'squat',  sets: 3, reps: 15, rest: 60 }
    ],
    createdAt: Date.now()
  }];
}

function getLevelInfo(totalXp) {
  let level = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].min) { level = i; break; }
  }
  const current = LEVELS[level];
  const next = LEVELS[level + 1];
  const xpInLevel = totalXp - current.min;
  const xpForLevel = next ? next.min - current.min : 1000;
  return { level: level + 1, name: current.name, xpInLevel, xpForLevel, pct: Math.min(100, Math.round(xpInLevel / xpForLevel * 100)) };
}

function checkBadges(profile, history) {
  const newBadges = [];
  for (const badge of BADGES) {
    if (!profile.badges.includes(badge.id) && badge.check(profile, history)) {
      profile.badges.push(badge.id);
      newBadges.push(badge);
    }
  }
  return newBadges;
}

function updateStreak(profile) {
  const today = new Date().toDateString();
  const last = profile.lastWorkoutDate ? new Date(profile.lastWorkoutDate).toDateString() : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (last === today) return; // already counted today
  if (last === yesterday) profile.streak += 1;
  else if (last !== today) profile.streak = 1;
  profile.lastWorkoutDate = Date.now();
}

function addWorkoutToHistory(profile, workoutResult) {
  const history = loadHistory();
  history.unshift(workoutResult);
  if (history.length > 200) history.pop();
  saveHistory(history);

  updateStreak(profile);
  profile.totalXp += workoutResult.xpEarned;
  profile.totalWorkouts = (profile.totalWorkouts || 0) + 1;
  profile.totalReps = (profile.totalReps || 0) + workoutResult.totalReps;
  profile.totalSets = (profile.totalSets || 0) + workoutResult.totalSets;

  if (!profile.repsByExercise) profile.repsByExercise = {};
  for (const [id, reps] of Object.entries(workoutResult.repsByExercise || {})) {
    profile.repsByExercise[id] = (profile.repsByExercise[id] || 0) + reps;
  }
  if (workoutResult.hasBoxing) profile.boxingWorkouts = (profile.boxingWorkouts || 0) + 1;

  const newBadges = checkBadges(profile, history);
  saveProfile(profile);
  return newBadges;
}

function getTodayPlan(plans) {
  const today = new Date().getDay(); // 0=Sun…6=Sat
  return plans.find(p => p.daysPerWeek && p.daysPerWeek.includes(today)) || null;
}

function isScheduledToday(plan) {
  const today = new Date().getDay();
  return plan.daysPerWeek && plan.daysPerWeek.includes(today);
}

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAY_NAMES  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
