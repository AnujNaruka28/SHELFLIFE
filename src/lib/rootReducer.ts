import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sideBarSlice";
import itemsReducer from "./features/itemsSlice";
import { dashboardStats, dashboardExpiringItems } from "./features/dashboardSlice";
import authReducer from "./features/authSlice";

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    items: itemsReducer,
    dashboardStats,
    dashboardExpiringItems,
    auth: authReducer
})

export default rootReducer;