import { eq } from "drizzle-orm";
import db from "../../db/index.js";
import { usersTable } from "../../models/user/user.model.js";
import { CustomError } from "../../utils/customError.util.js";

export const insertUserService = async ({
  firstname,
  lastname,
  email,
  password,
  salt,
  role,
}) => {
  try {
    firstname = firstname?.trim();
    lastname = lastname?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();
    role = role?.trim().toLowerCase() === "" || !role ? "user" : role;

    const [result] = await db
      .insert(usersTable)
      .values({
        firstname,
        lastname,
        email,
        password,
        salt,
        role,
      })
      .returning({ id: usersTable.id });
    return result.id;
  } catch (error) {
    throw new CustomError(
      `Unable to register! Please try again later.`,
      error?.code
    );
  }
};

export const updateUserService = async ({
  id,
  firstname,
  lastname,
  password,
  salt,
  role = "user",
}) => {
  try {
    if (!role?.trim()) role = "user";
    firstname = firstname?.trim();
    lastname = lastname?.trim();

    await db
      .update(usersTable)
      .set({ firstname, lastname, password, salt, role })
      .where(eq(usersTable.id, id));
  } catch (error) {
    throw new CustomError(
      `Unable to update user details. Please try again later.`,
      error?.code
    );
  }
};

export const existingUserService = async (email) => {
  try {
    email = email?.trim().toLowerCase();

    const [result] = await db
      .select({
        id: usersTable.id,
        password: usersTable.password,
        salt: usersTable.salt,
        role: usersTable.role,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return result;
  } catch (error) {
    throw new CustomError(`Unable to find user!`, error?.code);
  }
};
