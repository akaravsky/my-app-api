const cors = require("cors");

export const corsInit = (app: any) => {
  app.use(
    cors({
      origin: ["http://localhost:8080", "https://accounts.google.com"],
      credentials: true,
    })
  );
};
