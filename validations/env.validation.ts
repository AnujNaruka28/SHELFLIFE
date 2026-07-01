import { env } from "bun";
import {z} from "zod";

const envSchema = z.object({
  MONGO_URI: z.url("MONGO_URI is required"),
  PORT: z.string().min(4, "PORT is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().min(1, "JWT_EXPIRES_IN is required"),
  NODE_ENV: z.enum(["development", "production", "test"])
});

const ENV = envSchema.parse(env);

export default ENV;