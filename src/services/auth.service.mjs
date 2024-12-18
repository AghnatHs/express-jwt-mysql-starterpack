import bcrypt from "bcrypt";

import UserQuery from "../database/user.query.mjs";
import { AuthenticationError } from "../errors/customErrors.mjs";
import AuthSchema from "../validators/auth.schema.mjs";
import validate from "../validators/validator.mjs";
import TokenService from "./token.service.mjs";
import AppConfig from "../configs/app.config.mjs";

const AuthService = {
  login: async (req, res) => {
    const credentials = validate(AuthSchema.login, req.body);

    const user = await UserQuery.getCustomerForAuth(credentials.email);
    if (!user) throw new AuthenticationError("Failed login, user not found");
    if (user.isActive === 0)
      throw new AuthenticationError(
        "Failed login, user has not activated account"
      );

    const isPasswordMatch = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordMatch)
      throw new AuthenticationError("Failed login, wrong credentials");

    const { id, email } = user;
    const accessToken = TokenService.generateAccessToken({ id, email });
    const refreshToken = TokenService.generateRefreshToken({ id, email });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: AppConfig.Server.env === "production",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: AppConfig.JWT.refreshTokenMaxAge * 1000,
      httpOnly: true,
      secure: AppConfig.Server.env === "production",
    });

    return "Login successfull";
  },
  logout: async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return "Logout successfull";
  },
  refresh: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new AuthenticationError("Missing refresh token");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    try {
      const { id, email } = TokenService.verifyToken(
        refreshToken,
        AppConfig.JWT.refreshTokenSecret
      );

      const newAccessToken = TokenService.generateAccessToken({ id, email });
      const newRefreshToken = TokenService.generateRefreshToken({ id, email });
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: AppConfig.Server.env === "production",
      });
      res.cookie("refreshToken", newRefreshToken, {
        maxAge: AppConfig.JWT.refreshTokenMaxAge * 1000,
        httpOnly: true,
        secure: AppConfig.Server.env === "production",
      });

      return "Token refreshed successfully";
    } catch (error) {
      throw new AuthenticationError("Invalid refresh token");
    }
  },
};

export default AuthService;
