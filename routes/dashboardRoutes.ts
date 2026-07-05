import { Router } from 'express';
import { stats,expiring } from '../controllers/dashboard.js';
import { auth } from '../middlewares/AUTH.js';

const dashboardRouter = Router();   

dashboardRouter.get('/dashboard/stats',auth, stats);
dashboardRouter.get('/dashboard/expiring', auth, expiring);

export default dashboardRouter;