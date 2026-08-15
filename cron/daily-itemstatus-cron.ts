import { updateItemStatusCron } from "../services/item.service.js";
import { Response } from "express";
import { error, success } from "../utils/response.js";

export const run = async (_req: any, res: Response) => {

  await updateItemStatusCron().then(() => {
    success(res, "Cron job completed successfully.");
  }).catch((err) => {
    console.error("Error in cron item status update:", err);
    error(res, "Error in cron item status update");
  });
    
};