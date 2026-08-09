import { APIService } from "../../lib/APIService";
import { API_DASHBOARD } from "../../lib/apis";
import type { Item } from "../../types/Item";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const Notifications = () => {
    const [notifyingItems, setNotifyingItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notifications = await APIService(
                    API_DASHBOARD.notifications,
                    "GET"
                );
                if(notifications.status === 204) {
                    setNotifyingItems([]);
                    return;
                }
                setNotifyingItems(notifications.data.data);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (notifyingItems.length === 0) {
        return <p className="text-center text-sm text-muted-foreground">No notifications</p>;
    }

    return (
        <ul className="w-full h-full overflow-y-auto gap-2 flex flex-col">
            {
                notifyingItems.map((item) => (
                    <li key={item._id}
                        className="w-full h-[60px] flex items-center justify-between px-2 py-2 bg-[#fff] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] rounded">
                        <p className="text-sm">
                            {item.name}  expired on
                        </p>
                        <span className="font-bold text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">{new Date(item.expiryDate).toLocaleDateString()}</span>
                    </li>
                ))
            }
        </ul>
    );
};

export default Notifications;