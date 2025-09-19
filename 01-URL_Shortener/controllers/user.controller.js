import { signupRoutePostRequestUserSchema } from "../validations/request.validation.js";
import { roleValidation } from "../utils/util.js";
import {
  existingUserService,
  insertUserService,
} from "../services/user.service.js";
import { hashPassword } from "../utils/hash.util.js";

export const userSignup = async (req, res) => {
  try {
    const validationResult =
      await signupRoutePostRequestUserSchema.safeParseAsync(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: `Validation failed.`,
        details: validationResult.error.format(),
      });
    }

    let { firstname, lastname, email, password, role } = validationResult.data;

    const isUserExisting = await existingUserService(email);
    console.log(isUserExisting);
    if (isUserExisting) {
      return res
        .status(400)
        .json({ error: `User already exist with this email.` });
    }

    role = roleValidation(role);

    const { salt, hashedPassword } = hashPassword(password);
    const result = await insertUserService({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      salt,
      role,
    });

    return res.json({ status: `success`, id: result });
  } catch (error) {
    return res.status(500).json({
      error: `Unexpected error during signup. Please try again later.`,
      details: error.message,
    });
  }
};

export const userSignin = async (req, res) => {};

export const userUpdate = async (req, res) => {};

export const userDelete = async (req, res) => {};
