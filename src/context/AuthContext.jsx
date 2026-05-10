// AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(
    sessionStorage.getItem("token") || ""
  );

  const [profileRefresh, setProfileRefresh] = useState(false);

  const triggerProfileRefresh = () => {
    setProfileRefresh(prev => !prev);
  };

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    sessionStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, profileRefresh, triggerProfileRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);