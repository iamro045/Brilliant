import Confetti from "react-confetti";
import { useParams } from "react-router-dom";
import { lessons } from "../data/lessons";
import { useState } from "react";
import { useXP } from "../context/XPContext";
import { useProgress } from "../context/ProgressContext";
import { useStreak } from "../context/StreakContext";

const LessonPlay = () => {
  const { courseId, lessonId } = useParams();
  const lesson = lessons[courseId]?.find((l) => l.id === lessonId);
  const { updateStreak } = useStreak();
  const { addXp } = useXP();
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const { completeLesson } = useProgress();
  const [showConfetti, setShowConfetti] = useState(false);

  if (!lesson) return <p>Lesson not found</p>;

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === lesson.challenge?.answer) {
      setResult("correct");
      addXp(lesson.xp);
      completeLesson(courseId, lesson.id);
      updateStreak(); // 🔥 streak updated here

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      setResult("wrong");
    }
  };

  {
    showConfetti && <Confetti numberOfPieces={200} />;
  }

  return (
    <div className="challenge-wrapper">
      {showConfetti && <Confetti numberOfPieces={200} />}

      <div className="challenge-card">
        <h2 className="challenge-title">{lesson.title}</h2>

        <p className="challenge-question">{lesson.challenge?.question}</p>

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
          <p className="correct-text">🎉 Correct! +{lesson.xp} XP</p>
        )}

        {result === "wrong" && <p className="wrong-text">❌ Try again</p>}
      </div>
    </div>
  );
};

export default LessonPlay;
