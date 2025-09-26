import {
  signupRoutePostRequestUserSchema,
  signinRoutePostRequestUserSchema,
  updateUserRoutePatchRequestUserSchema,
} from "../../validations/request.validation.js";
import { roleValidation } from "../../utils/util.js";
import {
  existingUserService,
  insertUserService,
  updateUserService,
} from "../../services/user/user.service.js";
import { hashPassword } from "../../utils/hash.util.js";
import { createUserToken } from "../../utils/token.util.js";

export const userSignup = async (req, res) => {
  try {
    // validate request body.
    const parsed = await signupRoutePostRequestUserSchema.safeParseAsync(
      req.body
    );

    if (!parsed.success) {
      return res.status(400).json({
        error: `Validation failed.`,
        details: parsed.error.format(),
      });
    }

    let { firstname, lastname, email, password, role } = parsed.data;

    // check if user is already exist
    const isUserExisting = await existingUserService(email);

    if (isUserExisting) {
      return res
        .status(400)
        .json({ error: `User already exists with this email.` });
    }

    // validate role
    const validRole = roleValidation(role);
    if (!validRole.success) {
      return res.status(400).json({ error: validRole.message });
    }

    role = validRole.role;

    // hash password
    const { salt, hashedPassword } = hashPassword(password);

    // insert user
    const result = await insertUserService({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      salt,
      role,
    });

    return res.status(201).json({ status: `success`, id: result });
  } catch (error) {
    return res.status(500).json({
      error: `Unexpected error during signup. Please try again later.`,
      details: error.message,
    });
  }
};

export const userSignin = async (req, res) => {
  try {
    // validate request body
    const parsed = await signinRoutePostRequestUserSchema.safeParseAsync(
      req.body
    );

    if (!parsed.success) {
      return res.status(404).json({
        message: `Validation failed`,
        details: parsed.error.format(),
      });
    }

    const { email, password } = parsed.data;

    // check if user is present in the db
    const isUserExisting = await existingUserService(email);
    if (!isUserExisting) {
      return res.status(404).json({
        message: `Authentication failed. User does not exist with this email.`,
      });
    }

    const { id, password: oldhashedPassword, salt, role } = isUserExisting;

    // verify password
    const newHashpassword = await hashPassword(password, salt);
    if (newHashpassword.hashedPassword !== oldhashedPassword) {
      return res.status(401).json({ message: `Invalid password.` });
    }

    // generate token
    const token = await createUserToken({ id, email, role });
    return res.json({ status: `success`, token });
  } catch (error) {
    return res.status(500).json({
      error: `Unexpected error during signin. Please try again later.`,
      message: error.message,
    });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const parsed = await updateUserRoutePatchRequestUserSchema.safeParseAsync(
      req.body
    );
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed during update user details.",
        details: parsed.error.format(),
      });
    }

    const { email, id } = req.user;
    let { firstname, lastname, password, role } = parsed.data;

    // validate role
    const validRole = roleValidation(role);
    if (!validRole.success) {
      return res.status(400).json({ error: validRole.message });
    }

    role = validRole.role;

    const isUserExist = await existingUserService(email);
    if (!isUserExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const { hashedPassword, salt } = await hashPassword(password);

    await updateUserService({
      id,
      firstname,
      lastname,
      password: hashedPassword,
      salt,
      role,
    });
    return res.json({ status: `success` });
  } catch (error) {
    return res.status(500).json({ error: error.message, code: error.code });
  }
};

export const userSignout = async (req, res) => {
  return res.json({ message: `this route is under dev.` });
};
