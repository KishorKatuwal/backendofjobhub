const router = require("express").Router();
const jobController = require("../controllers/jobController");
const {verifyAndAuthorization, verifyToken, verifyAnAdmin} = require("../middleware/verifyToken")


// Post Job 
router.post("/:id", verifyAnAdmin,jobController.createJob);

//Update Job
router.put("/:id", verifyAnAdmin,jobController.updateJob);

//Delete Job
router.delete("/:id", verifyAnAdmin,jobController.deleteJob);

//Get Job
router.get("/:id",jobController.getJob);

//Get All Jobs
router.get("/",jobController.getAllJobs);

//Search Job
router.get("/search/:key",jobController.searchJobs);



//last line
module.exports = router;