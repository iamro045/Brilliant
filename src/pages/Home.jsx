import { Link } from "react-router-dom";
import "../assets/styles/home.css";

const Home = () => {
  return (
    <div className="home-page">

      {/* HERO / CONTINUE */}
      <section className="home-hero">
        <h1>Continue Learning</h1>

        <div className="continue-card">
          <div className="continue-info">
            <h2>Think Like a Computer</h2>
            <p>Unit 1 · Instructions & Steps</p>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "35%" }} />
            </div>
          </div>

          <Link to="/courses/think-like-a-computer" className="continue-btn">
            ▶ Continue
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats">
        <div className="stat-card">
          <span className="stat-value">🔥 5</span>
          <span className="stat-label">Day Streak</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">⚡ 420</span>
          <span className="stat-label">Total XP</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">🏆 3</span>
          <span className="stat-label">Level</span>
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section className="home-paths">
        <h2>Your Learning Paths</h2>

        <div className="paths-grid">
          <Link to="/courses/think-like-a-computer" className="path-card">
            <h3>🧠 Think Like a Computer</h3>
            <p>Build logical thinking skills</p>
            <div className="path-progress">
              <div className="progress-fill" style={{ width: "35%" }} />
            </div>
          </Link>

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

export default Home;
