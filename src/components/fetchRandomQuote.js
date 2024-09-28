export const fetchRandomQuote = async () => {
  try {
    const response = await fetch('https://api.quotable.io/random', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { content: data.content, author: data.author };
  } catch (error) {
    console.error('Detailed fetch error:', error);
    if (error.name === 'AbortError') {
      throw new Error(
        'Request timed out. Please check your internet connection and try again.'
      );
    } else if (error instanceof TypeError) {
      throw new Error(
        'Network error. Please check your internet connection and try again.'
      );
    } else {
      throw new Error(`Failed to fetch quote: ${error.message}`);
    }
  }
};
