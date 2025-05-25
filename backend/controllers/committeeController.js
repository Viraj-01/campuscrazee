// controllers/committeeController.js
const Committee = require('../models/Committee');
const College = require('../models/College');

// Create a new committee
exports.createCommittee = async (req, res) => {
  try {
    const { name, collegeId, description } = req.body;

    // Ensure the college exists
    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    // Create a new committee linked to the college
    const committee = new Committee({
      name,
      college: collegeId,
      description
    });
    await committee.save();
    // Add the committee to the college's committees array
    await College.findByIdAndUpdate(collegeId, {
        $push: { committees: committee._id }
    });

    res.status(201).json({ message: 'Committee created successfully', committee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a committee by ID
exports.deleteCommittee = async (req, res) => {
    try {
      const { committeeId, collegeId } = req.params;
  
      // Remove the committee
      const deletedCommittee = await Committee.findByIdAndDelete(committeeId);
      if (!deletedCommittee) {
        return res.status(404).json({ message: 'Committee not found' });
      }
  
      // Remove the committee ID from the college's committees array
      await College.findByIdAndUpdate(collegeId, {
        $pull: { committees: committeeId }
      });
  
      res.status(200).json({ message: 'Committee deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };