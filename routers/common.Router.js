const express = require('express');
const {
  getEpisodes,
  getEpisodeImages,
} = require('../controllers/common.Controller');

const router = new express.Router();

// 에피소드 가져오기
router.get('/:workId/episode', getEpisodes);

// 해당 에피소드의 이미지 가져오기
router.get('/episode/:episodeId', getEpisodeImages);

module.exports = router;
