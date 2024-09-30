const API_URL = process.env.REACT_APP_API_URL;


const quoteApi = {
    getQuotes: async () => {
      try {
        // const response = await fetch('http://quote.navong.xyz/api/quotes/random');
        //   const response = await fetch('http://localhost:4000/api/quotes/random');
          const response = await fetch(`${API_URL}/api/quotes/random`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    addFavorite: async (quote) => {
      try {
        const favoriteData = {
          userId: 'user123', // Replace with actual user ID from authentication
          quoteId: quote.id,
        };

        const response = await fetch(`${API_URL}/api/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(favoriteData),
        });
        if (!response.ok) {
          throw new Error('Failed to add favorite');
        }
        const savedFavorite = await response.json();
        return { ...savedFavorite, quote };
      } catch (error) {
        console.error('Error adding favorite:', error);
        // Fallback to local storage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const newFavorite = {
          id: Date.now().toString(),
          userId: 'user123', // Replace with actual user ID from authentication
          quoteId: quote.id,
          createdAt: new Date().toISOString(),
          quote,
        };
        favorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return newFavorite;
      }
    },
    removeFavorite: async (id) => {
      try {
        const response = await fetch(`${API_URL}/api/favorites/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to remove favorite');
        }
        return await response.json();
      } catch (error) {
        console.error('Error removing favorite:', error);
        // Fallback to local storage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const updatedFavorites = favorites.filter(fav => fav.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return { id };
      }
    },
    getFavorites: async () => {
      try {
        const response = await fetch(`${API_URL}/api/favorites`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication header if required
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching favorites:', error);
        // Fallback to local storage
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites;
      }
    },
  };
  
  export default quoteApi;