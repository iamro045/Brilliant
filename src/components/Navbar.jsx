import { Link } from "react-router-dom";
import { useXP } from "../context/XPContext";
import XPBar from "./XPBar";
import "./Navbar.css";
import { useStreak } from "../context/StreakContext";

const Navbar = () => {
  const { xp } = useXP();
  const { streak } = useStreak();


  return (
    <nav className="navbar">
      <h3 className="logo">Groott</h3>

      <div className="links">
        <XPBar />
        <span>🔥 {streak}</span>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
