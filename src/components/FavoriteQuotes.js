import React, { useContext } from 'react';
import { FavoriteQuotesContext } from '../contexts/FavoriteQuotesContext';

const FavoriteQuotes = () => {
  const { favorites, removeFromFavorites } = useContext(FavoriteQuotesContext);

  return (
    <div>
      <h3>Favorite Quotes</h3>
      <ul>
        {favorites.map((quote) => (
          <li key={quote._id}>
            {quote.content} - {quote.author}
            <button onClick={() => removeFromFavorites(quote._id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteQuotes;
