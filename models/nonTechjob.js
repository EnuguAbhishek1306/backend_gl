const mongoose = require('mongoose');

const techJobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required']
  },
  eligibilityCriteria: {
    type: String,
    required: [true, 'Eligibility criteria is required']
  },
  salary: {
    type: String,
    required: [true, 'Salary is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  role: {
    type: String,
    required: [true, 'Job role is required']
  },
  companyLink: {
    type: String,
    required: [true, 'Company official link is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date,
    required: [true, 'Application deadline is required']
  },
  clicks: {
    type: Number,
    default: 0
  },
  companyDescription: {
    type: String,
    required: [true, 'Company description is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  img: {  // Added image field
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Techjob', techJobSchema);
