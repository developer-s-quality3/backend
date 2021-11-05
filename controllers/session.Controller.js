const { verifyJWT, signJWT } = require('../utils/jwt.utils');
const User = require('../models/User');

//create user
async function createUserHandler(req, res) {
  const { email, name, password } = req.body;

  try {
    //check if email exist
    const checkEmailExist = await User.findOne({ where: { email } });
    console.log(checkEmailExist);
    if (checkEmailExist) {
      return res.status(400).send({ success: false, message: 'email in use' });
    }

    const newUser = await User.create({ email, password, name });
    res.send({ success: true, user: newUser });
  } catch (error) {
    throw new Error(error);
  }
}

//login handler
function createSessionHandler(req, res) {
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

module.exports = {
  createUserHandler,
  createSessionHandler,
};
