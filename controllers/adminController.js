const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Description = require('../models/Description');

const adminController = {
  // Admin login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          isSuper: admin.isSuper
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add new admin (only super admin can add)
  addAdmin: async (req, res) => {
    try {
      if (!req.admin.isSuper) {
        return res.status(403).json({ message: 'Only super admin can add new admins' });
      }

      const { email, password } = req.body;

      const adminExists = await Admin.findOne({ email });
      if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const admin = new Admin({
        email,
        password: hashedPassword
      });

      await admin.save();
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get admin profile
  getProfile: async (req, res) => {
    try {
      const admin = await Admin.findById(req.admin.id).select('-password');
      res.json(admin);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateDescription: async (req, res) => {
    try {
      const { content } = req.body;
      
      let description = await Description.findOne();
      
      if (!description) {
        description = new Description({ content });
      } else {
        description.content = content;
        description.updatedAt = Date.now();
      }
      
      await description.save();
      
      res.json({ message: 'Description updated successfully', description });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get description (for users to fetch latest)
  getDescription: async (req, res) => {
    try {
      const description = await Description.findOne();
      if (!description) {
        return res.status(404).json({ message: 'No description found' });
      }
      
      res.json(description);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
;

module.exports = adminController;
// controllers/adminController.js


// const Admin = require('../models/Admin');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const adminController = {
//     addAdmin: async (req, res) => {
//         try {
//             const { email, password } = req.body;

//             // Check if admin already exists
//             const adminExists = await Admin.findOne({ email });
//             if (adminExists) {
//                 return res.status(400).json({ message: 'Admin already exists' });
//             }

//             // Generate salt and hash password
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);

//             // Create new admin
//             const admin = new Admin({
//                 email,
//                 password: hashedPassword,
//                 isSuper: true  // First admin is always super admin
//             });

//             // Save admin to database
//             await admin.save();

//             res.status(201).json({ 
//                 message: 'Admin created successfully',
//                 admin: { 
//                     email: admin.email, 
//                     isSuper: admin.isSuper 
//                 }
//             });
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
// };

// module.exports = adminController;