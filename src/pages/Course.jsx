import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { useProgress } from "../context/ProgressContext";
import { useState } from "react";

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { completed } = useProgress();
  const [celebratedUnits, setCelebratedUnits] = useState([]);

  const course = courses.find((c) => c.id === courseId);
  if (!course) return <p>Course not found</p>;

  return (
    <div className="course-page">
      <h1>{course.title}</h1>
      <p className="course-desc">{course.description}</p>

      {course.units.map((unit) => {
        const normalLessons = unit.lessons.filter((l) => l.type === "normal");

        const completedCount = normalLessons.filter((l) =>
          completed.includes(l.id)
        ).length;

        const progressPercent = Math.round(
          (completedCount / normalLessons.length) * 100
        );

        const isCompleted = progressPercent === 100;
        const alreadyCelebrated = celebratedUnits.includes(unit.unitId);

        // ✅ Mark as celebrated (NO useEffect)
        if (isCompleted && !alreadyCelebrated) {
          setCelebratedUnits((prev) => [...prev, unit.unitId]);
        }

        return (
          <div key={unit.unitId} className="unit-section">
            <h2 className="unit-title">🧩 {unit.title}</h2>

            {/* Progress bar */}
            <div className="unit-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="progress-text">
                {progressPercent}% completed
              </span>
            </div>

            <div className="lessons-grid">
              {unit.lessons
                .filter((l) => l.type === "normal")
                .map((lesson, index) => {
                  const prevLesson = unit.lessons.filter(
                    (l) => l.type === "normal"
                  )[index - 1];

                  const isUnlocked =
                    index === 0 || completed.includes(prevLesson?.id);

                  return (
                    <div
                      key={lesson.id}
                      className={`lesson-card ${!isUnlocked ? "locked" : ""}`}
                      onClick={() =>
                        isUnlocked &&
                        navigate(`/lesson/${courseId}/${lesson.id}`)
                      }
                    >
                      <h4>{lesson.title}</h4>
                      <span>⭐ {lesson.xp} XP</span>

                      {completed.includes(lesson.id) && (
                        <div className="completed">✅</div>
                      )}
                    </div>
                  );
                })}
            </div>

            {isCompleted && (
              <div className="unit-complete">
                <div className="badge">🏅 Unit Completed!</div>

                {!alreadyCelebrated && (
                  <div className="confetti">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Course;
