import type { Request, Response } from "express";
import { badRequest, error, success, unauthorized } from "../utils/response.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/mediaUploader.js";
import type { CustomRequest } from "../types/CustomRequest.js";
import { deleteProfileFromUser, updateUserProfile } from "../services/profile.service.js";

const updateProfilePicture = async (req: Request, res: Response) => {

    const profileImageFile = req.file as any;
    const userId = (req as CustomRequest).user?._id;

    if (!userId) return unauthorized(res, "User not found");

    if (!profileImageFile) return badRequest(res, "No profile image is provided.");

    const user = (req as CustomRequest).user;
    if (user?.profileImage?.public_id) {
        try {
            await deleteFromCloudinary(user.profileImage.public_id);
        } catch (err) {
            console.error("Failed to delete old profile picture", err);
        }
    }

    const storedImage = await uploadToCloudinary({
        filePath: profileImageFile.path,
        folderName: "user-profiles",
        width: 24,
        height: 24
    })

    const updatedUser = await updateUserProfile(userId, storedImage);

    if (!updatedUser) return error(res, "Failed to update profile picture.");

    return success(res, "User profile updated.", updatedUser);

};

const deleteProfilePicture = async (req: Request, res: Response) => {

    const user = (req as CustomRequest).user;

    if (!user) return unauthorized(res, "User not found");

    const userProfileDeleted = await deleteProfileFromUser(user);
    if (!userProfileDeleted) return error(res, "Failed to delete user profile.");

    if (user.profileImage.public_id) {
        try {
            await deleteFromCloudinary(user.profileImage.public_id);
        } catch (err) {
            return error(res, `Failed to delete profile picture from cloudinary. Error: ${err}`);
        }
    }

    user.profileImage.secure_url = userProfileDeleted.profileImage!.secure_url;

    return success(res, "User profile deleted.", user);
};

export {
    updateProfilePicture,
    deleteProfilePicture
};