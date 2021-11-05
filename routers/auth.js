const express = require('express');
const router = new express.Router();
const { createSessionHandler } = require('../controllers/session.Controller');

router.post('/login', createSessionHandler);
