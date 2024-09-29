import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/favorites', label: 'Favorites' },
    { path: '/search', label: 'Search' },
  ];

  return (
    <div
      className={`p-4 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'}`}
    >
      <div className="flex justify-between mb-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-xl ${
              location.pathname === item.path
                ? isDarkMode
                  ? 'text-green-400'
                  : 'text-green-600'
                : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={toggleTheme}
          className={`rounded-full p-2 ${isDarkMode ? 'bg-green-400' : 'bg-green-600'}`}
        >
          {isDarkMode ? (
            <Sun className="text-slate-800" size={24} />
          ) : (
            <Moon className="text-white" size={24} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
