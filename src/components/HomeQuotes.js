import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';

const HomeQuotes = () => {
  const { isDarkMode } = useTheme();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      text: 'To be or not to be, that is the question.',
      author: 'William Shakespeare',
    },
    {
      id: 2,
      text: 'I think, therefore I am.',
      author: 'René Descartes',
    },
    {
      id: 3,
      text: 'Stay hungry, stay foolish.',
      author: 'Steve Jobs',
    },
  ]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Update quotes when favorites change
  useEffect(() => {
    setQuotes(prevQuotes =>
      prevQuotes.map(quote => ({
        ...quote,
        isFavorite: favorites.some(fav => fav.id === quote.id)
      }))
    );
  }, [favorites]);

  const toggleFavorite = () => {
    const quote = quotes[currentQuoteIndex];
    if (quote.isFavorite) {
      removeFavorite(quote.id);
    } else {
      addFavorite(quote);
    }
  };

  const goToPrevious = () => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : quotes.length - 1
    );
  };

  const goToNext = () => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex < quotes.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div
      className={`p-4 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'}`}
    >
      <div
        className={`rounded-lg p-6 mb-8 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}
      >
        <p className="text-xl mb-4">{currentQuote.text}</p>
        <p className="text-right">- {currentQuote.author}</p>
      </div>

      <div className="flex justify-between gap-4 mb-4">
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
          className={`flex items-center justify-center w-full py-3 rounded-lg ${
            currentQuote.isFavorite
              ? 'bg-yellow-400 text-slate-800'
              : isDarkMode
                ? 'bg-green-400 text-slate-800'
                : 'bg-green-600 text-white'
          }`}
        >
          <Star
            className="mr-2"
            size={20}
            fill={currentQuote.isFavorite ? 'black' : 'none'}
          />
          {currentQuote.isFavorite
            ? 'Remove from Favorites'
            : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default HomeQuotes;
