import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGame } from "../context/GameContext";
import { courses } from "../data/courses";
import { Flame, Zap, Trophy, BookOpen, ChevronRight, Star, ArrowRight, RotateCcw } from "lucide-react";
import "./dashboard.css";

const DAY_LABELS = ["M","T","W","T","F","S","S"];

const Dashboard = () => {
  const { user } = useAuth();
  const {
    xp, streak, weeklyXP, level, xpInCurrentLevel, xpToNextLevel,
    weekActivity, getCourseProgress, leaderboardWithUser,
    completedLessons, resetProgress
  } = useGame();

  const [animXP, setAnimXP] = useState(0);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    let curr = 0;
    const target = xp;
    if (target === 0) { setAnimXP(0); return; }
    const step = Math.max(1, Math.floor(target / 40));
    const iv = setInterval(() => {
      curr = Math.min(curr + step, target);
      setAnimXP(curr);
      if (curr >= target) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, [xp]);

  const firstName = user?.name?.split(" ")[0] || "Learner";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const lb = leaderboardWithUser(firstName);
  const userRank = lb.findIndex(e => e.you) + 1;

  return (
    <div className="dashboard">
      <div className="db-inner">

        {/* HEADER */}
        <div className="db-header">
          <div>
            <p className="db-greeting">{greeting},</p>
            <h1 className="db-name">{firstName} 👋</h1>
          </div>
          <div className="db-header-right">
            <div className="db-level-badge"><Star size={14} fill="#ffd166" stroke="none" /> Level {level}</div>
            <button className="db-reset-btn" onClick={() => setShowReset(true)} title="Reset progress">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* RESET CONFIRM */}
        {showReset && (
          <div className="reset-banner">
            <span>Reset all progress? This cannot be undone.</span>
            <div className="reset-actions">
              <button className="reset-confirm" onClick={() => { resetProgress(); setShowReset(false); }}>Yes, reset</button>
              <button className="reset-cancel"  onClick={() => setShowReset(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* STATS */}
        <div className="db-stats">
          <div className="stat-card streak">
            <div className="stat-icon"><Flame size={22} /></div>
            <div className="stat-info">
              <div className="stat-value">{streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
          <div className="stat-card xps">
            <div className="stat-icon"><Zap size={22} /></div>
            <div className="stat-info">
              <div className="stat-value">{animXP}</div>
              <div className="stat-label">Total XP</div>
            </div>
          </div>
          <div className="stat-card level">
            <div className="stat-icon"><Trophy size={22} /></div>
            <div className="stat-info">
              <div className="stat-value">#{userRank}</div>
              <div className="stat-label">Weekly Rank</div>
            </div>
          </div>
          <div className="stat-card done">
            <div className="stat-icon"><BookOpen size={22} /></div>
            <div className="stat-info">
              <div className="stat-value">{completedLessons.length}</div>
              <div className="stat-label">Lessons Done</div>
            </div>
          </div>
        </div>

        {/* XP PROGRESS BAR */}
        <div className="xp-bar-section">
          <div className="xp-bar-header">
            <span>Level {level} · {xpInCurrentLevel} / 100 XP</span>
            <span>{xpToNextLevel} XP to Level {level + 1}</span>
          </div>
          <div className="xp-bar-track">
            <div className="xp-bar-fill" style={{ width: `${xpInCurrentLevel}%` }} />
          </div>
        </div>

        <div className="db-grid">
          {/* CONTINUE LEARNING */}
          <section className="db-section main-section">
            <div className="db-section-header">
              <h2>Continue Learning</h2>
              <Link to="/courses" className="see-all">See all <ChevronRight size={14} /></Link>
            </div>
            <div className="courses-list">
              {courses.map(course => {
                const lessons = course.units.flatMap(u => u.lessons);
                const prog = getCourseProgress(lessons);
                return (
                  <Link key={course.id} to={`/courses/${course.id}`} className="course-row">
                    <div className="cr-icon">🧠</div>
                    <div className="cr-info">
                      <div className="cr-title">{course.title}</div>
                      <div className="cr-meta">{prog.completedCount}/{prog.total} lessons</div>
                      <div className="cr-bar"><div className="cr-fill" style={{ width: `${prog.percent}%` }} /></div>
                    </div>
                    <div className="cr-pct">{prog.percent}%</div>
                    <ArrowRight size={16} className="cr-arrow" />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className="db-aside">

            {/* WEEKLY STREAK */}
            <div className="aside-card streak-card">
              <h3>🔥 Daily Streak — {streak} days</h3>
              <div className="streak-days">
                {weekActivity.map((active, i) => (
                  <div key={i} className={`streak-day ${active ? "done" : ""}`}>
                    <div className="sd-dot" />
                    <span>{DAY_LABELS[i]}</span>
                  </div>
                ))}
              </div>
              {streak === 0
                ? <p className="streak-msg">Complete a lesson today to start your streak! 🚀</p>
                : streak < 3
                ? <p className="streak-msg">You're on a {streak}-day streak. Keep going!</p>
                : <p className="streak-msg">🔥 {streak} days strong! Practice today to keep it alive.</p>
              }
            </div>

            {/* WEEKLY XP */}
            <div className="aside-card weekly-xp-card">
              <h3>⚡ This Week's XP</h3>
              <div className="weekly-xp-amount">{weeklyXP} <span>XP</span></div>
              <div className="weekly-xp-bar">
                <div className="weekly-xp-fill" style={{ width: `${Math.min((weeklyXP / 500) * 100, 100)}%` }} />
              </div>
              <p className="weekly-xp-label">Goal: 500 XP · {Math.max(0, 500 - weeklyXP)} to go</p>
            </div>

            {/* LEADERBOARD */}
            <div className="aside-card">
              <h3>🏆 Weekly Leaderboard</h3>
              <div className="lb-list">
                {lb.slice(0, 5).map((entry, i) => (
                  <div key={i} className={`lb-entry ${entry.you ? "you" : ""}`}>
                    <span className="lb-rank">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i+1}`}
                    </span>
                    <span className="lb-name">{entry.name}{entry.you ? " (you)" : ""}</span>
                    <span className="lb-xp">⚡ {entry.weeklyXP}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/courses" className="aside-cta">
              <span>Explore all courses</span>
              <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
