import { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    // authService.signup(name, email, password) later
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Create your account ✨</h1>
        <p className="signup-subtitle">
          Start learning step-by-step
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-input">
            <label>Name</label>
            <input
              type="text"
              placeholder="Rohit"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="signup-input">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-input">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="signup-btn" type="submit">
            Create Account
          </button>
        </form>

        <div className="signup-footer">
          <span>Already have an account?</span>
          <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
