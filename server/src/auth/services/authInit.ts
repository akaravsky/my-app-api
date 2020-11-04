import User from "../mongo/user.shema";
import keys from "../config/keys";
import googleAuthRoutes from "../routes/googleRoutes";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

interface UserProfile {
  id: string;
  emails: Array<{ value: string }>;
}

export const authInit = (app: any) => {
  passportInit(app);
  localStrategyInit();
  googleStrategyInit();
  googleAuthRoutes(app);
  serializeUserInit(app);
};

function passportInit(app: any) {
  // Passport is wired into express as a middleware. When a request comes in,
  // Passport will examine the request's session (as set by the above config) and
  // assign the current user to the 'req.user' object.  See also servces/auth.js
  app.use(passport.initialize());
  app.use(passport.session());
}

function localStrategyInit() {
  // Instructs Passport how to authenticate a user using a locally saved email
  // and password combination.  This strategy is called whenever a user attempts to
  // log in.  We first find the user model in MongoDB that matches the submitted email,
  // then check to see if the provided password matches the saved password. There
  // are two obvious failure points here: the email might not exist in our DB or
  // the password might not match the saved one.  In either case, we call the 'done'
  // callback, including a string that messages why the authentication process failed.
  // This string is provided back to the GraphQL client.
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      (email: any, password: any, done: any) => {
        User.findOne({ email: email.toLowerCase() }, (err: any, user: any) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, "Invalid Credentials");
          }
          user.comparePassword(password, (err: any, isMatch: any) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, "Invalid credentials.");
          });
        });
      }
    )
  );
}

function googleStrategyInit() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: keys.googleCallbackURL
      },
      googleCallback
    )
  );
  async function googleCallback(
    accessToken: string,
    refreshToken: string,
    profile: UserProfile,
    done: any
  ) {
    console.log("googleCallback", profile);
    const userEmail = profile.emails[0].value;
    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      done(null, existingUser);
    } else {
      const newUser = await new User({ email: userEmail }).save();
      done(null, newUser);
    }
  }
}

function serializeUserInit(app: any) {
  // SerializeUser is used to provide some identifying token that can be saved
  // in the users session.  We traditionally use the 'ID' for this.
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });
  // The counterpart of 'serializeUser'.  Given only a user's ID, we must return
  // the user object.  This object is placed on 'req.user'.
  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: any, user: any) => {
      setUserToSession(user);
      done(err, user);
    });
  });
  function setUserToSession(user: any) {
    app.use((req: any, res: any) => {
      req.session.user = user;
    });
  }
}
