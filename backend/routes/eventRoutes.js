// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Import the multer upload middleware
const Event = require('../models/Event');
const Committee=require('../models/Committee')
const User=require('../models/User')

router.post('/book-event', async (req, res) => {
    const { eventId, userid } = req.body;
    console.log('Booking request:', { eventId, userid });

    try {
        // Find the event and check if it exists and has capacity
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.capacity <= 0) {
            return res.status(400).json({ message: 'No capacity left for this event' });
        }
        
        // Reduce capacity and save updated event
        event.capacity -= 1;
        await event.save();

        // Find user and add event to attendedEvents
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.attendedEvents.push(eventId);
        await user.save();

        res.json({ message: 'Event booked successfully!' });
    } catch (error) {
        console.error('Error booking event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route to create a new event
router.post('/create', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), async (req, res) => {
    try {
        // Extract form fields from the request body
        const { name, description, dateFrom, dateTo, timeFrom, timeTo, location, category ,committeeId,capacity} = req.body;

        // Get image file paths
        const image1Path = req.files.image1 ? req.files.image1[0].path : null;
        const image2Path = req.files.image2 ? req.files.image2[0].path : null;

        // Create a new event document
        const event = new Event({
            name,
            description,
            dateFrom,
            dateTo,
            timeFrom,
            timeTo,
            location,
            category,
            image1: image1Path,
            image2: image2Path,
            committee:committeeId,
            capacity,
        });
        // Optionally update the committee with the new event
        await Committee.findByIdAndUpdate(committeeId, {
            $push: { events: event._id }
        });

        // Save the event to the database
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating event', error });
    }
});

// Endpoint to get events
router.get('/get-events', async (req, res) => {
    try {
        const events = await Event.find();
        const baseUrl = `${req.protocol}://${req.get('host')}/`; // Get the base URL of the server

        // Map through events to update image paths
        const formattedEvents = events.map(event => {
            return {
                ...event.toObject(),
                image1: `${baseUrl}${event.image1.replace(/\\/g, '/')}`, // Replace backslashes with slashes
                image2: `${baseUrl}${event.image2.replace(/\\/g, '/')}`
            };
        });

        res.json(formattedEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// GET event by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the event ID from the route parameters
        const event = await Event.findById(id); // Find the event by ID

        if (!event) {
            return res.status(404).json({ message: "Event not found" }); // Handle not found case
        }

        const baseUrl = `${req.protocol}://${req.get('host')}/`; // Get the base URL of the server

        // Format the event data
        const formattedEvent = {
            ...event.toObject(),
            image1: `${baseUrl}${event.image1.replace(/\\/g, '/')}`, // Replace backslashes with slashes
            image2: `${baseUrl}${event.image2.replace(/\\/g, '/')}`
        };

        res.json(formattedEvent); // Send the formatted event
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
