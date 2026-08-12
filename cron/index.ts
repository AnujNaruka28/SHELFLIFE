import cron from 'node-cron';
import { run as cleanExpiredItems } from './clean-expired-items-cron.js';
import { run as updateItemStatus } from './daily-itemstatus-cron.js';
import { run as sendDailyMail } from './daily-mail-cron.js';

// Run daily at midnight for item status updates
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily item status update');
  await updateItemStatus();
});

// Run daily at 1 AM to clean expired items after a month
cron.schedule('0 1 * * *', async () => {
  console.log('Running cleanup of expired items');
  await cleanExpiredItems();
});

// Run daily at 9 AM for daily mail
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily mail job');
  await sendDailyMail();
});

console.log('Cron jobs scheduled successfully');