import { createContext, useContext, useState, useEffect } from "react";

const ProgressContext = createContext();

/* ================= PROVIDER ================= */
export const ProgressProvider = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem("completedLessons");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "completedLessons",
      JSON.stringify(completedLessons)
    );
  }, [completedLessons]);

  const completeLesson = (lessonId) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev : [...prev, lessonId]
    );
  };

  /* 🔹 Course progress helper */
  const getCourseProgress = (lessons) => {
    const completedCount = lessons.filter((l) =>
      completedLessons.includes(l.id)
    ).length;

    return {
      completedCount,
      total: lessons.length,
      percent: Math.round(
        (completedCount / lessons.length) * 100
      ),
    };
  };

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        completeLesson,
        getCourseProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useProgress = () => useContext(ProgressContext);
