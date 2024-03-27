const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Get All Orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Orders for a User
router.get('/user/:id', async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.params.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add an Order
router.post('/', async (req, res) => {
    const order = new Order({
        date: Date.now(),
        user_id: req.body.user_id,
        state: req.body.state,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
        total: req.body.total,
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an Order
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order has been deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
