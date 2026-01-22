import "./auth.css";

const Signup = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account ✨</h1>
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <button>Sign up</button>
      </div>
    </div>
  );
};

export default Signup;
