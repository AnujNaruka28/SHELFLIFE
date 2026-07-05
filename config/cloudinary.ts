import { v2 } from "cloudinary";
import ENV from "../validations/env.validation.js";

export const connectToCloudinary = async () => {
    
    await v2.config({
        api_key: ENV.CLOUDINARY_API_KEY,
        api_secret: ENV.CLOUDINARY_API_SECRET,
        cloud_name: ENV.CLOUDINARY_CLOUD
    })
    .then(() => console.log("------ CLOUDINARY CONNECTED ------"))
    .catch((err: Error) => console.log(`FAILED TO CONNECT TO CLOUDINARY: ${err}`));
};
