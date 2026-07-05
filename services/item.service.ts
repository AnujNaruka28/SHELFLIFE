import type { Types } from "mongoose";
import Item from "../models/Item.js";

const findItems = async (houseId: Types.ObjectId, filters?: Record<string, string>) => {
    try {
        return await Item.find({ ...filters, householdId: houseId });
    } catch (err) {
        return new Error(`Failed to fetch items : ${err}`);
    }
};

const saveItem = async (item: Record<string, unknown>) => {
    try {
        return await Item.create({ ...item, updatedBy: item.addedBy });
    } catch (err) {
        return new Error(`Failed to save item in DB : ${err}`);
    }
};

const updateItemById = async (id: string, item: Record<string, unknown>) => {
    try {
        const updatePayload: Record<string, unknown> = {
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

export { findItems, saveItem, updateItemById, deleteItemById, updateItemStatusById, updateItemStatusCron };
