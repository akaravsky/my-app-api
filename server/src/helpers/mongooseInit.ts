const mongoose = require("mongoose");

export const mongooseInit = () => {
  mongoose.connect("mongodb://localhost/employees", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once("open", () => console.log("MONGO GO!"))
    .on("error", (error: any) => console.warn("Warning", error));
};
