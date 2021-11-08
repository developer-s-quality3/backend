const express = require('express');
const { uploadEpisodes } = require('../controllers/writer.Controller');
const router = express.Router();
const upload = require('../utils/aws-s3.utils');

router.post('/upload', upload.array('epis', 3), uploadEpisodes);

module.exports = router;
