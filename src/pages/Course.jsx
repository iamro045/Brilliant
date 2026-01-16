import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { useProgress } from "../context/ProgressContext";
import "./courseMap.css";

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { completed } = useProgress();

  const course = courses.find((c) => c.id === courseId);
  if (!course) return <p>Course not found</p>;

  return (
    <div className="course-layout">
      {/* LEFT SIDEBAR */}
      <aside className="course-sidebar">
        <div className="course-info-card">
          <h2>{course.title}</h2>
          <p>{course.description}</p>

          <div className="course-stats">
            <span>{course.units.length} Units</span>
            <span>
              {course.units.reduce(
                (sum, u) => sum + u.lessons.length,
                0
              )}{" "}
              Lessons
            </span>
          </div>
        </div>

        <div className="course-info-card secondary">
          <h4>Extra Practice</h4>
          <p>Yes / No · True / False · Debugging</p>
          <button disabled>Coming Soon</button>
        </div>
      </aside>

      {/* RIGHT MAP */}
      <main className="course-map">
        {course.units.map((unit) => {
          const normalLessons = unit.lessons.filter(
            (l) => l.type === "normal"
          );

          return (
            <section key={unit.unitId} className="unit-map">
              <h3 className="unit-map-title">{unit.title}</h3>

              {normalLessons.map((lesson, index) => {
                const prev = normalLessons[index - 1];
                const unlocked =
                  index === 0 || completed.includes(prev?.id);

                return (
                  <div key={lesson.id} className="map-node-wrapper">
                    <div
                      className={`map-node ${
                        completed.includes(lesson.id)
                          ? "done"
                          : unlocked
                          ? "active"
                          : "locked"
                      }`}
                      onClick={() =>
                        unlocked &&
                        navigate(
                          `/lesson/${courseId}/${lesson.id}`
                        )
                      }
                    >
                      <span className="node-title">
                        {lesson.title}
                      </span>
                      <span className="node-xp">
                        ⭐ {lesson.xp} XP
                      </span>
                    </div>

                    {index !== normalLessons.length - 1 && (
                      <div className="map-line" />
                    )}
                  </div>
                );
              })}

              {/* BOSS */}
              <div className="map-node-wrapper">
                <div
                  className="map-node boss"
                  onClick={() =>
                    navigate(
                      `/lesson/${courseId}/${unit.unitId}-boss`
                    )
                  }
                >
                  👑 Boss Challenge
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default Course;
