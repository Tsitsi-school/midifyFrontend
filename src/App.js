import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import LoggedInLanding from "./components/Pages/LoggedInLandingPage";
import UploadPage from "./components/Pages/UploadPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HistoryPage from "./components/Pages/HistoryPage";
import DownloadPage from "./components/Pages/DownloadPage";
import GlobalStyle from "./GlobalStyles";
import ProfilePage from "./components/Pages/ProfilePage";
import AboutPage from "./components/Pages/AboutPage";
import Login from "./components/Pages/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AuthContext from "./api/authContext";
import SignUpPage from "./components/Pages/SignUpPage";

function App() {
  const { isAuthenticated, login } = useContext(AuthContext);

  const getInitialTheme = () => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDarkMode ? "dark" : "light";
  };

  const [theme, setTheme] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme);
    const token = localStorage.getItem("authToken");
    // Revalidate the authentication state
    if (token && !isAuthenticated) {
      login(token);
    }
  }, [theme, isAuthenticated, login]);

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <LoggedInLanding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/download"
          element={
            <ProtectedRoute>
              <DownloadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            // Redirect to home if logged in otherwise go to login page
            isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
