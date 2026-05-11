import { createContext, useContext, useState, useEffect, useCallback } from "react";

const StreakContext = createContext();

const today = () => new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
const yesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

export const StreakProvider = ({ children }) => {
  const [streak, setStreak]   = useState(() => parseInt(localStorage.getItem("brilliant_streak") || "0"));
  const [lastDate, setLastDate] = useState(() => localStorage.getItem("brilliant_last_date") || "");
  // activityLog: { "YYYY-MM-DD": true } for the last 7 days
  const [activityLog, setActivityLog] = useState(() => {
    try { return JSON.parse(localStorage.getItem("brilliant_activity") || "{}"); }
    catch { return {}; }
  });

  // Call this whenever the user completes any lesson
  const recordActivity = useCallback(() => {
    const td = today();
    setActivityLog(prev => {
      const next = { ...prev, [td]: true };
      localStorage.setItem("brilliant_activity", JSON.stringify(next));
      return next;
    });

    setLastDate(prev => {
      if (prev === td) return prev;                  // already counted today
      const newStreak = prev === yesterday()
        ? (s => { localStorage.setItem("brilliant_streak", s + 1); return s + 1; })(streak)
        : 1;                                         // streak reset or first day
      setStreak(newStreak);
      localStorage.setItem("brilliant_streak", String(newStreak));
      localStorage.setItem("brilliant_last_date", td);
      return td;
    });
  }, [streak]);

  // Break streak if the user skipped yesterday and today hasn't been recorded yet
  useEffect(() => {
    const td = today();
    if (lastDate && lastDate !== td && lastDate !== yesterday()) {
      // More than 1 day gap — reset streak
      setStreak(0);
      localStorage.setItem("brilliant_streak", "0");
    }
  }, []); // eslint-disable-line

  // Returns array of 7 booleans [Mon..Sun] for the current week
  const getWeekActivity = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(!!activityLog[d.toISOString().slice(0, 10)]);
    }
    return days;
  };

  return (
    <StreakContext.Provider value={{ streak, recordActivity, getWeekActivity, activityLog }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreak = () => useContext(StreakContext);
