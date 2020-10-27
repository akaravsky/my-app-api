const passport = require("passport");

export default function passportInit(app: any) {
  // Passport is wired into express as a middleware. When a request comes in,
  // Passport will examine the request's session (as set by the above config) and
  // assign the current user to the 'req.user' object.  See also servces/auth.js
  app.use(passport.initialize());
  app.use(passport.session());
}
