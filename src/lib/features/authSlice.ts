import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    loading: false,
    error: false,
    user: null,
    token: null,
    inviteCode: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setInviteCode: (state, action) => {
            state.inviteCode = action.payload;
        },

        authFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.loading = false;
            state.error = false;
            state.user = null;
            state.token = null;
        }
    }
});

export const { authStart, authSuccess, authFailure, logout, setInviteCode } = authSlice.actions;
export default authSlice.reducer;