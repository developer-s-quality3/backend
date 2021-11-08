const express = require('express');
const {
  readUser,
  updateUser,
  applyWriter,
} = require('../controllers/user.Controller');
const { requireUser } = require('../middleware/requireUser');
const router = new express.Router();
const upload = require('../utils/aws-s3.utils');

// http://localhost:5000/user/profile
router.get('/profile', requireUser, readUser);

router.post('/apply-writer', requireUser, upload.single('avatar'), applyWriter);

module.exports = router;
