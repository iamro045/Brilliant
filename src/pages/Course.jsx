import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { questionBank } from "../data/questions";
import { Star, Trophy, Zap, Check, Lock, Play, ArrowLeft, Flame, BookOpen } from "lucide-react";
import { useProgress } from "../context/ProgressContext";
import { useXP } from "../context/XPContext";
import { useStreak } from "../context/StreakContext";
import { useEffect, useRef } from "react";
import "./courseMap.css";

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { completedLessons, getCourseProgress } = useProgress();
  const { xp } = useXP();
  const { streak } = useStreak();
  const activeNodeRef = useRef(null);

  const course = courses.find(c => c.id === courseId) || courses[0];

  useEffect(() => {
    if (activeNodeRef.current) {
      activeNodeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const allLessons = course.units.flatMap(u => u.lessons);
  const totalProgress = getCourseProgress(allLessons);

  const goToLesson = (lesson, status) => {
    if (status === "locked") return;
    navigate(`/lesson/${courseId}/${lesson.id}`);
  };

  return (
    <div className="course-layout">
      {/* SIDEBAR */}
      <aside className="course-sidebar">
        <button className="sb-back" onClick={() => navigate("/courses")}>
          <ArrowLeft size={16} /> Back to courses
        </button>

        <div className="sb-course-info">
          <div className="sb-emoji">🧠</div>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>

        <div className="sb-progress-card">
          <div className="sbp-header">
            <span>Overall progress</span>
            <span className="sbp-pct">{totalProgress.percent}%</span>
          </div>
          <div className="sbp-bar">
            <div className="sbp-fill" style={{ width: `${totalProgress.percent}%` }} />
          </div>
          <div className="sbp-meta">{totalProgress.completedCount}/{totalProgress.total} lessons complete</div>
        </div>

        <div className="sb-stats">
          <div className="sb-stat">
            <Flame size={18} className="sb-icon fire" />
            <div>
              <div className="sb-stat-val">{streak}</div>
              <div className="sb-stat-lbl">Streak</div>
            </div>
          </div>
          <div className="sb-stat">
            <Zap size={18} className="sb-icon zap" />
            <div>
              <div className="sb-stat-val">{xp}</div>
              <div className="sb-stat-lbl">Total XP</div>
            </div>
          </div>
        </div>

        {/* UNIT LIST */}
        <div className="sb-units">
          <h3><BookOpen size={14} /> Units</h3>
          {course.units.map((unit, i) => {
            const up = getCourseProgress(unit.lessons);
            return (
              <div key={unit.unitId} className="sb-unit-row">
                <div className="sb-unit-num">U{i + 1}</div>
                <div className="sb-unit-info">
                  <div className="sb-unit-title">{unit.title}</div>
                  <div className="sb-unit-prog">
                    <div className="sb-unit-bar">
                      <div className="sb-unit-fill" style={{ width: `${up.percent}%` }} />
                    </div>
                    <span>{up.percent}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sb-leaderboard">
          <h3><Trophy size={15} /> Leaderboard</h3>
          <div className="sb-lb-entries">
            <div className="sb-lb-entry you"><span className="sb-lb-rank">🥇</span><span>You</span><span className="sb-lb-xp">⚡ {xp}</span></div>
            <div className="sb-lb-entry"><span className="sb-lb-rank">🥈</span><span>Priya S.</span><span className="sb-lb-xp">⚡ 380</span></div>
            <div className="sb-lb-entry"><span className="sb-lb-rank">🥉</span><span>Marcus T.</span><span className="sb-lb-xp">⚡ 290</span></div>
          </div>
        </div>
      </aside>

      {/* MAP */}
      <main className="course-map">
        <div className="course-map-header">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>

        {course.units.map((unit, unitIndex) => {
          const unitProgress = getCourseProgress(unit.lessons);
          const isBossUnlocked = unit.lessons
            .filter(l => l.type !== "boss")
            .every(l => completedLessons.includes(l.id));

          const regularLessons = unit.lessons.filter(l => l.type !== "boss");

          return (
            <section key={unit.unitId} className="course-unit">
              <div className="unit-header">
                <div className="unit-badge">UNIT {unitIndex + 1}</div>
                <h2 className="unit-title">{unit.title}</h2>
                <div className="unit-progress-bar">
                  <div className="unit-progress-fill" style={{ width: `${unitProgress.percent}%` }} />
                </div>
                <span className="unit-pct">{unitProgress.percent}%</span>
              </div>

              <div className="node-path">
                {regularLessons.map((lesson, index) => {
                  const prev = regularLessons[index - 1];
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isUnlocked = index === 0 || completedLessons.includes(prev?.id);
                  const status = isCompleted ? "completed" : isUnlocked ? "active" : "locked";
                  const isLeft = index % 2 === 0;
                  const hasContent = !!questionBank[lesson.id];

                  return (
                    <div key={lesson.id} className={`node-row ${isLeft ? "left" : "right"}`}>
                      {index > 0 && (
                        <div className={`connector ${completedLessons.includes(prev?.id) ? "done" : ""}`} />
                      )}

                      <div className="node-outer">
                        <div className={`node-label ${isLeft ? "label-right" : "label-left"}`}>
                          <span className="node-label-title">{lesson.title}</span>
                          <span className="node-xp">+{lesson.xp} XP</span>
                          {!hasContent && status !== "locked" && (
                            <span className="node-soon">Coming soon</span>
                          )}
                        </div>

                        <button
                          ref={el => { if (status === "active" && !activeNodeRef.current) activeNodeRef.current = el; }}
                          className={`map-node ${status}`}
                          onClick={() => hasContent && goToLesson(lesson, status)}
                          disabled={status === "locked" || !hasContent}
                          title={
                            status === "locked" ? "Complete previous lessons first" :
                            !hasContent ? "Coming soon" :
                            lesson.title
                          }
                        >
                          {status === "completed" ? (
                            <Check size={28} strokeWidth={3} />
                          ) : status === "active" ? (
                            <Play size={28} fill="white" stroke="none" />
                          ) : (
                            <Lock size={22} />
                          )}

                          <div className="node-stars">
                            {[1, 2, 3].map(s => (
                              <Star key={s} size={11} fill={status === "completed" ? "#ffd166" : "#e2e8f0"} stroke="none" />
                            ))}
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* BOSS NODE */}
                <div className="node-row center">
                  <div className={`connector ${isBossUnlocked ? "done" : ""}`} />
                  <div className="node-outer">
                    <button
                      className={`map-node boss-node ${!isBossUnlocked ? "locked" : "active-boss"}`}
                      disabled={!isBossUnlocked}
                      title={isBossUnlocked ? "Boss Challenge!" : "Complete all lessons to unlock"}
                    >
                      <Trophy size={34} />
                    </button>
                    <div className="boss-label">
                      {isBossUnlocked ? "⚡ Boss Challenge" : `🔒 Complete all ${regularLessons.length} lessons`}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default Course;
