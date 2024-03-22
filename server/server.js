// Import required modules
const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

// Create express app
const app = express();
const PORT = process.env.PORT || 3000; // Set port

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Routers
const seedRouter = require('./routes/seed');
const statesRouter = require('./routes/states');
const favoritesRouter = require('./routes/favorites');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// Use routers
app.use('/seed', seedRouter);
app.use('/states', statesRouter);
app.use('/fav', favoritesRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
