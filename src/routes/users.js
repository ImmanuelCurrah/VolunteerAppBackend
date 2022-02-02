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
import {
  signUpBusiness,
  loginBusiness,
  logoutBusiness,
} from "../controllers/auth/authBusinessController.js";
import {
  deleteBusiness,
  fetchAllBusinesses,
  findBusinessById,
  findBusinessByName,
  updateBusiness,
  updateBusinessPost,
} from "../controllers/business/businessController.js";
import { writeMessage } from "../controllers/message/createMessage.js";
import { fetchAllMessages } from "../controllers/message/messageControllers.js";

const Router = express.Router();

Router.get("/", defaultController)
  //for users
  .post("/signup", signUpUser)
  .get("/users", authRequired, fetchAllUsers)
  .post("/login", loginUser)
  .post("/users/post/:id", updateUserPost)
  .get("/logout", logoutUser)
  .delete("/delete/:id", deleteUser)
  .put("/updated/:userName", updateUser)
  .get("/users/:id", findUserById)
  .get("/users/currentUser/:userName", authRequired, findUserByName)
  //for business
  .post("/signup/business", signUpBusiness)
  .get("/businesses", authRequired, fetchAllBusinesses)
  .post("/login/business", loginBusiness)
  .post("/users/post/business/:id", updateBusinessPost)
  .get("/logout/business", logoutBusiness)
  .delete("/delete/business/:id", deleteBusiness)
  .put("/updated/business/:userName", updateBusiness)
  .get("/users/business/:id", findBusinessById)
  .get("/users/currentBusiness/:userName", authRequired, findBusinessByName)
  //messages from the contact us from on frontend
  .post("/messages/create", writeMessage)
  .get("/messages", fetchAllMessages);
export default Router;
