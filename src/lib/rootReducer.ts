import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sideBarSlice";
import itemsReducer from "./features/itemsSlice";

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    items: itemsReducer
})

export default rootReducer;