import React, { useState, useEffect } from 'react';
import { fetchRandomQuote } from './fetchRandomQuote';

function QuoteDisplay({ currentQuote, setCurrentQuote }) {
  const [isLoading, setIsLoading] = useState(!currentQuote);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentQuote) {
      fetchNewQuote();
    }
  }, []);

  const fetchNewQuote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newQuote = await fetchRandomQuote();
      setCurrentQuote(newQuote);
    } catch (err) {
      console.error('Error in QuoteDisplay:', err);
      setError(
        err.message || 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchNewQuote}>Try Again</button>
      </div>
    );
  if (!currentQuote) return <div>No quote available. Please try again.</div>;

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
