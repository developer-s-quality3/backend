const express = require('express');
const {
  createWork,
  getAllWorks,
  createEpisode,
  uploadEpisodeImages,
  getWorksForCreateEpisode,
} = require('../controllers/writer.Controller');
const { requireUser } = require('../middleware/requireUser');
const { userType } = require('../middleware/userType');
const router = express.Router();
const upload = require('../utils/aws-s3.utils');

router.post(
  '/work',
  requireUser,
  userType('author'),
  upload.single('workThumbnail'),
  createWork
);

router.post(
  '/upload',
  requireUser,
  userType('author'),
  upload.fields([
    { name: 'episodeThumbnail', maxCount: 1 },
    { name: 'episodeImages', maxCount: 20 },
  ]),
  createEpisode
);
router.get(
  '/upload',
  requireUser,
  userType('author'),
  getWorksForCreateEpisode
);

module.exports = router;
