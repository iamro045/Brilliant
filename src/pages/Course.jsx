import { useParams } from "react-router-dom";
import { courses } from "../data/courses";
import { Star, Trophy, Zap, Check, Lock, Play } from "lucide-react";
import "./courseMap.css";

const Course = () => {
  const { courseId } = useParams();
  // Fallback to first course if ID not found (for demo)
  const course = courses.find((c) => c.id === courseId) || courses[0];

  const getStatus = (index) => {
    if (index === 0) return "active";
    if (index < 3) return "completed";
    return "locked";
  };

  return (
    <div className="course-layout">
      
      {/* 1. MAIN MAP AREA (Now on Left/Center) */}
      <main className="course-map">
        <div className="map-header">
          <div className="level-badge">UNIT 1</div>
          <h1>{course.title || "Basics of Algorithms"}</h1>
          <p>Learn the fundamental building blocks.</p>
        </div>

        <div className="map-path-container">
          {course.units[0].lessons.map((lesson, index) => {
            const status = getStatus(index);
            return (
              <div className={`node-wrapper ${index % 2 === 0 ? "left" : "right"}`} key={lesson.id}>
                
                {/* Floating Label (Tooltip) */}
                <div className="node-label">
                    <span className="label-text">{lesson.title}</span>
                </div>

                {/* BIG Circular Game Node */}
                <button className={`map-node ${status}`}>
                  {status === "completed" ? <Check size={40} strokeWidth={4} /> : 
                   status === "active" ? <Play size={40} fill="white" /> : 
                   <Lock size={32} />}
                   
                   {/* Stars */}
                   <div className="stars">
                     {[1,2,3].map(s => <Star key={s} size={14} fill={status === "completed" ? "#FFD700" : "#ddd"} stroke="none"/>)}
                   </div>
                </button>
                
              </div>
            );
          })}
          
          {/* BOSS NODE */}
          <div className="node-wrapper center">
             <button className="map-node boss">
                <Trophy size={48} fill="#fff" />
             </button>
             <div className="node-label boss-label">Boss Challenge</div>
          </div>
        </div>
      </main>

      {/* 2. SIDEBAR (Now on Right) */}
      <aside className="course-sidebar">
        <div className="sidebar-card profile-card">
          <div className="icon-badge"></div>
          <div>
            <h2> 📘 Current Course</h2>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "35%" }}></div>
            </div>
            <p className="subtext">35% Complete</p>
          </div>
        </div>

        <div className="sidebar-card">
          <h3><Trophy size={20} /> Leaderboard</h3>
          <div className="rank-row">
            <span>🥇 Your </span>
            <span className="xp-badge"> 450 XP</span>
          </div>
        </div>

        <div className="sidebar-card highlight call-to-action">
          <div className="cta-content">
            <h3><Zap size={20} fill="#FFD700" /> Daily Streak</h3>
            <p>Keep the fire burning!</p>
          </div>
          <button className="primary-btn-3d">DO EXERCISE</button>
        </div>
      </aside>

    </div>
  );
};

export default Course;