import type { Document, Types } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string | undefined;
    householdId?: Types.ObjectId;
    profileImage?: {
        secure_url: string,
        public_id?: string,
    }
    token?: string;
    role: "admin" | "member";
    otp?: number;
    otpExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
}

type loginUser = Pick<IUser, "email" | "password">;

type registerUser = loginUser & Pick<IUser, "name">;

export type { IUser, loginUser, registerUser };
