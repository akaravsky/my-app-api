const express = require("express");

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
corsInit(app);
sessionInit(app);
graphqlInit(app);
portInit(app);
authInit(app);
