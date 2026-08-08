import type { User } from "./User";

export interface Item {
    _id: string;
    name: string;
    quantity: number;
    category: "produce" | "dairy" | "meat" | "pantry" | "frozen" | "other";
    expiryDate: Date;
    status: "fresh" | "expiring-soon" | "expired" | "used" | "wasted";
    addedBy: User;
    updatedBy: User;
    usedBy: User | null;
    wastedBy: User | null;
    createdAt: Date;
    updatedAt: Date;
}
