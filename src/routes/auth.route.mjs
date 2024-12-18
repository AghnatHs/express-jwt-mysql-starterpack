import { Router } from "express";
import AuthController from "../controllers/auth.controller.mjs";

const authRouter = Router();

authRouter.post("/api/auth/login", async (req, res, next) =>
  AuthController.login(req, res, next)
);
authRouter.post("/api/auth/refresh", async (req, res, next) =>
  AuthController.refresh(req, res, next)
);
authRouter.post("/api/auth/logout", async (req, res, next) => {
  AuthController.logout(req, res, next);
});

export default authRouter;
