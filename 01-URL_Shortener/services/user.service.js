import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";

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
    return { code: error.code };
  }
};

export const existingUserService = async (email) => {
  try {
    const [result] = await db
      .select({ id: usersTable.id, role: usersTable.role })
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return result;
  } catch (error) {
    return { error: error.code };
  }
};
