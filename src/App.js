import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import HomeQuotes from './components/HomeQuotes';
import Favorites from './components/Favorites';
import Search from './components/Search';
import { FavoritesProvider } from './contexts/FavoritesContext';

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomeQuotes />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </main>
            <footer className="py-4 text-center">
              <p>&copy; 2024 Quote App. All rights reserved.</p>
            </footer>
          </div>
        </Router>  
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
