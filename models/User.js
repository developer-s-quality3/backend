const db = require('../db/index');

// 예제
class User {
  constructor(kakaoId, kakaoToken) {
    this.kakaoId = kakaoId;
    this.kakaoToken = kakaoToken;
  }
  save() {
    let sql = `
    INSERT INTO user(
      kakaoId,
      kakaoToken,
    )
    VALUES(
      "${this.kakaoId}",
      "${this.kakaoToken}",

    )
    `;
    const newUser = db.execute(sql);
    console.log(newUser);
    return newUser;
  }
}

module.exports = User;
