// models/Committee.js
const mongoose = require('mongoose');

const CommitteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  description: { type: String },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  users: [{ // Array to reference users with their role in this committee
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['committee_head', 'normal_user'], required: true },
  }],
});

// Export the Committee model
module.exports = mongoose.model('Committee', CommitteeSchema);
