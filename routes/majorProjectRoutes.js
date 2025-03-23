const express = require("express");
const majorProjectController = require("../controllers/majorProjectController");
const { protect } = require('../middleware/auth');
const router = express.Router();

// Get all major projects with pagination and search
router.get("/", majorProjectController.getAllMajorProjects);

// Get a single major project by ID
router.get("/:id", majorProjectController.getMajorProject);

// Create a new major project
router.post("/", protect, majorProjectController.createMajorProject);

// Update an existing major project
router.put("/:id",protect, majorProjectController.updateMajorProject);

// Delete a major project (soft delete)
router.delete("/:id",protect, majorProjectController.deleteMajorProject);


module.exports = router;
