import type { Types } from "mongoose";
import User from "../models/User.js"
import type { CustomRequest } from "../types/CustomRequest.js";


const updateUserProfile = async (userId: Types.ObjectId, profile: { secure_url: string, public_id: string }) => {
    return await User.findByIdAndUpdate(userId, {
        profileImage: {
            secure_url: profile.secure_url,
            public_id: profile.public_id
        }
    }, { new: true });
};

const deleteProfileFromUser = async (user: NonNullable<CustomRequest["user"]>) => {
    return await User.findByIdAndUpdate(user._id, {
        profileImage: {
            secure_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
        },
    }, { new: true });
};

export {
    updateUserProfile,
    deleteProfileFromUser
}