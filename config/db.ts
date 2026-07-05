import mongoose from "mongoose";
import ENV from "../validations/env.validation.js";
import { setServers } from "node:dns";

setServers(['1.1.1.1','8.8.8.8'])
const connectDB = async () => {
  await mongoose.connect(ENV.MONGO_URI as string)
    .then(() => console.log("| ---- MongoDB connected ---- |"))
    .catch((err) => {
        console.log("| ---- MongoDB connection failed ---- |");
        console.log(err);
        process.exit(1);
    });
}

export default connectDB;