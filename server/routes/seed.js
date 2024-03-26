const express = require('express');
const router = express.Router();

// Import Models
const State = require('../models/state');
const User = require('../models/user');

// Import data
const STATES = require('../data/states');
const USERS = require('../data/users');

// Add average property to each state
function addAverage(stateInfo) {
    stateInfo.forEach((state) => {
        state.name = state.name.replace(/ /g, '-');
        state.average =
            (parseFloat(state.diesel) +
                parseFloat(state.gasoline) +
                parseFloat(state.midGrade) +
                parseFloat(state.premium)) /
            4;
    });
    return stateInfo;
}

async function getStatesInformation() {
    const API_KEY = process.env.API_KEY;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `${API_KEY}`,
        },
    };

    try {
        const response = await fetch(
            'https://api.collectapi.com/gasPrice/allUsaPrice',
            options
        );
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.log(error);
    }
}

router.get('/', async (req, res) => {
    await State.deleteMany({});
    const info = await getStatesInformation();
    await State.create(addAverage(info));

    await User.deleteMany({});
    await User.create(USERS);
    res.json({ message: 'Database seeded' });
});

module.exports = router;
