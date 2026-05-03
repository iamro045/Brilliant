import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useXP } from "../context/XPContext";
import { useStreak } from "../context/StreakContext";
import { useProgress } from "../context/ProgressContext";
import { courses } from "../data/courses";
import { Flame, Zap, Trophy, BookOpen, ChevronRight, Star, ArrowRight } from "lucide-react";
import "./dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const { xp } = useXP();
  const { streak } = useStreak();
  const { getCourseProgress } = useProgress();
  const [animatedXp, setAnimatedXp] = useState(0);

  useEffect(() => {
    const target = xp;
    let curr = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const iv = setInterval(() => {
      curr = Math.min(curr + step, target);
      setAnimatedXp(curr);
      if (curr >= target) clearInterval(iv);
    }, 25);
    return () => clearInterval(iv);
  }, [xp]);

  const firstName = user?.name?.split(" ")[0] || "Learner";
  const level = Math.floor(xp / 100) + 1;
  const xpToNext = 100 - (xp % 100);
  const allLessons = courses.flatMap(c => c.units.flatMap(u => u.lessons));
  const progress = getCourseProgress(allLessons);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="dashboard">
      <div className="db-inner">
        {/* HEADER */}
        <div className="db-header">
          <div>
            <p className="db-greeting">{greeting},</p>
            <h1 className="db-name">{firstName} 👋</h1>
          </div>
          <div className="db-level-badge">
            <Star size={14} fill="#ffd166" stroke="none" />
            Level {level}
          </div>
        </div>

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
              <div className="stat-value">{animatedXp}</div>
              <div className="stat-label">Total XP</div>
            </div>
          </div>
          <div className="stat-card level">
            <div className="stat-icon"><Trophy size={22} /></div>
            <div className="stat-info">
              <div className="stat-value">{level}</div>
              <div className="stat-label">Current Level</div>
            </div>
          </div>
          <div className="stat-card done">
            <div className="stat-icon"><BookOpen size={22} /></div>
            <div className="stat-info">
              <div className="stat-value">{progress.completedCount}</div>
              <div className="stat-label">Lessons Done</div>
            </div>
          </div>
        </div>

        {/* XP BAR */}
        <div className="xp-bar-section">
          <div className="xp-bar-header">
            <span>Level {level}</span>
            <span>{xpToNext} XP to Level {level + 1}</span>
          </div>
          <div className="xp-bar-track">
            <div className="xp-bar-fill" style={{ width: `${(xp % 100)}%` }} />
          </div>
        </div>

        <div className="db-grid">
          {/* CURRENT COURSES */}
          <section className="db-section main-section">
            <div className="db-section-header">
              <h2>Continue Learning</h2>
              <Link to="/courses" className="see-all">See all <ChevronRight size={14} /></Link>
            </div>

            <div className="courses-list">
              {courses.map(course => {
                const lessonList = course.units.flatMap(u => u.lessons);
                const prog = getCourseProgress(lessonList);
                return (
                  <Link key={course.id} to={`/courses/${course.id}`} className="course-row">
                    <div className="cr-icon">🧠</div>
                    <div className="cr-info">
                      <div className="cr-title">{course.title}</div>
                      <div className="cr-meta">{prog.completedCount}/{prog.total} lessons</div>
                      <div className="cr-bar">
                        <div className="cr-fill" style={{ width: `${prog.percent}%` }} />
                      </div>
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
            {/* DAILY STREAK */}
            <div className="aside-card streak-card">
              <h3>🔥 Daily Streak</h3>
              <div className="streak-days">
                {["M","T","W","T","F","S","S"].map((d, i) => (
                  <div key={i} className={`streak-day ${i < streak ? "done" : ""}`}>
                    <div className="sd-dot" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
              <p className="streak-msg">Keep it up! Practice today to extend your streak.</p>
            </div>

            {/* LEADERBOARD */}
            <div className="aside-card">
              <h3>🏆 This Week</h3>
              <div className="lb-list">
                {[
                  { name: firstName, xp: animatedXp, you: true },
                  { name: "Priya S.", xp: 380 },
                  { name: "Marcus T.", xp: 290 },
                ].sort((a, b) => b.xp - a.xp).map((entry, i) => (
                  <div key={i} className={`lb-entry ${entry.you ? "you" : ""}`}>
                    <span className="lb-rank">#{i + 1}</span>
                    <span className="lb-name">{entry.name}{entry.you ? " (you)" : ""}</span>
                    <span className="lb-xp">⚡ {entry.xp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPLORE */}
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
