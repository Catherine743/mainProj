import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(
    sessionStorage.getItem("token") || ""
  );

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    sessionStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ login, user, token, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);