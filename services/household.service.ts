import { Charset, charset, generate } from "referral-codes";
import type { IHouseHold } from "../types/HouseHolds.ts";
import HouseHold from "../models/HouseHold.js";
import User from "../models/User.js";
import type { Types } from "mongoose";

const houseHoldInvitation = async (name: string): Promise<IHouseHold> => {
    const generatedInviteCode = generate({
        length: 6,
        count: 1,
        charset: charset(Charset.ALPHABETIC),
    })[0]?.toUpperCase();

    const householdData = {
        name: name.trim(),
        inviteCode: generatedInviteCode,
        wasteScore: 0,
    };

    const newHouseHold = await HouseHold.create(householdData);

    return newHouseHold;
};

const updateHouseHoldMember = async (userId: Types.ObjectId, houseHoldId: Types.ObjectId) => {
    const updatedHousehold = await HouseHold.findByIdAndUpdate(
        houseHoldId,
        {
            $addToSet: { members: userId },
        },
        { returnDocument: "after" },
    ).populate({ path: "members", select: "name email" });

    return updatedHousehold;
};

const joinUserByInviteCode = async (userId: Types.ObjectId, inviteCode: string) => {
    const normalizedCode = inviteCode.trim().toUpperCase();
    const household = await HouseHold.findOne({ inviteCode: normalizedCode });

    if (!household) {
        return null;
    }

    const updatedHousehold = await HouseHold.findByIdAndUpdate(
        household._id,
        { $addToSet: { members: userId } },
        { new: true },
    ).populate({ path: "members", select: "name email role" });

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { householdId: household._id, role: "member" },
        { new: true },
    );

    if (!updatedHousehold || !updatedUser) {
        return null;
    }

    return { household: updatedHousehold, user: updatedUser };
};

const leaveHousehold = async (userId: Types.ObjectId, householdId: Types.ObjectId) => {
    const household = await HouseHold.findById(householdId);

    if (!household) {
        return null;
    }

    const isMember = household.members.some(
        (memberId) => memberId.toString() === userId.toString(),
    );

    if (!isMember) {
        return null;
    }

    await HouseHold.findByIdAndUpdate(householdId, {
        $pull: { members: userId },
    });

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { householdId: null, role: "member" },
        { new: true },
    );

    return updatedUser;
};

const findUserHousehold = async (user: { _id: Types.ObjectId }) => {
    const existingHousehold = await HouseHold.findOne({
        members: user._id,
    }).populate("members", "name email role profileImage");

    return existingHousehold;
};

const getMembersOfHousehold = async (householdId: string): Promise<IHouseHold> => {
    const houseHold = await HouseHold.findById(householdId).populate("members", "name email role profileImage");

    if (!houseHold) {
        throw new Error("Household not found");
    }

    return houseHold;
};

export {
    houseHoldInvitation,
    updateHouseHoldMember,
    joinUserByInviteCode,
    leaveHousehold,
    findUserHousehold,
    getMembersOfHousehold,
};
