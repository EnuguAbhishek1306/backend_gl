const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const jobController = require('../controllers/jobController');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJob);
router.post('/', protect, jobController.createJob);
router.put('/:id', protect, jobController.updateJob);
router.delete('/:id', protect, jobController.deleteJob);
router.get('/jobs/:id', jobController.getJob); // Get job details (without updating clicks)
router.put('/jobs/:id/clicks', jobController.updateClicks); // Update clicks on Apply
module.exports = router;