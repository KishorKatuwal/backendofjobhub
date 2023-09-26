const router = require("express").Router();
const {verifyAndAuthorization, verifyToken, verifyAnAdmin} = require("../middleware/verifyToken");
const messageController = require("../controllers/messageController");


// SEND Messages
router.post("/", verifyAndAuthorization,messageController.sendMessage);

// GET All BOOKMARKS
router.get("/:id",verifyAndAuthorization, messageController.getAllMessages);



module.exports = router