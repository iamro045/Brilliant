import { createContext, useContext, useState, useEffect } from "react";

const XPContext = createContext();

export const XPProvider = ({ children }) => {
  const [xp, setXp] = useState(() => {
    return parseInt(localStorage.getItem("brilliant_xp") || "0");
  });

  useEffect(() => {
    localStorage.setItem("brilliant_xp", String(xp));
  }, [xp]);

  const addXp = (amount) => setXp(prev => prev + amount);

  return (
    <XPContext.Provider value={{ xp, addXp }}>
      {children}
    </XPContext.Provider>
  );
};

export const useXP = () => useContext(XPContext);
