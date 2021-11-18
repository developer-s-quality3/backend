const express = require('express');
const {
  getAllApplication,
  getOneApplication,
  updateApplication,
  getApplicantsWorks,
  createGenre,
  updateGenre,
  deleteGenre,
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
module.exports = router;
