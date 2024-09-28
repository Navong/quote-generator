import React, { createContext, useState } from 'react';

export const FavoriteQuotesContext = createContext();

export const FavoriteQuotesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (quote) => {
    setFavorites([...favorites, quote]);
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((quote) => quote._id !== id));
  };

  return (
    <FavoriteQuotesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteQuotesContext.Provider>
  );
};
