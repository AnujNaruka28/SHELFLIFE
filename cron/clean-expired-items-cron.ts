import { cleanExpiredItemsFromDBAfterMonth } from "../services/item.service.js";
import { Request, Response } from "express";
import { error, success } from "../utils/response.js";

export const run = async (_req: Request,res: Response) => {
    
    await cleanExpiredItemsFromDBAfterMonth().then(() => {
        success(res, "Cleanup cron job completed successfully.");
    }).catch((err) => {
        console.error("Error in cron item cleanup:", err);
        error(res, "Error in cron item cleanup");
    });
    
}