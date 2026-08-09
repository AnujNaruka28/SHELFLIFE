import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { APIMethods,APIService } from "../lib/APIService";
import { API_HOUSEHOLD } from "../lib/apis";
import { toast } from "react-toastify";
import { setInviteCode, setHouseholdName } from "../lib/features/authSlice";

const useAuthAndHouseholdCheck = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { token } = useSelector((state: any) => state.auth);
    const [hasHousehold, setHasHousehold] = useState<boolean | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const checkAuthAndHousehold = async () => {
            if (!token) {
                // Only redirect if not already on auth pages
                if (
                    location.pathname !== "/login" && 
                    location.pathname !== "/register" && 
                    location.pathname !== "/"
                ) {
                    navigate("/login");
                }
                setLoading(false);
                return;
            }

            try {
                const response = await APIService(
                    API_HOUSEHOLD.get,
                    APIMethods.GET
                );
                
                if (response.data.data) {
                    setHasHousehold(true);
                    dispatch(setInviteCode(response.data.data.inviteCode));
                    dispatch(setHouseholdName(response.data.data.name));
                } else {
                    navigate("/");
                }
            } catch (error: any) {
                toast.error("Join or create Household to continue");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndHousehold();
    }, [token, navigate, location.pathname, dispatch]);

    return {
        hasHousehold,
        loading,
        token,
        setLoading
    };

};

export default useAuthAndHouseholdCheck;
