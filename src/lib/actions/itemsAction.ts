import { toast } from "react-toastify";
import { API_ITEMS } from "../apis";
import { APIMethods, APIService } from "../APIService";
import { createItemStart, failGetItems, failToCreateItem, getItemsStart, itemCreatedSuccess, setItems } from "../features/itemsSlice";
import type { ItemFormValue } from "../../types/ItemFormValue";

const getItemsAction = (queries: {category?: string, status?: string, page: number, limit: number}) => {
    return async (dispatch: any) => {
        try {
            dispatch(getItemsStart());

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
            dispatch(failGetItems());
            toast.error("Items failed to fetch.");
        }
    }
};

const createItemAction = (itemData: ItemFormValue) => {

    return async (dispatch: any) => {
        try {
            dispatch(createItemStart());

            const itemResponse = await APIService(
                API_ITEMS.items,
                APIMethods.POST,
                itemData
            );

            if (itemResponse.data.success) {
                dispatch(itemCreatedSuccess());
                toast.success("Item created.");
            }

        } catch (error) {
            dispatch(failToCreateItem());
            toast.error("Item failed to create.");
        }
    }

};

const updateItemByIdAction = () => {};

const deleteItemByIdAction = () => {};

export {
    getItemsAction,
    createItemAction,
    updateItemByIdAction,
    deleteItemByIdAction
};
