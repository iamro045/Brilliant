import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./auth.css";

const Login = () => {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({
      name,
      role: "Student",
      avatar: `https://ui-avatars.com/api/?name=${name}`,
    });
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back 👋</h1>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleLogin}>Continue</button>
      </div>
    </div>
  );
};

export default Login;
