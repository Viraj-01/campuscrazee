// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const User = require('./models/User'); // Make sure the path to your User model is correct
// const userRoutes = require('./routes/userRoutes');
// const collegeRoutes = require('./routes/collegeRoutes');
const committeeRoutes = require('./routes/committeeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
// app.use('/api/users', userRoutes);
// app.use('/api/colleges', collegeRoutes);
app.use('/api/committees', committeeRoutes);
// app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the event routes
app.use('/api/events', eventRoutes);

// Function to initialize the main admin if not already present
async function initializeMainAdmin() {
  try {
    const mainAdmin = await User.findOne({ role: 'main_admin' });
    if (!mainAdmin) {
      const hashedPassword = await bcryptjs.hash(process.env.MAIN_ADMIN_PASSWORD, 10);
      const admin = new User({
        username: 'MainAdmin',
        email: 'patilviraj788@gmail.com',
        password: hashedPassword,
        role: 'main_admin',
      });
      await admin.save();
      console.log('Main admin initialized.');
    } else {
      console.log('Main admin already exists.');
    }
  } catch (error) {
    console.error('Error initializing main admin:', error);
  }
}

// Connect to MongoDB and start the server
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    return initializeMainAdmin(); // Initialize the main admin after connecting to MongoDB
  })
  .catch(error => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
