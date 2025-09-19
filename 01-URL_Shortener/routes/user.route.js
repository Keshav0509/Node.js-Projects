import express from "express";
import * as controller from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", controller.userSignup);

export default router;
