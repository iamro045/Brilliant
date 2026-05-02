import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const MOCK_USERS = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", password: "password123", avatar: null, role: "Student" },
  { id: 2, name: "Demo User", email: "demo@demo.com", password: "demo", avatar: null, role: "Student" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("brilliant_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const login = async (email, password) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const userData = { id: found.id, name: found.name, email: found.email, role: found.role };
    setUser(userData);
    localStorage.setItem("brilliant_user", JSON.stringify(userData));
    return userData;
  };

  const signup = async (name, email, password) => {
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) throw new Error("Email already in use");
    const userData = { id: Date.now(), name, email, role: "Student" };
    MOCK_USERS.push({ ...userData, password });
    setUser(userData);
    localStorage.setItem("brilliant_user", JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("brilliant_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
