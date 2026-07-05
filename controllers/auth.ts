import type { Request, Response } from "express";
import { forbidden, notFound, success } from "../utils/response.js";
import { validatePassword } from "../utils/password.js";
import { createUser, findUserByEmail } from "../services/authentication.service.js";
import { generateToken } from "../utils/token.js";

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return notFound(res, "User not found");

    const isPasswordValid = await validatePassword(password, user.password!);
    if (!isPasswordValid) return forbidden(res, "Invalid password");

    const token = generateToken(user);

    user.password = undefined;

    return success(res, "Login successful", { token, user });
};

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) return forbidden(res, "User already exists");

    const newUser = await createUser({ name, email, password });
    const token = generateToken(newUser);

    newUser.password = undefined;

    return success(res, "User registered successfully", { token, user: newUser });
};

export { login, register };
