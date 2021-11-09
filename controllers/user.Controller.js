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
    throw new Error(error.message);
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

    let thumbnailUrl = 'Not provided';

    if (req.file) thumbnailUrl = req.file.location;

    const userTypeChange = await UserTypeChange.create({
      userId: req.user.userId,
      thumbnailUrl,
      introduction: parsedData.intro,
      penName: parsedData.penName,
    });

    res.send(userTypeChange);
  } catch (error) {
    throw new Error(error.message);
  }
};

const applyCompany = async (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.datas);

    let businesslicenseImgUrl = 'Not provided';

    if (req.file) businesslicenseImgUrl = req.file.location;

    const userTypeChange = await UserTypeChange.create({
      userId: req.user.userId,
      businesslicenseImgUrl,
      companyName: parsedData.companyName,
      businesslicenseNumber: parsedData.businessLicenseNum,
    });

    return res.send(userTypeChange);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  readUser,
  updateUser,
  deleteUser,
  applyWriter,
  applyCompany,
};
