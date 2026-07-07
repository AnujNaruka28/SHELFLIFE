import { Router } from 'express';
import { register, login, sendOtp } from '../controllers/auth.js';
import validate from '../middlewares/validate.js';
import { loginSchema, registerSchema, verifyOtpSchema } from '../validations/user.validation.js';
import { authLimiter } from '../index.js';

const authRouter = Router();

authRouter.post('/auth/login', authLimiter, validate(loginSchema), login);
authRouter.post('/auth/register', authLimiter, validate(registerSchema), register);
authRouter.post('/auth/otp', authLimiter, validate(verifyOtpSchema), sendOtp);

export default authRouter;