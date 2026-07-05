import { z } from "zod";
import "dotenv/config.js"

const envSchema = z.object({
  ORIGIN: z.string(),
  MONGO_URI: z.url(),
  PORT: z.string().default("4000"),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CLOUDINARY_CLOUD: z.string().min(9),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_API_KEY: z.string()
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(result.error);
  process.exit(1);
}

const ENV = result.data;

export default ENV;