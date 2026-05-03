import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useXP } from "../context/XPContext";
import { useStreak } from "../context/StreakContext";
import { Zap, Flame, ChevronDown, LogOut, LayoutDashboard, BookOpen, User } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { xp } = useXP();
  const { streak } = useStreak();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?";

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        {/* LOGO */}
        <div className="nav-left">
          <Link to={user ? "/dashboard" : "/"} className="logo">
            <span className="logo-icon">◆</span>
            <span className="logo-text">Brilliant</span>
          </Link>

          {user && (
            <nav className="nav-links">
              <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
                Home
              </NavLink>
              <NavLink to="/courses" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
                Courses
              </NavLink>
            </nav>
          )}

          {!user && (
            <nav className="nav-links">
              <a href="#features" className="nav-item">Courses</a>
              <a href="#how" className="nav-item">For Teams</a>
              <a href="#pricing" className="nav-item">Pricing</a>
            </nav>
          )}
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          {user ? (
            <>
              <div className="nav-pill streak-pill">
                <Flame size={15} className="pill-icon flame" />
                <span>{streak}</span>
              </div>
              <div className="nav-pill xp-pill">
                <Zap size={15} className="pill-icon zap" />
                <span>{xp} XP</span>
              </div>

              <div className="avatar-menu" ref={menuRef}>
                <button className="avatar-btn" onClick={() => setOpen(p => !p)}>
                  <div className="avatar-circle">{initials}</div>
                  <ChevronDown size={14} className={`chevron ${open ? "open" : ""}`} />
                </button>

                {open && (
                  <div className="dropdown">
                    <div className="dropdown-header">
                      <div className="dh-avatar">{initials}</div>
                      <div>
                        <div className="dh-name">{user.name}</div>
                        <div className="dh-email">{user.email}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <NavLink to="/dashboard" className="dropdown-item" onClick={() => setOpen(false)}>
                      <LayoutDashboard size={15} /> Dashboard
                    </NavLink>
                    <NavLink to="/courses" className="dropdown-item" onClick={() => setOpen(false)}>
                      <BookOpen size={15} /> Courses
                    </NavLink>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item logout" onClick={() => { logout(); navigate("/"); setOpen(false); }}>
                      <LogOut size={15} /> Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn-ghost">Log in</Link>
              <Link to="/signup" className="nav-btn-primary">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
