import { Router } from 'express';

const authRouter = Router();

authRouter.post('/auth/login', () => {});
authRouter.post('/auth/register', () => {});

export default authRouter;