const express = require('express');
const {
  createWork,
  getAllWorks,
  createEpisode,
  uploadEpisodeImages,
} = require('../controllers/writer.Controller');
const { requireUser } = require('../middleware/requireUser');
const router = express.Router();
const upload = require('../utils/aws-s3.utils');

router.post(
  '/upload',
  requireUser,
  upload.fields([
    { name: 'episodeThumbnail', maxCount: 1 },
    { name: 'episodeImages', maxCount: 20 },
  ]),
  createEpisode
);

module.exports = router;
