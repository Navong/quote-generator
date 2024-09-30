// QuoteList.js
import React from 'react';

const QuoteList = ({ quotes }) => {
  return (
    <div>
      {quotes.map((quote) => (
        <div key={quote.id}>
          <p>{quote.text}</p>
          <p>- {quote.author}</p>
        </div>
      ))}
    </div>
  );
};

export default QuoteList;