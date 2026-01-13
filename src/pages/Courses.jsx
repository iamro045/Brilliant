import { courses } from "../data/courses";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  return (
    <>
      <h2>Courses</h2>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
          />
        ))}
      </div>
    </>
  );
};

export default Courses;
