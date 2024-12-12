const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

//json
app.use(express.json());

//cors
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Get all quotes
app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a random quote
app.get('/api/quotes/random', async (req, res) => {
  try {
    const quotesCount = await prisma.quote.count();
    const skip = Math.floor(Math.random() * quotesCount);
    const randomQuote = await prisma.quote.findFirst({
      skip: skip,
    });
    
    if (!randomQuote) {
      return res.status(404).json({ message: 'No quotes found' });
    }
    
    res.status(200).json(randomQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all favorite quotes
app.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      include: { quote: true },
    });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a quote to favorites
app.post('/api/favorites', async (req, res) => {
  const { userId, quoteId } = req.body;
  console.log('Received request:', { userId, quoteId });

  try {
    // Validate input
    if (!userId || !quoteId) {
      return res.status(400).json({ message: 'userId and quoteId are required' });
    }

    // Ensure quoteId is a string
    const quoteIdString = String(quoteId);

    // Check if the quote exists
    const quoteExists = await prisma.quote.findUnique({
      where: { id: quoteIdString },
    });
    if (!quoteExists) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        quoteId: quoteIdString,
      },
      include: { quote: true },
    });

    console.log('Created favorite', quoteId);
    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error creating favorite:', error);
    res.status(500).json({ message: error.message });
  }
});

// Remove a quote from favorites
app.delete('/api/favorites/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log('Attempting to delete favorite with id:', id);
    const favorite = await prisma.favorite.findUnique({
      where: { id: id },
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    await prisma.favorite.delete({
      where: { id: id },
    });
    console.log('Successfully deleted favorite with id:', id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


