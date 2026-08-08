import { Router } from 'express';
import { stats,expiring, leaderboard, notifications } from '../controllers/dashboard.js';
import { auth } from '../middlewares/AUTH.js';

const dashboardRouter = Router();   

dashboardRouter.get('/dashboard/stats',auth, stats);
dashboardRouter.get('/dashboard/expiring', auth, expiring);
dashboardRouter.get('/dashboard/leaderboard', auth, leaderboard);
dashboardRouter.get('/notifications', auth, notifications);

export default dashboardRouter;