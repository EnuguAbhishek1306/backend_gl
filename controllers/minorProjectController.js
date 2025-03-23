const MinorProject = require("../models/minorProject");

const minorProjectController = {
  // Get all minor projects with pagination
  getAllMinorProjects: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";

      const searchQuery = {
        isActive: true,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { domain: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };

      const minorProjects = await MinorProject.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await MinorProject.countDocuments(searchQuery);

      res.json({
        minorProjects,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalMinorProjects: total,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single minor project
  getMinorProject: async (req, res) => {
    try {
      const minorProject = await MinorProject.findById(req.params.id);

      if (!minorProject) {
        return res.status(404).json({ message: "Minor project not found" });
      }

      res.json(minorProject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new minor project
  createMinorProject: async (req, res) => {
    try {
      const minorProject = new MinorProject(req.body);
      const savedMinorProject = await minorProject.save();
      res.status(201).json(savedMinorProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a minor project
  updateMinorProject: async (req, res) => {
    try {
      const minorProject = await MinorProject.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );

      if (!minorProject) {
        return res.status(404).json({ message: "Minor project not found" });
      }

      res.json(minorProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a minor project (soft delete)
  deleteMinorProject: async (req, res) => {
    try {
      const minorProject = await MinorProject.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );

      if (!minorProject) {
        return res.status(404).json({ message: "Minor project not found" });
      }

      res.json({ message: "Minor project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update clicks when Apply button is clicked
  
};

module.exports = minorProjectController;
