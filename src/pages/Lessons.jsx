import { useParams, Link } from "react-router-dom";
import { lessons } from "../data/lessons";
import { useProgress } from "../context/ProgressContext";

const Lessons = () => {
  const { courseId } = useParams();
  const courseLessons = lessons[courseId];
  const { completed } = useProgress();

  if (!courseLessons) {
    return <p>No lessons found</p>;
  }

  return (
    <>
      <h2>Choose a Level 🎯</h2>

      <div className="level-list">
        {courseLessons.map((lesson, index) => {
          const prevLesson = courseLessons[index - 1];
          const isUnlocked =
            index === 0 || completed.includes(`${courseId}-${prevLesson.id}`);

          return (
            <div key={lesson.id} className="level-card">
              <h3>
                Level {lesson.level}: {lesson.title}
              </h3>
              <p>⭐ {lesson.xp} XP</p>

              {isUnlocked ? (
                <Link to={`/lesson/${courseId}/${lesson.id}`}>
                  <button>Start 🚀</button>
                </Link>
              ) : (
                <button disabled>🔒 Locked</button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Lessons;
