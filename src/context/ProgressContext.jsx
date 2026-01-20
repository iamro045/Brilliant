import { createContext, useContext, useState, useEffect } from "react";

const ProgressContext = createContext();

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

  return (
    <ProgressContext.Provider
      value={{ completedLessons, completeLesson }}
    >
      {children}
    </ProgressContext.Provider>
  );

  const getCourseProgress = (courseId, lessons) => {
  const completedCount = lessons.filter(l =>
    completed.includes(l.id)
  ).length;

  return {
    completedCount,
    total: lessons.length,
    percent: Math.round((completedCount / lessons.length) * 100),
  };
};

};

export const useProgress = () => useContext(ProgressContext);
