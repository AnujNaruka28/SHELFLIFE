import { createSlice } from "@reduxjs/toolkit";

const inititalState = {
    totalItems: 0,
    items: []
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: inititalState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setTotalItems: (state, action) => {
            state.totalItems = action.payload;
        }
    }
});

export const { setItems, setTotalItems } = itemsSlice.actions;
export default itemsSlice.reducer;
