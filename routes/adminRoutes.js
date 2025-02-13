const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.post('/add', protect, adminController.addAdmin);
router.get('/profile', protect, adminController.getProfile);
// router.put('/update-description', protect, adminController.updateDescription);
router.get('/description', adminController.getDescription)
router.post('/update-description', protect, adminController.updateDescription);
module.exports = router;