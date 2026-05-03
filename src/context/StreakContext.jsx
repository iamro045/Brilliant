import { createContext, useContext, useState } from "react";

const StreakContext = createContext();

export const StreakProvider = ({ children }) => {
  const [streak] = useState(5);
  return (
    <StreakContext.Provider value={{ streak }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreak = () => useContext(StreakContext);
