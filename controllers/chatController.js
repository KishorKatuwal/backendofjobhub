const Chat = require("../models/Chat");
const User = require("../models/User");

module.exports = {
  accessChat: async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json("Invalid User Id");
    }
    var isChat = await Chat.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessages");

    isChat = await User.populate(isChat, {
      path: "latestMessages.sender",
      select: "username profile email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: req.user.id,
        isGroupChat: false,
        users: [req.user.id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
          console.log(FullChat);
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400).json(err.toString());
      }
    }
  },

  getChat: async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessages")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessages.sender",
            select: "username profile email",
          });
          res.status(200).send(results);
        });
    } catch (err) {
      res.status(500).json(err.toString());
    }
  },


  










  //last
};
