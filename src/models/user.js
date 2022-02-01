import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
});

const postSchema = mongoose.Schema({
  event: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  numberNeeded: { type: Number, required: true, trim: true },
  Comments: [commentSchema],
});

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    confirmPassword: { type: String, required: true, trim: true },
    isBusiness: false,
    posts: [postSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
