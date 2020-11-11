const express = require("express");
const passport = require("passport");

import { authInit } from "./auth/services/authInit";
import {
  mongooseInit,
  corsInit,
  sessionInit,
  graphqlInit,
  portInit,
} from "./helpers";

const app = express();

mongooseInit();
sessionInit(app);
portInit(app);
passportInit(app);
corsInit(app);
authInit(app);
graphqlInit(app);

function passportInit(app: any) {
  // Passport is wired into express as a middleware. When a request comes in,
  // Passport will examine the request's session (as set by the above config) and
  // assign the current user to the 'req.user' object.  See also servces/auth.js
  app.use(passport.initialize());
  app.use(passport.session());
}
