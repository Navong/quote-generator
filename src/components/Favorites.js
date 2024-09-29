import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { motion } from 'framer-motion';

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

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

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
            <motion.button
              onClick={goToPrevious}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`flex items-center justify-center w-full py-3 rounded-lg transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-green-400 text-slate-800 hover:bg-green-500'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <ChevronLeft className="mr-2" size={20} />
              Previous
            </motion.button>
            <motion.button
              onClick={goToNext}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`flex items-center justify-center w-full py-3 rounded-lg transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-green-400 text-slate-800 hover:bg-green-500'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Next
              <ChevronRight className="ml-2" size={20} />
            </motion.button>
          </div>

          <div className="flex justify-center">
            <motion.button
              onClick={toggleFavorite}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`flex items-center justify-center w-full max-w-md py-3 rounded-lg transition-colors duration-300 bg-yellow-400 text-slate-800 hover:bg-yellow-500`}
            >
              <Star className="mr-2" size={20} fill="black" />
              Remove from Favorites
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
