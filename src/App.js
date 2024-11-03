import React, {useEffect,useState} from 'react';
import './App.css';
// import styled from 'styled-components';
import DefaultLanding from './components/DefaultLanding';
import '/Users/tnyamutswa/thesis/Midify Frontend/midify/src/themes.css';
import LoggedInLanding from './components/LoggedInLandingPage';



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
    <div> 
      <LoggedInLanding />
    </div>
      
    );
}

export default App;
