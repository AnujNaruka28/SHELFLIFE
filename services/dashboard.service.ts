import type { Types } from "mongoose";
import Item from "../models/Item.js";

const getItemsByHouseholdIdExpiringIn24hours = async (houseId: Types.ObjectId) => {

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const items = await Item.find({
        householdId: houseId,
        expiryDate: {
            $gte: now,
            $lte: tomorrow,
        },
    }).populate("addedBy updatedBy", "name email");

    return items;
}

const getAllItemsByHouseholdId = async (houseId: Types.ObjectId) => {

    const allItems = await Item.find({
        householdId: houseId
    }).populate("addedBy updatedBy", "name email");

    return allItems;
 
}

export {
    getItemsByHouseholdIdExpiringIn24hours,
    getAllItemsByHouseholdId
}