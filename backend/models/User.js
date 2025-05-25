// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['main_admin', 'college_head', 'committee_head', 'normal_user'],
  },
  course: { type: String },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' }, // Reference to College model
  committees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }], // Array of committee references
  eventsAttended: [
    {
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Reference to Event model
      bookingDate: { type: Date, default: Date.now },
    },
  ],
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
