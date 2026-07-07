import { Schema, model } from "mongoose";
import type { IOtp } from "../types/IOtp.js";
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
        expires: 10*60, // 10 minutes
    },
});

async function sendOtpEmail(this: IOtp) {
    try {
        await mailSender({
            emails: [this.email],
            otp: this.otp,
            isVerification: true,
        });
    } catch (error) {
        console.error("Failed to send OTP email:", error);
        throw error;
    }
};

OtpSchema.pre("save", async function () {
    await sendOtpEmail.call(this);
});

const Otp = model<IOtp>("Otp", OtpSchema);

export default Otp;
