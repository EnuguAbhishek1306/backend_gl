const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const certificationController = require("../controllers/certificationController");

// Public Routes
router.get("/", certificationController.getAllCertifications);
router.get("/:id", certificationController.getCertification);

// Admin Routes (Protected)
router.post("/", protect, certificationController.createCertification);
router.put("/:id", protect, certificationController.updateCertification);
router.delete("/:id", protect, certificationController.deleteCertification);

module.exports = router;
