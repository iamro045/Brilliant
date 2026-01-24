import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./home.css";

const WORD = "Think";

const Home = () => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation
  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      setText(WORD.slice(0, index + 1));
      index++;

      if (index === WORD.length) {
        clearInterval(typingInterval);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink (sync-friendly)
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn to{" "}
            <span className="accent">
              {text}
              <span className={`cursor ${showCursor ? "visible" : ""}`}>
                |
              </span>
            </span>
            , not just code.
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

        <div className="hero-illustration float">
          <img
            src="../src/assets/hero-illustration.svg"
            alt="Learning illustration"
          />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
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
    </div>
  );
};

export default Home;
