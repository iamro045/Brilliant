import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { questionBank } from "../data/questions";
import { courses } from "../data/courses";
import { useProgress } from "../context/ProgressContext";
import { useXP } from "../context/XPContext";
import {
  Check, X, ArrowRight, ArrowLeft, Trophy, Zap,
  Star, BookOpen, ChevronRight, RotateCcw, Home
} from "lucide-react";
import "./lesson.css";

/* ─── Helpers ─────────────────────────────────────────── */

const findLesson = (courseId, lessonId) => {
  const course = courses.find(c => c.id === courseId);
  if (!course) return null;
  for (const unit of course.units) {
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (lesson) return { lesson, unit, course };
  }
  return null;
};

const findNextLesson = (courseId, lessonId) => {
  const course = courses.find(c => c.id === courseId);
  if (!course) return null;
  const allLessons = course.units.flatMap(u => u.lessons);
  const idx = allLessons.findIndex(l => l.id === lessonId);
  return idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : null;
};

/* ─── Sub-components ──────────────────────────────────── */

const ProgressBar = ({ current, total }) => (
  <div className="lp-progress">
    <div className="lp-prog-track">
      <div
        className="lp-prog-fill"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
    <span className="lp-prog-label">{current}/{total}</span>
  </div>
);

const XPPopup = ({ xp }) => (
  <div className="xp-popup">
    <Zap size={16} /> +{xp} XP
  </div>
);

const IntroSlide = ({ data, onStart }) => (
  <div className="slide intro-slide">
    <div className="intro-icon">🧠</div>
    <h1 className="intro-title">{data.lessonTitle}</h1>
    <div className="intro-body">
      <p className="intro-text">{data.intro}</p>
      <div className="intro-concept">
        <div className="concept-label">💡 Key Concept</div>
        <p>{data.concept}</p>
      </div>
    </div>
    <button className="btn-start" onClick={onStart}>
      Start lesson <ArrowRight size={17} />
    </button>
  </div>
);

const MCQSlide = ({ q, onAnswer, answered, selected }) => {
  const isCorrect = selected === q.correct;
  return (
    <div className="slide question-slide">
      <div className="q-type-badge">Multiple Choice</div>
      <h2 className="q-text">{q.question}</h2>
      <div className="q-options">
        {q.options.map((opt, i) => {
          let cls = "q-opt";
          if (answered) {
            if (i === q.correct) cls += " correct";
            else if (i === selected) cls += " wrong";
            else cls += " dimmed";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => !answered && onAnswer(i)}
            >
              <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
              <span className="opt-text">{opt}</span>
              {answered && i === q.correct && <Check size={16} className="opt-icon correct-icon" />}
              {answered && i === selected && i !== q.correct && <X size={16} className="opt-icon wrong-icon" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`q-feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <div className="fb-header">
            {isCorrect ? "✅ Correct!" : "❌ Not quite"}
          </div>
          <p className="fb-explanation">{q.explanation}</p>
        </div>
      )}
    </div>
  );
};

const TrueFalseSlide = ({ q, onAnswer, answered, selected }) => {
  const correctIdx = q.correct === true ? 0 : 1;
  const options = ["True", "False"];
  return (
    <div className="slide question-slide">
      <div className="q-type-badge">True or False</div>
      <h2 className="q-text">{q.question}</h2>
      <div className="q-options tf-options">
        {options.map((opt, i) => {
          let cls = "q-opt tf-opt";
          if (answered) {
            if (i === correctIdx) cls += " correct";
            else if (i === selected) cls += " wrong";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => !answered && onAnswer(i)}
            >
              <span className="tf-emoji">{i === 0 ? "✓" : "✗"}</span>
              {opt}
              {answered && i === correctIdx && <Check size={16} className="opt-icon correct-icon" />}
              {answered && i === selected && i !== correctIdx && <X size={16} className="opt-icon wrong-icon" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`q-feedback ${selected === correctIdx ? "feedback-correct" : "feedback-wrong"}`}>
          <div className="fb-header">
            {selected === correctIdx ? "✅ Correct!" : "❌ Not quite"}
          </div>
          <p className="fb-explanation">{q.explanation}</p>
        </div>
      )}
    </div>
  );
};

const OrderSlide = ({ q, onAnswer, answered, selected }) => {
  const [arrangement, setArrangement] = useState(() => [...q.items]);
  const [dragging, setDragging] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleDragStart = (i) => setDragging(i);
  const handleDrop = (i) => {
    if (dragging === null || dragging === i) return;
    const arr = [...arrangement];
    [arr[dragging], arr[i]] = [arr[i], arr[dragging]];
    setArrangement(arr);
    setDragging(null);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Check if arrangement matches correct order
    const isCorrect = arrangement.every((item, i) => item === q.items[q.correct[i]]);
    onAnswer(isCorrect ? 0 : 1, isCorrect);
  };

  const correctOrder = q.correct.map(i => q.items[i]);
  const isCorrect = answered && arrangement.every((item, i) => item === correctOrder[i]);

  return (
    <div className="slide question-slide">
      <div className="q-type-badge">Put in Order</div>
      <h2 className="q-text">{q.question}</h2>
      <div className="order-list">
        {arrangement.map((item, i) => (
          <div
            key={item}
            className={`order-item ${dragging === i ? "dragging" : ""} ${answered ? (item === correctOrder[i] ? "order-correct" : "order-wrong") : ""}`}
            draggable={!answered}
            onDragStart={() => handleDragStart(i)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(i)}
          >
            <span className="order-num">{i + 1}</span>
            <span className="order-text">{item}</span>
            {answered && item === correctOrder[i] && <Check size={14} className="opt-icon correct-icon" />}
            {answered && item !== correctOrder[i] && <X size={14} className="opt-icon wrong-icon" />}
          </div>
        ))}
      </div>
      {!answered && (
        <button className="btn-submit-order" onClick={handleSubmit}>
          Check my order <ArrowRight size={15} />
        </button>
      )}
      {answered && (
        <div className={`q-feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <div className="fb-header">{isCorrect ? "✅ Perfect order!" : "❌ Not quite right"}</div>
          <p className="fb-explanation">{q.explanation}</p>
          {!isCorrect && (
            <div className="correct-order">
              <strong>Correct order:</strong>
              {correctOrder.map((item, i) => (
                <div key={i} className="co-item">{i + 1}. {item}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CompletionSlide = ({ lessonData, lessonMeta, score, total, onNext, onRetry, onCourse }) => {
  const pct = Math.round((score / total) * 100);
  const stars = pct >= 90 ? 3 : pct >= 65 ? 2 : 1;

  return (
    <div className="slide completion-slide">
      <div className="comp-trophy">
        {pct === 100 ? "🏆" : pct >= 65 ? "🎉" : "💪"}
      </div>
      <h1 className="comp-title">
        {pct === 100 ? "Perfect Score!" : pct >= 65 ? "Lesson Complete!" : "Keep Practicing!"}
      </h1>
      <div className="comp-stars">
        {[1, 2, 3].map(s => (
          <Star
            key={s}
            size={36}
            fill={s <= stars ? "#ffd166" : "#e2e8f0"}
            stroke="none"
            className={s <= stars ? "star-earned" : ""}
          />
        ))}
      </div>
      <div className="comp-stats">
        <div className="comp-stat">
          <div className="comp-stat-val">{score}/{total}</div>
          <div className="comp-stat-lbl">Correct</div>
        </div>
        <div className="comp-stat">
          <div className="comp-stat-val">{pct}%</div>
          <div className="comp-stat-lbl">Accuracy</div>
        </div>
        <div className="comp-stat xp-stat">
          <div className="comp-stat-val">+{lessonMeta?.xp || 10}</div>
          <div className="comp-stat-lbl">XP Earned</div>
        </div>
      </div>
      <div className="comp-actions">
        {pct < 65 && (
          <button className="comp-btn secondary" onClick={onRetry}>
            <RotateCcw size={16} /> Try again
          </button>
        )}
        <button className="comp-btn primary" onClick={pct >= 65 ? onNext : onRetry}>
          {pct >= 65 ? (
            <><ArrowRight size={16} /> Next lesson</>
          ) : (
            <><RotateCcw size={16} /> Retry</>
          )}
        </button>
      </div>
      <button className="comp-back" onClick={onCourse}>
        <Home size={14} /> Back to course map
      </button>
    </div>
  );
};

/* ─── Main Page ───────────────────────────────────────── */

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson } = useProgress();
  const { addXp } = useXP();

  const found = findLesson(courseId, lessonId);
  const lessonData = questionBank[lessonId];

  const [phase, setPhase] = useState("intro"); // intro | questions | complete
  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showXP, setShowXP] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [qIndex]);

  if (!found || !lessonData) {
    return (
      <div className="lp-error">
        <h2>Lesson not found</h2>
        <p>This lesson doesn't have content yet. Check back soon!</p>
        <button onClick={() => navigate(`/courses/${courseId}`)}>Back to course</button>
      </div>
    );
  }

  const { lesson, unit } = found;
  const questions = lessonData.questions;
  const currentQ = questions[qIndex];

  const handleAnswer = (selectedIdx, forceCorrect) => {
    setSelected(selectedIdx);
    setAnswered(true);
    const isCorrect =
      forceCorrect !== undefined
        ? forceCorrect
        : currentQ.type === "truefalse"
        ? selectedIdx === (currentQ.correct === true ? 0 : 1)
        : selectedIdx === currentQ.correct;

    if (isCorrect) {
      setCorrectCount(p => p + 1);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 1500);
    }
  };

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(q => q + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      // Complete
      const pct = Math.round(((correctCount + (answered && (
        currentQ.type === "truefalse"
          ? selected === (currentQ.correct === true ? 0 : 1)
          : selected === currentQ.correct
      ) ? 1 : 0)) / questions.length) * 100);

      if (pct >= 65) {
        completeLesson(lessonId);
        addXp(lesson.xp || 10);
      }
      setPhase("complete");
    }
  };

  const handleRetry = () => {
    setPhase("intro");
    setQIndex(0);
    setAnswered(false);
    setSelected(null);
    setCorrectCount(0);
  };

  const handleNextLesson = () => {
    const next = findNextLesson(courseId, lessonId);
    if (next) navigate(`/lesson/${courseId}/${next.id}`);
    else navigate(`/courses/${courseId}`);
  };

  // Final score including last answer
  const finalScore = correctCount + (
    answered && phase !== "complete" ? (
      currentQ.type === "truefalse"
        ? (selected === (currentQ.correct === true ? 0 : 1) ? 1 : 0)
        : (selected === currentQ.correct ? 1 : 0)
    ) : 0
  );

  return (
    <div className="lesson-page">
      {/* TOP BAR */}
      <div className="lp-topbar">
        <button className="lp-exit" onClick={() => navigate(`/courses/${courseId}`)}>
          <X size={18} />
        </button>
        {phase === "questions" && (
          <ProgressBar current={qIndex + (answered ? 1 : 0)} total={questions.length} />
        )}
        <div className="lp-unit-badge">{unit.title}</div>
      </div>

      {/* CONTENT */}
      <div className="lp-content">
        {showXP && <XPPopup xp={Math.floor((lesson.xp || 10) / questions.length)} />}

        {phase === "intro" && (
          <IntroSlide data={lessonData} onStart={() => setPhase("questions")} />
        )}

        {phase === "questions" && (
          <div className="lp-question-wrapper">
            {/* Question counter */}
            <div className="lp-q-counter">
              Question {qIndex + 1} of {questions.length}
            </div>

            {currentQ.type === "mcq" && (
              <MCQSlide
                q={currentQ}
                onAnswer={handleAnswer}
                answered={answered}
                selected={selected}
              />
            )}
            {currentQ.type === "truefalse" && (
              <TrueFalseSlide
                q={currentQ}
                onAnswer={handleAnswer}
                answered={answered}
                selected={selected}
              />
            )}
            {currentQ.type === "order" && (
              <OrderSlide
                q={currentQ}
                onAnswer={handleAnswer}
                answered={answered}
                selected={selected}
              />
            )}

            {/* NEXT BUTTON */}
            {answered && (
              <button className="btn-next" onClick={handleNext}>
                {qIndex < questions.length - 1 ? (
                  <>Next question <ArrowRight size={17} /></>
                ) : (
                  <>See results <Trophy size={17} /></>
                )}
              </button>
            )}
          </div>
        )}

        {phase === "complete" && (
          <CompletionSlide
            lessonData={lessonData}
            lessonMeta={lesson}
            score={finalScore}
            total={questions.length}
            onNext={handleNextLesson}
            onRetry={handleRetry}
            onCourse={() => navigate(`/courses/${courseId}`)}
          />
        )}
      </div>
    </div>
  );
};

export default LessonPage;
