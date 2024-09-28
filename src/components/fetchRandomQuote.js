export const fetchRandomQuote = async () => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random quote:', error);
    return null;
  }
};
