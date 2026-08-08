import { toast } from "react-toastify";
import { API_ITEMS } from "../apis";
import { APIMethods, APIService } from "../APIService";
import { itemStart, itemFail, itemSuccess, setItems } from "../features/itemsSlice";
import type { ItemFormValue } from "../../types/ItemFormValue";

const getItemsAction = (queries: {category?: string, status?: string, page: number, limit: number}) => {
    return async (dispatch: any) => {
        try {
            dispatch(itemStart());

            const itemResponse = await APIService(
                API_ITEMS.items,
                APIMethods.GET,
                undefined,
                queries
            );

            // API now returns { data: { data: items, total, page, pages } }
            const itemsArray = itemResponse.data.data.data;
            const totalItems = itemResponse.data.data.total;
            
            dispatch(setItems({ items: itemsArray, totalItems }));
            toast.success("Items loaded.");

        } catch (error) {
            dispatch(itemFail());
            toast.error("Items failed to fetch.");
        }
    }
};

const createItemAction = (itemData: ItemFormValue) => {

    return async (dispatch: any) => {
        try {
            dispatch(itemStart());

            const itemResponse = await APIService(
                API_ITEMS.items,
                APIMethods.POST,
                itemData
            );

            if (itemResponse.data.status === "success") {
                dispatch(itemSuccess());
                toast.success("Item created.");
                return true;
            }

        } catch (error) {
            dispatch(itemFail());
            toast.error("Item failed to create.");
            return false;
        }
    }

};

const updateItemByIdAction = (payload: {id: string, data: ItemFormValue}) => {
    return async (dispatch: any) => {
        try {
            dispatch(itemStart());

            const itemResponse = await APIService(
                API_ITEMS.itemById(payload.id),
                APIMethods.PUT,
                payload.data
            );

            if (itemResponse.data.status === "success") {
                dispatch(itemSuccess());
                toast.success("Item updated.");
                return true;
            }

        } catch (error) {
            dispatch(itemFail());
            toast.error("Item failed to update.");
            return false;
        }
    }
};

const deleteItemByIdAction = (id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(itemStart());

            const itemResponse = await APIService(
                API_ITEMS.itemById(id),
                APIMethods.DELETE
            );

            if (itemResponse.data.status === "success" || itemResponse.status === 204) {
                dispatch(itemSuccess());
                toast.success("Item deleted.");
                return true;
            }

        } catch (error) {
            dispatch(itemFail());
            toast.error("Item failed to delete.");
            return false;
        }
    }
};

const updateItemStatusAction = (payload: {id: string, status: "used" | "wasted"}) => {
    return async (dispatch: any) => {
        try {
            dispatch(itemStart());

            const itemResponse = await APIService(
                API_ITEMS.itemStatus(payload.id),
                APIMethods.PATCH,
                { status: payload.status }
            );

            if (itemResponse.data.status === "success") {
                dispatch(itemSuccess());
                toast.success(`Item marked as ${payload.status}.`);
                return true;
            }

        } catch (error) {
            dispatch(itemFail());
            toast.error("Item failed to update status.");
            return false;
        }
    }
};

export {
    getItemsAction,
    createItemAction,
    updateItemByIdAction,
    deleteItemByIdAction,
    updateItemStatusAction
};
