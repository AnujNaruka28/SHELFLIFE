import type { Types } from "mongoose";
import User from "../models/User.js";
import type { IUser } from "../types/IUser.ts";
import { hashPassword } from "../utils/password.js";
import { updateHouseHoldMember } from "./household.service.js";

const findUserByEmail = async (email: string) : Promise<IUser | null> => {
    const user = await User.findOne({ email });
    return user;
};

const findUserById = async (userId: Types.ObjectId) : Promise<IUser | null> => {
    const user = await User.findById(userId);
    return user;
};
    
const createUser = async (userData: { name: string, email: string, password: string }) : Promise<IUser> => {

    const userExists = await findUserByEmail(userData.email);
    if(userExists) throw new Error("User already exists");

    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;

    const newUser = await User.create({
        ...userData,
        profileImage: {
            secure_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
        }
    });

    return newUser;
}

const updateUserByEmail = async (email: string,householdId: Types.ObjectId) : Promise<IUser> => {

    const updatedUser = await User.findOneAndUpdate(
        {email: email},
        {
            householdId: householdId,
            role: "admin"
        },
        {returnDocument: "after"}
    )

    if(!updatedUser) throw new Error("Failed to add user to household.");

    await updateHouseHoldMember(updatedUser._id, householdId);

    return updatedUser;
}
export { findUserByEmail, findUserById, createUser, updateUserByEmail};
