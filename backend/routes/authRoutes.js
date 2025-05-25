// backend/routes/authRoutes.js
const express = require('express');
const { register, login,checkLogin, addCommittee, getAllColleges } = require('../controllers/authController');
const { getUserData } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const { addCollege } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-college',addCollege)
router.post('/add-committee',addCommittee)
router.get('/getAllColleges',getAllColleges)
module.exports = router;
