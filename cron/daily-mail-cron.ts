import Item from "../models/Item.js";
import { getMembersOfHousehold } from "../services/household.service.js";
import mailSender from "../utils/mailSender.js";

export const run = async () => {
    try {
       const items = await Item.find({ status: { $in : ["expiring-soon"]}});

       const itemsByHousehold = new Map();

       items.forEach(item => {
            const houseId = item.householdId.toString();

            if(!itemsByHousehold.has(houseId)) itemsByHousehold.set(houseId, []);
            itemsByHousehold.get(houseId).push(item);
       })

       for(const [houseId,items] of itemsByHousehold) {
            const household = await getMembersOfHousehold(houseId);
            if(household.members && household.members.length > 0) {
                const membersByEmail = household.members.map((mem: any) => mem.email);

                await mailSender({
                    emails: membersByEmail,
                    householdName: household.name,
                    items: items.map((item:any) => ({
                        name: item.name,
                        quantity: item.quantity,
                        category: item.category,
                        expiryDate: item.expiryDate
                    })),
                    subject: "ShelfLife Daily Reminder"
                });
            }
       }

        console.log("Daily digest emails sent successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Cron job failed:", err);
        process.exit(1);
    }
};
