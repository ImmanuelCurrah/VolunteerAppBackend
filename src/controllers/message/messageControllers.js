import Message from "../../models/contactForm.js";
import errorHandler from "../../utils/error.js";

export const fetchAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find(
      {},
      {
        _id: 1,
        email: 1,
        name: 1,
        message: 1,
      }
    );

    if (allMessages) {
      return res.json(errorHandler(false, "Fetching messages", allMessages));
    } else {
      return res.json(errorHandler(true, "error fetching all messages"));
    }
  } catch (error) {
    return res.json(errorHandler(true, "error fetching all messages"));
  }
};
