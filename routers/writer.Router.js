const express = require('express');
const {
  createWork,
  getAllWorks,
  createEpisode,
  uploadEpisodeImages,
  getWorksForCreateEpisode,
  getEpisodeOrderNumber,
  uploadAuthorBanner,
  getAllEpisodesFromWriterHome,
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

router.get('/work', requireUser, userType('author'), getAllWorks);
router.get(
  '/work/:workId',
  requireUser,
  userType('author'),
  getAllEpisodesFromWriterHome
);

router.get(
  '/work/:workId/episodeOrder',
  requireUser,
  userType('author'),
  getEpisodeOrderNumber
);

router.patch(
  '/banner',
  requireUser,
  userType('author'),
  upload.single('authorBanner'),
  uploadAuthorBanner
);

module.exports = router;
