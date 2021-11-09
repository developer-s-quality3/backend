const express = require('express');
const {
  readUser,
  updateUser,
  applyWriter,
  applyCompany,
} = require('../controllers/user.Controller');
const { requireUser } = require('../middleware/requireUser');
const { userType } = require('../middleware/userType');
const router = new express.Router();
const upload = require('../utils/aws-s3.utils');

// http://localhost:5000/user/profile
router.get('/profile', requireUser, readUser);

router.post(
  '/apply-writer',
  requireUser,
  userType('user'),
  upload.single('avatar'),
  applyWriter
);
router.post(
  '/apply-company',
  requireUser,
  userType('user'),
  upload.single('businessLicense'),
  applyCompany
);

module.exports = router;
