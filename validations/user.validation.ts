import z from "zod";

const userSchema = z.object({
    name: z.string().min(2).max(30).refine((val: string) => val.trim().length > 0, "Name cannot be empty"),
    email: z.email("Invalid email address").refine((val: string) => val.trim().length > 0, "Email cannot be empty"),
    password: z.string().min(6).max(100).refine((val: string) => val.trim().length > 0, "Password cannot be empty"),
    householdId: z.string().optional(),
    profileImage: z.object({
        secure_url: z.url().optional(),
        public_id: z.string().optional(),
    }).optional(),
    role: z.enum(["admin", "member"]).default("member"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

const loginSchema = userSchema.pick({ email: true, password: true });
const registerSchema = userSchema.pick({ name: true, email: true, password: true }).extend({
    otp: z.number().optional(),
});

const verifyOtpSchema = z.object({
    email: z.email("Invalid email address"),
});

export { userSchema, loginSchema, registerSchema, verifyOtpSchema };
