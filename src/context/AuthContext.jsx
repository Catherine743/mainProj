import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const decoded = jwtDecode(storedToken);
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setRole(decoded.role);
      } catch (error) {
        console.error('Invalid token', error);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      }
    }
  }, []);

  const login = (newToken, newUser) => {
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('user', JSON.stringify(newUser));
    const decoded = jwtDecode(newToken);
    setToken(newToken);
    setUser(newUser);
    setRole(decoded.role);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};