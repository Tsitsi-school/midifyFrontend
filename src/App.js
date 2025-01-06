import React, {useEffect,useState, useContext} from 'react';
import './App.css';
// import styled from 'styled-components';
import DefaultLanding from './components/Pages/DefaultLanding';
import '/Users/tnyamutswa/thesis/Midify Frontend/midify/src/themes.css';
import LoggedInLanding from './components/Pages/LoggedInLandingPage';
import UploadPage from './components/Pages/UploadPage';
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import HistoryPage from './components/Pages/HistoryPage';
import DownloadPage from './components/Pages/DownloadPage';
import GlobalStyle from './GlobalStyles'; 
import ProfilePage from './components/Pages/ProfilePage';
import AboutPage from './components/Pages/AboutPage';
import Login from './components/Pages/Login';
import ProtectedRoute from './components/common/ProtectedRoute';
import AuthContext from './api/authContext';

function App() {
  const { isAuthenticated, login } = useContext(AuthContext);

  const getInitialTheme = () => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Set the initial theme based on device preference
    // document.documentElement.setAttribute('data-theme', theme);
  
    // // Listen for changes to the system color scheme
    // const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // const handleChange = () => {
    //   setTheme(mediaQuery.matches ? 'dark' : 'light');
    // };
  
    // mediaQuery.addEventListener('change', handleChange);

    const token = localStorage.getItem('authToken');
    if (token && !isAuthenticated) {
      login(token); // Revalidate the authentication state
    }


  
    // // Clean up the event listener on component unmount
    // return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, isAuthenticated,login]);
  
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
                <LoggedInLanding />
            </ProtectedRoute>
          }
        />
        <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
        <Route path="/download" element={<ProtectedRoute><DownloadPage /></ProtectedRoute>} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" /> // Redirect to home if logged in
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );

  // return (
  //   <Router>
  //     {/* The Header is placed outside Routes so it appears on all pages */}
  //     {/* <Header /> */}
  //     <GlobalStyle />
  //     <Routes>
  //       {/* Define routes for each page */}
  //       <Route path="/upload" element={<UploadPage />} />
  //       <Route path="/login" element={<DefaultLanding />} />
  //       <Route path="/home" element={<LoggedInLanding />} />
  //       <Route path="/history" element={<HistoryPage />} />
  //       <Route path="/profile" element={<ProfilePage />} />
  //       <Route path="/about" element={<AboutPage />} />
  //       <Route path="/download" element={<DownloadPage />} /> {/* Optional download route */}
  //     </Routes>
  //   </Router>
  // );
}

export default App;
