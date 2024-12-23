const express = require('express');
const { getFavoritesByUserHandler, addFavoriteHandler, getTopFavoritesHandler } = require('../controllers/favoriteController');
const router = express.Router();

router.get('/:userId', getFavoritesByUserHandler);
router.get('/top', getTopFavoritesHandler);
router.post('/', addFavoriteHandler);

module.exports = router;
