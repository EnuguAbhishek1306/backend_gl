const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const internshipController = require('../controllers/internshipController');

router.get('/', internshipController.getAllInternships);
router.get('/:id', internshipController.getInternship);
router.post('/', protect, internshipController.createInternship);
router.put('/:id', protect, internshipController.updateInternship);
router.delete('/:id', protect, internshipController.deleteInternship);
router.put('/internships/:id/clicks', internshipController.updateClicks); // Update clicks on Apply

module.exports = router;
