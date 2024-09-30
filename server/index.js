const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

//json
app.use(express.json());


//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


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


// Start server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


