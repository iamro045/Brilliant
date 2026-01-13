import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login("test@example.com");
    navigate("/courses");
  };

  return (
    <>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
