import { useParams } from "react-router-dom";
import { lessons } from "../data/lessons";
import { Link } from "react-router-dom";

const Lessons = () => {
  const { courseId } = useParams();
  const courseLessons = lessons[courseId];

  if (!courseLessons) return <p>No lessons found</p>;

  return (
    <>
      <h2>Choose a Challenge 🎯</h2>
      {courseLessons.map((lesson) => (
        <div key={lesson.id} className="lesson-card">
          <h3>{lesson.title}</h3>
          <p>Reward: ⭐ {lesson.xp} XP</p>
          <Link to={`/lesson/${courseId}/${lesson.id}`}>
            Start Challenge 🚀
          </Link>
        </div>
      ))}
    </>
  );
};

export default Lessons;
