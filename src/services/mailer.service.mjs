import nodemailer from "nodemailer";

import AppConfig from "../configs/app.config.mjs";

const sender = `"${AppConfig.Mailer.sender}" <${AppConfig.Mailer.email}>`;

const transporter = nodemailer.createTransport({
  name: AppConfig.Mailer.smtpName,
  host: AppConfig.Mailer.smtpHost,
  port: 465,
  secure: true,
  requireTLS: false,
  auth: {
    user: AppConfig.Mailer.email,
    pass: AppConfig.Mailer.password,
  },
});
const MailerService = {
  sendVerifyEmail: async (email, registerToken) => {
    var mailOptions;
    mailOptions = {
      from: sender,
      to: email,
      subject: "Account Activation",
      html: `<html><body>Please activate your account. If you feel you are not registered, please ignore this message. Press <a href="${
        AppConfig.Server.baseFrontendUrl
      }/api/user/verify/${email}/${registerToken}">Verify Email</a> to verify, only valid for ${
        Number(AppConfig.JWT.registerTokenMaxAge) / 60
      } minutes.</body></html>`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
  },
};

export default MailerService;
