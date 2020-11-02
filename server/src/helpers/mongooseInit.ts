import keys from "../auth/config/keys";

const mongoose = require("mongoose");

export const mongooseInit = () => {
  mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once("open", () => console.log("MONGO GO!"))
    .on("error", (error: any) => console.warn("Warning", error));
};
