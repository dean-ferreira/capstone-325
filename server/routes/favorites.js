const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');
const State = require('../models/state');

// Get All Favorites
router.get('/', async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Favorites for a User
router.get('/user/:id', async (req, res) => {
    try {
        const favorites = await Favorite.find({ user_id: req.params.id });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a Favorite
router.post('/', async (req, res) => {
    const favorite = new Favorite({
        state_id: req.body.state_id,
        user_id: req.body.user_id,
    });

    try {
        const newFavorite = await favorite.save();
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a Favorite by State ID
router.delete('/:id', async (req, res) => {
    try {
        await Favorite.findOneAndDelete({ state_id: req.params.id });
        res.json({ message: 'Favorite has been deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
