const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");

module.exports = {
  getAllMessages: async (req, res) => {
    try {
      const pageSize = 12; //number of messages per page
      const page = req.query.page || 1; //current page number
      //calculating the messages to skip
      const skipMessages = (page - 1) * pageSize;
      //find messages with pagination
      var messages = await Message.find({ chat: req.params.id })
        .populate("sender", "username profile email")
        .populate("chat")
        .sort({ createdAt: -1 }) //Sort message by descending order
        .skip(skipMessages) //skip messages based on pagination
        .limit(pageSize); //limit the number of messages perpage
      messages = await User.populate(messages, {
        path: "chat.users",
        select: "username profile email",
      });
      console.log(messages);
      res.json(messages);
    } catch (error) {
      console.log("5");
      res.status(500).json({ error: "Could't retrieve messages" });
    }
  },

  sendMessage: async (req, res) => {
    const { content, chatId, receiver } = req.body;
    if (!content || !chatId) {
      console.log("Invakid data");
      return res.status(400).json("Invalid data");
    }
    console.log("1");
    var newMessage = {
      sender: req.user.id,
      content: content,
      receiver: receiver,
      chat: chatId,
    };
    
    try {
      var message = await Message.create(newMessage);
      message = await message.populate("sender", "username profile email");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "username profile email",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessages: message
      });
      console.log(message);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  //last
};
