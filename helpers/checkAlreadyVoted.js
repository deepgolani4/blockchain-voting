const client = require('./postgres');

module.exports = async (req, res, next) => {
  const result = await client.query('SELECT * FROM VOTED WHERE UID=$1', [
    req.authorizedUser.uid,
  ]);

  if (result.rows.length > 0) {
    res.status(200).send('Already Voted');
  } else {
    next();
  }
};
