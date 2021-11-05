const { verifyJWT, signJWT } = require('../utils/jwt.utils');
const User = require('../models/User')
//create user
export function createUserHandler(req, res) {
  const { email, name, password } = req.body;

  //check if email exist
  const emailExist = await User.
}

//login handler
export function createSessionHandler(req, res) {
  const { email, password } = req.body;

  const user = getUser(email);

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid email or password');
  }

  //create access token
  const accessToken = signJWT(
    { email: user, name: user.name, userType: user.userType },
    '1h'
  );

  //set access token in cookie
  res.cookie('accessToken', accessToken, {
    maxAge: 300000,
    httpOnly: true,
  });

  //send user back
  return res.send(verifyJWT(accessToken).payload);
}

//get the session session

//log out handler
