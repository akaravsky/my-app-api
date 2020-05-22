const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post.schema");

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
  posts: [PostSchema],
});

export default mongoose.model("user", UserSchema);
