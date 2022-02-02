import "dotenv/config";
import mongoose from "mongoose";

const db = mongoose.connect;

const MONGODB_URI = process.env.MONGODB_URI;

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
