const express = require('express');
const router = express.Router();

// Import Models
const State = require('../models/state');

// Import data
const STATES = require('../data/states');

// Add average property to each state
function addAverage() {
    STATES.forEach((state) => {
        state.average =
            (parseFloat(state.diesel) +
                parseFloat(state.gasoline) +
                parseFloat(state.midGrade) +
                parseFloat(state.premium)) /
            4;
    });
    console.log(STATES);
    return STATES;
}

router.get('/', async (req, res) => {
    await State.deleteMany({});
    await State.create(addAverage());
    res.json({ message: 'Database seeded' });
});

module.exports = router;
