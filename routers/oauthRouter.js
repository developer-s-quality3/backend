const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.get('/kakao-login', passport.authenticate('kakao-login'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao-login', {
    successRedirect: 'http://localhost:8080/',
    failureRedirect: 'http://localhost:8080/#/kakao-login',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
