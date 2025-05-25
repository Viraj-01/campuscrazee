// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized! Token verification failed.' });
    }

    req.userId = decoded.id; // Save user ID or any other data in request for later use
    next();
  });
};

module.exports = verifyToken;
