const router = require('express').Router();
const { vote } = require('../controllers/secured.controller');
const alreadyVoted = require('../helpers/checkAlreadyVoted');
const decryptionVerification = require('../helpers/decryptionVerification');

router.post('/vote', decryptionVerification, alreadyVoted, vote);

module.exports = router;
