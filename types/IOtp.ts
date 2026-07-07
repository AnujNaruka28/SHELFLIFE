import type { Document } from "mongoose";

interface IOtp extends Document {
    email: string;
    otp: number;
    createdAt: Date;
}

export type { IOtp };
