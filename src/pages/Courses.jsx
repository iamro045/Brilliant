import { courses } from "../data/courses";
import { Link } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import { ChevronRight, BookOpen, Clock, Zap } from "lucide-react";
import "./courses.css";

const COURSE_META = {
  "think-like-a-computer": { icon: "🧠", color: "#4f46e5", bg: "#eef2ff", time: "~3 hrs", tags: ["Logic", "Beginner"] },
};

const Courses = () => {
  const { getCourseProgress } = useProgress();

  return (
    <div className="courses-page">
      <div className="courses-inner">
        <div className="courses-header">
          <h1>All Courses</h1>
          <p>Hands-on learning paths built by experts. Start anywhere.</p>
        </div>

        <div className="courses-grid">
          {courses.map(course => {
            const meta = COURSE_META[course.id] || { icon: "📚", color: "#059669", bg: "#ecfdf5", time: "~2 hrs", tags: ["General"] };
            const allLessons = course.units.flatMap(u => u.lessons);
            const prog = getCourseProgress(allLessons);

            return (
              <Link key={course.id} to={`/courses/${course.id}`} className="course-card">
                <div className="cc-top" style={{ background: meta.bg }}>
                  <div className="cc-emoji">{meta.icon}</div>
                  <div className="cc-tags">
                    {meta.tags.map(t => (
                      <span key={t} className="cc-tag" style={{ color: meta.color, background: "rgba(255,255,255,0.8)" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="cc-body">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="cc-meta">
                    <span><BookOpen size={13} /> {allLessons.length} lessons</span>
                    <span><Clock size={13} /> {meta.time}</span>
                    <span><Zap size={13} /> XP earned</span>
                  </div>
                  <div className="cc-progress">
                    <div className="cc-bar">
                      <div className="cc-fill" style={{ width: `${prog.percent}%` }} />
                    </div>
                    <span>{prog.percent}%</span>
                  </div>
                  <div className="cc-cta">
                    {prog.percent > 0 ? "Continue" : "Start learning"}
                    <ChevronRight size={15} />
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Coming soon cards */}
          {["Python Foundations", "Probability & Stats", "Linear Algebra"].map(title => (
            <div key={title} className="course-card locked-card">
              <div className="cc-top locked-top">
                <div className="cc-emoji">🔒</div>
              </div>
              <div className="cc-body">
                <h3>{title}</h3>
                <p>Coming soon — this course is in development.</p>
                <div className="cc-coming-badge">Coming soon</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
