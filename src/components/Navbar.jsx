import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  /* CLOSE DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="navbar">
      <h2 className="logo">Groott</h2>

      <div className="nav-right">
        {!user ? (
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        ) : (
          <div className="profile-menu" ref={menuRef}>
            <img
              src={user.avatar}
              className="avatar"
              alt="avatar"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="dropdown">
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
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
