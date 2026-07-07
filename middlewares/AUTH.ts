import type { NextFunction, Request, Response } from "express";
import { forbidden, notFound, unauthorized } from "../utils/response.js";
import type { CustomRequest } from "../types/CustomRequest.ts";
import type { IUser } from "../types/IUser.ts";
import { verifyToken } from "../utils/token.js";
import Item from "../models/Item.js";

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    let payload: IUser & { iat?: number; exp?: number } | null = null;

    if (!token) {
        return forbidden(res, "Access denied. No token provided.");
    }

    try {
        payload = verifyToken(token);
    } catch {
        return forbidden(res, "Invalid or expired token.");
    }

    if (!payload) {
        return forbidden(res, "Invalid token payload.");
    }

    (req as CustomRequest).user = {
        _id: payload._id,
        name: payload.name,
        email: payload.email,
        profileImage: {
            secure_url: payload.profileImage?.secure_url as string,
            public_id: payload.profileImage?.public_id,
        },
        role: payload.role,
        householdId: payload.householdId,
        isEmailVerified: payload.isEmailVerified || false,
    };

    next();
};

const canModifyItem = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;

    if (!user) {
        return unauthorized(res, "Not allowed.");
    }

    const item = await Item.findById(req.params.id);

    if (!item) {
        return notFound(res, "Item not found.");
    }

    if (!user.householdId || item.householdId.toString() !== user.householdId.toString()) {
        return forbidden(res, "Access denied.");
    }

    if (user.role === "admin" || item.addedBy.toString() === user._id.toString()) {
        return next();
    }

    return unauthorized(res, "Not allowed.");
};

export { auth, canModifyItem };
