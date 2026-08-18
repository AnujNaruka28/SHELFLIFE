import { cleanExpiredItemsFromDBAfterMonth } from "../services/item.service.js";
import { Request, Response } from "express";

export const run = async (_req: Request,res: Response) => {
    cleanExpiredItemsFromDBAfterMonth().catch(() => {});
    res.end();
}