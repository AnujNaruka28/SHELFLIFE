import { APIMethods, APIService } from "../APIService";
import { API_AUTH } from "../apis";
import { authStart, authSuccess, authFailure } from "../features/authSlice";
import { toast } from "react-toastify";
import type { NavigateFunction } from "react-router-dom";

const loginAction = (loginData: { email: string; password: string }, navigate: NavigateFunction) => {
    return async (dispatch: any) => {
        try {
            dispatch(authStart());
            
            const response = await APIService(
                API_AUTH.login,
                APIMethods.POST,
                loginData
            );
            
            dispatch(authSuccess({
                user: response.data.data.user,
                token: response.data.data.token
            }));

            navigate('/dashboard');
            
            toast.success("Login successful");
        } catch (error) {
            dispatch(authFailure());
            toast.error("Login failed");
        }
    };
};

const signupAction = (name: string, email: string, password: string, navigate: NavigateFunction) => {
    return async (dispatch: any) => {
        try {
            dispatch(authStart());
            
            const response = await APIService(
                API_AUTH.register,
                APIMethods.POST,
                { name, email, password }
            );
            
            dispatch(authSuccess({
                user: response.data.data.user,
                token: response.data.data.token
            }));

            navigate('/dashboard');
            
            toast.success("Signup successful");
        } catch (error) {
            dispatch(authFailure());
            toast.error("Signup failed");
        }
    };
};

export { loginAction, signupAction };