const router = require('express').Router();
const { verifyAadhar } = require('../controllers/index.controller');
router.get('/', (req, res) => {
  res.send('Index Route');
});

router.post('/verifyaadhar', verifyAadhar);

module.exports = router;
