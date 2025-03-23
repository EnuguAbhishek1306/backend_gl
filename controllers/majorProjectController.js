const MajorProject = require("../models/majorProject");

const majorProjectController = {
  // Get all major projects with pagination
  getAllMajorProjects: async (req, res) => {
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

      const majorProjects = await MajorProject.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await MajorProject.countDocuments(searchQuery);

      res.json({
        majorProjects,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalMajorProjects: total,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single major project
  getMajorProject: async (req, res) => {
    try {
      const majorProject = await MajorProject.findById(req.params.id);

      if (!majorProject) {
        return res.status(404).json({ message: "Major project not found" });
      }

      res.json(majorProject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new major project
  createMajorProject: async (req, res) => {
    try {
      const majorProject = new MajorProject(req.body);
      const savedMajorProject = await majorProject.save();
      res.status(201).json(savedMajorProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a major project
  updateMajorProject: async (req, res) => {
    try {
      const majorProject = await MajorProject.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );

      if (!majorProject) {
        return res.status(404).json({ message: "Major project not found" });
      }

      res.json(majorProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a major project (soft delete)
  deleteMajorProject: async (req, res) => {
    try {
      const majorProject = await MajorProject.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );

      if (!majorProject) {
        return res.status(404).json({ message: "Major project not found" });
      }

      res.json({ message: "Major project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update clicks when Apply button is clicked
  
  
};

module.exports = majorProjectController;
