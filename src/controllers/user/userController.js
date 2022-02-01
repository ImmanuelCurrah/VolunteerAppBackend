import User from "../../models/user.js";
import errorHandler from "../../utils/error.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find(
      {},
      {
        _id: 1,
        userName: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        posts: 1,
      }
    );

    if (allUsers) {
      return res.json(errorHandler(false, "Fetching Users", allUsers));
    } else {
      return res.json(errorHandler(true, "error catching all users"));
    }
  } catch (error) {
    return res.json(errorHandler(true, "error catching all users"));
  }
};

export const deleteUser = (req, res) => {
  try {
    User.findByIdAndRemove(
      req.params.id,
      { new: true },
      (error, deletedUser) => {
        if (deletedUser) {
          return res.json(errorHandler(false, "Deleted User", deletedUser));
        } else {
          return res.json(errorHandler(true, "could not delete user"));
        }
      }
    );
  } catch (error) {
    return res.json(errorHandler(true, "could not delete user"));
  }
};

export const updateUser = (req, res) => {
  try {
    User.findOneAndUpdate(
      { userName: req.params.userName },
      req.body,
      {
        new: true,
      },
      (error, updatedUser) => {
        if (updatedUser) {
          res.json(errorHandler(false, "updated User", updatedUser));
        } else {
          return res.json(errorHandler(true, "could not update"));
        }
      }
    );
  } catch (error) {
    return res.json(errorHandler(true, "could not update"));
  }
};

export const findUserByName = (req, res) => {
  try {
    User.findOne({ userName: req.params.userName }, (error, userFound) => {
      if (userFound) {
        res.json(errorHandler(false, "found user", userFound));
      } else {
        return res.json(errorHandler(true, "it tried"));
      }
    });
  } catch (error) {
    return res.json(errorHandler(true, "could not find username"));
  }
};

export const findUserById = (req, res) => {
  try {
    User.findById(req.params.id, (error, foundUser) => {
      if (foundUser) {
        const { userName, firstName, lastName, email, createdAt, posts } =
          foundUser;
        return res.json(
          errorHandler(false, "user found", {
            user: {
              userName,
              name: `${firstName} ${lastName}`,
              email,
              posts,
              member_since: createdAt,
            },
          })
        );
      } else {
        return res.json(errorHandler(true, "could not find user"));
      }
    });
  } catch (error) {
    return json.res(errorHandler(true, "could not find that user"));
  }
};

export const updateUserPost = (req, res) => {
  try {
    User.findById(req.params.id, (error, user) => {
      if (error) {
        throw new Error(error);
      }
      user.posts.push(req.body);
      user.save((error) => {
        return res.json(errorHandler(false, "posted", user));
      });
    });
  } catch (error) {
    errorHandler(true, "could not post");
  }
};
