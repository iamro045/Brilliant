import Confetti from "react-confetti";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { useState } from "react";
import { useXP } from "../context/XPContext";
import { useProgress } from "../context/ProgressContext";
import { useStreak } from "../context/StreakContext";

const LessonPlay = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const { addXp } = useXP();
  const { completeLesson } = useProgress();
  const { updateStreak } = useStreak();

  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBossCelebration, setShowBossCelebration] = useState(false);

  // ✅ Find course
  const course = courses.find(c => c.id === courseId);
  if (!course) return <p>Course not found</p>;

  // ✅ Flatten lessons
  const allLessons = course.units.flatMap(unit => unit.lessons);
  const lesson = allLessons.find(l => l.id === lessonId);
  if (!lesson) return <p>Lesson not found</p>;

  const isBoss = lesson.type === "boss";

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === lesson.challenge?.answer) {
      setResult("correct");

      addXp(lesson.xp);
      completeLesson(lesson.id);
      updateStreak();

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);

      // 🎉 Boss celebration ONLY after correct boss
      if (isBoss) {
        setTimeout(() => {
          setShowBossCelebration(true);
        }, 800);
      }
    } else {
      setResult("wrong");
    }
  };

  return (
    <div className="challenge-wrapper">
      {showConfetti && <Confetti numberOfPieces={180} />}

      <div className="challenge-card">
        <h2 className="challenge-title">{lesson.title}</h2>

        <p className="challenge-question">
          {lesson.challenge?.question}
        </p>

        {showBossCelebration && (
          <div className="boss-celebration">
            <h2>🏁 Boss Defeated!</h2>
            <p>You mastered this unit 🎉</p>
            <button onClick={() => navigate(`/courses/${courseId}`)}>
              Back to Course Map →
            </button>
          </div>
        )}

        {!showBossCelebration && (
          <>
            <input
              className="challenge-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
            />

            <button className="challenge-btn" onClick={checkAnswer}>
              Check
            </button>

            {result === "correct" && (
              <p className="correct-text">
                🎉 Correct! +{lesson.xp} XP
              </p>
            )}

            {result === "wrong" && (
              <p className="wrong-text">❌ Try again</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LessonPlay;
