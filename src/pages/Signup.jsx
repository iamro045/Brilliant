import { Link } from "react-router-dom";
import "./auth.css";

const Signup = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create your account ✨</h1>
        <p className="auth-subtitle">
          Start learning in a fun and rewarding way
        </p>

        <form className="auth-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="auth-btn">Sign up</button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
