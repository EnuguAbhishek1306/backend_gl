const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const nonTechJobController = require("../controllers/nonTechJobController");

router.get("/", nonTechJobController.getAllJobs);
router.get("/:id", nonTechJobController.getJob);
router.post("/", protect, nonTechJobController.createJob);
router.put("/:id", protect, nonTechJobController.updateJob);
router.delete("/:id", protect, nonTechJobController.deleteJob);
router.get("/jobs/:id", nonTechJobController.getJob); // Get job details (without updating clicks)
router.put("/jobs/:id/clicks", nonTechJobController.updateClicks); // Update clicks on Apply

module.exports = router;
