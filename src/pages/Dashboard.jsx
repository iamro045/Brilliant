import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  // mock data (later replace with real context/service)
  const currentCourse = {
    id: "think-like-a-computer",
    title: "Think Like a Computer",
    unit: "Unit 1 · Instructions & Steps",
    progress: 35,
  };

  return (
    <div className="dashboard-page">
      {/* ================= HEADER ================= */}
      <header className="dashboard-header">
        <h1>Continue Learning</h1>
        <p className="subtitle">Pick up where you left off</p>
      </header>

      {/* ================= CONTINUE CARD ================= */}
      <section className="continue-card">
        <div className="continue-info">
          <h2>{currentCourse.title}</h2>
          <p className="unit-text">{currentCourse.unit}</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${currentCourse.progress}%` }}
            />
          </div>
        </div>

        <Link
          to={`/courses/${currentCourse.id}`}
          className="continue-btn"
        >
          ▶ Continue
        </Link>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats-row">
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div>
            <strong>5</strong>
            <p>Day Streak</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">⚡</span>
          <div>
            <strong>420</strong>
            <p>Total XP</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div>
            <strong>3</strong>
            <p>Level</p>
          </div>
        </div>
      </section>

      {/* ================= LEARNING PATHS ================= */}
      <section className="learning-paths">
        <h2>Your Learning Paths</h2>

        <div className="paths-grid">
          {/* Active Course */}
          <div className="path-card active">
            <h3>🧠 Think Like a Computer</h3>
            <p>Build logical thinking skills</p>

            <div className="progress-bar small">
              <div className="progress-fill" style={{ width: "35%" }} />
            </div>
          </div>

          {/* Locked Course */}
          <div className="path-card locked">
            <h3>🐍 Python Foundations</h3>
            <p>From zero to real programs</p>
            <span className="locked-text">Locked</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
