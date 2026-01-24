import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./home.css";

const WORD = "Think";

const Home = () => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const featureRefs = useRef([]);

  /* ===== Typing ===== */
  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setText(WORD.slice(0, index + 1));
      index++;
      if (index === WORD.length) clearInterval(typing);
    }, 120);
    return () => clearInterval(typing);
  }, []);

  /* ===== Cursor blink ===== */
  useEffect(() => {
    const blink = setInterval(
      () => setShowCursor((prev) => !prev),
      500
    );
    return () => clearInterval(blink);
  }, []);

  /* ===== Feature fade-in on scroll ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    featureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
              <span className={`cursor ${showCursor ? "visible" : ""}`}>|</span>
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
            src="/assets/hero-illustration.svg"
            alt="Learning illustration"
          />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        {[
          {
            icon: "🧠",
            title: "Think Like a Computer",
            desc: "Build logic before syntax.",
          },
          {
            icon: "🎮",
            title: "Game-style Learning",
            desc: "XP, streaks, levels & challenges.",
          },
          {
            icon: "🚀",
            title: "From Zero to Real Skills",
            desc: "No boring theory dumps.",
          },
        ].map((f, i) => (
          <div
            key={f.title}
            ref={(el) => (featureRefs.current[i] = el)}
            className="feature-card fade-card"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {f.icon}
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
