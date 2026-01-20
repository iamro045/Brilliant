import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { Star, Trophy, Zap, Check, Lock, Play } from "lucide-react";
import "./courseMap.css";

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Fallback for safety
  const course = courses.find((c) => c.id === courseId) || courses[0];

  // TEMP demo logic (we’ll replace with real progress later)
  const getStatus = (index) => {
    if (index === 0) return "active";
    if (index < 3) return "completed";
    return "locked";
  };

  // ✅ Pick FIRST UNIT for now (Unit 1 map)
  const unit = course.units[0];

  return (
    <div className="course-layout">
      {/* ================= MAIN MAP ================= */}
      <main className="course-map">
        <div className="map-header">
          <div className="level-badge">UNIT 1</div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>

        {/* ======= DUOLINGO STYLE MAP ======= */}
        <div className="map-path-container">
          {unit.lessons.map((lesson, index) => {
            const status = getStatus(index);

            return (
              <div
                key={lesson.id}
                className={`node-wrapper ${index % 2 === 0 ? "left" : "right"}`}
              >
                {/* Floating label */}
                <div className="node-label">
                  <span className="label-text">{lesson.title}</span>
                </div>

                {/* Big circular node */}
                <button
                  className={`map-node ${status}`}
                  onClick={() =>
                    status !== "locked" &&
                    navigate(`/lesson/${courseId}/${lesson.id}`)
                  }
                >
                  {status === "completed" ? (
                    <Check size={40} strokeWidth={4} />
                  ) : status === "active" ? (
                    <Play size={40} fill="white" />
                  ) : (
                    <Lock size={32} />
                  )}

                  {/* Stars */}
                  <div className="stars">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={status === "completed" ? "#FFD700" : "#ddd"}
                        stroke="none"
                      />
                    ))}
                  </div>
                </button>
              </div>
            );
          })}

          {/* ======= BOSS NODE ======= */}
          <div className="node-wrapper center">
            <button className="map-node boss">
              <Trophy size={48} fill="#fff" />
            </button>
            <div className="node-label boss-label">Boss Challenge</div>
          </div>
        </div>
      </main>

      {/* ================= SIDEBAR ================= */}
      <aside className="course-sidebar">
        <div className="sidebar-card profile-card">
          <h2>📘 Current Course</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "35%" }} />
          </div>
          <p className="subtext">35% Complete</p>
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
          <button className="primary-btn-3d">DO EXERCISE</button>
        </div>
      </aside>
    </div>
  );
};

export default Course;
