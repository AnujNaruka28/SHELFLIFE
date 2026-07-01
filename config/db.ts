import mongoose from "mongoose";
import ENV from "../validations/env.validation";

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