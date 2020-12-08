const passport = require("passport");

interface Req {
  session: {
    passport: {
      user: {
        id: string;
      };
    };
  };
  user: any;
  logout: Function;
}
interface Res {
  send: Function;
  redirect: Function;
}

export default function googleAuthRoutes(app: any) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), function (
    req: Req,
    res: Res
  ) {
    console.log("/auth/google/callback");
    res.redirect("/");
  });

  app.get("api/logout", (req: Req, res: Res) => {
    req.logout(); //logout bound by passport lib
    res.send(req.session.passport);
  });

  app.get("/", (req: Req, res: Res) => {
    res.send(req.user);
  });
}
