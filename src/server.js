import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { initMongoServer } from "./db/connection.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";
import users from "./routes/users.js";

initMongoServer();
const app = express();
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;

app.use(express.json());
app.use(cors());
app.use("/api", users);
app.use(cookieParser());
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));
app.use(logger("combined"));

db.on("error", (error) => console.log(error.message));
db.on("connected", () => console.log("mongo is connected"));
db.on("disconnected", () => console.log("mongo is disconnected"));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
