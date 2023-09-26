const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
  //update user
  updateUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      console.log("ready");
      console.log(req.body);
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, __v, createdAt, ...others } = updatedUser._doc;
      res.status(200).json({ ...others });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //delete user
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.status(200).json("Account Successfully Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Get user
  getUser: async (req, res) => {
    try {
      console.log("hit k here");
      const user = await User.findById(req.user.id);
      const {password, __v, createdAt, ...userData} = user._doc;
      console.log(userData);
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },


  //getAllUsers
  getAllUser: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json(error);
    }
  },













//last line
};
