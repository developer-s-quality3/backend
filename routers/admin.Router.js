const express = require('express');
const {
  getAllApplication,
  getOneApplication,
  updateApplication,
  getApplicantsWorks,
  createGenre,
  updateGenre,
  deleteGenre,
  getAppliedEpisodes,
  getOneAppliedEpisode,
  updateAppliedEpisodes,
} = require('../controllers/admin.Controller');
const { requireUser } = require('../middleware/requireUser');
const { userType } = require('../middleware/userType');
const router = express.Router();

router.get('/applications', getAllApplication);
router.get('/applications/:applicationId', getOneApplication);
router.patch('/applications', updateApplication);

router.get('/applications/:userId/work', getApplicantsWorks);

// Genre
router.post('/genre', createGenre);
router.patch('/genre', updateGenre);
router.delete('/genre/:genreId', deleteGenre);

// Applied Episodes

// All applied Episodes
router.get('/episodes', getAppliedEpisodes);
// One applied Episode
router.get('/episodes/:episodeId', getOneAppliedEpisode);
// update applied Episode
router.patch('/episodes/:episodeId', updateAppliedEpisodes);
module.exports = router;
