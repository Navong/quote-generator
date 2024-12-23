const express = require('express');
const quoteRoutes = require('./routes/quoteRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');

const app = express();

app.use(express.json());
app.use('/api/quotes', quoteRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use(errorHandler);

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
