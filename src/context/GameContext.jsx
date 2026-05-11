import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ─── helpers ─────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
const yesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

// Generate the last 7 calendar dates (Mon–Sun order from the current week)
const last7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
};

const STORAGE_KEY = "brilliant_game_v2";

const defaultState = () => ({
  xp: 0,
  streak: 0,
  longestStreak: 0,
  lastActiveDate: null,          // "YYYY-MM-DD"
  activeDates: [],               // array of "YYYY-MM-DD" strings
  completedLessons: [],          // lesson id strings
  xpHistory: [],                 // [{ date, xp, lessonId }]
  weeklyXP: 0,                   // resets every Monday
  weekStart: null,               // "YYYY-MM-DD" of last Monday
  leaderboard: [                 // simulated opponents
    { name: "Priya S.",  weeklyXP: 380, avatar: "P" },
    { name: "Marcus T.", weeklyXP: 290, avatar: "M" },
    { name: "Aiko R.",   weeklyXP: 190, avatar: "A" },
    { name: "Sam K.",    weeklyXP: 95,  avatar: "S" },
  ],
});

// ─── context ─────────────────────────────────────────────
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge so new default keys always exist
        return { ...defaultState(), ...parsed };
      }
    } catch {}
    return defaultState();
  });

  // ── Persist whenever state changes ──────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // ── Recalculate streak on mount (handles missed days) ───
  useEffect(() => {
    setState(prev => recalcStreak(prev));
  }, []);

  // ── Weekly XP reset (Monday) ─────────────────────────────
  useEffect(() => {
    const currentMonday = getMonday();
    setState(prev => {
      if (prev.weekStart !== currentMonday) {
        // New week — reset weeklyXP but gently bump opponents
        const bumpedLeaderboard = (prev.leaderboard || defaultState().leaderboard).map(e => ({
          ...e,
          weeklyXP: Math.floor(Math.random() * 300) + 80,
        }));
        return { ...prev, weekStart: currentMonday, weeklyXP: 0, leaderboard: bumpedLeaderboard };
      }
      return prev;
    });
  }, []);

  // ─── Actions ─────────────────────────────────────────────

  /** Award XP and mark today active (called when lesson completes) */
  const earnXP = useCallback((amount, lessonId) => {
    setState(prev => {
      const todayStr = today();
      const alreadyDoneToday = prev.activeDates.includes(todayStr);
      const newActiveDates = alreadyDoneToday
        ? prev.activeDates
        : [...prev.activeDates, todayStr];

      const newXpHistory = [
        ...prev.xpHistory,
        { date: todayStr, xp: amount, lessonId: lessonId || null },
      ];

      const newState = recalcStreak({
        ...prev,
        xp: prev.xp + amount,
        weeklyXP: prev.weeklyXP + amount,
        activeDates: newActiveDates,
        lastActiveDate: todayStr,
        xpHistory: newXpHistory,
      });

      return newState;
    });
  }, []);

  /** Mark a lesson complete (without double-counting) */
  const completeLesson = useCallback((lessonId, xpAmount) => {
    setState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev; // idempotent
      const todayStr = today();
      const alreadyDoneToday = prev.activeDates.includes(todayStr);
      const newActiveDates = alreadyDoneToday
        ? prev.activeDates
        : [...prev.activeDates, todayStr];

      const xp = xpAmount || 0;
      const newState = recalcStreak({
        ...prev,
        xp: prev.xp + xp,
        weeklyXP: prev.weeklyXP + xp,
        completedLessons: [...prev.completedLessons, lessonId],
        activeDates: newActiveDates,
        lastActiveDate: todayStr,
        xpHistory: [...prev.xpHistory, { date: todayStr, xp, lessonId }],
      });
      return newState;
    });
  }, []);

  /** Reset everything (for testing) */
  const resetProgress = useCallback(() => {
    const fresh = defaultState();
    fresh.weekStart = getMonday();
    setState(fresh);
  }, []);

  // ─── Derived values ───────────────────────────────────────
  const level = Math.floor(state.xp / 100) + 1;
  const xpInCurrentLevel = state.xp % 100;
  const xpToNextLevel = 100 - xpInCurrentLevel;

  // Build sorted leaderboard including "you"
  const leaderboardWithUser = (userName) => {
    const entries = [
      { name: userName || "You", weeklyXP: state.weeklyXP, avatar: (userName || "Y")[0], you: true },
      ...(state.leaderboard || defaultState().leaderboard),
    ].sort((a, b) => b.weeklyXP - a.weeklyXP);
    return entries;
  };

  // Which of the last-7 days were active
  const weekActivity = last7Days().map(d => state.activeDates.includes(d));

  // Progress helper (used by CourseMap / Dashboard)
  const getCourseProgress = useCallback((lessons = []) => {
    const completedCount = lessons.filter(l => state.completedLessons.includes(l.id)).length;
    return {
      completedCount,
      total: lessons.length,
      percent: lessons.length === 0 ? 0 : Math.round((completedCount / lessons.length) * 100),
    };
  }, [state.completedLessons]);

  return (
    <GameContext.Provider value={{
      // raw
      xp: state.xp,
      streak: state.streak,
      longestStreak: state.longestStreak,
      weeklyXP: state.weeklyXP,
      completedLessons: state.completedLessons,
      activeDates: state.activeDates,
      // derived
      level,
      xpInCurrentLevel,
      xpToNextLevel,
      weekActivity,
      // functions
      earnXP,
      completeLesson,
      getCourseProgress,
      leaderboardWithUser,
      resetProgress,
      // backward compat shims
      addXp: earnXP,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

// ─── Pure helpers (no hooks) ─────────────────────────────

function recalcStreak(state) {
  const todayStr = today();
  const yesterdayStr = yesterday();
  const dates = [...new Set(state.activeDates)].sort();

  let streak = 0;
  // Walk backwards from today
  let cursor = new Date(todayStr);
  for (let i = 0; i < 365; i++) {
    const dateStr = cursor.toISOString().slice(0, 10);
    if (dates.includes(dateStr)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      // Today not active yet — check if yesterday was (streak still alive)
      cursor.setDate(cursor.getDate() - 1);
      continue;
    } else {
      break;
    }
  }

  // If last active date was before yesterday, streak resets to 0
  const lastActive = state.lastActiveDate;
  if (lastActive && lastActive !== todayStr && lastActive !== yesterdayStr) {
    streak = 0;
  }

  const longestStreak = Math.max(state.longestStreak || 0, streak);
  return { ...state, streak, longestStreak };
}

function getMonday() {
  const d = new Date();
  const day = d.getDay(); // 0=Sun
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}
