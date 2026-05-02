import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { Star, Trophy, Zap, Check, Lock, Play, ArrowLeft, Flame } from "lucide-react";
import { useProgress } from "../context/ProgressContext";
import { useXP } from "../context/XPContext";
import { useStreak } from "../context/StreakContext";
import { useEffect, useRef, useState } from "react";
import "./courseMap.css";

const LessonModal = ({ lesson, onClose, onComplete }) => {
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);

  const options = ["Option A", "Option B", "Option C", "Option D"];
  const correct = 2;

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === correct) setTimeout(() => { onComplete(); onClose(); }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-badge">Logic</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <h2 className="modal-title">{lesson.title}</h2>
        <p className="modal-xp">+{lesson.xp} XP on completion</p>

        <div className="modal-question">
          <p>This is a sample question for <strong>{lesson.title}</strong>. Which answer is correct?</p>
        </div>

        <div className="modal-options">
          {options.map((opt, i) => (
            <button
              key={i}
              className={`modal-opt ${selected === i ? (i === correct ? "right" : "wrong") : ""} ${answered && i === correct ? "right" : ""}`}
              onClick={() => handleSelect(i)}
            >
              <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
              {opt}
              {answered && i === correct && <Check size={15} className="opt-check" />}
            </button>
          ))}
        </div>

        {answered && selected !== correct && (
          <div className="modal-feedback wrong-feedback">
            <strong>Not quite!</strong> The correct answer is {String.fromCharCode(65 + correct)}.
            <button className="retry-btn" onClick={() => { setAnswered(false); setSelected(null); }}>Try again</button>
          </div>
        )}
        {answered && selected === correct && (
          <div className="modal-feedback right-feedback">
            <strong>🎉 Correct!</strong> Great job! Moving on…
          </div>
        )}
      </div>
    </div>
  );
};

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { completedLessons, completeLesson, getCourseProgress } = useProgress();
  const { xp, addXp } = useXP();
  const { streak } = useStreak();
  const [activeLesson, setActiveLesson] = useState(null);
  const activeNodeRef = useRef(null);

  const course = courses.find(c => c.id === courseId) || courses[0];

  useEffect(() => {
    if (activeNodeRef.current) {
      activeNodeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const handleComplete = (lesson) => {
    completeLesson(lesson.id);
    addXp(lesson.xp);
  };

  const allLessons = course.units.flatMap(u => u.lessons);
  const totalProgress = getCourseProgress(allLessons);

  return (
    <div className="course-layout">
      {/* SIDEBAR */}
      <aside className="course-sidebar">
        <button className="sb-back" onClick={() => navigate("/courses")}>
          <ArrowLeft size={16} /> Back
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
          <div className="sbp-meta">{totalProgress.completedCount}/{totalProgress.total} lessons</div>
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
          const isBossUnlocked = unit.lessons.every(l => completedLessons.includes(l.id));

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
                {unit.lessons.map((lesson, index) => {
                  const prev = unit.lessons[index - 1];
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isUnlocked = index === 0 || completedLessons.includes(prev?.id);
                  const status = isCompleted ? "completed" : isUnlocked ? "active" : "locked";
                  const isLeft = index % 2 === 0;

                  return (
                    <div key={lesson.id} className={`node-row ${isLeft ? "left" : "right"}`}>
                      {/* CONNECTOR */}
                      {index > 0 && (
                        <div className={`connector ${isLeft ? "from-right" : "from-left"} ${completedLessons.includes(prev?.id) ? "done" : ""}`} />
                      )}

                      <div className="node-outer">
                        {/* LABEL */}
                        <div className={`node-label ${isLeft ? "label-right" : "label-left"}`}>
                          {lesson.title}
                          {lesson.xp && <span className="node-xp">+{lesson.xp} XP</span>}
                        </div>

                        {/* BUTTON */}
                        <button
                          ref={el => { if (status === "active" && !activeNodeRef.current) activeNodeRef.current = el; }}
                          className={`map-node ${status} ${lesson.type === "boss" ? "boss" : ""}`}
                          onClick={() => status !== "locked" && setActiveLesson(lesson)}
                          disabled={status === "locked"}
                          title={status === "locked" ? "Complete previous lessons first" : lesson.title}
                        >
                          {status === "completed" ? <Check size={28} strokeWidth={3} /> :
                           status === "active" ? <Play size={28} fill="white" stroke="none" /> :
                           <Lock size={22} />}

                          <div className="node-stars">
                            {[1,2,3].map(s => (
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
                  <div className={`connector from-center ${isBossUnlocked ? "done" : ""}`} />
                  <div className="node-outer">
                    <button
                      className={`map-node boss-node ${!isBossUnlocked ? "locked" : "active-boss"}`}
                      disabled={!isBossUnlocked}
                      title={isBossUnlocked ? "Boss Challenge!" : "Complete all lessons first"}
                    >
                      <Trophy size={34} />
                    </button>
                    <div className="boss-label">
                      {isBossUnlocked ? "⚡ Boss Challenge" : "Complete all lessons"}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* MODAL */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onComplete={() => handleComplete(activeLesson)}
        />
      )}
    </div>
  );
};

export default Course;
