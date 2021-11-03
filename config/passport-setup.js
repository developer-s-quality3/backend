const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  'kakao-login',
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_RESTAPI_KEY,
      callbackURL: process.env.KAKAO_CALLBACK_URI,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ where: { kakaoId: profile.id } });
        // console.log(user.dataValues.kakaoId);
        if (user) {
          done(null, user.dataValues.id);
        } else {
          const newUser = await User.create({
            kakaoId: profile.id,
            kakaoToken: accessToken,
          });
          done(null, newUser);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
