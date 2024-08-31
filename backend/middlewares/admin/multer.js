import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this path is correct and writable
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
  }
});

// Create Multer instance with storage configuration
const upload = multer({ storage: storage });

export default upload;
