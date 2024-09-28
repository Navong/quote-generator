import { useState } from 'react';
import '../styles/main.scss';

const fetchQuotesBySearch = async (query) => {
  try {
    const q = 'technology';
    const response = await fetch(
      `https://api.quotable.io/search/quotes?tags=${q}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

const SearchQuotes = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      // const searchResults = await fetchQuotesBySearch(query);
      // setResults(searchResults);
      alert('Under Development 🧑‍💻');
    } catch (error) {
      console.error('Error searching quotes:', error);
      setResults([]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-btn">
        Search
      </button>
      {results.length > 0 ? (
        <ul>
          {results.map((quote) => (
            <li key={quote._id}>
              {quote.content} - {quote.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchQuotes;
