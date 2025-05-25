// routes/userRoutes.js
const express = require('express');
const { addCollegeHead, addCommitteeHead, registerUser } = require('../controllers/userController');
const router = express.Router();

router.post('/add-college-head', addCollegeHead);
router.post('/add-committee-head', addCommitteeHead);
router.post('/register', registerUser);

module.exports = router;
