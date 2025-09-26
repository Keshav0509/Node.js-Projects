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

export const signinRoutePostRequestUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(16, { message: "Password must be no more than 16 characters" }),
});

export const updateUserRoutePatchRequestUserSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(16, { message: "Password must be no more than 16 characters" }),
  role: z.string().optional(),
});

export const createShortURLPostRequestUserSchema = z.object({
  code: z.string().optional(),
  url: z.string().url(),
});

export const updateShortenURLPatchRequestUserSchema = z.object({
  code: z.string().optional(),
  targetUrl: z.string().url(),
});
export const deleteShortenURLDeleteRequestUserSchema = z.object({
  id: z.string(),
});
