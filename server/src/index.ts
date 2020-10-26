const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");

const session = require("express-session");
const passport = require("passport");

import schema from "./schema/graphQL/root.schema";
import keys from "./auth/config/keys";

mongoose.connect("mongodb://localhost/employees", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", () => console.log("MONGO GO!"))
  .on("error", (error: any) => console.warn("Warning", error));

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "aaabbbccc",
  })
);

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken: string) => {
      console.log(accessToken);
    }
  )
);

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.get("/", (req: any, res: any) => res.send("Hello World!"));

app.get("/about/ab", (req: any, res: any) =>
  res.json({ text: "This is about!" })
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", passport.authenticate("google"), function () {
  // Successful authentication, redirect home.
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
