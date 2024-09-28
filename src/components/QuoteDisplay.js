import React, { useState, useEffect } from 'react';
import { fetchRandomQuote } from './fetchRandomQuote';

function QuoteDisplay({ currentQuote, setCurrentQuote }) {
  useEffect(() => {
    if (!currentQuote) {
      fetchNewQuote();
    }
  }, [currentQuote]);

  const fetchNewQuote = async () => {
    const newQuote = await fetchRandomQuote();
    setCurrentQuote(newQuote);
  };

  if (!currentQuote) return <div>Loading...</div>;

  const addToFavorites = (quote) => {
    alert('Under Development 🧑‍💻');
  };

  return (
    <div>
      <p className="quote-content">{currentQuote.content}</p>
      <p className="quote-author">- {currentQuote.author}</p>
      <button onClick={() => addToFavorites(currentQuote)}>
        Save to Favorites
      </button>
      <button onClick={fetchNewQuote}>New Quote</button>
    </div>
  );
}

export default QuoteDisplay;
