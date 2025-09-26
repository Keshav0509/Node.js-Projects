import { z } from "zod";

export const createTokenSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export const verifyTokenSchema = z.object({
  token: z.string(),
});
