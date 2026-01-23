import { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [xp, setXp] = useState(0);
  const targetXp = 420;

  // XP count-up animation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      if (current >= targetXp) {
        current = targetXp;
        clearInterval(interval);
      }
      setXp(current);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="fade-in">Continue Learning</h1>

      {/* COURSE CARD */}
      <div className="course-card slide-up delay-1">
        <div className="course-info">
          <h2>Think Like a Computer</h2>
          <p>Unit 1 · Instructions & Steps</p>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "35%" }} />
          </div>
        </div>

        <button className="continue-btn pulse">
          ▶ Continue
        </button>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card slide-up delay-2">
          🔥 <strong>5</strong>
          <span>Day Streak</span>
        </div>

        <div className="stat-card slide-up delay-3">
          ⚡ <strong>{xp}</strong>
          <span>Total XP</span>
        </div>

        <div className="stat-card slide-up delay-4">
          🏆 <strong>3</strong>
          <span>Level</span>
        </div>
      </div>

      {/* LEARNING PATHS */}
      <h2 className="section-title fade-in delay-5">
        Your Learning Paths
      </h2>

      <div className="paths-grid">
        <div className="path-card slide-up delay-6">
          🧠 <strong>Think Like a Computer</strong>
          <p>Build logical thinking skills</p>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "35%" }} />
          </div>
        </div>

        <div className="path-card locked slide-up delay-7">
          🐍 <strong>Python Foundations</strong>
          <p>From zero to real programs</p>
          <span className="locked-text">Locked</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
