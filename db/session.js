const Session = require('../models/Session');

const createSession = async (email) => {
  const session = await Session.create({ email, valid: true });

  return session.dataValues;
};

const getSession = async (sessionId) => {
  const session = await Session.findOne({ where: { id: sessionId } });

  return session && session.dataValues.valid ? session.dataValues : null;
};

const invalidateSession = async (sessionId) => {
  // Session.findOne({ where: { id: sessionId } }).then((record) => {
  //   record.update({ valid: false }).then((record) => {
  //     console.log(record);
  //     return record;
  //   });
  // });

  // let session = await Session.findOne({ where: { id: sessionId } });
  // if (session) {
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
