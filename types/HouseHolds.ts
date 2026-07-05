import type { Document, Types } from "mongoose";

export interface IHouseHold extends Document {
    name: string;
    members: Types.ObjectId[];
    inviteCode: string;
    wasteScore: number;
    createdAt: Date;
    updatedAt: Date;
};
