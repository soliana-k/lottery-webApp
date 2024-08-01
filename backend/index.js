import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user_route.js";
import contactRouter from "./routes/contact_route.js";



dotenv.config();


const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

connectDB();

const PORT = process.env.PORT || 3000;

// api
app.use("/api/v1/user", userRouter);
app.use("/api/v1/contact",contactRouter);


app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}`);
});
