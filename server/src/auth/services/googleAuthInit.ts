import keys from "../config/keys";
import googleAuthRoutes from "../routes/googleRoutes";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

export const googleAuthInit = (app: any) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
      },
      (accessToken: string) => {
        console.log("accessToken", accessToken);
      }
    )
  );
  googleAuthRoutes(app);
};
