import React, {useEffect,useState} from 'react';
import './App.css';
// import styled from 'styled-components';
import DefaultLanding from './components/DefaultLanding';
import '/Users/tnyamutswa/thesis/Midify Frontend/midify/src/themes.css';
import LoggedInLanding from './components/LoggedInLandingPage';
import UploadPage from './components/UploadPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HistoryPage from './components/HistoryPage';
import DownloadPage from './components/DownloadPage';
import GlobalStyle from './GlobalStyles'; // Import global styles
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';




function App() {
  const getInitialTheme = () => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Set the initial theme based on device preference
    document.documentElement.setAttribute('data-theme', theme);
  
    // Listen for changes to the system color scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    };
  
    mediaQuery.addEventListener('change', handleChange);
  
    // Clean up the event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  

  return (
    <Router>
      {/* The Header is placed outside Routes so it appears on all pages */}
      {/* <Header /> */}
      <GlobalStyle />
      <Routes>
        {/* Define routes for each page */}
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/login" element={<DefaultLanding />} />
        <Route path="/home" element={<LoggedInLanding />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/download" element={<DownloadPage />} /> {/* Optional download route */}
      </Routes>
    </Router>
  );
}

export default App;
