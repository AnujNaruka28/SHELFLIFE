import type { IUser } from "../types/IUser.ts";
import jwt from "jsonwebtoken";
import ENV from "../validations/env.validation.js";

const generateToken = (payload: IUser) : string => {
    try {
        // Extract only the necessary user data we need in the token
        const tokenPayload = {
            _id: payload._id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            householdId: payload.householdId,
            profileImage: payload.profileImage,
        };
        
        const token = jwt.sign(tokenPayload, ENV.JWT_SECRET, { expiresIn: "30d", algorithm: "HS512" });
        return token;
    } catch (error) {
        console.error("Token generation error:", error);
        throw new Error("Error generating token");
    }
};

const verifyToken = (token: string) : IUser & {iat?: number, exp?: number} => {
    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as IUser & {iat?: number, exp?: number};
        return decoded;
    } catch (error) {
        console.error("Token verification error:", error);
        throw new Error("Invalid token");
    }
};

export { generateToken, verifyToken };

