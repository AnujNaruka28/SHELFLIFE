import type { Document, Types } from "mongoose";

export interface IItem extends Document {
    name: string;
    quantity: number;
    category: string;
    expiryDate: Date;
    householdId: Types.ObjectId;
    status: "fresh" | "expiring-soon" | "expired" | "used" | "wasted";
    addedBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    usedBy: Types.ObjectId | null;
    wastedBy: Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}
