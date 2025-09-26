import { verifyTokenSchema } from "../validations/token.validation.js";
import { verifyUserToken } from "../utils/token.util.js";

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const authenticationMiddleware = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return next();
    const header = req.headers["authorization"];
    const validationResult = await verifyTokenSchema.safeParseAsync({
      token: header,
    });
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation failed during verify user token.",
        details: validationResult.error.format(),
      });
    }

    const { token: tokenHeader } = validationResult.data;

    if (!tokenHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Invalid token header. Token header must starts with Bearer!",
      });
    }

    const token = tokenHeader.split(" ")[1];

    const payload = await verifyUserToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const ensureAuthenticationMiddleware = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: `Authenticaton failed. Please sign in again.` });
  }
  next();
};

export const restricedToRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(401)
        .json({ message: `${role.toUpperCase()} restricted this route.` });
    }
    next();
  };
};
