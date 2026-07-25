import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { APIMethods,APIService } from "../lib/APIService";
import { API_HOUSEHOLD } from "../lib/apis";
import { toast } from "react-toastify";

const useAuthAndHouseholdCheck = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useSelector((state: any) => state.auth);
    const [hasHousehold, setHasHousehold] = useState<boolean | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const checkAuthAndHousehold = async () => {
            if (!token) {
                // Only redirect if not already on auth pages
                if (location.pathname !== "/login" && location.pathname !== "/register") {
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
                
                if (response.data) {
                    setHasHousehold(true);
                } else {
                    navigate("/");
                }
            } catch (error) {
                toast.error("Failed to load household data");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndHousehold();
    }, [token, navigate, location.pathname]);

    return {
        hasHousehold,
        loading,
        token
    };

};

export default useAuthAndHouseholdCheck;
