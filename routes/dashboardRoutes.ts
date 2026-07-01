import { Router } from 'express';

const dashboardRouter = Router();   

dashboardRouter.get('/dashboard/stats', () => {});
dashboardRouter.get('/dashboard/expiring', () => {});

export default dashboardRouter;