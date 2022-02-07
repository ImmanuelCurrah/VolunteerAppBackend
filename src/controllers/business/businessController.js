import mongoose from "mongoose";
import Business from "../../models/business.js";
import errorHandler from "../../utils/error.js";

export const fetchAllBusinesses = async (req, res) => {
  try {
    const allBusinesses = await Business.find(
      {},
      {
        _id: 1,
        userName: 1,
        businessName: 1,
        email: 1,
        posts: 1,
      }
    );

    if (allBusinesses) {
      return res.json(
        errorHandler(false, "Fetching businesses", allBusinesses)
      );
    } else {
      return res.json(errorHandler(true, "error catching all businesses"));
    }
  } catch (error) {
    return res.json(errorHandler(true, "error catching all businesses"));
  }
};

export const deleteBusiness = (req, res) => {
  try {
    Business.findByIdAndRemove(
      req.params.id,
      { new: true },
      (error, deletedBusiness) => {
        if (deletedBusiness) {
          return res.json(
            errorHandler(false, "Deleted business", deletedBusiness)
          );
        } else {
          return res.json(errorHandler(true, "could not delete business"));
        }
      }
    );
  } catch (error) {
    return res.json(errorHandler(true, "could not delete business"));
  }
};

export const updateBusiness = (req, res) => {
  try {
    Business.findOneAndUpdate(
      { userName: req.params.businessName },
      req.body,
      {
        new: true,
      },
      (error, updatedBusiness) => {
        if (updatedBusiness) {
          res.json(errorHandler(false, "updated Business", updatedBusiness));
        } else {
          return res.json(errorHandler(true, "could not update"));
        }
      }
    );
  } catch (error) {
    return res.json(errorHandler(true, "could not update"));
  }
};

export const findBusinessByName = (req, res) => {
  try {
    Business.findOne(
      { businessName: req.params.businessName },
      (error, businessFound) => {
        if (businessFound) {
          res.json(errorHandler(false, "found user", businessFound));
        } else {
          return res.json(errorHandler(true, "could not find business"));
        }
      }
    );
  } catch (error) {
    return res.json(errorHandler(true, "could not find business"));
  }
};

export const findBusinessById = (req, res) => {
  try {
    Business.findById(req.params.id, (error, foundBusiness) => {
      if (foundBusiness) {
        const { userName, businessName, email, createdAt, posts } =
          foundBusiness;
        return res.json(
          errorHandler(false, "business found", {
            user: {
              userName,
              businessName,
              email,
              posts,
              member_since: createdAt,
            },
          })
        );
      } else {
        return res.json(errorHandler(true, "could not find business"));
      }
    });
  } catch (error) {
    return json.res(errorHandler(true, "could not find that business"));
  }
};

export const updateBusinessPost = (req, res) => {
  try {
    Business.findById(req.params.id, (error, business) => {
      if (error) {
        throw new Error(error);
      }
      business.posts.push(req.body);
      business.save((error) => {
        return res.json(errorHandler(false, "posted", business));
      });
    });
  } catch (error) {
    errorHandler(true, "could not post");
  }
};

export const getComments = (req, res) => {
  try {
    Business.findById(req.params.id, (error, business) => {
      if (error) {
        throw new Error(error);
      }
      const posts = business.posts;
      const post = posts.filter(
        (post) => post._id.toString() === req.params.postId
      )[0];
      return res.json(errorHandler(false, "found it", post));
    });
  } catch (error) {
    errorHandler(true, "could not find those comments");
  }
};

export const postComment = (req, res) => {
  try {
    Business.findById(req.params.id, (error, business) => {
      if (error) {
        throw new Error(error);
      }
      const posts = business.posts;
      const post = posts.filter(
        (post) => post._id.toString() === req.params.postId
      )[0];
      post.Comments.push(req.body);
      business.save((error) => {
        return res.json(errorHandler(false, "posted", post));
      });
      // res.json(errorHandler(false, "found it", post));
    });
  } catch (error) {
    errorHandler(true, "could not post");
  }
};

export const deleteBusinessPost = (req, res) => {
  try {
    const post = Business.findOneAndUpdate(
      {
        _id: req.params.id,
        posts: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.postId) },
        },
      },
      { $pull: { posts: { _id: mongoose.Types.ObjectId(req.params.postId) } } },
      { new: true, upsert: true },
      (error, post) => {
        if (error) {
          errorHandler(true, "could not delete");
        } else {
          res.json(errorHandler(false, "deleted", post));
        }
      }
    );

    if (!post) {
      return res.status(400).send("Post not found");
    }
  } catch (error) {
    errorHandler(true, "delete post failed");
  }
};
