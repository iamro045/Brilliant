import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { Star, Trophy, Zap, Check, Lock, Play } from "lucide-react";
import { useProgress } from "../context/ProgressContext";
import "./courseMap.css";

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { completedLessons, getCourseProgress } = useProgress();

  /* ===== SAFETY FALLBACK ===== */
  const course = courses.find((c) => c.id === courseId) || courses[0];

  /* ===== FOR NOW: UNIT 1 ===== */
  const unit = course.units[0];

  const courseProgress = getCourseProgress(unit.lessons);

  /* ===== BOSS UNLOCK ===== */
  const isBossUnlocked = unit.lessons.every((l) =>
    completedLessons.includes(l.id)
  );

  return (
    <div className="course-layout">
      {/* ================= MAP ================= */}
      <main className="course-map">
        <div className="map-header">
          <div className="level-badge">UNIT 1</div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>

        <div className="map-path-container">
          {unit.lessons.map((lesson, index) => {
            const prevLesson = unit.lessons[index - 1];

            const isCompleted = completedLessons.includes(lesson.id);
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
                className={`node-wrapper ${
                  index % 2 === 0 ? "left" : "right"
                }`}
              >
                {/* LABEL */}
                <div className="node-label">
                  <span className="label-text">
                    {lesson.title}
                  </span>
                </div>

                {/* NODE */}
                <button
                  className={`map-node ${status}`}
                  onClick={() =>
                    status !== "locked" &&
                    navigate(
                      `/lesson/${courseId}/${lesson.id}`
                    )
                  }
                >
                  {status === "completed" ? (
                    <Check size={40} strokeWidth={4} />
                  ) : status === "active" ? (
                    <Play size={40} fill="white" />
                  ) : (
                    <Lock size={32} />
                  )}

                  {/* STARS */}
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
              </div>
            );
          })}

          {/* ================= BOSS ================= */}
          <div className="node-wrapper center">
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
      </main>

      {/* ================= SIDEBAR ================= */}
      <aside className="course-sidebar">
        <div className="sidebar-card profile-card">
          <h2>📘 Current Course</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${courseProgress.percent}%`,
              }}
            />
          </div>

          <p className="subtext">
            {courseProgress.percent}% Complete
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
