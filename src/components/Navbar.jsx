import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // mock user (replace with AuthContext later)
  const user = {
    name: "Rohit",
    avatar: "https://ui-avatars.com/api/?name=Rohit"
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">Groott</h2>
      </div>

      <div className="nav-right">
        {!user ? (
          <a className="nav-link" href="/login">Login</a>
        ) : (
          <div className="profile-menu">
            <img
              src={user.avatar}
              alt="avatar"
              className="avatar"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="dropdown">
                <div className="dropdown-user">
                  <strong>{user.name}</strong>
                  <span>Student</span>
                </div>

                <a href="/dashboard">Dashboard</a>
                <a href="/courses">Courses</a>

                <button className="logout-btn">
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
