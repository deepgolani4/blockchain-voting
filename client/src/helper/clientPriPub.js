const modularExp = require('./modExp');

module.exports = (serverPub) => {
  const clientPri = Math.floor(Math.random() * 900000) + 100000;
  const clientPub = modularExp(17, clientPri, 541);

  const sharedKey = modularExp(serverPub, clientPri, 541);

  return {
    clientPri,
    clientPub,
    sharedKey,
  };
};
