const router = require("express").Router();
const userController = require("../controllers/userController");
const {verifyAndAuthorization, verifyToken, verifyAnAdmin} = require("../middleware/verifyToken")


// Update User 
router.put("/", verifyAndAuthorization,userController.updateUser);

// Delete User
router.delete("/", verifyAndAuthorization,userController.deleteUser);

//Get User
router.get("/", verifyAndAuthorization,userController.getUser);

//Get All User
router.get("/", verifyAnAdmin,userController.getAllUser);



//last line
module.exports = router;