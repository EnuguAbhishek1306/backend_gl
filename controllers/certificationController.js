const Certification = require("../models/Certification");

const certificationController = {
  // Get all certifications with pagination
  getAllCertifications: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";

      const searchQuery = {
        isActive: true,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { platform: { $regex: search, $options: "i" } },
        ],
      };

      const certifications = await Certification.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Certification.countDocuments(searchQuery);

      res.json({
        certifications,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalCertifications: total,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single certification by ID
  getCertification: async (req, res) => {
    try {
      const certification = await Certification.findById(req.params.id);

      if (!certification) {
        return res.status(404).json({ message: "Certification not found" });
      }

      res.json(certification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new certification (Admin Only)
  createCertification: async (req, res) => {
    try {
      const certification = new Certification(req.body);
      const savedCertification = await certification.save();
      res.status(201).json(savedCertification);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update certification (Admin Only)
  updateCertification: async (req, res) => {
    try {
      const certification = await Certification.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!certification) {
        return res.status(404).json({ message: "Certification not found" });
      }

      res.json(certification);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Soft delete certification (Admin Only)
  deleteCertification: async (req, res) => {
    try {
      const certification = await Certification.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );

      if (!certification) {
        return res.status(404).json({ message: "Certification not found" });
      }

      res.json({ message: "Certification deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = certificationController;
