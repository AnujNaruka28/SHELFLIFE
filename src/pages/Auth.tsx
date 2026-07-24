import { Input, InputLabel } from "@mui/material";
import CTAButton from "../components/common/CTAButton";
import type { AuthPropsType } from "../types/AuthPropsType";
import StyledFormControl from "../components/common/StyledFormControl";
import { useForm } from "react-hook-form";
import type { AuthFormValue } from "../types/AuthFormValue";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../lib/store";
import { loginAction, signupAction } from "../lib/actions/authAction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAppDispatch = () => useDispatch<AppDispatch>();

const Auth = (AuthProps: AuthPropsType) => {

    const dispatch = useAppDispatch();
    const { loading,token,user } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<AuthFormValue>();

    useEffect(() => {
        if (token && user) {
            navigate("/dashboard");
        } 
    }, [token,user])

    const onSubmit = (data: AuthFormValue) => {
        if (AuthProps.isLogin) {
            dispatch(loginAction({email: data.email, password: data.password}, navigate));
        } else {
            dispatch(signupAction(data.name!, data.email, data.password));
        }
    };

    return (
        <form
        className="flex flex-col gap-4 w-full h-full justify-center"
        onSubmit={handleSubmit(onSubmit)}>

            {
                !AuthProps.isLogin && (
                    <StyledFormControl variant="filled">
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input 
                            id="name" 
                            type="text" 
                            placeholder="Enter your name"
                            { 
                                ...register("name", {
                                    required: "Name is required"
                                })
                            } 
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
                    </StyledFormControl>
                )
            }

            <StyledFormControl variant="filled">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    {
                        ...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email"
                            }
                        })
                    }
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
            </StyledFormControl>

            <StyledFormControl variant="filled">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    {
                        ...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })
                    }
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message as string}</span>}
            </StyledFormControl>

            <CTAButton
                text={AuthProps.isLogin ? "Login" : "Sign Up"}
                className="mt-4 py-1"
                type="submit"
                reactNode={loading ? <></> : undefined}
            />
        </form>
    )
}

export default Auth;