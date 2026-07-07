import { Router } from 'express';
import { register, login, sendOtp, verifyOtp } from '../controllers/auth.js';
import validate from '../middlewares/validate.js';
import { loginSchema, registerSchema, sendOtpSchema, verifyOtpSchema } from '../validations/user.validation.js';
import { authLimiter } from '../index.js';

const authRouter = Router();

authRouter.post('/auth/login', authLimiter, validate(loginSchema), login);
authRouter.post('/auth/register', authLimiter, validate(registerSchema), register);
authRouter.post('/auth/otp', authLimiter, validate(sendOtpSchema), sendOtp);
authRouter.post('/auth/verify-otp', authLimiter, validate(verifyOtpSchema), verifyOtp);

export default authRouter;