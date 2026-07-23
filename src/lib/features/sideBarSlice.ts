import { createSlice } from "@reduxjs/toolkit";

const initialSidebarState = {
    open: localStorage.getItem("sidebarOpen") === "true",
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: initialSidebarState,
    reducers: {
        toggleSidebar: (state) => {
            state.open = !state.open;
            localStorage.setItem("sidebarOpen", state.open.toString());
        }
    }
});


export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;

