const bcrypt = require('bcrypt');
const { verifyJWT, signJWT } = require('../utils/jwt.utils');
const User = require('../models/User');

//create user
const createUserHandler = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    //check if email exist
    const checkEmailExist = await User.findOne({
      where: { email },
    });
    if (checkEmailExist) {
      return res.status(400).send({ success: false, message: 'email in use' });
    }

    const newUser = await User.create({
      email,
      password,
      name,
    });
    res.send({ success: true, user: newUser });
  } catch (error) {
    throw new Error(error);
  }
};

//login handler
const createSessionHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    //create access token
    const accessToken = signJWT(
      { email: user.email, name: user.name, userType: user.userType },
      '1h'
    );

    //set access token in cookie
    res.cookie('accessToken', accessToken, {
      maxAge: 30000,
      httpOnly: true,
    });

    //send user back
    return res.send(verifyJWT(accessToken).payload);
  } else {
    return res.status(401).send('Invalid email or password');
  }
};

//get the session session
const getSessionHandler = (req, res) => {
  console.log(req.user);
  return res.send(req.user);
};

//log out handler
const deleteSessionHandler = (req, res) => {
  res.cookie('accessToken', '', {
    maxAge: 0,
    httpOnly: true,
  });
  return res.send({ success: true, message: 'logout success' });
};

module.exports = {
  createUserHandler,
  createSessionHandler,
  getSessionHandler,
  deleteSessionHandler,
};
