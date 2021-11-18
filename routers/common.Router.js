const express = require('express');
const { getEpisodes } = require('../controllers/common.Controller');
const { requireUser } = require('../middleware/requireUser');
const { userType } = require('../middleware/userType');
const router = new express.Router();

router.get('/:workId/episode', getEpisodes);
router.get('/episode/:episodeId');

module.exports = router;
