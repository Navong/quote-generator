const { getFavoritesByUser, addFavorite } = require('../services/favoriteService');

const getFavoritesByUserHandler = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const favorites = await getFavoritesByUser(userId);
        res.status(200).json(favorites);
    } catch (error) {
        next(error);
    }
};

const addFavoriteHandler = async (req, res, next) => {
    try {
        const favoriteData = req.body;
        const favorite = await addFavorite(favoriteData);
        res.status(201).json(favorite);
    } catch (error) {
        next(error);
    }
};

const getTopFavoritesHandler = async (req, res, next) => {
    try {
        const topFavorites = await getTopFavorites();
        res.status(200).json(topFavorites);
    } catch (error) {
        next(error);
    }
};



module.exports = { getFavoritesByUserHandler, addFavoriteHandler, getTopFavoritesHandler };
