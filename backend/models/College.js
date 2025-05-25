// models/College.js
const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  committees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Committee' }],
  createdAt: { type: Date, default: Date.now },
  users: [{ // Array to reference users with their role in this college
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['college_head', 'normal_user'], required: true },
  }],
});

// Export the College model
module.exports = mongoose.model('College', CollegeSchema);
