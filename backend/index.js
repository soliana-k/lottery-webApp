import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from './routes/user_route.js';
import contactRouter from './routes/contact_route.js';
import faqRouter from './routes/faq_route.js';
import drawResultsRouter from './routes/drawResultsRoutes.js';
import adminDrawRoutes from './routes/admin/drawRoute.js';
import adminRouter from './routes/admin/admin_route.js'; // Import the admin router
import lotteryRoute from './routes/lotteryRoute.js';
import adminUserRouter from './routes/admin/admin_user_route.js'; // Import the new admin user route
import path from 'path';
import { fileURLToPath } from 'url'; // Import this for ES module compatibility

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
app.use('/api/v1/lottery', lotteryRoute); 
app.use('/api/v1/admin', adminRouter); // Add admin routes
app.use('/api/admin/draws', adminDrawRoutes);
app.use('/api/admin/users', adminUserRouter); // Ensure this route is correctly integrated

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}`);
});
