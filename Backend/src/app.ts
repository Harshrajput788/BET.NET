import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth/auth.routes.js'
import blogRouter from './routes/blog/blog.routes.js';
import profileRouter from './routes/profile/profile.routes.js';

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(cookieParser());

app.get("/health", (_, res) => {
    res.status(200).json({
        success: true,
        status: "UP",
        timestamp: new Date().toISOString()
    });
});

//Rest API's 

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",profileRouter);
app.use("/api/v1/blog",blogRouter);

export default app;