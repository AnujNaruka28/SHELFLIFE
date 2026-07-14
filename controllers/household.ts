import type { Request, Response } from "express";
import type { CustomRequest } from "../types/CustomRequest.ts";
import {
    findUserHousehold,
    getMembersOfHousehold,
    houseHoldInvitation,
    joinUserByInviteCode,
    leaveHousehold,
} from "../services/household.service.js";
import { updateUserByEmail } from "../services/authentication.service.js";
import { generateToken } from "../utils/token.js";
import { badRequest, error, forbidden, noContent, notFound, success } from "../utils/response.js";

const createHousehold = async (req: Request, res: Response) => {
    const { name: householdName } = req.body;
    const user = (req as CustomRequest).user;

    if (!user) return forbidden(res, "Invalid user");
    if (user.householdId) return badRequest(res, "User already belongs to a household.");

    const houseHold = await houseHoldInvitation(householdName);
    if (!houseHold) return error(res, "Failed to create desired household.");

    const updatedUser = await updateUserByEmail(user.email, houseHold._id);

    if (!updatedUser) return error(res, "Failed to add user to the household");

    // Generate a new token with the updated user data
    const token = generateToken(updatedUser);
    
    updatedUser.password = undefined;

    return success(res, "Household created successfully.", {
        household: houseHold,
        user: updatedUser,
        token, // Send the new token back to the client
    });
};

const joinHousehold = async (req: Request, res: Response) => {
    const { inviteCode } = req.body;
    const user = (req as CustomRequest).user;

    if (!user) return forbidden(res, "Invalid user");
    if (user.householdId) return badRequest(res, "User already belongs to a household.");

    const result = await joinUserByInviteCode(user._id, inviteCode);

    if (!result) return badRequest(res, "Invalid invite code or failed to join the household.");

    // Generate a new token with the updated user data
    const token = generateToken(result.user);
    
    result.user.password = undefined;

    return success(res, "Joined Household Successfully", {
        ...result,
        token, // Send the new token back to the client
    });
};

const leaveHouseholdController = async (req: Request, res: Response) => {
    const user = (req as CustomRequest).user;

    if (!user) return forbidden(res, "Invalid user");
    if (!user.householdId) return badRequest(res, "User is not in a household.");

    const updatedUser = await leaveHousehold(user._id, user.householdId);

    if (!updatedUser) return badRequest(res, "Failed to leave household.");

    // Generate a new token with the updated user data
    const token = generateToken(updatedUser);
    
    updatedUser.password = undefined;

    return success(res, "Left household successfully.", {
        user: updatedUser,
        token, // Send the new token back to the client
    });
};

const existingHousehold = async (req: Request, res: Response) => {
    const user = (req as CustomRequest).user;

    if (!user) return forbidden(res, "Invalid user");

    const household = await findUserHousehold(user);

    if (!household) return notFound(res, "Household does not exist.");

    return success(res, "Fetched the existing household.", household);
};

const getHouseholdMembers = async (req: Request, res: Response) => {
    const houseHoldId = req.params.id;
    const user = (req as CustomRequest).user;

    if (!user) return forbidden(res, "Invalid user");

    if (!user.householdId || user.householdId.toString() !== houseHoldId) {
        return forbidden(res, "Access denied.");
    }

    try {
        const { members } = await getMembersOfHousehold(houseHoldId);

        if (members.length === 0) return noContent(res);

        return success(res, "Members fetched successfully", members);
    } catch {
        return notFound(res, "Household not found.");
    }
};

export {
    createHousehold,
    joinHousehold,
    leaveHouseholdController,
    existingHousehold,
    getHouseholdMembers,
};
