import { nanoid } from "nanoid";
import { userRoleEnum } from "../models/user/user.model.js";

export const roleValidation = (role) => {
  if (!role?.trim()) return { success: true, role: "user" };
  if (role?.trim() === "") return { success: true, role: "user" };

  const normalizedRole = role?.trim().toLowerCase() || "user";

  if (!userRoleEnum.enumValues.includes(normalizedRole)) {
    return {
      success: false,
      message: `Invalid role: '${normalizedRole}'. Allowed roles are: ${userRoleEnum.enumValues.join(", ")}`,
    };
  }

  return { success: true, role: normalizedRole };
};

export const createShortCode = (code = undefined) => {
  return !code?.trim() ? nanoid(6) : code;
};
