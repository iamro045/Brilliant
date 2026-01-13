import { createContext, useContext, useEffect, useState } from "react";

const XPContext = createContext(null);

export const XPProvider = ({ children }) => {
  const [xp, setXp] = useState(0);

  // restore XP on reload
  useEffect(() => {
    const savedXp = localStorage.getItem("xp");
    if (savedXp) {
      setXp(Number(savedXp));
    }
  }, []);

  const addXp = (amount) => {
    setXp((prev) => {
      const newXp = prev + amount;
      localStorage.setItem("xp", newXp);
      return newXp;
    });
  };

  return (
    <XPContext.Provider value={{ xp, addXp }}>
      {children}
    </XPContext.Provider>
  );
};

export const useXP = () => useContext(XPContext);
