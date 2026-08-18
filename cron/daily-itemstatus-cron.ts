import { updateItemStatusCron } from "../services/item.service.js";
import { Request, Response } from "express";

export const run = async (_req: Request, res: Response) => {
  // Execute cron without any response to minimize output
  updateItemStatusCron().catch(() => {});
  res.end();
};