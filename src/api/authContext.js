import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("authToken", token);
  };

  const signUp = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{ authToken, isAuthenticated, login, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
