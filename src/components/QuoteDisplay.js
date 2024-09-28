import React, { useState, useEffect } from 'react';
import { fetchRandomQuote } from './fetchRandomQuote';

const QuoteDisplay = ({ addToFavorites }) => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    fetchRandomQuote().then(setQuote);
  }, []);

  const handleNewQuote = () => {
    fetchRandomQuote().then(setQuote);
  };

  return (
    <div>
      <p className="quote-content">{quote.content}</p>
      <p className="quote-author">- {quote.author}</p>
      <button onClick={() => addToFavorites(quote)}>Save to Favorites</button>
      <button onClick={handleNewQuote}>New Quote</button>
    </div>
  );
};

export default QuoteDisplay;
