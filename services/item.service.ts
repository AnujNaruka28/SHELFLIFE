import type { Types } from "mongoose";
import Item from "../models/Item.js";
import type { IItem } from "../types/IItem.js";
import HouseHold from "../models/HouseHold.js";

const findItems = async (houseId: Types.ObjectId, filters?: Record<string, string>, page: number = 1, limit: number = 10) => {
    try {
        const offset = (page - 1) * limit;
        return await Item.find({ ...filters, householdId: houseId }).skip(offset).limit(limit);
    } catch (err) {
        return new Error(`Failed to fetch items : ${err}`);
    }
};

const saveItem = async (item: Partial<IItem>) => {
    try {
        return await Item.create({ ...item, updatedBy: item.addedBy });
    } catch (err) {
        return new Error(`Failed to save item in DB : ${err}`);
    }
};

const updateItemById = async (id: string, item: Partial<IItem>) => {
    try {
        const updatePayload: Partial<IItem> = {
            updatedBy: item.updatedBy,
        };

        if (item.name !== undefined) updatePayload.name = item.name;
        if (item.quantity !== undefined) updatePayload.quantity = item.quantity;
        if (item.category !== undefined) updatePayload.category = item.category;

        if (item.expiryDate !== undefined) {
            const expiryTimestamp = new Date(item.expiryDate as string | Date);
            const now = new Date();
            const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

            updatePayload.expiryDate = expiryTimestamp;
            updatePayload.status =
                now > expiryTimestamp
                    ? "expired"
                    : expiryTimestamp <= threeDaysLater
                        ? "expiring-soon"
                        : "fresh";
        }

        return await Item.findByIdAndUpdate(id, updatePayload, { new: true }).populate("updatedBy");
    } catch (err) {
        return new Error(`Failed to update item in DB : ${err}`);
    }
};

const updateItemStatusById = async (
    id: string,
    status: "used" | "wasted",
    updatedBy: Types.ObjectId,
) => {
    try {
        return await Item.findByIdAndUpdate(
            id,
            { status, updatedBy },
            { new: true },
        );
    } catch (err) {
        return new Error(`Failed to update item in DB : ${err}`);
    }
};

const updateItemStatusCron = async () => {
    const now = new Date();
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    await Item.updateMany(
        {
            expiryDate: { $lt: now },
            status: { $nin: ["expired", "used", "wasted"] },
        },
        {
            $set: { status: "expired" },
        },
    );

    await Item.updateMany(
        {
            expiryDate: {
                $gte: now,
                $lte: threeDaysLater,
            },
            status: "fresh",
        },
        {
            $set: { status: "expiring-soon" },
        },
    );
};

const deleteItemById = async (id: string) => await Item.findByIdAndDelete(id);

const cleanExpiredItemsFromDBAfterMonth = async () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    await Item.deleteMany({
        expiryDate: { $lt: oneMonthAgo },
    });
};

const updateWasteScoreByHouseholdId = async (householdId: Types.ObjectId) => {
    const items = await Item.find({ householdId });
    const wasteScore = items.filter((item) => item.status === "wasted").length;
    await HouseHold.findByIdAndUpdate(householdId, { wasteScore });
};

export { findItems, saveItem, updateItemById, deleteItemById, updateItemStatusById, updateItemStatusCron, cleanExpiredItemsFromDBAfterMonth, updateWasteScoreByHouseholdId };
