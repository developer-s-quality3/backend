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
  const {session, user} = req
  if(!user) res.status(400).send({success: false, message: '유저정보가 없습니다.'})
  
  try {
 
    return res.send({ success: true, user });
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
