// routes/eventBookingRoutes.js
const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// POST /api/book-event
router.post('/book-event', async (req, res) => {
    const { eventId, userId } = req.body;

    try {
        // Find the event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if there is enough capacity
        if (event.capacity <= 0) {
            return res.status(400).json({ message: 'No capacity available' });
        }

        // Update the user to include the attended event
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.eventsAttended.push({ eventId });
        await user.save();

        // Reduce the event capacity by 1
        event.capacity -= 1;
        await event.save();

        res.status(201).json({ message: 'Event booked successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error booking event', error });
    }
});

module.exports = router;
