// Quote.js
import React from 'react';

const Quote = ({ quote, onFavorite, onNext, onPrevious }) => {
  return (
    <div>
      <p>{quote.text}</p>
      <p>- {quote.author}</p>
      <button onClick={onFavorite}>{quote.isFavorite ? 'Unfavorite' : 'Favorite'}</button>
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Quote;