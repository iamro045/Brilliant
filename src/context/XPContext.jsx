import { createContext, useContext, useState, useEffect, useCallback } from "react";

const XPContext = createContext();

// XP history stored as array of { date, amount, source } for weekly chart
export const XPProvider = ({ children }) => {
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem("brilliant_xp") || "0"));
  const [xpHistory, setXpHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("brilliant_xp_history") || "[]"); }
    catch { return []; }
  });
  const [recentGain, setRecentGain] = useState(null); // for "+XP" popup

  useEffect(() => {
    localStorage.setItem("brilliant_xp", String(xp));
  }, [xp]);

  const addXp = useCallback((amount, source = "lesson") => {
    setXp(prev => prev + amount);
    setRecentGain(amount);
    setTimeout(() => setRecentGain(null), 2000);

    const entry = { date: new Date().toISOString().slice(0, 10), amount, source };
    setXpHistory(prev => {
      const next = [...prev, entry];
      localStorage.setItem("brilliant_xp_history", JSON.stringify(next));
      return next;
    });
  }, []);

  // XP earned in last 7 days, grouped by day
  const getWeeklyXP = () => {
    const map = {};
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      map[d.toISOString().slice(0, 10)] = 0;
    }
    xpHistory.forEach(({ date, amount }) => {
      if (map[date] !== undefined) map[date] += amount;
    });
    return Object.entries(map).map(([date, amount]) => ({ date, amount }));
  };

  const getTotalLessonsXP = () => xpHistory.reduce((acc, e) => acc + e.amount, 0);

  return (
    <XPContext.Provider value={{ xp, addXp, recentGain, xpHistory, getWeeklyXP, getTotalLessonsXP }}>
      {children}
    </XPContext.Provider>
  );
};

export const useXP = () => useContext(XPContext);
