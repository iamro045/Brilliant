import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star, Sparkles, Brain, Code2, Calculator, Atom, ChevronRight, Play, Check } from "lucide-react";
import "./home.css";

const ROTATING_WORDS = ["Think", "Reason", "Discover", "Solve", "Create"];

const TOPICS = [
  { icon: <Brain size={28} />, title: "Logic & Reasoning", desc: "Build sharp analytical thinking through interactive puzzles and problems.", color: "#4f46e5", bg: "#eef2ff", lessons: "120+ lessons" },
  { icon: <Code2 size={28} />, title: "Computer Science", desc: "From foundational concepts to algorithms and data structures.", color: "#0891b2", bg: "#e0f7fa", lessons: "200+ lessons" },
  { icon: <Calculator size={28} />, title: "Mathematics", desc: "Calculus, probability, linear algebra — made intuitive and visual.", color: "#059669", bg: "#ecfdf5", lessons: "350+ lessons" },
  { icon: <Atom size={28} />, title: "Science", desc: "Physics, chemistry, and biology through active exploration.", color: "#d97706", bg: "#fffbeb", lessons: "180+ lessons" },
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "Software Engineer", text: "Brilliant made me actually understand recursion. The visuals just click.", stars: 5 },
  { name: "Marcus T.", role: "Data Analyst", text: "I've tried dozens of learning apps. None come close to this level of quality.", stars: 5 },
  { name: "Aiko R.", role: "Student", text: "I use Brilliant every morning. It's the most productive 15 minutes of my day.", stars: 5 },
];

const Home = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const featureRefs = useRef([]);

  useEffect(() => {
    let timeout;
    const word = ROTATING_WORDS[wordIdx];
    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setWordIdx(i => (i + 1) % ROTATING_WORDS.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIdx]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
    }, { threshold: 0.15 });
    featureRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-grid" />
        </div>

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={13} />
              <span>Used by 10 million+ learners worldwide</span>
            </div>

            <h1 className="hero-title">
              Learn to{" "}
              <span className="hero-word">
                {displayed}
                <span className="caret" />
              </span>
              <br />
              not just memorize.
            </h1>

            <p className="hero-sub">
              Brilliant builds real understanding through hands-on problem solving. Master math, science, and CS — 15 minutes a day.
            </p>

            <div className="hero-actions">
              <Link to="/signup" className="btn-primary">
                Start for free <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn-ghost">I have an account</Link>
            </div>

            <div className="hero-social">
              <div className="avatar-stack">
                {["A","B","C","D"].map((l,i) => (
                  <div key={i} className="stack-avatar" style={{ zIndex: 4-i }}>{l}</div>
                ))}
              </div>
              <span>Join <strong>10M+</strong> learners today</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card float">
              <div className="hcard-header">
                <span className="hcard-badge">Logic</span>
                <div className="hcard-stars">
                  {[1,2,3].map(s => <Star key={s} size={12} fill="#ffd166" stroke="none" />)}
                </div>
              </div>
              <div className="hcard-question">
                <p>If all <em>Xs</em> are <em>Y</em>, and some <em>Y</em> are <em>Z</em>, then...</p>
              </div>
              <div className="hcard-options">
                {["All X are Z", "Some X are Z", "No X are Z", "Cannot determine"].map((opt, i) => (
                  <div key={i} className={`hcard-opt ${i === 3 ? "correct" : ""}`}>
                    {i === 3 && <Check size={13} />}
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
              <div className="hcard-xp">+15 XP</div>
            </div>

            <div className="hero-stat-1 float-slow">
              <Sparkles size={16} className="hs-icon" />
              <span>Streak: <strong>5 days</strong></span>
            </div>
            <div className="hero-stat-2 float-slow-2">
              <span>⚡</span><span><strong>420 XP</strong> earned</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOGOS ===== */}
      <section className="logos-section">
        <p className="logos-label">Trusted by learners at</p>
        <div className="logos-row">
          {["Google","MIT","Stanford","NASA","OpenAI","DeepMind"].map(l => (
            <div key={l} className="logo-chip">{l}</div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="how-section">
        <div className="section-inner">
          <div className="section-label">How it works</div>
          <h2 className="section-title">Learning that actually sticks</h2>
          <p className="section-sub">Unlike passive video courses, Brilliant makes you think every step of the way.</p>

          <div className="how-steps">
            {[
              { n: "01", title: "Learn by doing", desc: "Every concept is introduced through an interactive problem — not a lecture." },
              { n: "02", title: "Build up gradually", desc: "Each lesson builds on the last, creating a solid foundation without gaps." },
              { n: "03", title: "Get instant feedback", desc: "See exactly why your answer is right or wrong, and what the intuition is." },
            ].map((s, i) => (
              <div key={i} className="how-step" ref={el => featureRefs.current[i] = el}>
                <div className="how-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOPICS ===== */}
      <section id="features" className="topics-section">
        <div className="section-inner">
          <div className="section-label">What you'll learn</div>
          <h2 className="section-title">Everything you need, built right in</h2>

          <div className="topics-grid">
            {TOPICS.map((t, i) => (
              <div
                key={t.title}
                className="topic-card"
                ref={el => featureRefs.current[i + 3] = el}
              >
                <div className="topic-icon" style={{ background: t.bg, color: t.color }}>{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <div className="topic-footer">
                  <span className="topic-lessons">{t.lessons}</span>
                  <ChevronRight size={16} className="topic-arrow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="section-inner">
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">What learners say</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card" ref={el => featureRefs.current[i + 7] = el}>
                <div className="t-stars">
                  {Array(t.stars).fill(0).map((_, s) => <Star key={s} size={14} fill="#ffd166" stroke="none" />)}
                </div>
                <p className="t-text">"{t.text}"</p>
                <div className="t-author">
                  <div className="t-avatar">{t.name[0]}</div>
                  <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="pricing" className="cta-section">
        <div className="cta-inner">
          <h2>Start your 7-day free trial</h2>
          <p>No credit card required. Cancel anytime.</p>
          <Link to="/signup" className="btn-primary large">
            Get started free <ArrowRight size={18} />
          </Link>
          <div className="cta-features">
            {["Full access to all courses", "Daily challenges & streaks", "Track your progress"].map(f => (
              <div key={f} className="cta-feat"><Check size={15} />{f}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
