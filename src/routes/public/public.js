const express = require('express');
const router = express.Router();
const signinController = require('../../controller/signinController');

    

router.post('/signin',signinController.signinUser);
router.post('/signup',signinController.addUser);
router.post('/create-admin',signinController.createAdmin);
router.post('/signin-admin',signinController.signinAdmin);


module.exports = router;
