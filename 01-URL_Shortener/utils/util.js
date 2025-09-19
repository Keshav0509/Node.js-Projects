import { userRoleEnum } from "../models/user.model.js";

export const roleValidation = (role) => {
  if (role?.trim() === "") return "user";

  const normalizedRole = role?.trim().toLowerCase() || "user";
  if (!userRoleEnum.enumValues.includes(normalizedRole)) {
    throw new Error(
      `Invalid role: '${normalizedRole}'. Allowed roles are: ${userRoleEnum.enumValues.join(", ")}`
    );
  }

  return normalizedRole;
};
