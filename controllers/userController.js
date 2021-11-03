const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = new User(username, password);

    user = await user.save();
    res.send({ success: true, user });
  } catch (error) {
    // throw an error
  }
};

const updateUser = async (req, res) => {
  try {
    // do something
  } catch (error) {
    // throw an error
  }
};

const readUser = async (req, res) => {
  try {
    let data = {
      title: '공지사항1',
      description: '오늘의 공지는 없습니다.',
      date: '2021-10-30',
    };
    // do something
    return res.send({ success: true, data });
  } catch (error) {
    // throw an error
    return res.status(500).send('something went wrong');
  }
};

const deleteUser = async (req, res) => {
  try {
    // do something
  } catch (error) {
    // throw an error
  }
};

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
};

// 월-금 -3시간 토-하루종일
