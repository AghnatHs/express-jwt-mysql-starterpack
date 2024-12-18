import { Router } from "express";
import passport from "passport";

import UserController from "../controllers/user.controller.mjs";

const userRouter = Router();

userRouter.get(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => UserController.get(req, res, next)
);
userRouter.post("/api/user", async (req, res, next) =>
  UserController.register(req, res, next)
);
userRouter.get(
  "/api/user/verify/:email/:register_token",
  async (req, res, next) => UserController.verify(req, res, next)
);

export default userRouter;
