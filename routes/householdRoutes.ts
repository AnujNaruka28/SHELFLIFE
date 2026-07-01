import { Router } from 'express';

const householdRouter = Router();

householdRouter.post('/households/join', () => {});
householdRouter.post('/households/create', () => {});
householdRouter.get('/households/me', () => {});
householdRouter.get('/households/:id/members', () => {});


export default householdRouter;