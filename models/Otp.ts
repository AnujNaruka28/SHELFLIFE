import { Schema, model } from "mongoose";
import type { IOtp } from "../types/IOtp.js";
import { generateOTP, getOTPExpiry } from "../utils/otp.js";
import mailSender from "../utils/mailSender.js";

const OtpSchema = new Schema<IOtp>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // 10 minutes
    },
});

OtpSchema.pre('save', async function () {
    const doc = this as any;
    
    if (!doc.isNew) {
        return;
    }

    try {
        await mailSender({
            emails: [doc.email],
            otp: doc.otp,
            householdName: doc.name,
            isVerification: true,
        });
    } catch (error) {
        console.error("Failed to send OTP email:", error);
        throw error;
    }
});

const Otp = model<IOtp>("Otp", OtpSchema);

export default Otp;
