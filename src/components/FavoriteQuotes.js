import React, { useContext, useState } from 'react';
import { FavoriteQuotesContext } from '../contexts/FavoriteQuotesContext';
import '../styles/main.scss';

const FavoriteQuotes = () => {
  const { favorites, removeFromFavorites } = useContext(FavoriteQuotesContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quotes, setQuotes] = useState([
    {
      _id: '1',
      content: 'To be or not to be, that is the question.',
      author: 'William Shakespeare',
    },
    { _id: '2', content: 'I think, therefore I am.', author: 'René Descartes' },
    { _id: '3', content: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
    {
      _id: '4',
      content:
        'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.',
      author: 'Robert Frost',
    },
  ]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentQuote = quotes[currentIndex];

  return (
    <div className="favorite-quotes">
      <h3>Favorite Quotes</h3>
      <div className="">
        <div className="quote-content">{currentQuote.content}</div>
        <div className="quote-author">{currentQuote.author}</div>
        <div className="button-container">
          <button className="nav-button" onClick={handleNext}>
            &#8592; Previous
          </button>
          <button
            className="remove-button"
            onClick={() => removeFromFavorites(currentQuote._id)}
          >
            Remove
          </button>
          <button className="nav-button" onClick={handlePrevious}>
            Next &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteQuotes;
