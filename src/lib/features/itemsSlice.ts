import { createSlice } from "@reduxjs/toolkit";

const inititalState = {
    totalItems: 0,
    items: [],
    loading: false,
    error: false
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: inititalState,
    reducers: {

        getItems: (state) => {
            state.loading = true;
            state.error = false;
        },

        setItems: (state, action) => {
            state.items = action.payload;
            state.totalItems = action.payload.length;
            state.loading = false;
            state.error = false;
        },

        failGetItems: (state) => {
            state.loading = false;
            state.error = true;
        }
    }
});

export const { getItems, setItems, failGetItems } = itemsSlice.actions;
export default itemsSlice.reducer;
