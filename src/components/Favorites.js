import React from 'react';

const Favorites = ({ favoriteQuotes, darkMode, onRemoveFavorite }) => {
  return (
    <div className="favorites-container">
      <h1 className="text-center text-xl sm:text-2xl mb-4 sm:mb-6 font-semibold">
        Favorite Quotes
      </h1>
      {favoriteQuotes.length > 0 ? (
        <ul className="favorites-list">
          {favoriteQuotes.map((fav) => (
            <FavoriteQuote
              key={fav.id}
              favorite={fav}
              darkMode={darkMode}
              onRemoveFavorite={onRemoveFavorite}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No favorite quotes yet. Start adding some!
        </p>
      )}
    </div>
  );
};

const FavoriteQuote = ({ favorite, darkMode, onRemoveFavorite }) => {
  const { quote, id } = favorite;

  // Check if quote exists before rendering
  if (!quote) {
    return null; // Or you could return a placeholder or error message
  }

  return (
    <li className="mb-4 pb-4 border-b last:border-b-0">
      <blockquote className="text-center text-base sm:text-lg mb-2">
        "{quote.content || 'No content available'}"
      </blockquote>
      <p className={`text-center text-xs sm:text-sm mb-2 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        - {quote.author || 'Unknown author'}
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => onRemoveFavorite(id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm transition-colors duration-300"
          aria-label={`Remove ${quote.author || 'Unknown author'}'s quote from favorites`}
        >
          ★ Unstar
        </button>
      </div>
    </li>
  );
};

export default Favorites;
