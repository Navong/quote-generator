import { useState } from 'react';
import '../styles/main.scss';

const fetchQuotesBySearch = async (query) => {
  const response = await fetch(
    `https://api.quotable.io/search/quotes?query=${query}`
  );
  const data = await response.json();
  return data.results;
};

const SearchQuotes = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    fetchQuotesBySearch(query).then(setResults);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        placeholder="Enter search query"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((quote) => (
          <li key={quote._id}>
            {quote.content} - {quote.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchQuotes;
