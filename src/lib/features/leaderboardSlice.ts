import { createSlice } from "@reduxjs/toolkit"
import type { LeaderboardRanking } from "../../types/Leaderboard"

const initialState = {
    leaderboard: [] as LeaderboardRanking[],
    loading: false,
    error: false
}

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        getLeaderboard: (state) => {
            state.loading = true;
            state.error = false;
        },

        setLeaderboard: (state, action) => {
            state.leaderboard = action.payload;
            state.loading = false;
            state.error = false;
        },

        failGetLeaderboard: (state) => {
            state.loading = false;
            state.error = true;
        }
    }
})

export const { getLeaderboard, setLeaderboard, failGetLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer