const db = require('../db/index');

// 예제
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  signUp() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
    INSERT INTO user(
      username,
      password,
      created_at
    )
    VALUES(
      "${this.userName}",
      "${this.password}",
      "${createdAtDate}"
    )
    `;

    // 아마도 디스트럭처링 해야할듯
    const newUser = db.execute(sql);
    return newUser;
  }
}

module.exports = User;
