const NonTechJob = require("../models/nonTechjob");


const nonTechJobController = {
    // Get all non-tech jobs with pagination
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
  
        const jobs = await NonTechJob.find(searchQuery)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit);
  
        const total = await NonTechJob.countDocuments(searchQuery);
  
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
  
    // Get single non-tech job
    getJob: async (req, res) => {
      try {
        const job = await NonTechJob.findById(req.params.id);
  
        if (!job) {
          return res.status(404).json({ message: "Job not found" });
        }
  
        res.json(job);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  
    // Create new non-tech job
    createJob: async (req, res) => {
      try {
        const job = new NonTechJob(req.body);
        const savedJob = await job.save();
        res.status(201).json(savedJob);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
  
    // Update non-tech job
    updateJob: async (req, res) => {
      try {
        const job = await NonTechJob.findByIdAndUpdate(req.params.id, req.body, {
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
  
    // Soft delete non-tech job
    deleteJob: async (req, res) => {
      try {
        const job = await NonTechJob.findByIdAndUpdate(
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
        const job = await NonTechJob.findByIdAndUpdate(
          req.params.id,
          { $inc: { clicks: 1 } },
          { new: true }
        );
  
        if (!job) {
          return res.status(404).json({ message: "Job not found" });
        }
  
        res.json({ message: "Click count updated", clicks: job.clicks });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  };
  

module.exports = nonTechJobController;
