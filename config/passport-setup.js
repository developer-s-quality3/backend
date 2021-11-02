const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_RESTAPI_KEY,
      callbackURL: '/oauth/kakao/callback',
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
    }
  )
);
