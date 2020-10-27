const express = require("express");

import { googleAuthInit } from "./auth/services/googleAuthInit";
import passportInit from "./auth/services/passport";
import {
  mongooseInit,
  corsInit,
  sessionInit,
  graphqlInit,
  portInit,
} from "./helpers";

const app = express();

mongooseInit();
corsInit(app);
passportInit(app);
sessionInit(app);
graphqlInit(app);
portInit(app);
googleAuthInit(app);
