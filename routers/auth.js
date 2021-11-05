const express = require('express');
const router = new express.Router();
const {
  createSessionHandler,
  createUserHandler,
  getSessionHandler,
  deleteSessionHandler,
} = require('../controllers/session.Controller');

router.post('/session', createSessionHandler);
router.post('/signup', createUserHandler);
router.get('/session', getSessionHandler);
router.delete('/session', deleteSessionHandler);

module.exports = router;
