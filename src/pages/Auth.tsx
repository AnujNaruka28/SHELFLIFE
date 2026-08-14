import { Input, InputLabel } from "@mui/material";
import CTAButton from "../components/common/CTAButton";
import type { AuthPropsType } from "../types/AuthPropsType";
import StyledFormControl from "../components/common/StyledFormControl";
import { Controller, useForm } from "react-hook-form";
import type { AuthFormValue } from "../types/AuthFormValue";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../lib/store";
import { loginAction, signupAction } from "../lib/actions/authAction";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuthAndHouseholdCheck from "../hooks/useAuthAndHouseholdCheck";
import { APIService } from "../lib/APIService";
import { API_AUTH } from "../lib/apis";
import { toast } from "react-toastify";
import OTP, { type OTPProps } from "antd/es/input/OTP";
import type { GetProp } from "antd";

const stylesFnOTP: OTPProps['styles'] = (info): GetProp<OTPProps, 'styles', 'Return'> => {
  if (info.props.size === 'medium') {
    return {
      root: {
        borderWidth: 0,
        columnGap: 6,
        margin: '0 auto'
      },
      input: {
        borderColor: 'var(--primary)',
        width: 32,
        height: 32,
      },
    };
  }
  return {};
};

const useAppDispatch = () => useDispatch<AppDispatch>();

const Auth = (AuthProps: AuthPropsType) => {

    const dispatch = useAppDispatch();
    const {hasHousehold,loading,token,setLoading} = useAuthAndHouseholdCheck();
    const navigate = useNavigate();
    const [otpBox,setOtpBox] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: {
            errors
        }
    } = useForm<AuthFormValue>();

    useEffect(() => {
        if (token && hasHousehold) {
            navigate("/dashboard");
        } else if(token && !hasHousehold) {
            navigate("/");
        }
    }, [token,hasHousehold,navigate])

    const onSubmit = (data: AuthFormValue) => {
        if (AuthProps.isLogin) {
            dispatch(loginAction({email: data.email, password: data.password}, navigate));
        } else {
            (async () => {

                try {
                    
                    const response = await APIService(
                        API_AUTH.otp,
                        "POST",
                        {
                            email: data.email
                        }   
                    )

                    if(response.status === 200) {
                        toast.success("OTP sent successfully");
                        setOtpBox(true);
                        setLoading(true);
                    }
                    
                } catch (error) {
                    toast.error("Failed to send OTP");
                }

                
            })();

        }
    };

    const handleVerifyOTP = () => {
        const formData = getValues();
        dispatch(signupAction(
            formData.name!, 
            formData.email, 
            formData.password, 
            Number(formData.otp!), 
            navigate
        ));
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
                reactNode={loading ? <Loader isButton={true}/> : undefined}
                disabled={loading}
            />

            <div className="flex justify-end">
                <Link to={AuthProps.isLogin ? "/register" : "/login"} className="text-blue-500 hover:underline">
                    {
                        AuthProps.isLogin ? "Don't have an account?" : "Already have an account?"
                    }
                </Link>
            </div>

            {
                !AuthProps.isLogin && otpBox && (

                    <div className="w-full flex flex-col">

                    <Controller
                        name="otp"
                        control={control}
                        rules={{
                            required: "OTP is required",
                            validate: (value) => String(value)?.length === 6 || "OTP must be 6 digits"
                        }}
                        render={({field}) => (
                            <>
                                <OTP
                                    styles={stylesFnOTP} 
                                    size="medium" 
                                    length={6} 
                                    separator="-" 
                                    value={String(field.value || '')}
                                    onChange={(value) => field.onChange(value)}
                                />
                                {errors.otp && <span className="text-red-500 text-xs">{errors.otp.message as string}</span>}
                            </>

                        )}
                    />

                    <CTAButton
                        reactNode={loading ? <Loader/> : <>Verify OTP</>}
                        className="mt-4 py-2 px-4 w-fit ml-auto"
                        type="button"
                        onClick={handleVerifyOTP}
                        disabled={loading}
                    />

                    </div>
                )
            }
        </form>
    )
}

export default Auth;