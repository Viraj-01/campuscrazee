// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    timeFrom: { type: String, required: true },
    timeTo: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    capacity: { type: Number, required: true },
    committee: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Committee',require:true }]
});

module.exports = mongoose.model('Event', eventSchema,'events');
