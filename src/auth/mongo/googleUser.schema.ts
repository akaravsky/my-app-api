const mongoose = require("mongoose");
const { Schema } = mongoose;

const GoogleUserSchema = new Schema({
  googleId: String,
});

export default mongoose.model("googleUsers", GoogleUserSchema);
