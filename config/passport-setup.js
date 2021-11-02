const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_RESTAPI_KEY,
      callbackURL: '/oauth/kakao/callback',
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // accessToken으로 사용자를 찾고, 못찾는다면 사용자 생성
        const test = {
          msg: 'logged in',
          token: accessToken,
        };
        done(null, test);
      } catch (error) {
        done(error);
      }
    }
  )
);
