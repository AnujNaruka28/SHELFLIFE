import { Router } from 'express';

const itemRouter = Router();

itemRouter.get('/items', () => {});
itemRouter.post('/items', () => {});
itemRouter.put('/items/:id', () => {});
itemRouter.delete('/items/:id', () => {});
itemRouter.patch('/items/:id/status', () => {});

export default itemRouter;