import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [systemPreference, setSystemPreference] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      setSystemPreference(e.matches);
      document.body.className = e.matches ? 'dark-mode' : 'light-mode';
    };

    // Set initial theme based on system preference
    handleChange(mediaQuery);

    // Listen for changes in system theme preference
    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    } else {
      mediaQuery.addEventListener('change', handleChange);
    }

    return () => {
      if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      } else {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, []);

  useEffect(() => {
    // Override system preference when manually toggled
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span aria-hidden="true">{isDarkMode ? '🌙' : '☀️'}</span>
    </button>
  );
}

export default ThemeToggle;
