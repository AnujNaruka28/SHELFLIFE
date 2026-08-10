import { APIService } from "../lib/APIService";
import { API_DASHBOARD } from "../lib/apis";
import type { Item } from "../types/Item";
import { useState, useEffect } from "react";
export const useNotifications = () => {

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
 
    
    return {
        loading,
        notifyingItems
    }
}

