const express = require('express');
const router = express.Router();
const feedbackController = require('../../controller/feedbackController');

router.get('/', feedbackController.getAllFeedback);
router.post('/', feedbackController.addFeedback);
router.post('/get-single', feedbackController.getSingleFeedback);
router.patch('/update', feedbackController.updateSingleFeedback);
router.delete('/:id',feedbackController.deleteSingleFeedback);
router.get('/dashboard',feedbackController.generateDashboardData);
module.exports = router;
