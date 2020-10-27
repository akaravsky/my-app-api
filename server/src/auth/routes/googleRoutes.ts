const passport = require("passport");

export default function googleAuthRoutes(app: any) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    function () {
      // Successful authentication, redirect home.
    }
  );
}
