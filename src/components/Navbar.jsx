import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}


  return (
    <header className="navbar">
      <div className="nav-left">
        <span className="logo" onClick={() => navigate("/dashboard")}>
          Groott
        </span>

        <nav className="nav-links">
          <NavLink to="/dashboard" className="nav-item">
            Home
          </NavLink>
          <NavLink to="/courses" className="nav-item">
            Courses
          </NavLink>
        </nav>
      </div>

      {/* RIGHT */}
      {user && (
        <div className="nav-right" ref={menuRef}>
          <div className="xp-pill">⚡ 000 XP</div>

          <img
            src={user.avatar}
            alt="avatar"
            className="avatar"
            onClick={() => setOpen((prev) => !prev)}
          />

          <div className={`dropdown ${open ? "show" : ""}`}>
            <div className="dropdown-user">
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>

            <NavLink to="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/courses" onClick={() => setOpen(false)}>
              Courses
            </NavLink>

            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
