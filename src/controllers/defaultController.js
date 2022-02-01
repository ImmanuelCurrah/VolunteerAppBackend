import errorHandler from "../utils/error.js";

const defaultController = async (req, res, next) => {
  res.json(errorHandler(false, "Home", "Welcome to my Volunteer User API!"));
  res.status(200);
};

export default defaultController;
