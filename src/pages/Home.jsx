import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">
          Learn to <span className="typing accent">Think</span>, not just code.
        </h1>

        <p className="hero-subtitle">
          Groott helps you build logic, problem-solving, and coding skills step
          by step — like a game.
        </p>

        <div className="hero-actions">
          <Link to="/signup" className="primary-btn">
            Start Learning Free
          </Link>
          <Link to="/login" className="secondary-btn">
            I already have an account
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          🧠 <h3>Think Like a Computer</h3>
          <p>Build logic before syntax.</p>
        </div>

        <div className="feature-card">
          🎮 <h3>Game-style Learning</h3>
          <p>XP, streaks, levels & challenges.</p>
        </div>

        <div className="feature-card">
          🚀 <h3>From Zero to Real Skills</h3>
          <p>No boring theory dumps.</p>
        </div>
      </section>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn to <span>Think</span>, not just code.
          </h1>

          <p className="hero-subtitle">
            Groott helps you build logic, problem-solving, and coding skills
            step by step — like a game.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="primary-btn">
              Start Learning Free
            </Link>
            <Link to="/login" className="secondary-btn">
              I already have an account
            </Link>
          </div>
        </div>

        {/* 🌟 HERO ILLUSTRATION */}
        <div className="hero-illustration float">
          <img
            src="/assets/hero-illustration.svg"
            alt="Learning illustration"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
