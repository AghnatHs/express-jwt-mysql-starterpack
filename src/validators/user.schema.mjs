import Joi from "joi";

const UserSchema = {
  register: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.empty": "Valid email is required",
        "string.email": "Email not valid",
        "any.required": "Valid email is required",
      }),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be 8 - 255 character",
        "string.max": "Password must be 8 - 255 character",
        "any.required": "Password is required",
      }),
    confirm_password: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Confirm password not match with password",
        "any.required": "Confirm password is required",
      }),
  }).with("password", "confirm_password"),
};


export default UserSchema;
