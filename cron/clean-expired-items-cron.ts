import { cleanExpiredItemsFromDBAfterMonth } from "../services/item.service.js";
import { Request, Response } from "express";

export const run = async (_req: Request,res: Response) => {
    
    await cleanExpiredItemsFromDBAfterMonth().then(() => {
        res.status(200).send("OK");
    }).catch((err) => {
        console.error("Error in cron item cleanup:", err);
        res.status(500).send("Error");
    });
    
}