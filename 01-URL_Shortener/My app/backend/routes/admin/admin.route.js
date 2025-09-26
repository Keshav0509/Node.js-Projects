import express from "express";
import * as controller from "../../controllers/admin/admin.controller.js";
import {
  ensureAuthenticationMiddleware,
  restricedToRole,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// restriced route.
const adminRestrictions = restricedToRole("admin");

router.get(
  "/users",
  ensureAuthenticationMiddleware,
  adminRestrictions,
  controller.getAllUsers
);
router.get(
  "/codes",
  ensureAuthenticationMiddleware,
  adminRestrictions,
  controller.getAllUrls
);

export default router;
