import { model, Schema } from "mongoose";
import type { IItem } from "../types/IItem.ts";

const ItemSchema = new Schema<IItem>({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    category: {
        type: String,
        required: true,
        enum: ["produce", "dairy", "meat", "pantry", "frozen", "other"],
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    householdId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "HouseHold",
    },
    status: {
        type: String,
        enum: ["fresh", "expiring-soon", "expired", "used", "wasted"],
        default: "fresh",
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    usedBy: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "User",
    },
    wastedBy: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "User",
    },
    createdAt: {    
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Item = model<IItem>("Item", ItemSchema);

export default Item;