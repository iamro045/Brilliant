import { createContext, useContext, useEffect, useState } from "react";

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const [completed, setCompleted] = useState([]);

  // restore progress on reload
  useEffect(() => {
    const saved = localStorage.getItem("completedLessons");
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  const completeLesson = (courseId, lessonId) => {
    const key = `${courseId}-${lessonId}`;

    setCompleted((prev) => {
      if (prev.includes(key)) return prev;

      const updated = [...prev, key];
      localStorage.setItem(
        "completedLessons",
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  return (
    <ProgressContext.Provider
      value={{ completed, completeLesson }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () =>
  useContext(ProgressContext);
