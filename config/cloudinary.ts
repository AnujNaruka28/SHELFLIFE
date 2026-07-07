import { v2 as cloudinary } from "cloudinary";
import ENV from "../validations/env.validation.js";

export const connectToCloudinary = async () => {
    try {
        cloudinary.config({
            api_key: ENV.CLOUDINARY_API_KEY,
            api_secret: ENV.CLOUDINARY_API_SECRET,
            cloud_name: ENV.CLOUDINARY_CLOUD
        });
        console.log("------ CLOUDINARY CONNECTED ------");
    } catch (err) {
        console.log(`FAILED TO CONNECT TO CLOUDINARY: ${err}`);
    }
};
