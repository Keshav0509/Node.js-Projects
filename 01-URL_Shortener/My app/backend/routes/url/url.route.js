import express from "express";
import { ensureAuthenticationMiddleware } from "../../middlewares/auth.middleware.js";
import * as controller from "../../controllers/url/url.controller.js";

const router = express.Router();

router.post("/", ensureAuthenticationMiddleware, controller.createShortURL);

router.get(
  "/codes",
  ensureAuthenticationMiddleware,
  controller.getAllShortenUrl
);

router.patch(
  "/update/:id",
  ensureAuthenticationMiddleware,
  controller.updateShortenUrl
);

router.delete(
  "/delete/:id",
  ensureAuthenticationMiddleware,
  controller.deleteShortenUrl
);

router.get(
  "/find/:id",
  ensureAuthenticationMiddleware,
  controller.findShortenUrl
);

export default router;
