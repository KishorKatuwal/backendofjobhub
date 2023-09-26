const router = require("express").Router();
const {verifyAndAuthorization, verifyToken, verifyAnAdmin} = require("../middleware/verifyToken");
const chatController = require("../controllers/chatController");


// CREATE Chat
router.post("/", verifyAndAuthorization,chatController.accessChat);

// GET Chats
router.get("/",verifyAndAuthorization, chatController.getChat);



module.exports = router