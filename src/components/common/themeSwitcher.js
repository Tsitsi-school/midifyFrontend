import React, {useEffect, useState} from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
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
        </div>
    );
};

export default ThemeSwitcher;
