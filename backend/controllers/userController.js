// controllers/userController.js
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

exports.addCollegeHead = async (req, res) => {
  try {
    const { username, email, password, college } = req.body; // Include college in the request body
    const hashedPassword = await bcryptjs.hash(password, 10);
    const collegeHead = new User({
      username,
      email,
      password: hashedPassword,
      role: 'college_head',
      college // Include college reference
    });
    await collegeHead.save();
    res.status(201).json({ message: 'College Head created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCommitteeHead = async (req, res) => {
  try {
    const { username, email, password, college } = req.body; // Include college in the request body
    const hashedPassword = await bcryptjs.hash(password, 10);
    const committeeHead = new User({
      username,
      email,
      password: hashedPassword,
      role: 'committee_head',
      college // Include college reference
    });
    await committeeHead.save();
    res.status(201).json({ message: 'Committee Head created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const normalUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'normal_user',
    });
    await normalUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
