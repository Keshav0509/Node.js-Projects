import "dotenv/config";
import jwt from "jsonwebtoken";
import { createTokenSchema } from "../validations/token.validation.js";

export const createUserToken = async (data) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw Error(`Server configuration error: JWT_SECRET is missing`);
    }
    const validationResult = await createTokenSchema.safeParseAsync(data);
    if (!validationResult.success) {
      throw Error("Validation failed during create user token.");
    }
    const payload = validationResult.data;
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    throw Error("Unexpected error during create user token.");
  }
};

export const verifyUserToken = async (token) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw Error(`Server configuration error: JWT_SECRET is missing`);
    }
    if (!token?.trim()) {
      throw Error(`Verification failed: Token is missing.`);
    }
    const result = await jwt.verify(token, process.env.JWT_SECRET);
    return result;
  } catch (error) {
    throw Error("Unexpected error occured during verify token.");
  }
};
