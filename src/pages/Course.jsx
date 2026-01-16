import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { useProgress } from "../context/ProgressContext";

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { completed } = useProgress();

  const course = courses.find((c) => c.id === courseId);
  if (!course) return <p>Course not found</p>;

  return (
    <div className="page">
      <h1>{course.title}</h1>
      <p className="course-desc">{course.description}</p>

      {course.units.map((unit) => {
        const normalLessons = unit.lessons.filter(
          (l) => l.type === "normal"
        );

        return (
          <div key={unit.unitId} className="unit-section">
            <h2 className="unit-title">{unit.title}</h2>

            {/* ✅ VERTICAL MAP START */}
            <div className="unit-map">
              {normalLessons.map((lesson, index) => {
                const prevLesson = normalLessons[index - 1];

                const isDone = completed.includes(lesson.id);
                const isUnlocked =
                  index === 0 || completed.includes(prevLesson?.id);

                return (
                  <div key={lesson.id} className="map-node-wrapper">
                    <div
                      className={`map-node 
                        ${isDone ? "done" : ""} 
                        ${isUnlocked ? "active" : "locked"}
                      `}
                      onClick={() =>
                        isUnlocked &&
                        navigate(`/lesson/${courseId}/${lesson.id}`)
                      }
                    >
                      <span className="node-title">{lesson.title}</span>
                      <span className="node-xp">⭐ {lesson.xp} XP</span>
                    </div>

                    {/* connector line */}
                    {index !== normalLessons.length - 1 && (
                      <div className="map-line" />
                    )}
                  </div>
                );
              })}

              {/* 🏆 BOSS NODE */}
              <div className="map-node-wrapper">
                <div
                  className={`map-node boss ${
                    normalLessons.every((l) => completed.includes(l.id))
                      ? "active"
                      : "locked"
                  }`}
                  onClick={() =>
                    normalLessons.every((l) =>
                      completed.includes(l.id)
                    ) &&
                    navigate(
                      `/lesson/${courseId}/${unit.unitId}-boss`
                    )
                  }
                >
                  👑 Boss Challenge
                </div>
              </div>
            </div>
            {/* ✅ VERTICAL MAP END */}
          </div>
        );
      })}
    </div>
  );
};

export default Course;
