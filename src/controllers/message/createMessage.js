import Message from "../../models/contactForm.js";
import errorHandler from "../../utils/error.js";

export const writeMessage = async (req, res) => {
  try {
    const newMessage = new Message({
      email: req.body.email,
      name: req.body.name,
      message: req.body.message,
    });

    if (newMessage) {
      res.json(
        errorHandler(
          false,
          `Thank you for submitting the following message`,
          newMessage
        )
      );
      await newMessage.save();
    } else {
      return res.json(errorHandler(true, "error sending message"));
    }
  } catch (error) {
    return res.json(errorHandler(true, "error sending message"));
  }
};
