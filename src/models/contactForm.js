import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  email: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
});

const Message = mongoose.model("message", messageSchema);

export default Message;
