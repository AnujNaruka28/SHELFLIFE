import type { Request } from "express";
import type { Types } from "mongoose";

export interface CustomRequest extends Request {
    user?: {
        _id: Types.ObjectId;
        name: string;
        email: string;
        profileImage: {
            secure_url: string;
            public_id?: string;
        };
        householdId?: Types.ObjectId;
        role: "admin" | "member";
    };
}
