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

if(process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  //like our main.js file, or main.css file
  app.use(express.static('../front/build'))

  //Express will serve up the index.html file
  //if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

function passportInit(app: any) {
  // Passport is wired into express as a middleware. When a request comes in,
  // Passport will examine the request's session (as set by the above config) and
  // assign the current user to the 'req.user' object.  See also servces/auth.js
  app.use(passport.initialize());
  app.use(passport.session());
}
