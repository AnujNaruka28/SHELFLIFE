import { toast } from "react-toastify";
import { API_ITEMS } from "../apis";
import { APIMethods, APIService } from "../APIService";
import { failGetItems, getItems, setItems } from "../features/itemsSlice";

const getItemsAction = (queries: {category: string, status: string, page: number, limit: number}) => {
    return async (dispatch: any) => {
        try {
            dispatch(getItems());

            const itemResponse = await APIService(
                API_ITEMS.items,
                APIMethods.GET,
                null,
                queries
            );

            // Convert object with numeric keys to array
            const itemsArray = Object.values(itemResponse.data.data).filter(
                (item: any) => typeof item === 'object' && item !== null
            );
            dispatch(setItems(itemsArray));
            toast.success("Items loaded.");

        } catch (error) {
            dispatch(failGetItems());
            toast.error("Items failed to fetch.");
        }
    }
};

const createItemAction = () => {};

const updateItemByIdAction = () => {};

const deleteItemByIdAction = () => {};

export {
    getItemsAction,
    createItemAction,
    updateItemByIdAction,
    deleteItemByIdAction
};
