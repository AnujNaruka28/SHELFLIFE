import { Router } from "express";
import { run as dailyItemStatus } from "../cron/daily-itemstatus-cron.js";
import { run as monthlyItemClear } from "../cron/clean-expired-items-cron.js";
import { run as dailyMail } from "../cron/daily-mail-cron.js";

const cronRouter = Router();

cronRouter.get('/task/daily-item-status', dailyItemStatus);
cronRouter.get('/task/monthly-item-clear', monthlyItemClear);
cronRouter.get('/task/daily-mail', dailyMail);

export default cronRouter;