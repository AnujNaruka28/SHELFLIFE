import { Router } from 'express';
import { register,login } from '../controllers/auth.js';
import validate from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../validations/user.validation.js';

const authRouter = Router();

authRouter.post('/auth/login', validate(loginSchema) , login);
authRouter.post('/auth/register', validate(registerSchema) , register);

export default authRouter;