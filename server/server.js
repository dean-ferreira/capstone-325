// Import required modules
const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// Import Models
const State = require('./models/state');

// Import data
const STATES = require('./data/states');

// Create express app
const app = express();
const PORT = process.env.PORT || 3000; // Set port

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Routers
const statesRouter = require('./routes/states');

// Middleware
app.use(express.json());

// Use routers
app.use('/states', statesRouter);

// Routes
app.get('/seed', async (req, res) => {
    await State.deleteMany({});
    await State.create(STATES);
    res.json({ message: 'Database seeded' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
