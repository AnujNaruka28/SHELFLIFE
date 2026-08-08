import { createSlice } from "@reduxjs/toolkit";

const initialStatsState = {
    totalItems: 0,
    wasteScore: 0,
    fresh: 0,
    expiring: 0,
    expired: 0,
    wasted: 0,
    used: 0,
    statsLoading: false,
    statsFetchError: false   
}

const initialExpiringItemsState = {
    itemsExpiring: [],
    itemsLoading: false,
    itemsFetchError: false   
}

const dashboardStatsSlice = createSlice({
    name: 'dashboardStats',
    initialState: initialStatsState,
    reducers: {

        getDashboard: (state) => {
            state.statsLoading = true;
            state.statsFetchError = false;
        },

        setDashboard: (_state, action) => {
            return {
                ...action.payload,
                statsLoading: false,
                statsFetchError: false
            };
        },

        failGetDashboard: (state) => {
            state.statsLoading = false;
            state.statsFetchError = true;
        }

    }
});

const dashboardExpiringItemsSlice = createSlice({
    name: 'dashboardExpiringItems',
    initialState: initialExpiringItemsState,
    reducers: {

        getExpiringItems: (state) => {
            state.itemsLoading = true;
            state.itemsFetchError = false;
        },

        setExpiringItems: (state, action) => {
            state.itemsExpiring = action.payload;
            state.itemsLoading = false;
            state.itemsFetchError = false;
        },

        failGetExpiringItems: (state) => {
            state.itemsLoading = false;
            state.itemsFetchError = true;
        }

    }
});

export const { setDashboard, getDashboard, failGetDashboard } = dashboardStatsSlice.actions;
export const { setExpiringItems, getExpiringItems, failGetExpiringItems } = dashboardExpiringItemsSlice.actions;
export const dashboardStats = dashboardStatsSlice.reducer;
export const dashboardExpiringItems = dashboardExpiringItemsSlice.reducer;