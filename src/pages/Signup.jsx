import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import "./auth.css";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 4) { setError("Password must be at least 4 characters"); return; }
    setError("");
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const perks = ["Full access to all courses", "Daily challenges & XP streaks", "7-day free trial, no card needed"];

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-header">
          <Link to="/" className="auth-logo">◆ Brilliant</Link>
          <h1>Start learning today</h1>
          <p>Join 10M+ people building real skills</p>
        </div>

        <div className="auth-perks">
          {perks.map(p => (
            <div key={p} className="auth-perk"><Check size={14} />{p}</div>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full name</label>
            <input type="text" value={name} placeholder="Your name"
              onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} placeholder="you@example.com"
              onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <input type={showPw ? "text" : "password"} value={password} placeholder="Min. 4 characters"
                onChange={e => setPassword(e.target.value)} required />
              <button type="button" className="eye-btn" onClick={() => setShowPw(p => !p)}>
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : <>Create account <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
