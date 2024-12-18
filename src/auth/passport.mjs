import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import AppConfig from "../configs/app.config.mjs";
import UserQuery from "../database/user.query.mjs";

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies.accessToken;
  }

  return jwt;
};

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: AppConfig.JWT.accessTokenSecret,
    },
    (jwtPayload, done) => {
      const { exp } = jwtPayload;

      if (!jwtPayload) done(null, false);

      if (Date.now() > exp * 1000) {
        done(null, false);
      }

      done(null, jwtPayload);
    }
  )
);
