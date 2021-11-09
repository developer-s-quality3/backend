const { Session } = require('../models');

const createSession = async (email) => {
  const session = await Session.create({ email, valid: true });

  return session.dataValues;
};

const getSession = async (sessionId) => {
  const session = await Session.findOne({ where: { id: sessionId } });

  return session && session.dataValues.valid ? session.dataValues : null;
};

const invalidateSession = async (sessionId) => {
  const session = await Session.update(
    { valid: false },
    {
      where: { id: sessionId },
    }
  );
  // }
  return session.dataValues;
};

module.exports = {
  createSession,
  getSession,
  invalidateSession,
};
