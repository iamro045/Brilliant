import { Link } from "react-router-dom";

const CourseCard = ({ id, title, description }) => {
  return (
    <Link to={`/courses/${id}`} className="course-link">
      <div className="course-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Start →</p>
      </div>
    </Link>
  );
};

export default CourseCard;
