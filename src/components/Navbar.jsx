import { Link } from "react-router-dom";
import { useXP } from "../context/XPContext";
import "./Navbar.css";

const Navbar = () => {
  const { xp } = useXP();

  return (
    <nav className="navbar">
      <h3 className="logo">Groott</h3>

      <div className="links">
        <span>⭐ XP: {xp}</span>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
