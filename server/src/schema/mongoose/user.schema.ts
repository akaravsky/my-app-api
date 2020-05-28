const mongoose = require("mongoose");
import PostSchema from "./post.schema";
import CompanySchema from "./company.schema";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name: string) => name.length > 2,
      message: "Name must be longer than 2 characters.",
    },
    required: [true, "Name isrequired"],
  },
  likes: Number,
  posts: [PostSchema.schema],
  company: [CompanySchema.schema],
});

export default mongoose.model("user", UserSchema);
