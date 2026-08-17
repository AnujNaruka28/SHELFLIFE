import { updateItemStatusCron } from "../services/item.service.js";
import { Request, Response } from "express";

export const run = async (_req: Request, res: Response) => {
  try {
    await updateItemStatusCron();
    res.status(200).send("OK");
  } catch (err) {
    console.error("Error in cron item status update:", err);
    res.status(500).send("Error");
  }
};