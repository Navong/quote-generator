import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';

const Favorites = () => {
  const { isDarkMode } = useTheme();
  const { favorites, removeFavorite } = useFavorites();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const toggleFavorite = () => {
    const quoteId = favorites[currentQuoteIndex].id;
    removeFavorite(quoteId);
    if (currentQuoteIndex >= favorites.length - 1) {
      setCurrentQuoteIndex(Math.max(favorites.length - 2, 0));
    }
  };

  const goToPrevious = () => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : favorites.length - 1
    );
  };

  const goToNext = () => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex < favorites.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentQuote = favorites[currentQuoteIndex];

  return (
    <div
      className={`container mx-auto px-4 py-8 flex-grow ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'}`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favorite Quotes</h1>
      {favorites.length === 0 ? (
        <p className="text-lg text-center">You haven&apos;t added any favorites yet.</p>
      ) : (
        <>
          <div
            className={`rounded-lg p-6 mb-8 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}
          >
            <p className="text-xl mb-4 text-center">{currentQuote.text}</p>
            <p className="text-right text-lg">- {currentQuote.author}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <button
              onClick={goToPrevious}
              className={`flex items-center justify-center w-full py-3 rounded-lg ${
                isDarkMode
                  ? 'bg-green-400 text-slate-800'
                  : 'bg-green-600 text-white'
              }`}
            >
              <ChevronLeft className="mr-2" size={20} />
              Previous
            </button>
            <button
              onClick={goToNext}
              className={`flex items-center justify-center w-full py-3 rounded-lg ${
                isDarkMode
                  ? 'bg-green-400 text-slate-800'
                  : 'bg-green-600 text-white'
              }`}
            >
              Next
              <ChevronRight className="ml-2" size={20} />
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={toggleFavorite}
              className={`flex items-center justify-center w-full max-w-md py-3 rounded-lg bg-yellow-400 text-slate-800`}
            >
              <Star className="mr-2" size={20} fill="black" />
              Remove from Favorites
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
