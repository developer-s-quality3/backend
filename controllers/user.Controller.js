const { User, UserTypeChange, Work } = require('../models');

const updateUser = async (req, res) => {
  try {
    // do something
  } catch (error) {
    // throw an error
  }
};

const readUser = async (req, res) => {
  try {
    const user = await User.findOne({
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

    let avatarUrl = 'Not provided';

    if (req.file) avatarUrl = req.file.location;

    const userTypeChange = await UserTypeChange.create({
      userId: req.user.userId,
      avatarUrl,
      authorDescription: parsedData.description,
      authorName: parsedData.authorName,
    });

    res.send(userTypeChange);
  } catch (error) {
    throw new Error(error.message);
  }
};

const createWork = async (req, res) => {
  const { userId, title, workThumbnail, workDescription } = req.body;
  try {
    const work = await Work.create({
      userId,
      title,
      workThumbnail,
      workDescription,
      status: 'application',
    });
    return res.json(work);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllWorks = async (req, res) => {
  try {
    const works = await Work.findAll({
      include: [{ model: User, as: 'user' }],
    });
    return res.send(works);
  } catch (error) {
    throw new Error(error.message);
  }
};

const createEpisode = async (req, res) => {};

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
  createWork,
  getAllWorks,
  createEpisode,
};
