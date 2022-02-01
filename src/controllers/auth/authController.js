import User from "../../models/user.js";
import errorHandler from "../../utils/error.js";
import { securePassword } from "../../utils/securePassword.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createToken = (id) => {
  const secret = process.env.SECRET;
  return jwt.sign({ id }, secret, { expiresIn: 84000 });
};

export const authRequired = (req, res, next) => {
  const secret = process.env.SECRET;
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        return res.json(errorHandler(true, "Auth Error")).redirect("/login");
      } else {
        next();
      }
    });
  } else {
    return res.json(errorHandler(true, "Auth Error"));
  }
};

export const signUpUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
      userName: req.body.userName,
    }).lean(true);

    if (existingUser) {
      return res.json(errorHandler(true, "this user already exists"));
    }

    const newUser = new User({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    if (newUser) {
      const token = createToken(newUser._id);
      res.cookie("jwt", token, { maxAge: 84000 });

      newUser.password = await securePassword(newUser.password);
      newUser.confirmPassword = newUser.password;

      res.json(
        errorHandler(
          false,
          `Hi ${newUser.firstName.toUpperCase()}! A warm welcome to my User API!`,
          { user: newUser._id }
        )
      );
      await newUser.save();
    } else {
      return res.json(errorHandler(true, "error registering user"));
    }
  } catch (error) {
    return res.json(errorHandler(true, "error registering user"));
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne(
      {
        email: req.body.email.toLowerCase(),
      },
      { confirmPassword: 0 }
    );

    if (!user) {
      return res.json(errorHandler(true, "no user found"));
    }

    const auth = await bcrypt.compare(req.body.password, user.password);

    if (!auth) {
      return res.json(errorHandler(true, "password was incorrect"));
    }

    const { userName } = user;
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: 84000 });

    res.json(
      errorHandler(false, `Welcome back ${userName}`, { user, token }, token)
    );
  } catch (error) {
    return res.json(errorHandler(true, "trouble logging in user"));
  }
};

export const logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/api");
};
