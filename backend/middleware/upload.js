// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Configure storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to an 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append a timestamp to the original filename
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
