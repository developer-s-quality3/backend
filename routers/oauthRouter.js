const { default: axios } = require('axios');
const express = require('express');

const router = new express.Router();

const request = require('async-request');
const passport = require('passport');

router.get('/kakao-login', passport.authenticate('kakao-login'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao-login', {
    successRedirect: 'google.com',
    failureRedirect: 'naver.com',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

// router.get('/kakao-login', async (req, res) => {
//   try {
//     const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.KAKAO_CALLBACK_URI}&response_type=code`;

//     res.redirect(kakaoAuthURL);
//   } catch (error) {
//     res.status(400).send('something went wrong');
//   }
// });

// router.get('/kakao/callback', async (req, res) => {
//   let query = req.query;
//   console.log(req.query);
//   // query ( or search ) 에 code 라는 키가 함께 넘어오는지 검사
//   if (!Object.prototype.hasOwnProperty.call(query, 'code')) {
//     // 그렇지 못하면 에러 발생
//     return res.status(400).send('invalid_code');
//   }

//   try {
//     const response = await request('https://kauth.kakao.com/oauth/token', {
//       method: 'POST',
//       data: {
//         grant_type: 'authorization_code',
//         client_id: process.env.KAKAO_RESTAPI_KEY,
//         redirect_uri: process.env.KAKAO_CALLBACK_URI,
//         code: req.query.code, // reque
//         client_secret: process.env.KAKAO_CLIENT_SECRET,
//       },
//       headers: {
//         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//       },
//     });
//     // 만약 코드가 400 이상으로 넘어오면 에러 처리
//     if (response.statusCode >= 400) {
//       return res.status(400).send('카카오 로그인 실패');
//     }

//     const tokenToJson = JSON.parse(response.body);
//     // response.body 는 stringify 처리된 json 으로 넘어옵니다.
//     // 그래서 JSON.parse 를 통해 json 형태로 바꿔줍니다.

//     const result = await axios.get(
//       'https://kapi.kakao.com/v1/user/access_token_info',
//       {
//         headers: { Authorization: `Bearer ${tokenToJson.access_token}` },
//       }
//     );

//     const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
//       headers: { Authorization: `Bearer ${tokenToJson.access_token}` },
//     });
//     console.log(userInfo);

//     res.redirect('http://localhost:8080/#/Boardlist');
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
module.exports = router;
