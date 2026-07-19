import { Input, InputLabel } from "@mui/material";
import CTAButton from "../components/common/CTAButton";
import type { AuthPropsType } from "../types/AuthPropsType";
import StyledFormControl from "../components/common/StyledFormControl";

const Auth = (AuthProps: AuthPropsType) => {

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <form
        className="flex flex-col gap-4 w-full h-full justify-center"
        onSubmit={handleSubmit}>

            {
                !AuthProps.isLogin && (
                    <StyledFormControl variant="filled">
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" type="text" placeholder="Enter your name" />
                    </StyledFormControl>
                )
            }

            <StyledFormControl variant="filled">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" placeholder="Enter your email" />
            </StyledFormControl>

            <StyledFormControl variant="filled">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" type="password" placeholder="Enter your password" />
            </StyledFormControl>

            <CTAButton
                text={AuthProps.isLogin ? "Login" : "Sign Up"}
                className="mt-4 py-1"
                type="submit"
            />
        </form>
    )
}

export default Auth;