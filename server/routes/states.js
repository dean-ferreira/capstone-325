const express = require('express');
const router = express.Router();
const State = require('../models/state');

// Get All States
router.get('/', async (req, res) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get x number of states with the lowest average price
router.get('/lowest/:num', async (req, res) => {
    try {
        const states = await State.find()
            .sort({ average: 1 })
            .limit(parseInt(req.params.num));
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get x number of states with the highest average price
router.get('/highest/:num', async (req, res) => {
    try {
        const states = await State.find()
            .sort({ average: -1 })
            .limit(parseInt(req.params.num));
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
