import Business from "../../models/business.js";
import errorHandler from "../../utils/error.js";
import { securePassword } from "../../utils/securePassword.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createToken = (id) => {
  const secret = process.env.SECRET;
  return jwt.sign({ id }, secret, { expiresIn: 84000 });
};

export const signUpBusiness = async (req, res) => {
  try {
    const existingBusiness = await Business.findOne({
      email: req.body.email,
      businessName: req.body.businessName,
    }).lean(true);

    if (existingBusiness) {
      return res.json(errorHandler(true, "this business already exists"));
    }

    const newBusiness = new Business({
      userName: req.body.userName,
      businessName: req.body.businessName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    if (newBusiness) {
      const token = createToken(newBusiness._id);
      res.cookie("jwt", token, { maxAge: 84000 });

      newBusiness.password = await securePassword(newBusiness.password);
      newBusiness.confirmPassword = newBusiness.password;

      res.json(
        errorHandler(
          false,
          `Hi ${newBusiness.businessName.toUpperCase()}! A warm welcome to our Volunteer API!`,
          { user: newBusiness._id }
        )
      );
      await newBusiness.save();
    } else {
      return res.json(errorHandler(true, "error registering business"));
    }
  } catch (error) {
    return res.json(errorHandler(true, "error registering business"));
  }
};

export const loginBusiness = async (req, res) => {
  try {
    const business = await Business.findOne(
      {
        email: req.body.email.toLowerCase(),
      },
      { confirmPassword: 0 }
    );

    if (!business) {
      return res.json(errorHandler(true, "no business found"));
    }

    const auth = await bcrypt.compare(req.body.password, business.password);

    if (!auth) {
      return res.json(errorHandler(true, "password was incorrect"));
    }

    const { businessName } = business;
    const token = createToken(business._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: 84000 });

    res.json(
      errorHandler(
        false,
        `Welcome back ${businessName}`,
        { business, token },
        token
      )
    );
  } catch (error) {
    return res.json(errorHandler(true, "trouble logging in business"));
  }
};

export const logoutBusiness = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/api");
};
