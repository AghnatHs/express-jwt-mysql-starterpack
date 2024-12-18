import bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";

import UserQuery from "../database/user.query.mjs";
import UserSchema from "../validators/user.schema.mjs";
import validate from "../validators/validator.mjs";
import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
} from "../errors/customErrors.mjs";
import MailerService from "./mailer.service.mjs";
import TokenService from "./token.service.mjs";
import AppConfig from "../configs/app.config.mjs";

const UserService = {
  get: async (req) => {
    if (req.user) {
      const { email } = req.user;
      const userFromDb = await UserQuery.getCustomer(email);
      return userFromDb;
    } else {
      throw new AuthorizationError("Unauthorized. Please log in");
    }
  },
  register: async (req) => {
    const newUser = validate(UserSchema.register, req.body);

    const isEmailExist = await UserQuery.isEmailExist(newUser.email);
    if (isEmailExist) throw new BadRequestError("Email already registered");

    newUser.id = uuidv7();
    newUser.hashedPassword = await bcrypt.hash(newUser.password, 10);

    await UserQuery.registerUser(
      newUser.id,
      newUser.email,
      newUser.hashedPassword
    );
    const registerToken = TokenService.generateRegisterToken(newUser.email);

    await MailerService.sendVerifyEmail(newUser.email, registerToken);

    return {
      id: newUser.id,
      email: newUser.email,
    };
  },
  verify: async (req) => {
    const { email, register_token } = req.params;

    const { email: emailFromJwt } = TokenService.verifyToken(
      register_token,
      AppConfig.JWT.registerTokenSecret
    );
    if (email !== emailFromJwt) throw new BadRequestError("Invalid token");

    const isUserActive = await UserQuery.isUserActive(emailFromJwt);
    if (isUserActive) throw new AuthenticationError("Already activated");

    await UserQuery.activateUser(emailFromJwt);

    return "Activated";
  },
};

export default UserService;
