const AppConfig = {
  Server: {
    env: process.env.ENV,
    port: process.env.PORT,
    baseBackendUrl: process.env.BASE_BACKEND_URL,
    baseFrontendUrl: process.env.BASE_FRONTEND_URL
  },
  DB: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  Mailer: {
    smtpName: process.env.MAILER_SMTP_NAME,
    smtpHost: process.env.MAILER_SMTP_HOST,
    sender: process.env.MAILER_SENDER,
    email: process.env.MAILER_EMAIL,
    password: process.env.MAILER_PASSWORD,
  },
  JWT: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenMaxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE),
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenMaxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE),
    registerTokenSecret: process.env.REGISTER_TOKEN_SECRET,
    registerTokenMaxAge: Number(process.env.REGISTER_TOKEN_MAX_AGE),
  },
};

export default AppConfig;
