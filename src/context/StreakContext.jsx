import { createContext, useContext, useEffect, useState } from "react";

const StreakContext = createContext(null);

export const StreakProvider = ({ children }) => {
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState(null);

  useEffect(() => {
    const savedStreak = localStorage.getItem("streak");
    const savedDate = localStorage.getItem("lastDate");

    if (savedStreak) setStreak(Number(savedStreak));
    if (savedDate) setLastDate(savedDate);
  }, []);

  const updateStreak = () => {
    const today = new Date().toDateString();

    if (lastDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastDate === yesterday.toDateString()) {
      setStreak((prev) => {
        const next = prev + 1;
        localStorage.setItem("streak", next);
        return next;
      });
    } else {
      setStreak(1);
      localStorage.setItem("streak", 1);
    }

    setLastDate(today);
    localStorage.setItem("lastDate", today);
  };

  return (
    <StreakContext.Provider value={{ streak, updateStreak }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreak = () => useContext(StreakContext);
