import { createSlice } from "@reduxjs/toolkit";
import type { Item } from "../../types/Item";

interface ItemsState {
    totalItems: number;
    items: Item[];
    loading: boolean;
    error: boolean;
}

const inititalState: ItemsState = {
    totalItems: 0,
    items: [],
    loading: false,
    error: false
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: inititalState,
    reducers: {

        getItemsStart: (state) => {
            state.loading = true;
            state.error = false;
        },

        createItemStart: (state) => {
            state.loading = true;
            state.error = false;
        },

        itemCreatedSuccess: (state) => {
            state.loading = false;
            state.error = false;
        },

        setItems: (state, action) => {
            state.items = action.payload.items;
            state.totalItems = action.payload.totalItems;
            state.loading = false;
            state.error = false;
        },

        failGetItems: (state) => {
            state.loading = false;
            state.error = true;
        },

        failToCreateItem: (state) => {
            state.loading = false;
            state.error = true;
        }
    }
});

export const { getItemsStart, createItemStart, itemCreatedSuccess, setItems, failGetItems, failToCreateItem } = itemsSlice.actions;
export default itemsSlice.reducer;
