import { createContext, useContext, useEffect, useState } from "react";

const XPContext = createContext(null);

export const XPProvider = ({ children }) => {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const savedXp = localStorage.getItem("xp");
    if (savedXp) {
      setXp(Number(savedXp));
    }
  }, []);

  const addXp = (amount) => {
    setXp((prev) => {
      const next = prev + amount;
      localStorage.setItem("xp", next);
      return next;
    });
  };

  // 🧠 LEVEL CALCULATION
  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;

  return (
    <XPContext.Provider
      value={{
        xp,
        level,
        currentLevelXp,
        addXp,
      }}
    >
      {children}
    </XPContext.Provider>
  );
};

export const useXP = () => useContext(XPContext);
