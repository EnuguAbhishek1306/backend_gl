const Internship = require("../models/Internship");

const internshipController = {
  // Get all internships with pagination
  getAllInternships: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";

      const searchQuery = {
        isActive: true,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { jobRole: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };

      const internships = await Internship.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Internship.countDocuments(searchQuery);

      res.json({
        internships,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalInternships: total,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single internship
  getInternship: async (req, res) => {
    try {
      const internship = await Internship.findById(req.params.id);

      if (!internship) {
        return res.status(404).json({ message: "Internship not found" });
      }

      res.json(internship);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new internship
  createInternship: async (req, res) => {
    try {
      const internship = new Internship(req.body);
      const savedInternship = await internship.save();
      res.status(201).json(savedInternship);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update an internship
  updateInternship: async (req, res) => {
    try {
      const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!internship) {
        return res.status(404).json({ message: "Internship not found" });
      }

      res.json(internship);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete an internship (soft delete)
  deleteInternship: async (req, res) => {
    try {
      const internship = await Internship.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );

      if (!internship) {
        return res.status(404).json({ message: "Internship not found" });
      }

      res.json({ message: "Internship deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update clicks when Apply button is clicked
  updateClicks: async (req, res) => {
    try {
      const internship = await Internship.findByIdAndUpdate(
        req.params.id,
        { $inc: { clicks: 1 } },
        { new: true }
      );

      if (!internship) {
        return res.status(404).json({ message: 'Internship not found' });
      }

      res.json({ message: 'Click count updated', clicks: internship.clicks });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = internshipController;
