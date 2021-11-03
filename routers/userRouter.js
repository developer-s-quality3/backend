const express = require('express');
const userController = require('../controllers/userController');
const passport = require('passport')
const router = new express.Router();

// http://localhost:5000/user/profile
router.get('/profile', userController.readUser);

router.patch('/update', userController.updateUser);
//delete은 제외

module.exports = router;
