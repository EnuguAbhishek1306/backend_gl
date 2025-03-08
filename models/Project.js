const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    domain: {
      type: String,
      required: [true, 'Domain is required']
    },
    link: {
      type: String,
      required: [true, 'Project link is required']
    },
    ouputImg:{
      type:String,
      required:[true,"output img url is required"]
    },
    tools: {
      type: [String],
      required: [true, 'Tech stack is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  module.exports=mongoose.model('Project', projectSchema)