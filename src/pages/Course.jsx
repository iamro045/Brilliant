import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { Star, Trophy, Zap, Check, Lock, Play } from "lucide-react";
import { useProgress } from "../context/ProgressContext";
import { useEffect, useRef } from "react";
import "./courseMap.css";

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { completedLessons, getCourseProgress } = useProgress();

  const course = courses.find((c) => c.id === courseId) || courses[0];

  const activeNodeRef = useRef(null);

  useEffect(() => {
    if (activeNodeRef.current) {
      activeNodeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div className="course-layout">
      {/* ================= MAP ================= */}
      <main className="course-map">
        <div className="course-map-header">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>

        {course.units.map((unit, unitIndex) => {
          const unitProgress = getCourseProgress(unit.lessons);

          const isBossUnlocked = unit.lessons.every((l) =>
            completedLessons.includes(l.id)
          );

          return (
            <section key={unit.unitId} className="course-unit">
              {/* UNIT HEADER */}
              <div className="course-unit-header">
                <span className="course-unit-badge">
                  UNIT {unitIndex + 1}
                </span>
                <h2>{unit.title}</h2>
              </div>

              {/* MAP */}
              <div className="course-path">
                <svg
                  className="course-path-svg"
                  viewBox="0 0 200 800"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M100 0 C 40 120, 160 240, 100 360 C 40 480, 160 600, 100 800"
                    className="course-path-line"
                  />
                </svg>

                {unit.lessons.map((lesson, index) => {
                  const prev = unit.lessons[index - 1];

                  const isCompleted = completedLessons.includes(lesson.id);
                  const isUnlocked =
                    index === 0 ||
                    completedLessons.includes(prev?.id);

                  const status = isCompleted
                    ? "completed"
                    : isUnlocked
                    ? "active"
                    : "locked";

                  return (
                    <div
                      key={lesson.id}
                      className={`course-node-wrapper ${
                        index % 2 === 0 ? "left" : "right"
                      }`}
                    >
                      <div className="course-node-label">
                        {lesson.title}
                      </div>

                      <button
                        ref={(el) => {
                          if (
                            status === "active" &&
                            !activeNodeRef.current
                          ) {
                            activeNodeRef.current = el;
                          }
                        }}
                        className={`course-node ${status}`}
                        onClick={() =>
                          status !== "locked" &&
                          navigate(
                            `/lesson/${courseId}/${lesson.id}`
                          )
                        }
                      >
                        {status === "completed" ? (
                          <Check size={36} />
                        ) : status === "active" ? (
                          <Play size={36} fill="#fff" />
                        ) : (
                          <Lock size={30} />
                        )}

                        <div className="course-stars">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              size={14}
                              fill={
                                status === "completed"
                                  ? "#FFD700"
                                  : "#ddd"
                              }
                              stroke="none"
                            />
                          ))}
                        </div>
                      </button>
                    </div>
                  );
                })}

                {/* BOSS */}
                <div className="course-node-wrapper center">
                  <button
                    className={`course-node boss ${
                      !isBossUnlocked ? "locked" : ""
                    }`}
                    disabled={!isBossUnlocked}
                  >
                    <Trophy size={44} />
                  </button>
                  <div className="course-node-label boss">
                    {isBossUnlocked
                      ? "Boss Challenge"
                      : "Complete all lessons"}
                  </div>
                </div>
              </div>

              {/* UNIT PROGRESS */}
              <div className="course-unit-progress">
                <div className="course-progress-bar">
                  <div
                    className="course-progress-fill"
                    style={{
                      width: `${unitProgress.percent}%`,
                    }}
                  />
                </div>
                <p>{unitProgress.percent}% Complete</p>
              </div>
            </section>
          );
        })}
      </main>

      {/* ================= SIDEBAR ================= */}
      <aside className="course-sidebar">
        <div className="sidebar-card">
          <h3>📘 Current Course</h3>
          <div className="course-progress-bar">
            <div
              className="course-progress-fill"
              style={{
                width: `${getCourseProgress(
                  course.units.flatMap((u) => u.lessons)
                ).percent}%`,
              }}
            />
          </div>
        </div>

        <div className="sidebar-card">
          <h3>
            <Trophy size={18} /> Leaderboard
          </h3>
          <p>🥇 You — 450 XP</p>
        </div>

        <div className="sidebar-card highlight">
          <h3>
            <Zap size={18} /> Daily Streak
          </h3>
          <button className="primary-btn-3d">
            DO EXERCISE
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Course;
