import Joi from "joi";

const AuthSchema = {
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Valid email is required",
      "string.email": "Email not valid",
      "any.required": "Valid email is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  }),
};

export default AuthSchema;
