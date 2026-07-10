import Otp from "../models/Otp.js";
import type { IOtp } from "../types/IOtp.js";

interface OtpInput {
    email: string;
    otp: number;
    createdAt: string;
}

export const createOtp = async (otpInput: OtpInput): Promise<IOtp> => {
    return await Otp.create(otpInput);
};

export const findLatestOtpByEmail = async (email: string): Promise<IOtp | null> => {
    const recent = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    return (recent[0] as IOtp) ?? null;
};

export const verifyLatestOtp = async (
    email: string,
    providedOtp: string
): Promise<{ ok: boolean; reason?: string; otpDoc?: IOtp | null }> => {
    const latest = await findLatestOtpByEmail(email);
    if (!latest) return { ok: false, reason: "Otp not found", otpDoc: null };
    if (latest.otp !== parseInt(providedOtp))
        return { ok: false, reason: "Otp does not match", otpDoc: latest };
    return { ok: true, otpDoc: latest };
};
