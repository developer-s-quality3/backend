const sessions = {};

const createSession = (email) => {
  const sessionId = String(Object.keys(sessions).length + 1);

  const session = { sessionId, email, valid: true };

  sessions[sessionId] = session;

  return session;
};

module.exports = {
  createSession,
};
