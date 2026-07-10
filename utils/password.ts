import bcrypt from "bcryptjs";

const hashPassword = (password: string) : Promise<string> => bcrypt.hash(password, 10);

const validatePassword = (password: string, hashedPassword: string) : Promise<boolean> => bcrypt.compare(password, hashedPassword);

const isSamePassword = (password: string, hashedPassword: string) : Promise<boolean> => bcrypt.compare(password, hashedPassword);

export { hashPassword, validatePassword, isSamePassword };