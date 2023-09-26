const Bookmark = require("../models/Bookmark");
// const User = require('../models/User');
const Job = require("../models/Job");

module.exports = {
  createBookmark: async (req, res) => {
    const jobID = req.body.job;
    try {
      const job = await Job.findById(jobID);
      if (!job) {
        return res.status(404).json({ message: "Jon Not Found" });
      }
      const newBook = new Bookmark({ job: job, userId: req.user.id });
      const savedBookamrk = await newBook.save();
      const { __v, updatedAt, ...newBookInfo } = savedBookamrk._doc;
      res.status(201).json(newBookInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteBookmark: async (req, res) => {

    try {
      const userId = req.user.id;
      const job = req.params.id;
      await Bookmark.findOneAndDelete({userId, job});
      res.status(200).json("Bookmark Successfully Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getBookmarks: async (req, res) => {
    try {
      console.log(req.user.id);
      const bookmarks = await Bookmark.find({ userId: req.user.id });
      res.status(200).json(bookmarks);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
