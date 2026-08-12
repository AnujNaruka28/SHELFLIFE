import connectDB from "../config/db.js";
import { cleanExpiredItemsFromDBAfterMonth } from "../services/item.service.js";

export const run = async () => {
    try {
        await connectDB();
        await cleanExpiredItemsFromDBAfterMonth();
        console.log("Cleanup cron job completed successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Error in cron:", err);
        process.exit(1);
    }
}