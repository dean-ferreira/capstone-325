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

module.exports = router;
