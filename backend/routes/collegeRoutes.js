const express = require('express');
const router = express.Router();
const { addCollege, getAllColleges ,deleteCollege} = require('../controllers/authController');

// Route to add a college (POST)
router.post('/add-college', addCollege);
router.get('/getAllColleges',getAllColleges)
module.exports = router;
