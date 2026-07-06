import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import * as routes from "./routes/index.js";
import ENV from "./validations/env.validation.js";
import errorHandler from "./middlewares/error.js";
import { connectToCloudinary } from "./config/cloudinary.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();

// CORS configuration
app.use(cors({
    origin: ENV.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(helmet());

// Rate limiting for all routes
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
}));

// Rate limiting for auth routes
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Parse JSON request bodies
app.use(express.json());
const PORT = ENV?.PORT || 4000;

connectDB();
connectToCloudinary();

app.use((req, _res, next) => {
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = "[REDACTED]";

    console.log("Request received at : ", new Date().toISOString().split("T")[0]);
    console.log("Request method : ", req.method);
    console.log("Request URL : ", req.url);
    console.log("Request body : ", safeBody);
    next();
});

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Welcome To ShelfLife" });
});

app.get("/health-check", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api/v1", routes.authRouter);
app.use("/api/v1", routes.householdRouter);
app.use("/api/v1", routes.itemRouter);
app.use("/api/v1", routes.dashboardRouter);
app.use("/api/v1", routes.profileRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});

export default app;
