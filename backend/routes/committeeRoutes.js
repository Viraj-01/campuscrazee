// routes/committeeRoutes.js
const express = require('express');
const router = express.Router();
const committeeController = require('../controllers/committeeController');
const Committee = require('../models/Committee');

// Route to create a new committee
router.post('/create', committeeController.createCommittee);

// Route to delete a committee by ID
router.delete('/delete/:collegeId/:committeeId', committeeController.deleteCommittee);

// Get committee ID by username (committee name)
router.get('/by-username/:username', async (req, res) => {
    try {
        const committee = await Committee.findOne({ name: req.params.username }); // Find by committee name
        if (!committee) {
            return res.status(404).json({ message: 'Committee not found' });
        }
        res.status(200).json({ committeeId: committee._id }); // Respond with the committee ID
    } catch (error) {
        console.error('Error finding committee by username:', error);
        res.status(500).json({ error: 'Failed to find committee' });
    }
});


module.exports = router;
