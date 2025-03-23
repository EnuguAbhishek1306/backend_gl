const express = require("express");
const minorProjectController = require("../controllers/minorProjectController");
const { protect } = require('../middleware/auth');
const router = express.Router();

// Get all minor projects with pagination and search
router.get("/", minorProjectController.getAllMinorProjects);

// Get a single minor project by ID
router.get("/:id", minorProjectController.getMinorProject);

// Create a new minor project
router.post("/",protect,  minorProjectController.createMinorProject);

// Update an existing minor project
router.put("/:id",protect,  minorProjectController.updateMinorProject);

// Delete a minor project (soft delete)
router.delete("/:id",protect, minorProjectController.deleteMinorProject);


module.exports = router;
