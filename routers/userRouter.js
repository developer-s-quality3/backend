const express = require('express');
const userController = require('../controllers/userController');

const router = new express.Router();

router.post('/signup', userController.createUser);

// http://localhost:5000/api/user/profile
router.get('/profile', userController.readUser);
router.patch('/update', userController.updateUser);
//delete은 제외

module.exports = router;
