import { useParams } from "react-router-dom";
import { lessons } from "../data/lessons";
import { useState } from "react";

const LessonPlay = () => {
  const { courseId, lessonId } = useParams();
  const lesson = lessons[courseId]?.find(
    (l) => l.id === lessonId
  );

  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  if (!lesson) return <p>Lesson not found</p>;

  const checkAnswer = () => {
    if (
      answer.trim().toLowerCase() ===
      lesson.challenge.answer
    ) {
      setResult("correct");
    } else {
      setResult("wrong");
    }
  };

  return (
    <div className="challenge-box">
      <h2>{lesson.title}</h2>
      <p>{lesson.challenge.question}</p>

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer"
      />

      <button onClick={checkAnswer}>Check</button>

      {result === "correct" && (
        <p>🎉 Correct! You earned {lesson.xp} XP</p>
      )}
      {result === "wrong" && <p>❌ Try again</p>}
    </div>
  );
};

export default LessonPlay;
