import db from "../../db/index.js";
import { usersTable } from "../../models/user/user.model.js";
import { urlsTable } from "../../models/url/url.model.js";
import { CustomError } from "../../utils/customError.util.js";

export const getAllUsersService = async () => {
  try {
    const result = await db
      .select({
        id: usersTable.id,
        firstname: usersTable.firstname,
        lastname: usersTable.lastname,
        email: usersTable.email,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      })
      .from(usersTable);
    return result;
  } catch (error) {
    return new CustomError(
      `Unexpected error while getting users details.`,
      error?.code
    );
  }
};

export const getAllURLsService = async () => {
  try {
    const result = await db
      .select({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl,
        userId: urlsTable.userId,
        createdAt: urlsTable.createdAt,
        updatedAt: urlsTable.updatedAt,
      })
      .from(urlsTable);
    return result;
  } catch (error) {
    return new CustomError(
      `Unexpected error while getting shorten urls details.`,
      error?.code
    );
  }
};
