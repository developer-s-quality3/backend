const bcrypt = require('bcrypt');
const { verifyJWT, signJWT } = require('../utils/jwt.utils');
const User = require('../models/User');
const { createSession, invalidateSession } = require('../db/session');

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
    const session = await createSession(email);

    //create access & refresh token
    const accessToken = signJWT(
      {
        sessionId: session.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
      },
      '5s'
    );
    const refreshToken = signJWT({ sessionId: session.id }, '5m');

    //set access token in cookie
    res.cookie('accessToken', accessToken, {
      maxAge: 30000, // 5min
      httpOnly: true,
    });
    //set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
      maxAge: 2.628e9, // 1 month
      httpOnly: true,
    });

    //send user back
    return res.send(session);
  } else {
    return res.status(401).send('Invalid email or password');
  }
};

//get the session session
const getSessionHandler = (req, res) => {
  // console.log(req.user);
  return res.send(req.user);
};

//log out handler
const deleteSessionHandler = async (req, res) => {
  const { sessionId } = req.user;
  console.log(req.user);
  res.cookie('accessToken', '', {
    maxAge: 0,
    httpOnly: true,
  });
  res.cookie('refreshToken', '', {
    maxAge: 0,
    httpOnly: true,
  });

  const session = await invalidateSession(sessionId);

  return res.send(session);
};

module.exports = {
  createUserHandler,
  createSessionHandler,
  getSessionHandler,
  deleteSessionHandler,
};
