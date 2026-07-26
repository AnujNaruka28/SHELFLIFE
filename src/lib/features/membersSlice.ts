import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    members: [],
    membersFetching: false,
    membersError: null
}

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {

        getMembersStart : (state) => {
            state.membersFetching = true;
            state.membersError = null;
        },

        setMembers : (state,action) => {
            state.membersFetching = false;
            state.membersError = null;
            state.members = action.payload;
        },

        getMembersFailure : (state,action) => {
            state.membersFetching = false;
            state.membersError = action.payload;
        }
    }
})

export const { setMembers, getMembersStart, getMembersFailure } = membersSlice.actions;
export default membersSlice.reducer;
