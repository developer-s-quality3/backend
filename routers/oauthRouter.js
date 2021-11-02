const express = require('express');

const router = new express.Router();

const passport = require('passport');

router.get('/kakao-login', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/' }),
  (req, res) => {
    res.send('reached to kakao callback route');
  }
);
module.exports = router;
