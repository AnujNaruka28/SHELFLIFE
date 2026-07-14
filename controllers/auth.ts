import type { Request, Response } from "express";
import { forbidden, notFound, success } from "../utils/response.js";
import { validatePassword } from "../utils/password.js";
import { createUser, findUserByEmail } from "../services/authentication.service.js";
import { generateToken } from "../utils/token.js";
import { generateOTP } from "../utils/otp.js";
import mailSender from "../utils/mailSender.js";
import ENV from "../validations/env.validation.js";
import { createOtp, verifyLatestOtp } from "../services/otp.service.js";

const recentOtps = new Set<number>();

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return notFound(res, "User not found");

    const isPasswordValid = await validatePassword(password, user.password!);
    if (!isPasswordValid) return forbidden(res, "Invalid password");

    const token = generateToken(user);

    user.password = undefined;

    return success(res, "Login successful", { token, user });
};

const sendOtp = async (req: Request, res: Response) => {
    const { email } = req.body;
    
    const user = await findUserByEmail(email);
    if (user) return forbidden(res, "User already exists");

    let otp: number;
    do {
        otp = generateOTP();
    } while (recentOtps.has(otp));
    
    recentOtps.add(otp);

    setTimeout(() => {
        recentOtps.delete(otp);
    }, 10 * 60 * 1000); // 10 minutes

    await createOtp({ email, otp });

    if(ENV.NODE_ENV === "production") {
        await mailSender({
            emails: [email],
            otp,
            isVerification: true,
        });

        return success(res, "OTP generated");
    } 

    return success(res, "OTP generated", { otp });

}

const register = async (req: Request, res: Response) => {
    const { name, email, password, otp } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) return forbidden(res, "User already exists");

    const emailVerification = await verifyLatestOtp(email, otp);

    if (!emailVerification.ok) return forbidden(res, emailVerification.reason || "Invalid OTP");

    const newUser = await createUser({ name, email, password });

    const token = generateToken(newUser);
    newUser.password = undefined;

    return success(res, "User registered successfully. Please verify your email.", { 
        token,
        user: newUser
    });
};

export { login, register, sendOtp };
