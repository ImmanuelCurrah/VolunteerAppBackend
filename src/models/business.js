import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
});

const postSchema = mongoose.Schema({
  event: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  numberNeeded: { type: String, required: true, trim: true },
  Comments: [commentSchema],
});

const businessSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    businessName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    confirmPassword: { type: String, required: true, trim: true },
    isBusiness: false,
    posts: [postSchema],
  },
  { timestamps: true }
);

const Business = mongoose.model("businesses", businessSchema);

export default Business;
