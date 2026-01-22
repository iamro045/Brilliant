import { useState } from "react";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // 🔐 authService.login(email, password) later
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* HEADER */}
        <h1 className="login-title">Welcome back 👋</h1>
        <p className="login-subtitle">
          Log in to continue learning
        </p>

        {/* FORM */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Log In
          </button>
        </form>

        {/* FOOTER */}
        <div className="login-footer">
          <span>New here?</span>
          <a href="/signup">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
