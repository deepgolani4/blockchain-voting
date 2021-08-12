const Vote = require('../blockchain/blockchain').Vote;
const client = require('../helpers/postgres');

module.exports = {
  vote: async (req, res) => {
    try {
      const { data, timestamp } = req.body;
      console.log(req.body);

      /**
       * Vote is added to the block.
       */

      votes.push(
        new Vote({ ...data, from: req.authorizedUser.uid, timestamp })
      );
      console.log(votes);

      const res_ = await client.query(
        'INSERT INTO VOTED(UID, VOTE) VALUES($1, $2)',
        [req.authorizedUser.uid, '1']
      );

      res.status(200).send('success');
    } catch (err) {
      console.log(err);
      res.status(503).send('Error');
    }
  },
};
