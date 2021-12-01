const express = require('express');
const {
  getEpisodes,
  getEpisodeImages,
  readAllGenre,
  getAllWorks,
  getLikeCountsForWork,
  getAllWorksForHome,
  getWriterWorks,
  getWorksByAuthorOrWork,
  getWorksByGenre,
} = require('../controllers/common.Controller');

const router = new express.Router();

// 에피소드 가져오기
router.get('/:workId/episode', getEpisodes);

// 작가 및 작품 검색
router.get('/search', getWorksByAuthorOrWork);

// 해당 에피소드의 이미지 가져오기
router.get('/episode/:episodeId', getEpisodeImages);

// 모든 작업물 가져오기 - 전체만화
router.get('/works', getAllWorks);

// 모든 작업물 가져오기 - 홈 화면
router.get('/works/home', getAllWorksForHome);

// 장르 가져오기
router.get('/genre', readAllGenre);

// 작품의 좋아요 갯수
router.get('/like/:workId', getLikeCountsForWork);

// 작가홈 - 일반유저 및 기업유저
router.get('/author/:writerId', getWriterWorks);

// 장르별 작품가져오기
router.get('/works/:genreId', getWorksByGenre);
module.exports = router;
