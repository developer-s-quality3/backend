const express = require('express');
const {
  getAllApplication,
  getOneApplication,
  updateApplication,
  getApplicantsWorks,
} = require('../controllers/admin.Controller');
const { requireUser } = require('../middleware/requireUser');
const { userType } = require('../middleware/userType');
const router = express.Router();

router.get('/applications', getAllApplication);
router.get('/applications/:applicationId', getOneApplication);
router.patch('/applications/:applicationId', updateApplication);

router.get('/applications/:userId/work', getApplicantsWorks);

module.exports = router;
