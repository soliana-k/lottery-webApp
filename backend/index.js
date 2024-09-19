import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import userRouter from './routes/user_route.js';
import contactRouter from './routes/contact_route.js';
import faqRoutes from './routes/faqRoutes.js';
import drawResultsRouter from './routes/drawResultsRoutes.js';
import testimonialRouter from './routes/testimonials.js';
import adminDrawRoutes from './routes/admin/drawRoute.js';
import adminRouter from './routes/admin/admin_route.js';
import adminUserRouter from './routes/admin/admin_user_route.js';
import adminTestimonialRouter from './routes/admin/testimonial_route.js';
import lotteryRouter from './routes/lotteryRoute.js';
import settingsRouter from './routes/admin/settings_route.js';
import auditRouter from './routes/admin/auditRoute.js';
import prizesRouter from './routes/admin/prizesroutes.js'; // Prizes routes
import paymentRoutes from './routes/paymentRoute.js';

// Load environment variables from .env file
dotenv.config();

// Resolve __dirname and __filename in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Middleware: CORS, JSON parsing, URL-encoded data, and cookies
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allowlist for frontend origins
    credentials: true // Support for cookies
}));
app.use(express.json()); // Handle JSON data
app.use(express.urlencoded({ extended: true })); // Handle form data
app.use(cookieParser()); // Handle cookies

// Static file serving for images (e.g., prize images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// API routes
app.get('/test', (req, res) => {
    res.send('Server is working!');
  });
  
app.use('/api', paymentRoutes);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1', faqRoutes);
app.use('/api/v1/drawresults', drawResultsRouter);
app.use('/api/v1/lottery', lotteryRouter);
app.use('/api/v1/testimonial', testimonialRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/admin/testimonials', adminTestimonialRouter);
app.use('/api/v1/draws', adminDrawRoutes);
app.use('/api/admin/users', adminUserRouter);
app.use('/api/v1/settings', settingsRouter);
app.use('/api/v1/logs', auditRouter);
app.use('/api/v1/prizes', prizesRouter); // Register the prizes route
// app.use('/api/payments', paymentRoutes);
  // This ensures /api/payments works
// Fallback for non-existing routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
