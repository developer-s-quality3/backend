const { User, UserTypeChange, Work } = require('../models');

// user type change application
const getAllApplication = async (req, res) => {
  // DESC ASC
  const { date, pending, approved, declined } = req.query;
  try {
    const applications = await UserTypeChange.findAll({
      order: [['updatedAt', 'DESC']],
    });
    return res.send(applications);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOneApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await UserTypeChange.findByPk(applicationId);
    return res.send(application);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateApplication = async (req, res) => {
  const { applicationId } = req.params;

  // is userId necessary?
  const { status, userId, reason } = req.body; // status = 'approved' || 'declined'

  if (status !== 'approved' && status !== 'declined')
    return res.status(400).send('status must be either approved || declined');

  try {
    const application = await UserTypeChange.findOne({
      where: {
        userId: userId,
        id: applicationId,
      },
    });
    if (!application) return res.status(400).send('wrong application infos');

    // TODO: status가 approve 일땐 반려사유 없어도됨
    application.status = status;
    application.reason = '';

    if (reason && status == 'declined') {
      application.reason = reason;
      await application.save();
      return res.send(application);
    }

    const saved = await application.save();

    const applicant = await User.findByPk(application.userId);

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    applicant.authorName = application.authorName;
    applicant.authorDescription = application.authorDescription;
    applicant.authorAvatar = application.avatarUrl;
    applicant.authorApprovedDate = today;
    applicant.userType = 'author';

    await applicant.save();

    return res.send({ saved, applicant });
  } catch (error) {
    throw new Error(error.message);
  }
};

// episode application
const getApplicantsWorks = async (req, res) => {
  const { userId } = req.params;

  try {
    const userWork = await User.findAll({
      where: {
        id: userId,
      },
      include: [{ model: Work, as: 'work', where: { status: 'application' } }],
    });

    return res.send(userWork);
  } catch (error) {
    throw new Error(error.message);
  }
};

// notice

module.exports = {
  getAllApplication,
  getOneApplication,
  updateApplication,
  getApplicantsWorks,
};
