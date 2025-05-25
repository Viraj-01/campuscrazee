// controllers/eventController.js
const Event = require('../models/Event');
const Committee = require('../models/Committee');

exports.createEvent = async (req, res) => {
  try {
    const { name, date, location, description, collegeId, committeeId } = req.body;

    const event = new Event({
      name,
      date,
      location,
      description,
      college: collegeId,
      committee: committeeId
    });

    await event.save();

    // Push the event ID to the committee's events array
    await Committee.findByIdAndUpdate(committeeId, {
      $push: { events: event._id }
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { eventId, committeeId } = req.params;

    // Remove the event from the events collection
    await Event.findByIdAndDelete(eventId);

    // Remove the event ID from the committee's events array
    await Committee.findByIdAndUpdate(committeeId, {
      $pull: { events: eventId }
    });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
