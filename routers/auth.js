const express = require('express');
const router = new express.Router();
const {
  createSessionHandler,
  createUserHandler,
} = require('../controllers/session.Controller');

router.post('/login', createSessionHandler);
router.post('/signup', createUserHandler);

module.exports = router;
