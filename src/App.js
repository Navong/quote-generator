import './styles/main.scss';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import { FavoriteQuotesProvider } from './contexts/FavoriteQuotesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import QuoteDisplay from './components/QuoteDisplay';
import FavoriteQuotes from './components/FavoriteQuotes';
import SearchQuotes from './components/SearchQuotes';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [currentQuote, setCurrentQuote] = useState(null);

  return (
    <ThemeProvider>
      <FavoriteQuotesProvider>
        <Router>
          <div className="app">
            <header className="header">
              <div className="header-content">
                <nav className="nav">
                  <ul className="nav__list">
                    <li className="nav__item">
                      <NavLink to="/" className="nav__link" end>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink to="/favorites" className="nav__link">
                        Favorites
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink to="/search" className="nav__link">
                        Search
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <ThemeToggle />
              </div>
            </header>
            <main className="main">
              <div className="container">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <QuoteDisplay
                        currentQuote={currentQuote}
                        setCurrentQuote={setCurrentQuote}
                      />
                    }
                  />
                  <Route path="/favorites" element={<FavoriteQuotes />} />
                  <Route path="/search" element={<SearchQuotes />} />
                </Routes>
              </div>
            </main>
          </div>
        </Router>
      </FavoriteQuotesProvider>
    </ThemeProvider>
  );
}

export default App;
