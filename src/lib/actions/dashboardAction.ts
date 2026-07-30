import { API_DASHBOARD } from "../apis";
import { APIMethods, APIService } from "../APIService";
import { failGetDashboard, failGetExpiringItems, getDashboard, getExpiringItems, setDashboard, setExpiringItems } from "../features/dashboardSlice"
import { toast } from 'react-toastify';

const statsAction = () => {
    return async (dispatch: any) => {
        
        try {

            dispatch(getDashboard());

            const statsResponse = await APIService(
                API_DASHBOARD.stats,
                APIMethods.GET
            )
            
            dispatch(setDashboard(statsResponse.data.data));

            toast.success("Dashboard stats fetched successfully");
            
        } catch (error) {
            dispatch(failGetDashboard());
            toast.error("Failed to fetch dashboard stats");
        }
    }
}

const expiringItemsAction = () => {
    return async (dispatch: any) => {
        
        try {

            dispatch(getExpiringItems());

            const expiringItemsResponse = await APIService(
                API_DASHBOARD.expiring,
                APIMethods.GET
            )

            if(expiringItemsResponse.status === 204) {
                dispatch(setExpiringItems([]));
            } else {
                dispatch(setExpiringItems(expiringItemsResponse.data.data));
            }

            toast.success("Expiring items fetched successfully");
            
        } catch (error) {
            dispatch(failGetExpiringItems());
            toast.error("Failed to fetch expiring items");
        }
    }
}



export {
    statsAction,
    expiringItemsAction
}