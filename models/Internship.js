const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  jobRole: {
    type: String,
    required: [true, 'Job role is required']
  },
  employmentType: {
    type: String,
    required: [true, 'Employment type is required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  stipend: {
    type: String,
    required: [true, 'Stipend is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  workMode: {
    type: String,
    required: [true, 'Work mode is required']
  },
  lastDateToApply: {
    type: Date,
    required: [true, 'Last date to apply is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  link: {
    type: String,
    required: [true, 'Application link is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  img:{
    type:String,
    required:[true,'img link is required']
},
  createdAt: {
    type: Date,
    default: Date.now
  },
  clicks: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Internship', internshipSchema);
