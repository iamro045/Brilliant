import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try { return JSON.parse(localStorage.getItem("completedLessons") || "[]"); }
    catch { return []; }
  });

  // { lessonId: { stars: 1-3, score: 0-100, completedAt: ISO } }
  const [lessonStats, setLessonStats] = useState(() => {
    try { return JSON.parse(localStorage.getItem("brilliant_lesson_stats") || "{}"); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem("brilliant_lesson_stats", JSON.stringify(lessonStats));
  }, [lessonStats]);

  const completeLesson = useCallback((lessonId, score = 100) => {
    setCompletedLessons(prev => prev.includes(lessonId) ? prev : [...prev, lessonId]);
    const stars = score >= 90 ? 3 : score >= 65 ? 2 : 1;
    setLessonStats(prev => ({
      ...prev,
      [lessonId]: { stars, score, completedAt: new Date().toISOString() }
    }));
  }, []);

  const getLessonStats = useCallback((lessonId) => lessonStats[lessonId] || null, [lessonStats]);

  const getCourseProgress = useCallback((lessons = []) => {
    const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;
    return {
      completedCount,
      total: lessons.length,
      percent: lessons.length === 0 ? 0 : Math.round((completedCount / lessons.length) * 100),
    };
  }, [completedLessons]);

  // Returns recent activity sorted by date
  const getRecentActivity = useCallback(() => {
    return Object.entries(lessonStats)
      .sort((a, b) => new Date(b[1].completedAt) - new Date(a[1].completedAt))
      .slice(0, 5);
  }, [lessonStats]);

  return (
    <ProgressContext.Provider value={{
      completedLessons, completeLesson,
      getCourseProgress, getLessonStats, getRecentActivity, lessonStats
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
