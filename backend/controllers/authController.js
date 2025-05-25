const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const College = require('../models/College');
const Committee = require('../models/Committee');

exports.register = async (req, res) => {
    try {
        const { username, email, college, year, course, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered with this email' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({
            username,
            email,
            college,
            year,
            course,
            role: 'normal_user',
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully', user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && await bcryptjs.compare(password, user.password)) {
            const token = jwt.sign(
                { id: user._id, username: user.username, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    college: user.college,
                    year: user.year,
                    role: user.role,
                    course: user.course
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Get user data
exports.getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error("Fetch User Data Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Check login status
exports.checkLogin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User is logged in', user: req.user });
    } catch (error) {
        console.error("Check Login Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to add a new college and a user associated with it
// Function to add a new college and a user associated with it
exports.addCollege = async (req, res) => {
    const { collegeName, location, email, password, role } = req.body;

    try {
        // Check if the college already exists
        const existingCollege = await College.findOne({ name: collegeName });
        if (existingCollege) {
            return res.status(400).json({ message: 'College already exists.' });
        }

        // Create and save the new college
        const newCollege = new College({ name: collegeName, location });
        await newCollege.save();

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create the new user associated with the college
        const newUser = new User({
            username: collegeName,
            email,
            password: hashedPassword,
            role,
            college: newCollege._id,
        });

        // Attempt to save the user and check if the save was successful
        try {
            await newUser.save();
            console.log('User successfully saved:', newUser); // Debug log for confirmation
        } catch (userSaveError) {
            console.error('Error saving user:', userSaveError);
            return res.status(500).json({ message: 'Error saving user', error: userSaveError });
        }

        // Send a success response if both college and user are saved
        res.status(201).json({
            message: 'College and User added successfully!',
            college: newCollege,
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding college and user', error });
    }
};

// Function to add a new committee and a user associated with it
exports.addCommittee = async (req, res) => {
    const { name, college, description, email, password, role = 'committee_head' } = req.body;

    try {
        // Check if committee already exists in the specified college
        const existingCommittee = await Committee.findOne({ name, college });
        if (existingCommittee) {
            return res.status(400).json({ message: 'Committee already exists in this college.' });
        }

        // Find the college by ID
        const collegeDocument = await College.findById(college);
        if (!collegeDocument) {
            return res.status(404).json({ message: 'College not found.' });
        }

        // Create a new Committee
        const newCommittee = new Committee({
            name,
            college,
            description,
        });
        await newCommittee.save();

        // Hash the password for user creation
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new User associated with the committee
        const newUser = new User({
            username: name,
            email,
            password: hashedPassword,
            role: 'committee_head', // Setting the role directly for committee head
            college,
            committees: newCommittee._id,
        });
        await newUser.save();

        // Associate the user with the committee
        newCommittee.users.push({ user: newUser._id, role });
        await newCommittee.save();

        // Update the college document to include the new committee
        collegeDocument.committees.push(newCommittee._id);
        await collegeDocument.save();

        // Send success response with created committee and user details
        res.status(201).json({
            message: 'Committee and user added successfully!',
            committee: newCommittee,
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding committee ', error });
    }
};


exports.getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find({}, 'name location _id'); // Only fetch necessary fields
        res.status(200).json(colleges);
    } catch (error) {
        console.error("Fetch Colleges Error:", error);
        res.status(500).json({ error: error.message });
    }
};
