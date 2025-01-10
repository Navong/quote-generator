import React, { useState } from 'react';
import QuotePage from './components/QuotePage';
import LoginPage from './components/LoginPage';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState("test");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogin = (username) => {
    setUser({ username });
  };

  const handleLogout = () => {
    setUser(null);
  };


  return (
    <div className={darkMode ? 'dark' : ''}>
      <QuotePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} onLogout={handleLogout} />
    </div>
  );
};

export default App;
