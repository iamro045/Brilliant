import { createContext, useContext, useState, useEffect, useCallback } from "react";

const StreakContext = createContext();

const today = () => new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

export const StreakProvider = ({ children }) => {
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("brilliant_streak") || "0");
  });

  const [lastActiveDate, setLastActiveDate] = useState(() => {
    return localStorage.getItem("brilliant_last_active") || "";
  });

  // On mount: check if the stored streak is still valid (not broken by a missed day)
  useEffect(() => {
    const todayStr = today();
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (!lastActiveDate) {
      // First ever visit — start streak at 1
      setStreak(1);
      setLastActiveDate(todayStr);
      localStorage.setItem("brilliant_streak", "1");
      localStorage.setItem("brilliant_last_active", todayStr);
    } else if (lastActiveDate === todayStr) {
      // Already counted today — nothing to do
    } else if (lastActiveDate === yesterday) {
      // Came back on consecutive day — extend streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLastActiveDate(todayStr);
      localStorage.setItem("brilliant_streak", String(newStreak));
      localStorage.setItem("brilliant_last_active", todayStr);
    } else {
      // Missed a day — reset streak
      setStreak(1);
      setLastActiveDate(todayStr);
      localStorage.setItem("brilliant_streak", "1");
      localStorage.setItem("brilliant_last_active", todayStr);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Call this when user completes a lesson to ensure today is marked active
  const markActivity = useCallback(() => {
    const todayStr = today();
    if (lastActiveDate !== todayStr) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = lastActiveDate === yesterday ? streak + 1 : 1;
      setStreak(newStreak);
      setLastActiveDate(todayStr);
      localStorage.setItem("brilliant_streak", String(newStreak));
      localStorage.setItem("brilliant_last_active", todayStr);
    }
  }, [lastActiveDate, streak]);

  return (
    <StreakContext.Provider value={{ streak, markActivity }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreak = () => useContext(StreakContext);
