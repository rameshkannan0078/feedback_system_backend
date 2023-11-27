const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');


router.get('/', userController.getAllUsers);
router.delete('/:id',userController.deleteSingleUser);
module.exports = router;
