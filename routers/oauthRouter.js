const { default: axios } = require('axios');
const express = require('express');

const router = new express.Router();

const passport = require('passport');
const request = require('async-request');

router.get('/kakao-login', passport.authenticate('kakao'));

// router.get(
//   '/kakao/callback',
//   passport.authenticate('kakao', {
//     successRedirect: 'http://localhost:8080/',
//     failureRedirect: 'http://localhost:8080/#/kakao_login',
//   }),
//   (req, res) => {
//     console.log('hi');
//     res.redirect('http://localhost:8080/');
//   }
// );
router.get('/kakao/callback', async (req, res) => {
  let query = req.query;

  // query ( or search ) 에 code 라는 키가 함께 넘어오는지 검사
  if (!Object.prototype.hasOwnProperty.call(query, 'code')) {
    // 그렇지 못하면 에러 발생
    return res.status(400).send('invalid_code');
  }

  try {
    // request

    // const response = await axios({
    //   url: 'https://kauth.kakao.com/oauth/token',
    //   method: 'POST',
    //   data: {
    //     grant_type: 'authorization_code',
    //     client_id: process.env.KAKAO_RESTAPI_KEY,
    //     redirect_uri: process.env.KAKAO_CALLBACK_URI,
    //     code: req.query.code, // reque
    //     client_secret: process.env.KAKAO_CLIENT_SECRET,
    //   },
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    // });

    const response = await request('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      data: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_RESTAPI_KEY,
        redirect_uri: process.env.KAKAO_CALLBACK_URI,
        code: req.query.code, // reque
        client_secret: process.env.KAKAO_CLIENT_SECRET,
      },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    // 만약 코드가 400 이상으로 넘어오면 에러 처리
    if (response.statusCode >= 400) {
      return res.status(400).send('카카오 로그인 실패');
    }

    // 회원 관리 로직
    const tokenToJson = JSON.parse(response.body);
    // response.body 는 stringify 처리된 json 으로 넘어옵니다.
    // 그래서 JSON.parse 를 통해 json 형태로 바꿔줍니다.

    // console.log(tokenToJson.access_token);

    const result = await axios.get(
      'https://kapi.kakao.com/v1/user/access_token_info',
      {
        headers: { Authorization: `Bearer ${tokenToJson.access_token}` },
      }
    );

    // BCUvMdzN31ytgzn94pTdK0ZOEGNmSoQ-K1PwZQo9dGgAAAF84HZFmA
    console.log(result.data);
    res.json(tokenToJson);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
