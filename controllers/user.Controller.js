const User = require('../models/User');
const UserTypeChange = require('../models/UserTypeChange');

const updateUser = async (req, res) => {
  try {
    // do something
  } catch (error) {
    // throw an error
  }
};

const readUser = async (req, res) => {
  try {
    const user = await User.scope('withoutPassword').findOne({
      where: { email: req.user.email },
    });
    return res.send({ success: true, user: user });
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

const applyWriter = async (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.datas);

    // console.log(parsedData);
    console.log(req.user);

    let thumbnailUrl;

    if (req.file) {
      // console.log(req.file);
      thumbnailUrl = req.file.location;
    }

    const userTypeChange = await UserTypeChange.create({
      userId: req.user.userId,
      thumbnailUrl,
      introduction: parsedData.intro,
      penName: parsedData.penName,
    });

    return res.send(userTypeChange);
  } catch (error) {
    return res.status(500).send('something went wrong');
  }
};

module.exports = {
  readUser,
  updateUser,
  deleteUser,
  applyWriter,
};
