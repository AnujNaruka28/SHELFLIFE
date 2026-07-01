import express from "express";
import connectDB from "./config/db";
import * as routes from "./routes/index";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

app.get("/health-check", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((_req, _res,next) => {
    console.log("Request received at : ", new Date().toISOString());
    console.log("Request method : ", _req.method);
    console.log("Request URL : ", _req.url);
    console.log("Request body : ", _req.body);
    next();
});

app.use('/api/v1', routes.authRouter);
app.use('/api/v1', routes.householdRouter);
app.use('/api/v1', routes.itemRouter);