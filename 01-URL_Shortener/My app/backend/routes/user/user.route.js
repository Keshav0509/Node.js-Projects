import express from "express";
import * as controller from "../../controllers/user/user.controller.js";
import { ensureAuthenticationMiddleware } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", controller.userSignup);
router.post("/signin", controller.userSignin);
router.patch("/update", ensureAuthenticationMiddleware, controller.userUpdate);
router.get("/signout", ensureAuthenticationMiddleware, controller.userSignout);

export default router;
