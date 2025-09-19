import { z } from "zod";

export const signupRoutePostRequestUserSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(16, { message: "Password must be no more than 16 characters" }),
  role: z.string().optional(),
});
