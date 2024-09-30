// const url = 'http://server.navong.xyz:4004';
const url = 'http://quote.navong.xyz/api';

export const fetchRandomQuote = async () => {
  try {
    // Changed the URL to fetch from local backend
    const response = await fetch(`${url}/quotes/random`);
    const data = await response.json();
    // Assuming the backend returns data in the same format
    // console.log(data);
    return { content: data.content, author: data.author };
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};
