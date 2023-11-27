const feedbackRoutes=require('./endpoints/feedbackRoute');
const userRoutes=require('./endpoints/userRoute');
const express = require('express');
const router = express.Router();

router.use('/user',userRoutes);
router.use('/feedback',feedbackRoutes);


module.exports = router;
