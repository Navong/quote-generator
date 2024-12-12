import React, { useState, useEffect } from 'react';
import '../QuotePage.css'; // We'll create this CSS file for transitions
import quoteApi from '../api/quoteApi'
import Favorites from './Favorites';

const QuotePage = ({ darkMode, toggleDarkMode, user, onLogout }) => {
  const [quote, setQuote] = useState(null);
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Warm-up request
  const warmUpApi = async () => {
    try {
      await quoteApi.getQuotes(); // Dummy call to ensure API is responsive
      console.log('API warmed up successfully');
    } catch (error) {
      console.error('Failed to warm up API:', error);
    }
  };

  const fetchQuote = async () => {
    setIsTransitioning(true);
    setIsLoading(true);
    try {
      const data = await quoteApi.getQuotes();
      if (data && typeof data === 'object') {
        setTimeout(() => {
          setQuote(data); // Remove the isFavorite property here
          setIsTransitioning(false);
          setIsLoading(false);
        }, 500);
      } else {
        throw new Error('Invalid quote data');
      }
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      setQuote(null);
      setIsTransitioning(false);
      setIsLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (quote) {
      const newFavoriteStatus = !quote.isFavorite;
      try {
        if (newFavoriteStatus) {
          const newFavorite = await quoteApi.addFavorite(quote);
          setFavoriteQuotes(prev => [...prev, newFavorite]);
        } else {
          const favoriteToRemove = favoriteQuotes.find(fav => fav.quote.id === quote.id);
          if (favoriteToRemove) {
            await quoteApi.removeFavorite(favoriteToRemove.id);
            setFavoriteQuotes(prev => prev.filter(fav => fav.id !== favoriteToRemove.id));
          }
        }
        setQuote(prevQuote => ({ ...prevQuote, isFavorite: newFavoriteStatus }));
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };

  const fetchFavorites = async () => {
    try {
      const favorites = await quoteApi.getFavorites();
      setFavoriteQuotes(favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    // Trigger warm-up request before fetching data
    warmUpApi();

    fetchQuote();
    fetchFavorites();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // New useEffect to handle isFavorite property
  useEffect(() => {
    if (quote && favoriteQuotes.length > 0) {
      const isFavorite = favoriteQuotes.some(fav => fav.quote.id === quote.id);
      if (isFavorite !== quote.isFavorite) {
        setQuote(prevQuote => ({ ...prevQuote, isFavorite }));
      }
    }
  }, [quote, favoriteQuotes]);

  const toggleFavoritesList = () => {
    setShowFavorites(prev => !prev);
  };

  const removeFavorite = async (id) => {
    try {
      await quoteApi.removeFavorite(id);
      setFavoriteQuotes(prevFavorites => prevFavorites.filter(fav => fav.id !== id));
      if (quote && quote.id === id) {
        setQuote(prevQuote => ({ ...prevQuote, isFavorite: false }));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <header className="fixed top-0 left-0 right-0 bg-opacity-90 backdrop-filter backdrop-blur-sm p-4 flex flex-col sm:flex-row justify-between items-center transition-all duration-300 shadow-md">
        <div className="flex items-center mb-2 sm:mb-0">
          <span className={`text-lg font-semibold transition-colors duration-300 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{formattedTime}</span>
          <span className={`ml-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Welcome, {user.username}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-yellow-400'}`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleFavoritesList}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
          >
            {showFavorites ? 'Current Quote' : 'Favorites'}
          </button>
          <button
            onClick={onLogout}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
          >
            Logout
          </button>
        </div>
      </header>

      <div className={`w-full max-w-md rounded-lg p-6 mt-24 sm:mt-20 transition-all duration-300 shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        {showFavorites ? (
          <Favorites
            favoriteQuotes={favoriteQuotes}
            darkMode={darkMode}
            onRemoveFavorite={removeFavorite}
          />
        ) : isLoading ? (
          <div className="text-center">
            <p className={`text-lg ${isTransitioning ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
              Loading quote...
            </p>
          </div>
        ) : quote ? (
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <h1 className="text-center text-xl sm:text-2xl mb-4 sm:mb-6 font-semibold">
              Quote of the Moment
            </h1>
            <p className="text-center text-base sm:text-lg mb-4 sm:mb-6">{quote.content}</p>
            <p className={`text-center text-xs sm:text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>- {quote.author}</p>
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mt-6">
              <button onClick={toggleFavorite} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto transition-colors duration-300">
                {quote.isFavorite ? '★ UNFAVORITE' : '☆ FAVORITE'}
              </button>
              <button onClick={fetchQuote} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto transition-colors duration-300">NEXT QUOTE</button>
            </div>
          </div>
        ) : (
          <p className="text-center text-base sm:text-lg mb-4 sm:mb-6">No quote available.</p>
        )}
      </div>
    </div>
  );
};

export default QuotePage;
