import { Router } from 'express';
import { register,login } from '../controllers/auth.js';
import validate from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../validations/user.validation.js';
import { authLimiter } from '../index.js';

const authRouter = Router();

authRouter.post('/auth/login',authLimiter, validate(loginSchema) , login);
authRouter.post('/auth/register', authLimiter, validate(registerSchema) , register);

export default authRouter;