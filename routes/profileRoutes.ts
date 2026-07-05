import { Router } from "express";
import upload from "../middlewares/multer.js";
import { deleteProfilePicture, updateProfilePicture } from "../controllers/user.js";
import { auth } from "../middlewares/AUTH.js";

const profileRouter = Router();

profileRouter.put('/change-profile',auth, upload.single('profileImage'), updateProfilePicture);
profileRouter.delete('/delete-profile',auth, deleteProfilePicture);

export default profileRouter;