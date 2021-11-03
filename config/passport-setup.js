const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((id, done) => {});

passport.use(
  'kakao-login',
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_RESTAPI_KEY,
      callbackURL: process.env.KAKAO_CALLBACK_URI,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile.id);

      const user = new User(profile.id, accessToken);

      // try {

      //   done(null, test);
      // } catch (error) {
      //   console.log('error');
      //   done(error, false);
      // }
    }
  )
);
