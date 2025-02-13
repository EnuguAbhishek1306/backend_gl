const Job = require("../models/Job");

const jobController = {
  // Get all jobs with pagination
  getAllJobs: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";

      const searchQuery = {
        isActive: true,
        $or: [
          { companyName: { $regex: search, $options: "i" } },
          { role: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };

      const jobs = await Job.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const total = await Job.countDocuments(searchQuery);

      res.json({
        jobs,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalJobs: total,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single job and increment clicks
  // Get single job (without incrementing clicks)
  getJob: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(job);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create new job
  createJob: async (req, res) => {
    try {
      const job = new Job(req.body);
      const savedJob = await job.save();
      res.status(201).json(savedJob);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update job
  updateJob: async (req, res) => {
    try {
      const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(job);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete job (soft delete)
  deleteJob: async (req, res) => {
    try {
      const job = await Job.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Update clicks only when "Apply" button is clicked
updateClicks: async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Click count updated', clicks: job.clicks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

};

module.exports = jobController;
