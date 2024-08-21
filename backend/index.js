import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from './routes/user_route.js';
import contactRouter from './routes/contact_route.js';
import faqRouter from './routes/faq_route.js';
import drawResultsRouter from './routes/drawResultsRoutes.js';
import testimonialRouter from './routes/testimonials.js';
import adminDrawRoutes from './routes/admin/drawRoute.js';
import adminRouter from './routes/admin/admin_route.js';
import adminUserRouter from './routes/admin/admin_user_route.js';
import adminTestimonialRouter from './routes/admin/testimonial_route.js';
import lotteryRouter from './routes/lotteryRoute.js';
import settingsRouter from './routes/settings_route.js';
import mainBannerSettingsRouter from './routes/MainbannerSettings.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// CORS and JSON middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Connect to the database
connectDB();

// API routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/faq', faqRouter);
app.use('/api/v1/drawresults', drawResultsRouter);
app.use('/api/v1/lottery', lotteryRouter);
app.use('/api/v1/testimonial', testimonialRouter);
app.use('/api/v1/admin', adminRouter); // Add admin routes

app.use('/api/v1/admin/draws', adminDrawRoutes);
app.use('/api/v1/admin/users', adminUserRouter); // Corrected path for admin users
app.use('/api/v1/admin/testimonials', adminTestimonialRouter); 
app.use('/api/v1/settings', settingsRouter);
app.use('/api/v1/banner', mainBannerSettingsRouter);
//app.use('/api/v1/admin', adminUserRouter); // Integrate the new admin user route
//app.use('/api/v1/audits', adminUserRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
