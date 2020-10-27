const session = require("express-session");

export const sessionInit = (app: any) => {
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
};
