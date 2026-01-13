import { useParams } from "react-router-dom";
import { lessons } from "../data/lessons";
import { useState } from "react";
import { useXP } from "../context/XPContext";
import { useProgress } from "../context/ProgressContext";

const LessonPlay = () => {
  const { courseId, lessonId } = useParams();
  const lesson = lessons[courseId]?.find((l) => l.id === lessonId);

  const { addXp } = useXP();
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const { completeLesson } = useProgress();

  if (!lesson) return <p>Lesson not found</p>;

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === lesson.challenge?.answer) {
      setResult("correct");
      addXp(lesson.xp);
      completeLesson(courseId, lesson.id); // 🔓 mark complete
    }
  };

  return (
    <div className="challenge-box">
      <h2>{lesson.title}</h2>
      <p>{lesson.challenge?.question}</p>

      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer"
      />

      <button onClick={checkAnswer}>Check</button>

      {result === "correct" && <p>🎉 Correct! +{lesson.xp} XP</p>}
      {result === "wrong" && <p>❌ Try again</p>}
    </div>
  );
};

export default LessonPlay;
