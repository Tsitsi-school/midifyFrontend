import React, { useEffect, useState } from 'react';
import '../pageStyles.css'; // Your theme styles (defines light and dark modes)

const ThemeSwitcher = () => {
  // Set initial theme from localStorage or default to light
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', theme);
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="theme-switcher-container">
      <label className="switch">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === 'dark'}
        />
        <span className="slider"></span>
      </label>
      {/* <p>{theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}</p> */}
    </div>
  );
};

export default ThemeSwitcher;
