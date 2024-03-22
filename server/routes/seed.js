const express = require('express');
const router = express.Router();

// Import Models
const State = require('../models/state');
const User = require('../models/user');

// Import data
const STATES = require('../data/states');
const USERS = require('../data/users');

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
    return STATES;
}

router.get('/', async (req, res) => {
    await State.deleteMany({});
    await State.create(addAverage());

    await User.deleteMany({});
    await User.create(USERS);
    res.json({ message: 'Database seeded' });
});

module.exports = router;
