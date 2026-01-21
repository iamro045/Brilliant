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
        <div className="map-header">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>

        {/* ================= MULTI-UNIT STACK ================= */}
        {course.units.map((unit, unitIndex) => {
          const unitProgress = getCourseProgress(unit.lessons);
          const completedCount = unitProgress.completedCount;

          const isBossUnlocked = unit.lessons.every((lesson) =>
            completedLessons.includes(lesson.id)
          );

          return (
            <section key={unit.unitId} className="unit-section">
              {/* ===== UNIT HEADER ===== */}
              <div className="unit-header">
                <div className="level-badge">UNIT {unitIndex + 1}</div>
                <h2>{unit.title}</h2>
              </div>

              {/* ===== SVG SNAKE PATH ===== */}
              <div className="snake-map">
                <svg
                  className="snake-svg"
                  viewBox="0 0 300 1200"
                  preserveAspectRatio="xMidYMin meet"
                >
                  <path
                    d="
                      M150 0
                      C 50 150, 50 300, 150 450
                      C 250 600, 250 750, 150 900
                      C 50 1050, 50 1200, 150 1350
                    "
                    className="snake-path-bg"
                  />
                  <path
                    d="
                      M150 0
                      C 50 150, 50 300, 150 450
                      C 250 600, 250 750, 150 900
                      C 50 1050, 50 1200, 150 1350
                    "
                    className="snake-path-progress"
                    style={{
                      strokeDashoffset:
                        1000 - completedCount * 180,
                    }}
                  />
                </svg>

                {/* ===== NODES ===== */}
                {unit.lessons.map((lesson, index) => {
                  const prevLesson = unit.lessons[index - 1];
                  const isCompleted =
                    completedLessons.includes(lesson.id);
                  const isUnlocked =
                    index === 0 ||
                    completedLessons.includes(prevLesson?.id);

                  const status = isCompleted
                    ? "completed"
                    : isUnlocked
                    ? "active"
                    : "locked";

                  return (
                    <div
                      key={lesson.id}
                      className={`snake-node ${
                        index % 2 === 0 ? "left" : "right"
                      }`}
                      style={{ top: `${index * 180}px` }}
                    >
                      <button
                        ref={(el) => {
                          if (
                            status === "active" &&
                            !activeNodeRef.current
                          ) {
                            activeNodeRef.current = el;
                          }
                        }}
                        className={`map-node ${status}`}
                        onClick={() =>
                          status !== "locked" &&
                          navigate(
                            `/lesson/${courseId}/${lesson.id}`
                          )
                        }
                      >
                        {status === "completed" ? (
                          <Check size={40} />
                        ) : status === "active" ? (
                          <Play size={40} fill="white" />
                        ) : (
                          <Lock size={32} />
                        )}

                        <div className="stars">
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

                      <div className="node-label">
                        {lesson.title}
                      </div>
                    </div>
                  );
                })}

                {/* ===== BOSS ===== */}
                <div
                  className="snake-node center"
                  style={{
                    top: `${unit.lessons.length * 180}px`,
                  }}
                >
                  <button
                    className={`map-node boss ${
                      !isBossUnlocked ? "locked" : ""
                    }`}
                    disabled={!isBossUnlocked}
                    onClick={() =>
                      isBossUnlocked &&
                      navigate(
                        `/lesson/${courseId}/${unit.bossLessonId}`
                      )
                    }
                  >
                    <Trophy size={48} fill="#fff" />
                  </button>

                  <div className="node-label boss-label">
                    {isBossUnlocked
                      ? "Boss Challenge"
                      : "Complete all lessons"}
                  </div>
                </div>
              </div>

              {/* ===== UNIT PROGRESS ===== */}
              <div className="unit-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${unitProgress.percent}%`,
                    }}
                  />
                </div>
                <p className="subtext">
                  {unitProgress.percent}% Complete
                </p>
              </div>
            </section>
          );
        })}
      </main>

      {/* ================= SIDEBAR ================= */}
      <aside className="course-sidebar">
        <div className="sidebar-card profile-card">
          <h2>📘 Current Course</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  getCourseProgress(
                    course.units.flatMap((u) => u.lessons)
                  ).percent
                }%`,
              }}
            />
          </div>

          <p className="subtext">
            {
              getCourseProgress(
                course.units.flatMap((u) => u.lessons)
              ).percent
            }
            % Complete
          </p>
        </div>

        <div className="sidebar-card">
          <h3>
            <Trophy size={20} /> Leaderboard
          </h3>
          <div className="rank-row">
            <span>🥇 You</span>
            <span className="xp-badge">450 XP</span>
          </div>
        </div>

        <div className="sidebar-card highlight">
          <h3>
            <Zap size={20} fill="#FFD700" /> Daily Streak
          </h3>
          <p>Keep the fire burning!</p>
          <button className="primary-btn-3d">
            DO EXERCISE
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Course;
