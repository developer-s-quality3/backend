const express = require('express');

const router = new express.Router();

const passport = require('passport');

router.get('/kakao-login', passport.authenticate('kakao'), (req, res) => {
  res.send('login success');
});

module.exports = router;
