import express from "express";
import defaultController from "../controllers/defaultController.js";
import { authRequired } from "../controllers/auth/authController.js";

import {
  deleteUser,
  fetchAllUsers,
  findUserById,
  findUserByName,
  updateUser,
  updateUserPost,
} from "../controllers/user/userController.js";
import {
  signUpUser,
  loginUser,
  logoutUser,
} from "../controllers/auth/authController.js";

const Router = express.Router();

Router.get("/", defaultController)
  .post("/signup", signUpUser)
  .get("/users", authRequired, fetchAllUsers)
  .post("/login", loginUser)
  .post("/users/post/:id", updateUserPost)
  .get("/logout", logoutUser)
  .delete("/delete/:id", deleteUser)
  .put("/updated/:userName", updateUser)
  .get("/users/:id", findUserById)
  .get("/users/currentUser/:userName", authRequired, findUserByName);

export default Router;
