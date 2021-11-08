const express = require('express');
const router = new express.Router();
const {
  createSessionHandler,
  createUserHandler,
  getSessionHandler,
  deleteSessionHandler,
} = require('../controllers/session.Controller');
const { requireUser } = require('../middleware/requireUser');

// signup
router.post('/signup', createUserHandler);

// login
router.post('/session', createSessionHandler);

// get current session
router.get('/session', requireUser, getSessionHandler);

// logout
router.delete('/session', requireUser, deleteSessionHandler);

module.exports = router;
