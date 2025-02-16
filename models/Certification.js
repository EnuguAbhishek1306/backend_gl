const mongoose = require('mongoose'); // Import mongoose

const certificationSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    platform: {
      type: String,
      required: [true, 'Platform is required']
    },
    outcomes: {
      type: String,
      required: [true, 'Learning outcomes are required']
    },
    link: {
      type: String,
      required: [true, 'Course link is required']
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
    }
});

module.exports = mongoose.model('Certification', certificationSchema);
