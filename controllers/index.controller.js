const reqBuild = require('../aadhar/xmls');
const jwtSign = require('../helpers/jwtSign').sign;
const genLucky = require('../helpers/luckyNumGen');
const pow = require('../helpers/modularExp');
module.exports = {
  verifyAadhar: (req, res) => {
    try {
      const { uid, bday } = req.body;
      console.log(uid, bday);

      /**
       * Lucky Number or secret key for server
       * 6 digit in length
       * used on deffie hellman shared key generation
       */
      const lucky = genLucky(req.body);
      console.log('lucky', lucky);
      /**
       * Token generated from server for authorization in requests
       */

      const tkn = jwtSign({
        uid,
        bday,
        num: Math.random().toFixed(2),
      });

      // console.log(
      //   req.body,
      //   `http://www.uidai.gov.in/authentication/uid-auth-request/2.0/public/${uid[0]}/${uid[1]}/MMxNu7a6589B5x5RahDW-zNP7rhGbZb5HsTRwbi-VVNxkoFmkHGmYKM`
      // );

      /**
       * Diffie hellman public key for server generation
       */
      var serverPub = pow(17, lucky, 541);

      res.status(200).send({
        serverPub,
        token: tkn,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.log(err);
      res.status(503).send('error');
    }
    // axios
    //   .post(
    //     `http://www.uidai.gov.in/authentication/uid-auth-request/2.0/public/${uid[0]}/${uid[1]}/MMxNu7a6589B5x5RahDW-zNP7rhGbZb5HsTRwbi-VVNxkoFmkHGmYKM`,
    //     xml,
    //     {
    //       headers: {
    //         "Content-Type": "text/xml",
    //       },
    //     }
    //   )
    //   .then((res_) => {
    //     res.send(res_.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
