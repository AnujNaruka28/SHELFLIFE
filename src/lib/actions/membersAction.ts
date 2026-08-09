import { toast } from "react-toastify";
import { API_HOUSEHOLD } from "../apis";
import { APIMethods, APIService } from "../APIService";
import { getMembersFailure, getMembersStart, setMembers } from "../features/membersSlice"


const getMembers = () => {
    return async (dispatch: any, getState: any) => {
        try {
            dispatch(getMembersStart());

            const householdId = getState().auth.user.householdId;

            const membersResponse = await APIService(
                API_HOUSEHOLD.members(householdId),
                APIMethods.GET
            )
            
            dispatch(setMembers(membersResponse.data.data));

            toast.success("Members fetched successfully");
        } catch (error: any) {
            dispatch(getMembersFailure("Failed to fetch members"));
            toast.error(`Failed to fetch members ${error.message}`);
        }
    }
}

export { getMembers }