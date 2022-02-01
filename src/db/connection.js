import "dotenv/config";
import mongoose from "mongoose";

const db = mongoose.connect;

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ImmanuelCurrah:Vr4L569IyN8G469K@cluster0.ugdor.mongodb.net/volunteers?retryWrites=true&w=majority";

export const initMongoServer = () => {
  try {
    db(MONGODB_URI).catch((error) => {
      throw error;
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
