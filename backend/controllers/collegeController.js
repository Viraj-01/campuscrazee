// controllers/collegeController.js
const College = require('../models/College');

// Delete a college by ID
exports.deleteCollege = async (req, res) => {
    try {
      const { id } = req.params;
      const college = await College.findByIdAndDelete(id);
  
      if (!college) {
        return res.status(404).json({ message: 'College not found' });
      }
  
      res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
exports.addCollege = async (req, res) => {
    try {
      const { name, location } = req.body;
      const college = new College({ name, location });
      await college.save();
      res.status(201).json({ message: 'College added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getAllColleges = async (req, res) => {
    try {
      const colleges = await College.find();
      res.status(200).json(colleges);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Optional: Add more functions to manage colleges (e.g., getAllColleges, getCollegeById, etc.)
