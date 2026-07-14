import { Schema, model } from "mongoose";
import type { IUser } from "../types/IUser.ts";


const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    householdId: {
        type: Schema.Types.ObjectId,
        ref: "HouseHold",
        default: null,
    },
    profileImage: {
        secure_url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    role: {
        type: String,
        enum: ["admin", "member", "user"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const User = model<IUser>("User", UserSchema);

export default User;