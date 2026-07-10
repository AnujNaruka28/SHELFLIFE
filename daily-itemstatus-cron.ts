import connectDB from "./config/db.js";
import { updateItemStatusCron } from "./services/item.service.js";

const run = async () => {
  try {
    
    await connectDB();
    await updateItemStatusCron();
    
    console.log("Cron job completed successfully.");
    process.exit(0);

  } catch (err) {
    console.error("Cron job failed:", err);
    process.exit(1);
  }
};

run();
