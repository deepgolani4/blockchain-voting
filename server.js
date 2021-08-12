const express = require('express');
const cron = require('node-cron');
const morgan = require('morgan');
var cors = require('cors');
const client = require('./helpers/postgres');
const app = express();
client
  .connect()
  .then(() => {
    console.log('Postgres Connected');
  })
  .catch((err) => {
    console.log(err);
  });

const index = require('./routes/index.route');
const secured = require('./routes/secured.route');

const addBlock = require('./blockchain/fileOperationsChain').addBlock;
const verifyJWT = require('./helpers/jwtSign').verify;

global.votes = [];
console.log(votes);

cron.schedule('*/10 * * * * *', () => {
  addBlock(votes);
  votes = [];
  console.log('running 10 sec');
});
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan('dev'));
app.use('/', index);
app.use('/secured', verifyJWT, secured);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (!err) {
    console.log(`Listening on port ${port}`);
  }
});
