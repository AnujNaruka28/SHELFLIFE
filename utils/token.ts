import type { IUser } from "../types/IUser.ts";
import jwt from "jsonwebtoken";
import ENV from "../validations/env.validation.js";

const generateToken = (payload: IUser) : string => {
    try {
        const token = jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "30d" , algorithm: "HS512" });
        return token;
    } catch (error) {
        throw new Error("Error generating token");
    }
};

const verifyToken = (token: string) : IUser | null => {
    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as IUser & {iat ?: number, exp ?: number};
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
};

export { generateToken, verifyToken };

