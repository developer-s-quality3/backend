const express = require('express');
const {
  readUser,
  updateUser,
  applyWriter,
  applyCompany,
  createWork,
  createEpisode,
  uploadEpisodeImages,
  likeToggleHandler,
  getLikedWorkForUser,
} = require('../controllers/user.Controller');
const { requireUser } = require('../middleware/requireUser');
const { userType } = require('../middleware/userType');
const router = new express.Router();
const upload = require('../utils/aws-s3.utils');

// http://localhost:5000/user/profile
router.get('/profile', requireUser, readUser);

router.post(
  '/apply-author',
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
router.post(
  '/upload-work',
  requireUser,
  userType('user'),
  upload.single('workThumbnail'),
  createWork
);
router.post(
  '/upload-episode',
  requireUser,
  userType('user'),
  upload.fields([
    { name: 'episodeThumbnail', maxCount: 1 },
    { name: 'episodeImages', maxCount: 20 },
  ]),
  createEpisode
);
router.post(
  '/upload-episode-images',
  requireUser,
  userType('user'),
  upload.array('episodeImages'),
  uploadEpisodeImages
);

router.patch('/profile', requireUser, updateUser);

router.post('/like', requireUser, likeToggleHandler);
router.get('/like', requireUser, getLikedWorkForUser);

module.exports = router;
