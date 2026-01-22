import { Link } from "react-router-dom";
import XPBar from "./XPBar";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            Groott
          </Link>

          <nav className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/courses" className="nav-link">Courses</Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          <XPBar />

          <div className="navbar-streak">
            🔥 <span>0</span>
          </div>

          <Link to="/login" className="nav-link login-link">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
