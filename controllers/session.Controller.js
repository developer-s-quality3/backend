const bcrypt = require('bcrypt');
const { verifyJWT, signJWT } = require('../utils/jwt.utils');
const { User } = require('../models');
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
    throw new Error(error.message);
  }
};

//login handler
const createSessionHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

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
          userId: user.id,
          email: user.email,
          name: user.name,
          userType: user.userType,
        },
        '30m'
      );
      const refreshToken = signJWT({ sessionId: session.id }, '21d');

      //set access token in cookie
      res.cookie('accessToken', accessToken, {
        maxAge: 6.048e8, // 6hours
        httpOnly: true,
      });
      //set refresh token in cookie
      res.cookie('refreshToken', refreshToken, {
        maxAge: 1.21e9, // 2weeks
        httpOnly: true,
      });

      //send user back
      return res.send({ session, userInfo: user });
    } else {
      return res.status(401).send('Invalid email or password');
    }
  } catch {
    throw new Error(error.message);
  }
};

//get the session session
const getSessionHandler = (req, res) => {
  // console.log(req.user);
  return res.send(req.user);
};

//log out handler
const deleteSessionHandler = async (req, res) => {
  try {
    const { sessionId } = req.user;

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
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUserHandler,
  createSessionHandler,
  getSessionHandler,
  deleteSessionHandler,
};
