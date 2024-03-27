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

// Get a State by ID
router.get('/:id', getState, (req, res) => {
    res.json(res.state);
});

// Middleware to get a state by ID
async function getState(req, res, next) {
    let state;
    try {
        state = await State.findById(req.params.id);
        if (state == null) {
            return res.status(404).json({ message: 'State not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.state = state;
    next();
}

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
