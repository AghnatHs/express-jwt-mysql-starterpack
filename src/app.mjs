import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import passport from "passport";

import authRouter from "./routes/auth.route.mjs";
import userRouter from "./routes/user.route.mjs";
import errorHandler from "./middlewares/error.middleware.mjs";

import "./auth/passport.mjs"

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(authRouter);
app.use(userRouter);
app.use(errorHandler);

export default app;
